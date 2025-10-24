-- Проверка и исправление таблицы users
-- Дата: 2025-10-25
-- Цель: Убедиться что таблица users работает корректно

-- 1. Проверяем существование таблицы users
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        RAISE EXCEPTION 'Таблица users не существует!';
    END IF;
END $$;

-- 2. Отключаем RLS для таблицы users (если включен)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 3. Удаляем все существующие политики
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON users;
DROP POLICY IF EXISTS "Enable delete for users based on id" ON users;
DROP POLICY IF EXISTS "Users can read all users" ON users;
DROP POLICY IF EXISTS "Users can insert users" ON users;
DROP POLICY IF EXISTS "Users can update users" ON users;
DROP POLICY IF EXISTS "Users can delete users" ON users;
DROP POLICY IF EXISTS "Allow read access to all users" ON users;
DROP POLICY IF EXISTS "Allow insert for service role" ON users;
DROP POLICY IF EXISTS "Allow update for service role" ON users;
DROP POLICY IF EXISTS "Allow delete for service role" ON users;

-- 4. Проверяем наличие необходимых колонок
DO $$ 
BEGIN
    -- Проверяем основные колонки
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'id') THEN
        RAISE EXCEPTION 'Колонка id не существует в таблице users!';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'nickname') THEN
        RAISE EXCEPTION 'Колонка nickname не существует в таблице users!';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'username') THEN
        RAISE EXCEPTION 'Колонка username не существует в таблице users!';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
        RAISE EXCEPTION 'Колонка role не существует в таблице users!';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'status') THEN
        RAISE EXCEPTION 'Колонка status не существует в таблице users!';
    END IF;
END $$;

-- 5. Проверяем что в таблице есть данные
DO $$ 
DECLARE
    user_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO user_count FROM users;
    RAISE NOTICE 'Количество пользователей в таблице: %', user_count;
    
    IF user_count = 0 THEN
        RAISE WARNING 'В таблице users нет ни одного пользователя!';
    END IF;
END $$;

-- 6. Комментарий
COMMENT ON TABLE users IS 'Таблица пользователей. RLS отключен, доступ контролируется через API endpoints с проверкой cookies.';
