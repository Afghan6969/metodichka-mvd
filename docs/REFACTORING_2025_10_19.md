# Реорганизация структуры проекта (19.10.2025)

## Цель
Улучшение структуры проекта путём группировки связанных компонентов в тематические папки.

## Выполненные изменения

### 1. Создание новых папок
- `components/gibdd/` - компоненты ГИБДД
- `components/guvd/` - компоненты ГУВД

### 2. ГИБДД компоненты (components/gibdd/)
Перемещены и переименованы:
- `positions-page.tsx` → `gibdd/positions-page.tsx` (ранее `positions-page.tsx`)
- `gibdd-binds-page.tsx` → `gibdd/binds-page.tsx`
- `gibdd-gov-wave-page.tsx` → `gibdd/gov-wave-page.tsx`
- `gibdd-vehicles-page.tsx` → `gibdd/vehicles-page.tsx`

### 3. ГУВД компоненты (components/guvd/)
Перемещены и переименованы:
- `guvd-positions-page.tsx` → `guvd/positions-page.tsx`
- `guvd-binds-page.tsx` → `guvd/binds-page.tsx`
- `guvd-gov-wave-page.tsx` → `guvd/gov-wave-page.tsx`
- `guvd-vehicles-page.tsx` → `guvd/vehicles-page.tsx`

### 4. User Management компоненты
Перемещены в `components/user-management/`:
- `account-request-form.tsx`
- `account-requests-admin.tsx`
- `login-modal.tsx` (модальное окно аутентификации)
- `user-management-page.tsx` (страница управления пользователями)

### 5. Обновлённые импорты
Файлы с обновлёнными импортами:
- `app/page.tsx`
- `app/account-request/page.tsx`
- `app/admin/account-requests/page.tsx`
- `components/modern-header.tsx`

### 6. Созданные index файлы
Для удобства импорта созданы:
- `components/gibdd/index.ts`
- `components/guvd/index.ts`
- Обновлён `components/user-management/index.ts`

## Новая структура импортов

### ГИБДД:
```typescript
import { PositionsPage } from "@/components/gibdd/positions-page"
import { GibddBindsPage } from "@/components/gibdd/binds-page"
import { GibddGovWavePage } from "@/components/gibdd/gov-wave-page"
import GibddVehiclesPage from "@/components/gibdd/vehicles-page"
```

### ГУВД:
```typescript
import { GuvdPositionsPage } from "@/components/guvd/positions-page"
import { GuvdBindsPage } from "@/components/guvd/binds-page"
import { GuvdGovWavePage } from "@/components/guvd/gov-wave-page"
import GuvdVehiclesPage from "@/components/guvd/vehicles-page"
```

### User Management:
```typescript
import { AccountRequestForm, AccountRequestsAdmin, LoginModal, UserManagementPage } from "@/components/user-management"
```

## Преимущества
- ✅ Логическая группировка компонентов по функциональности
- ✅ Улучшенная навигация по проекту
- ✅ Более чистая структура кода
- ✅ Упрощённое масштабирование
