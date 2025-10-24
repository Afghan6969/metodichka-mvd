-- Проверка таблицы user_logs и её структуры
-- Дата: 2025-10-25

-- 1. Проверяем существование таблицы
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_logs') THEN
        RAISE EXCEPTION 'Таблица user_logs не существует!';
    END IF;
    RAISE NOTICE 'Таблица user_logs существует';
END $$;

-- 2. Показываем структуру таблицы
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_logs'
ORDER BY ordinal_position;

-- 3. Проверяем количество записей
DO $$ 
DECLARE
    log_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO log_count FROM user_logs;
    RAISE NOTICE 'Количество записей в user_logs: %', log_count;
END $$;

-- 4. Показываем последние 10 записей
SELECT 
    id,
    action,
    target_user_nickname,
    performed_by_nickname,
    created_at,
    ip_address
FROM user_logs 
ORDER BY created_at DESC 
LIMIT 10;

-- 5. Проверяем RLS политики
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'user_logs';

-- 6. Проверяем статус RLS
SELECT 
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'user_logs';

-- 7. Если RLS включен, отключаем его
DO $$ 
BEGIN
    -- Отключаем RLS для user_logs
    ALTER TABLE user_logs DISABLE ROW LEVEL SECURITY;
    RAISE NOTICE 'RLS отключен для таблицы user_logs';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Не удалось отключить RLS: %', SQLERRM;
END $$;

-- 8. Удаляем все политики для user_logs
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'user_logs'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON user_logs', policy_record.policyname);
        RAISE NOTICE 'Удалена политика: %', policy_record.policyname;
    END LOOP;
END $$;

-- 9. Проверяем внешние ключи
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = 'user_logs';

-- 10. Комментарий
COMMENT ON TABLE user_logs IS 'Журнал всех действий с пользователями. RLS отключен для обеспечения записи логов.';
