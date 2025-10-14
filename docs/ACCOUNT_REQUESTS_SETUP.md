# Быстрая установка системы запросов на создание аккаунта

## Шаг 1: Выполните SQL миграцию

1. Откройте Supabase Dashboard
2. Перейдите в SQL Editor
3. Откройте файл `scripts/008_create_account_requests_table.sql`
4. Скопируйте весь SQL код
5. Вставьте в SQL Editor и нажмите "Run"

## Шаг 2: Проверьте создание таблиц

Выполните следующий запрос для проверки:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('account_requests', 'request_rate_limits');
```

Должны появиться обе таблицы.

## Шаг 3: Проверьте функции и триггеры

```sql
-- Проверка функций
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('check_rate_limit', 'auto_create_user_from_request');

-- Проверка триггера
SELECT tgname 
FROM pg_trigger 
WHERE tgname = 'trigger_auto_create_user_from_request';
```

## Шаг 4: Добавьте ссылки в навигацию (опционально)

Если вы хотите добавить ссылки на новые страницы в навигацию, отредактируйте соответствующий компонент навигации:

### Для игроков (публичная ссылка):
```tsx
<Link href="/account-request">
  Запрос на аккаунт
</Link>
```

### Для админов (только для Лидеров ПГС и ГС):
```tsx
{(user?.role === "Лидер ПГС" || user?.role === "ГС") && (
  <Link href="/admin/account-requests">
    Запросы на аккаунты
  </Link>
)}
```

## Шаг 5: Тестирование

### Тест 1: Отправка запроса
1. Откройте `/account-request`
2. Заполните форму
3. Решите CAPTCHA
4. Отправьте запрос
5. Проверьте, что запрос появился в базе данных:
   ```sql
   SELECT * FROM account_requests ORDER BY created_at DESC LIMIT 1;
   ```

### Тест 2: Просмотр запросов (как лидер)
1. Войдите как пользователь с ролью "Лидер ПГС" или "ГС"
2. Откройте `/admin/account-requests`
3. Проверьте, что запросы отображаются

### Тест 3: Одобрение запроса
1. В админ-панели нажмите "Одобрить" на любом запросе
2. Добавьте комментарий (опционально)
3. Подтвердите действие
4. Проверьте, что пользователь создан:
   ```sql
   SELECT * FROM users ORDER BY created_at DESC LIMIT 1;
   ```

### Тест 4: Защита от спама
1. Отправьте 3 запроса подряд с одного IP
2. Попробуйте отправить 4-й запрос
3. Должна появиться ошибка "Превышен лимит запросов"

## Шаг 6: Настройка (опционально)

### Изменение лимита запросов

Отредактируйте функцию в SQL Editor:

```sql
CREATE OR REPLACE FUNCTION check_rate_limit(p_ip_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_record RECORD;
  v_time_window INTERVAL := '24 hours';  -- Измените здесь
  v_max_requests INTEGER := 3;           -- Измените здесь
BEGIN
  -- ... остальной код
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Добавление новых ролей/фракций

Отредактируйте `components/account-request-form.tsx`:

```tsx
<SelectContent>
  <SelectItem value="ГУВД">ГУВД</SelectItem>
  <SelectItem value="ГИБДД">ГИБДД</SelectItem>
  <SelectItem value="ПГС">ПГС</SelectItem>
  <SelectItem value="Новичок">Новичок</SelectItem>
  <SelectItem value="Другое">Другое</SelectItem>
  {/* Добавьте свои роли здесь */}
</SelectContent>
```

## Готово! 🎉

Система запросов на создание аккаунта установлена и готова к использованию.

## Полезные SQL запросы

### Просмотр всех запросов
```sql
SELECT 
  ar.*,
  u.nickname as reviewer_nickname
FROM account_requests ar
LEFT JOIN users u ON ar.reviewed_by = u.id
ORDER BY ar.created_at DESC;
```

### Статистика по запросам
```sql
SELECT 
  status,
  COUNT(*) as count
FROM account_requests
GROUP BY status;
```

### Топ IP адресов по количеству запросов
```sql
SELECT 
  ip_address,
  COUNT(*) as request_count
FROM account_requests
GROUP BY ip_address
ORDER BY request_count DESC
LIMIT 10;
```

### Очистка rate limits (для разблокировки IP)
```sql
-- Для конкретного IP
DELETE FROM request_rate_limits WHERE ip_address = 'xxx.xxx.xxx.xxx';

-- Для всех истекших блокировок
DELETE FROM request_rate_limits 
WHERE blocked_until IS NOT NULL AND blocked_until < now();
```

### Ручное создание пользователя из запроса
```sql
-- Если автоматическое создание не сработало
INSERT INTO users (nickname, login, password_hash, role, created_by)
SELECT nickname, login, password_hash, role, reviewed_by
FROM account_requests
WHERE id = 'REQUEST_ID_HERE';
```

## Troubleshooting

### Проблема: Триггер не создает пользователя

**Решение**: Проверьте логи Supabase и убедитесь, что у функции есть права:

```sql
-- Пересоздайте функцию с правильными правами
CREATE OR REPLACE FUNCTION auto_create_user_from_request()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status = 'pending' THEN
    INSERT INTO users (nickname, login, password_hash, role, created_by)
    VALUES (NEW.nickname, NEW.login, NEW.password_hash, NEW.role, NEW.reviewed_by);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Проблема: RLS блокирует запросы

**Решение**: Проверьте политики RLS:

```sql
-- Просмотр всех политик
SELECT * FROM pg_policies WHERE tablename = 'account_requests';

-- Если нужно, отключите RLS временно для отладки
ALTER TABLE account_requests DISABLE ROW LEVEL SECURITY;

-- Не забудьте включить обратно!
ALTER TABLE account_requests ENABLE ROW LEVEL SECURITY;
```

### Проблема: CAPTCHA не загружается

**Решение**: Проверьте, что API route работает:

```bash
curl http://localhost:3000/api/account-requests/generate-captcha
```

Должен вернуть JSON с вопросом и токеном.

## Дополнительная информация

Полная документация доступна в файле `docs/ACCOUNT_REQUESTS.md`.
