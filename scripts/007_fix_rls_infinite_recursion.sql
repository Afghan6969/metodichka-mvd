-- Исправление бесконечной рекурсии в RLS политиках для таблицы users
-- Дата: 2025-10-14
-- Проблема: При JOIN по created_by и deactivated_by возникает бесконечная рекурсия

-- Удаляем все существующие политики для таблицы users
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON users;
DROP POLICY IF EXISTS "Enable delete for users based on id" ON users;
DROP POLICY IF EXISTS "Users can read all users" ON users;
DROP POLICY IF EXISTS "Users can insert users" ON users;
DROP POLICY IF EXISTS "Users can update users" ON users;
DROP POLICY IF EXISTS "Users can delete users" ON users;

-- Отключаем RLS для таблицы users (так как аутентификация происходит через API)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Комментарий
COMMENT ON TABLE users IS 'Таблица пользователей. RLS отключен, доступ контролируется через API endpoints с проверкой cookies.';
