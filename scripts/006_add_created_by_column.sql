-- Добавление информации о создателе пользователя
-- Дата: 2025-10-14

-- Добавляем колонку created_by для хранения информации о том, кто создал пользователя
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id);

-- Комментарий
COMMENT ON COLUMN users.created_by IS 'ID пользователя, который создал данного пользователя';

-- Создаем индекс для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_users_created_by ON users(created_by);
