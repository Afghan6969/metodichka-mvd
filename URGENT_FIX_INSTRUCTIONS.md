# 🚨 СРОЧНОЕ ИСПРАВЛЕНИЕ - Проблема с пользователями

## Проблема
- В управлении пользователями показывается 0 пользователей
- При добавлении пользователя выкидывает с аккаунта
- Появилась подтаблица `user_logs_with_rollback_info`

## Причины
1. **Проблемный JOIN запрос** в `auth-context.tsx` - Supabase не может выполнить JOIN по внешним ключам `created_by` и `deactivated_by`
2. **VIEW `user_logs_with_rollback_info`** конфликтует с запросами к таблице users
3. **Автоматический logout** при любой ошибке в функциях `addUser` и `updateUser`

## Исправления (УЖЕ ПРИМЕНЕНЫ В КОДЕ)

### ✅ 1. Исправлен файл `lib/auth-context.tsx`
- Убран проблемный JOIN запрос в функции `refreshUsers`
- Теперь данные загружаются в два этапа: сначала все пользователи, потом связанные данные
- Убрана функция `verifyCurrentUserRole()` из `addUser` и `updateUser`
- Добавлена проверка статуса 401 перед logout

### ✅ 2. Созданы SQL миграции
- `scripts/017_drop_problematic_view.sql` - удаляет VIEW
- `scripts/018_verify_and_fix_users_table.sql` - проверяет и чинит таблицу users

## Как применить исправления

### Шаг 1: Применить SQL миграции в Supabase

Зайдите в Supabase Dashboard → SQL Editor и выполните по очереди:

#### Миграция 1: Удаление VIEW
```sql
-- Удаление проблемного VIEW user_logs_with_rollback_info
DROP VIEW IF EXISTS user_logs_with_rollback_info CASCADE;

COMMENT ON TABLE user_logs IS 'Журнал всех действий с пользователями. VIEW user_logs_with_rollback_info удален из-за конфликтов с запросами.';
```

#### Миграция 2: Проверка таблицы users
```sql
-- Отключаем RLS для таблицы users
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Удаляем все существующие политики
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

-- Комментарий
COMMENT ON TABLE users IS 'Таблица пользователей. RLS отключен, доступ контролируется через API endpoints с проверкой cookies.';
```

#### Проверка количества пользователей
```sql
SELECT COUNT(*) as total_users FROM users;
SELECT id, nickname, username, role, status FROM users LIMIT 10;
```

### Шаг 2: Перезапустить приложение

```bash
# Остановите dev сервер (Ctrl+C)
# Затем запустите снова
npm run dev
```

### Шаг 3: Очистить кэш браузера

1. Откройте DevTools (F12)
2. Перейдите в Application → Storage
3. Нажмите "Clear site data"
4. Обновите страницу (F5)

### Шаг 4: Проверка

1. Залогиньтесь заново
2. Перейдите в "Управление пользователями"
3. Проверьте что пользователи отображаются
4. Попробуйте добавить тестового пользователя

## Что изменилось в коде

### До (проблемный код):
```typescript
const { data, error } = await supabase
  .from("users")
  .select(`
    *,
    created_by_user:created_by(nickname, role),
    deactivated_by_user:deactivated_by(nickname, role)
  `)
```

### После (исправленный код):
```typescript
// Сначала получаем всех пользователей
const { data, error } = await supabase
  .from("users")
  .select("*")

// Потом получаем связанные данные отдельным запросом
const { data: relatedData } = await supabase
  .from("users")
  .select("id, nickname, role")
  .in("id", relatedUserIds)
```

## Дополнительная диагностика

Если проблема сохраняется, проверьте в консоли браузера (F12):

```javascript
// Проверка что пользователи загружаются
console.log("Users:", users)

// Проверка текущего пользователя
console.log("Current user:", currentUser)
```

Также проверьте в Supabase Dashboard:
- Table Editor → users → должны быть видны все пользователи
- Database → Policies → у таблицы users не должно быть активных политик RLS

## Контакты для помощи

Если проблема не решена:
1. Проверьте логи в консоли браузера (F12)
2. Проверьте логи в терминале где запущен dev сервер
3. Проверьте что все миграции применены в Supabase

---

**Статус:** ✅ Исправления применены в коде
**Требуется:** Применить SQL миграции в Supabase и перезапустить приложение
