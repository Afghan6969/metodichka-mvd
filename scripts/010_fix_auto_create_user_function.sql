-- Исправление функции автоматического создания пользователя
-- Заменяем login на username (правильное имя колонки в таблице users)
-- Преобразуем роли ГУВД/ГИБДД в правильный формат

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
      ELSE LOWER(NEW.role)
    END;
    
    INSERT INTO users (nickname, username, password_hash, role, created_by, status, created_at)
    VALUES (NEW.nickname, NEW.login, NEW.password_hash, user_role, NEW.reviewed_by, 'active', NOW());
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
