-- Создание таблицы для запросов на создание аккаунта
CREATE TABLE IF NOT EXISTS account_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname TEXT NOT NULL,
  login TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_account_requests_status ON account_requests(status);
CREATE INDEX IF NOT EXISTS idx_account_requests_created_at ON account_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_account_requests_ip_address ON account_requests(ip_address);
CREATE INDEX IF NOT EXISTS idx_account_requests_login ON account_requests(login);

-- Таблица для отслеживания IP адресов и защиты от спама
CREATE TABLE IF NOT EXISTS request_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  last_request_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_ip ON request_rate_limits(ip_address);
CREATE INDEX IF NOT EXISTS idx_rate_limits_blocked_until ON request_rate_limits(blocked_until);

-- Функция для автоматического создания пользователя после одобрения
CREATE OR REPLACE FUNCTION auto_create_user_from_request()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Если запрос одобрен, создаем пользователя
  IF NEW.status = 'approved' AND OLD.status = 'pending' THEN
    -- Преобразуем роль в правильный формат
    user_role := CASE 
      WHEN NEW.role = 'ГУВД' THEN 'guvd'
      WHEN NEW.role = 'ГИБДД' THEN 'gibdd'
      ELSE LOWER(NEW.role)
    END;
    
    INSERT INTO users (nickname, username, password_hash, role, created_by, status, created_at)
    VALUES (NEW.nickname, NEW.login, NEW.password_hash, user_role, NEW.reviewed_by, 'active', NOW());
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для автоматического создания пользователя
CREATE TRIGGER trigger_auto_create_user_from_request
AFTER UPDATE ON account_requests
FOR EACH ROW
EXECUTE FUNCTION auto_create_user_from_request();

-- RLS (Row Level Security) политики
ALTER TABLE account_requests ENABLE ROW LEVEL SECURITY;

-- Политика: все могут создавать запросы
CREATE POLICY "Anyone can create account requests"
ON account_requests
FOR INSERT
TO public
WITH CHECK (true);

-- Политика: только root, лидеры ПГС, ГС и лидеры могут просматривать запросы
CREATE POLICY "Leaders can view account requests"
ON account_requests
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd')
    AND users.status = 'active'
  )
);

-- Политика: только root, лидеры ПГС, ГС и лидеры могут обновлять запросы
CREATE POLICY "Leaders can update account requests"
ON account_requests
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd')
    AND users.status = 'active'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd')
    AND users.status = 'active'
  )
);

-- Политика для rate_limits (только backend может работать с этой таблицей)
ALTER TABLE request_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage rate limits"
ON request_rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Функция для проверки rate limit
CREATE OR REPLACE FUNCTION check_rate_limit(p_ip_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_record RECORD;
  v_time_window INTERVAL := '24 hours';
  v_max_requests INTEGER := 3;
BEGIN
  -- Получаем запись для данного IP
  SELECT * INTO v_record
  FROM request_rate_limits
  WHERE ip_address = p_ip_address;
  
  -- Если записи нет, создаем новую
  IF NOT FOUND THEN
    INSERT INTO request_rate_limits (ip_address, request_count, last_request_at)
    VALUES (p_ip_address, 1, now());
    RETURN true;
  END IF;
  
  -- Проверяем, не заблокирован ли IP
  IF v_record.blocked_until IS NOT NULL AND v_record.blocked_until > now() THEN
    RETURN false;
  END IF;
  
  -- Если прошло больше 24 часов, сбрасываем счетчик
  IF v_record.last_request_at < (now() - v_time_window) THEN
    UPDATE request_rate_limits
    SET request_count = 1, last_request_at = now(), blocked_until = NULL
    WHERE ip_address = p_ip_address;
    RETURN true;
  END IF;
  
  -- Если превышен лимит, блокируем IP
  IF v_record.request_count >= v_max_requests THEN
    UPDATE request_rate_limits
    SET blocked_until = now() + v_time_window
    WHERE ip_address = p_ip_address;
    RETURN false;
  END IF;
  
  -- Увеличиваем счетчик
  UPDATE request_rate_limits
  SET request_count = request_count + 1, last_request_at = now()
  WHERE ip_address = p_ip_address;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Комментарии к таблицам
COMMENT ON TABLE account_requests IS 'Таблица для хранения запросов на создание аккаунта';
COMMENT ON TABLE request_rate_limits IS 'Таблица для защиты от спама и rate limiting';
COMMENT ON FUNCTION check_rate_limit IS 'Функция для проверки лимита запросов с одного IP';
