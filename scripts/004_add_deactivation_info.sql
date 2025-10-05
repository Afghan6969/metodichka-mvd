-- Добавление информации о деактивации в таблицу users

-- Добавляем колонки для хранения информации о деактивации
ALTER TABLE users ADD COLUMN IF NOT EXISTS deactivated_by UUID REFERENCES users(id);
ALTER TABLE users ADD COLUMN IF NOT EXISTS deactivated_at TIMESTAMP;

-- Комментарии
COMMENT ON COLUMN users.deactivated_by IS 'ID пользователя, который деактивировал';
COMMENT ON COLUMN users.deactivated_at IS 'Дата и время деактивации';

-- Создаем индекс
CREATE INDEX IF NOT EXISTS idx_users_deactivated_by ON users(deactivated_by);
