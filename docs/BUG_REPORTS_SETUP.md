# Установка системы Bug Reports

## Быстрый старт

### Шаг 1: Выполнить SQL миграцию

Откройте Supabase Dashboard → SQL Editor и выполните скрипт:

```bash
scripts/015_create_bug_reports.sql
```

Или скопируйте содержимое файла и вставьте в SQL Editor.

### Шаг 2: Проверить создание таблицы

Убедитесь, что таблица `bug_reports` создана:

```sql
SELECT * FROM bug_reports LIMIT 1;
```

### Шаг 3: Проверить RLS политики

Убедитесь, что политики безопасности активны:

```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'bug_reports';
```

Должны быть созданы 5 политик:
1. Users can view own bug reports
2. Users can create bug reports
3. Super admins can view all bug reports
4. Super admins can update bug reports
5. Super admins can delete bug reports

### Шаг 4: Проверить доступ

1. Войдите как пользователь с ролью `super-admin`
2. В боковом меню должен появиться пункт "Баг репорт"
3. Откройте страницу и проверьте функционал

## Проверка работоспособности

### Тест 1: Создание отчета

1. Нажмите "Создать отчет"
2. Заполните форму:
   - Тип: Баг
   - Заголовок: "Тестовый баг"
   - Описание: "Это тестовое описание бага"
3. Отправьте форму
4. Отчет должен появиться в списке

### Тест 2: Изменение статуса (Super-Admin)

1. Найдите созданный отчет
2. Измените статус на "В работе"
3. Статус должен обновиться

### Тест 3: Изменение приоритета (Super-Admin)

1. Найдите отчет
2. Измените приоритет на "Высокий"
3. Приоритет должен обновиться

### Тест 4: Фильтрация (Super-Admin)

1. Создайте несколько отчетов разных типов
2. Используйте фильтры по типу и статусу
3. Список должен обновляться согласно фильтрам

### Тест 5: Удаление (Super-Admin)

1. Найдите тестовый отчет
2. Нажмите кнопку удаления
3. Подтвердите удаление
4. Отчет должен исчезнуть из списка

## Устранение проблем

### Ошибка: "Unauthorized"

**Причина**: Пользователь не авторизован

**Решение**: Убедитесь, что пользователь вошел в систему

### Ошибка: "Forbidden: Super admin access required"

**Причина**: У пользователя нет роли super-admin

**Решение**: Проверьте роль пользователя в таблице `users`:

```sql
SELECT id, email, role FROM users WHERE email = 'your-email@example.com';
```

Если роль не `super-admin`, обновите её:

```sql
UPDATE users SET role = 'super-admin' WHERE email = 'your-email@example.com';
```

### Ошибка: "Failed to fetch bug reports"

**Причина**: Проблема с RLS политиками или таблицей

**Решение**: 
1. Проверьте, что таблица существует
2. Проверьте, что RLS включен: `ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;`
3. Пересоздайте политики из скрипта миграции

### Пункт "Баг репорт" не отображается в меню

**Причина**: Роль пользователя не `super-admin`

**Решение**: Проверьте и обновите роль пользователя (см. выше)

## Дополнительные настройки

### Изменение минимальной длины полей

В файле `app/api/bug-reports/route.ts` измените значения:

```typescript
if (title.trim().length < 5) {  // Измените 5 на нужное значение
  return NextResponse.json({ error: 'Title must be at least 5 characters' }, { status: 400 });
}

if (description.trim().length < 10) {  // Измените 10 на нужное значение
  return NextResponse.json({ error: 'Description must be at least 10 characters' }, { status: 400 });
}
```

### Добавление уведомлений

Для отправки уведомлений super-admin при создании нового отчета, добавьте webhook или триггер в Supabase.

### Экспорт отчетов

Для экспорта отчетов в CSV/Excel можно добавить соответствующий функционал в компонент `BugReportsPage`.

## Обслуживание

### Очистка старых решенных отчетов

```sql
-- Удалить отчеты, решенные более 6 месяцев назад
DELETE FROM bug_reports 
WHERE status = 'resolved' 
AND resolved_at < NOW() - INTERVAL '6 months';
```

### Статистика по отчетам

```sql
-- Общая статистика
SELECT 
  type,
  status,
  COUNT(*) as count
FROM bug_reports
GROUP BY type, status
ORDER BY type, status;
```

### Самые активные пользователи

```sql
-- Топ-10 пользователей по количеству отчетов
SELECT 
  u.full_name,
  u.email,
  COUNT(br.id) as report_count
FROM bug_reports br
JOIN users u ON u.id = br.user_id
GROUP BY u.id, u.full_name, u.email
ORDER BY report_count DESC
LIMIT 10;
```
