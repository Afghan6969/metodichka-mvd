-- Исправление функции автоматического создания пользователя
-- Добавляем правильное преобразование всех ролей

DROP FUNCTION IF EXISTS auto_create_user_from_request() CASCADE;

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
      WHEN NEW.role = 'ГИБДД - ГС' THEN 'gs-gibdd'
      WHEN NEW.role = 'ГИБДД - ПГС' THEN 'pgs-gibdd'
      WHEN NEW.role = 'ГИБДД - Лидер' THEN 'leader-gibdd'
      WHEN NEW.role = 'ГИБДД - СС' THEN 'ss-gibdd'
      WHEN NEW.role = 'ГУВД - ГС' THEN 'gs-guvd'
      WHEN NEW.role = 'ГУВД - ПГС' THEN 'pgs-guvd'
      WHEN NEW.role = 'ГУВД - Лидер' THEN 'leader-guvd'
      WHEN NEW.role = 'ГУВД - СС' THEN 'ss-guvd'
      WHEN NEW.role = 'super-admin' THEN 'super-admin'
      WHEN NEW.role = 'root' THEN 'root'
      ELSE NULL -- Недопустимая роль, не создаем пользователя
    END;
    
    -- Создаем пользователя только если роль допустима
    IF user_role IS NOT NULL THEN
      INSERT INTO users (nickname, username, password_hash, role, created_by, status, created_at)
      VALUES (NEW.nickname, NEW.login, NEW.password_hash, user_role, NEW.reviewed_by, 'active', NOW());
    ELSE
      -- Логируем ошибку, если роль недопустима
      RAISE WARNING 'Недопустимая роль при создании пользователя: %', NEW.role;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Пересоздаем триггер
DROP TRIGGER IF EXISTS trigger_auto_create_user_from_request ON account_requests;

CREATE TRIGGER trigger_auto_create_user_from_request
AFTER UPDATE ON account_requests
FOR EACH ROW
EXECUTE FUNCTION auto_create_user_from_request();

COMMENT ON FUNCTION auto_create_user_from_request IS 
'Автоматически создает пользователя при одобрении запроса с правильным преобразованием всех ролей';
