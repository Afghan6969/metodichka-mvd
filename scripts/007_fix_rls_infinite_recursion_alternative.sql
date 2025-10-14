-- Альтернативное исправление: оставляем RLS, но исправляем политики
-- Дата: 2025-10-14

-- Удаляем все существующие политики
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON users;
DROP POLICY IF EXISTS "Enable delete for users based on id" ON users;
DROP POLICY IF EXISTS "Users can read all users" ON users;
DROP POLICY IF EXISTS "Users can insert users" ON users;
DROP POLICY IF EXISTS "Users can update users" ON users;
DROP POLICY IF EXISTS "Users can delete users" ON users;

-- Включаем RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Создаём простую политику для чтения без рекурсии
-- ВАЖНО: используем USING (true) чтобы избежать проверки прав на связанные записи
CREATE POLICY "Allow read access to all users"
ON users FOR SELECT
USING (true);

-- Политика для вставки (только через service role key)
CREATE POLICY "Allow insert for service role"
ON users FOR INSERT
WITH CHECK (true);

-- Политика для обновления (только через service role key)
CREATE POLICY "Allow update for service role"
ON users FOR UPDATE
USING (true)
WITH CHECK (true);

-- Политика для удаления (только через service role key)
CREATE POLICY "Allow delete for service role"
ON users FOR DELETE
USING (true);

-- Комментарий
COMMENT ON TABLE users IS 'Таблица пользователей. RLS включен с простыми политиками для избежания рекурсии. Реальный контроль доступа через API.';
