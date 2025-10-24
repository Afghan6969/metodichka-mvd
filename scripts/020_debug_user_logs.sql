-- Отладка таблицы user_logs
-- Дата: 2025-10-25
-- Цель: Найти почему логи не видны в Table Editor

-- 1. Проверяем общее количество записей
SELECT 
    COUNT(*) as total_logs,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '1 hour' THEN 1 END) as logs_last_hour,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '1 day' THEN 1 END) as logs_last_day
FROM user_logs;

-- 2. Показываем последние 20 записей (без фильтров)
SELECT 
    id,
    action,
    target_user_nickname,
    performed_by_nickname,
    created_at,
    ip_address,
    LENGTH(details) as details_length
FROM user_logs 
ORDER BY created_at DESC 
LIMIT 20;

-- 3. Ищем конкретно логи для Test_Test
SELECT 
    id,
    action,
    target_user_nickname,
    performed_by_nickname,
    details,
    created_at,
    ip_address
FROM user_logs 
WHERE target_user_nickname ILIKE '%Test%'
ORDER BY created_at DESC;

-- 4. Проверяем логи за последние 10 минут
SELECT 
    id,
    action,
    target_user_nickname,
    performed_by_nickname,
    created_at,
    NOW() as current_time,
    NOW() - created_at as time_ago
FROM user_logs 
WHERE created_at > NOW() - INTERVAL '10 minutes'
ORDER BY created_at DESC;

-- 5. Проверяем статистику по действиям
SELECT 
    action,
    COUNT(*) as count,
    MAX(created_at) as last_occurrence
FROM user_logs 
GROUP BY action
ORDER BY count DESC;

-- 6. Проверяем есть ли записи с NULL значениями
SELECT 
    COUNT(*) as total,
    COUNT(CASE WHEN target_user_nickname IS NULL THEN 1 END) as null_nickname,
    COUNT(CASE WHEN performed_by_nickname IS NULL THEN 1 END) as null_performer,
    COUNT(CASE WHEN created_at IS NULL THEN 1 END) as null_created_at
FROM user_logs;

-- 7. Проверяем права доступа к таблице
SELECT 
    grantee,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'user_logs';

-- 8. Проверяем индексы
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'user_logs';

-- 9. Проверяем размер таблицы
SELECT 
    pg_size_pretty(pg_total_relation_size('user_logs')) as total_size,
    pg_size_pretty(pg_relation_size('user_logs')) as table_size,
    pg_size_pretty(pg_indexes_size('user_logs')) as indexes_size;

-- 10. Самый важный - проверяем что запись РЕАЛЬНО есть
-- Ищем по времени (последние 5 минут) и никнейму
SELECT 
    *
FROM user_logs 
WHERE created_at > NOW() - INTERVAL '5 minutes'
    AND (target_user_nickname ILIKE '%Test%' OR performed_by_nickname ILIKE '%Test%')
ORDER BY created_at DESC;
