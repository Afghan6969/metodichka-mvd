-- Обновление таблицы user_logs для поддержки новых действий

-- ВАЖНО: Удаляем ВСЕ ограничения на типы действий
ALTER TABLE user_logs DROP CONSTRAINT IF EXISTS user_logs_action_check;

-- НЕ добавляем новое ограничение - разрешаем любые действия
-- Это позволит добавлять новые типы действий без миграций

-- Комментарий к колонке
COMMENT ON COLUMN user_logs.action IS 'Тип действия: add_user, remove_user, update_user, deactivate, activate, rollback и другие';

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_user_logs_action ON user_logs(action);
CREATE INDEX IF NOT EXISTS idx_user_logs_target_user ON user_logs(target_user_id);
CREATE INDEX IF NOT EXISTS idx_user_logs_user_id ON user_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_logs_created_at ON user_logs(created_at DESC);

-- Проверяем структуру таблицы
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'user_logs';
