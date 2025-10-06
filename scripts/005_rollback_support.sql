-- Миграция для поддержки функции отката действий
-- Дата: 2025-10-06

-- 1. Убедимся что в user_logs есть все необходимые колонки
-- (они уже должны быть добавлены в предыдущих миграциях)

-- Проверяем наличие колонки ip_address
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_logs' AND column_name = 'ip_address'
    ) THEN
        ALTER TABLE user_logs ADD COLUMN ip_address TEXT;
        CREATE INDEX IF NOT EXISTS idx_user_logs_ip_address ON user_logs(ip_address);
        COMMENT ON COLUMN user_logs.ip_address IS 'IP адрес, с которого было выполнено действие (видно только root)';
    END IF;
END $$;

-- 2. Добавляем индексы для оптимизации запросов отката
CREATE INDEX IF NOT EXISTS idx_user_logs_action ON user_logs(action);
CREATE INDEX IF NOT EXISTS idx_user_logs_target_user_id ON user_logs(target_user_id);
CREATE INDEX IF NOT EXISTS idx_user_logs_created_at_desc ON user_logs(created_at DESC);

-- 3. Комментарии к таблице и важным колонкам
COMMENT ON TABLE user_logs IS 'Журнал всех действий с пользователями, включая откаты';
COMMENT ON COLUMN user_logs.action IS 'Тип действия: add_user, update_user, deactivate, activate, rollback, login, logout';
COMMENT ON COLUMN user_logs.details IS 'JSON с деталями действия, для update_user содержит previous и next значения';
COMMENT ON COLUMN user_logs.target_user_id IS 'ID пользователя, на которого направлено действие';
COMMENT ON COLUMN user_logs.performed_by_id IS 'ID пользователя, который выполнил действие';

-- 4. Создаём view для удобного просмотра логов с откатами
CREATE OR REPLACE VIEW user_logs_with_rollback_info AS
SELECT 
    ul.*,
    CASE 
        WHEN ul.action = 'rollback' THEN 
            (ul.details::json->>'original_action')
        ELSE NULL
    END as original_action,
    CASE 
        WHEN ul.action = 'rollback' THEN 
            (ul.details::json->>'original_log_id')::integer
        ELSE NULL
    END as original_log_id,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM user_logs ul2 
            WHERE ul2.action = 'rollback' 
            AND (ul2.details::json->>'original_log_id')::integer = ul.id
        ) THEN true
        ELSE false
    END as has_been_rolled_back
FROM user_logs ul;

COMMENT ON VIEW user_logs_with_rollback_info IS 'Расширенный view логов с информацией об откатах';

-- 5. Функция для проверки возможности отката
CREATE OR REPLACE FUNCTION can_rollback_action(log_id integer)
RETURNS boolean AS $$
DECLARE
    log_action text;
    already_rolled_back boolean;
BEGIN
    -- Получаем действие
    SELECT action INTO log_action FROM user_logs WHERE id = log_id;
    
    IF log_action IS NULL THEN
        RETURN false;
    END IF;
    
    -- Нельзя откатить откат
    IF log_action = 'rollback' THEN
        RETURN false;
    END IF;
    
    -- Проверяем, не был ли уже откачен
    SELECT EXISTS (
        SELECT 1 FROM user_logs 
        WHERE action = 'rollback' 
        AND (details::json->>'original_log_id')::integer = log_id
    ) INTO already_rolled_back;
    
    IF already_rolled_back THEN
        RETURN false;
    END IF;
    
    -- Можно откатить только определённые действия
    IF log_action IN ('add_user', 'update_user', 'deactivate', 'activate') THEN
        RETURN true;
    END IF;
    
    RETURN false;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION can_rollback_action(integer) IS 'Проверяет, можно ли откатить указанное действие';

-- 6. Пример использования
-- SELECT * FROM user_logs_with_rollback_info WHERE has_been_rolled_back = false AND action != 'rollback';
-- SELECT can_rollback_action(123);
