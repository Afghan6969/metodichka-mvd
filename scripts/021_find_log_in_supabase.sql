-- Поиск конкретного лога в Supabase
-- Дата: 2025-10-25
-- Ищем лог с ID 447 или по никнейму DEBUG_TEST

-- 1. Поиск по ID
SELECT * FROM user_logs WHERE id = 447;

-- 2. Поиск по никнейму
SELECT * FROM user_logs
WHERE target_user_nickname = 'DEBUG_TEST'
ORDER BY created_at DESC;

-- 3. Поиск по performed_by_nickname
SELECT * FROM user_logs
WHERE performed_by_nickname = 'Hades_Manarskiy'
ORDER BY created_at DESC;

-- 4. Поиск по времени (последние 5 минут от текущего времени)
SELECT * FROM user_logs
WHERE created_at > NOW() - INTERVAL '5 minutes'
ORDER BY created_at DESC;

-- 5. Общее количество записей
SELECT COUNT(*) as total_logs FROM user_logs;

-- 6. Последние 10 записей
SELECT id, action, target_user_nickname, performed_by_nickname, created_at
FROM user_logs
ORDER BY created_at DESC
LIMIT 10;

-- 7. Поиск по части никнейма
SELECT * FROM user_logs
WHERE target_user_nickname ILIKE '%debug%'
ORDER BY created_at DESC;

-- 8. Проверка что таблица доступна
SELECT table_name FROM information_schema.tables WHERE table_name = 'user_logs';

-- 9. Проверка прав доступа
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'user_logs';
