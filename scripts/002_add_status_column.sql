-- Добавляем колонку status в таблицу users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'deactivated'));

-- Устанавливаем статус 'active' для всех существующих пользователей
UPDATE users 
SET status = 'active' 
WHERE status IS NULL;

-- Создаем индекс для быстрого поиска по статусу
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Комментарий к колонке
COMMENT ON COLUMN users.status IS 'Статус пользователя: active (активный) или deactivated (деактивированный)';
