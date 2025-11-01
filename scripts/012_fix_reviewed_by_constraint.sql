-- Исправление ограничения внешнего ключа для reviewed_by
-- Проблема: reviewed_by может ссылаться на несуществующего пользователя

-- Сначала удаляем старое ограничение внешнего ключа
ALTER TABLE account_requests 
DROP CONSTRAINT IF EXISTS account_requests_reviewed_by_fkey;

-- Добавляем новое ограничение с ON DELETE SET NULL
-- Это позволит сохранить запись, даже если пользователь будет удален
ALTER TABLE account_requests 
ADD CONSTRAINT account_requests_reviewed_by_fkey 
FOREIGN KEY (reviewed_by) 
REFERENCES users(id) 
ON DELETE SET NULL;

-- Также добавим индекс для оптимизации
CREATE INDEX IF NOT EXISTS idx_account_requests_reviewed_by ON account_requests(reviewed_by);

COMMENT ON CONSTRAINT account_requests_reviewed_by_fkey ON account_requests IS 
'Foreign key to users table with ON DELETE SET NULL to preserve history';
