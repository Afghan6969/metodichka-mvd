-- Удаление проблемного VIEW user_logs_with_rollback_info
-- Дата: 2025-10-25
-- Причина: VIEW может конфликтовать с запросами к таблице users и не используется в коде

-- Удаляем VIEW если он существует
DROP VIEW IF EXISTS user_logs_with_rollback_info CASCADE;

-- Комментарий
COMMENT ON TABLE user_logs IS 'Журнал всех действий с пользователями. VIEW user_logs_with_rollback_info удален из-за конфликтов с запросами.';

-- Функция can_rollback_action остается, так как она может быть полезна
-- Если нужно получить информацию об откатах, можно использовать прямые запросы к user_logs
