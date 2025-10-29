# Руководство по миграции generator-page.tsx

## Проблема
Файл `generator-page.tsx` слишком большой (1540 строк, 79KB) и требует рефакторинга.

## Решение
Код разбит на модульные компоненты в папке `components/generator/`:

### Созданные модули:

1. **types.ts** - типы данных
2. **constants.ts** - константы (должности, звания, города)
3. **utils.ts** - утилиты склонения
4. **report-templates.ts** - генерация отчётов
5. **form-fields.tsx** - компоненты формы

## Инструкция по миграции

### Шаг 1: Удалить старые константы и функции

Из `generator-page.tsx` нужно удалить (строки 24-285):

- `interface Position` и `interface DepartmentPositions`
- `const guvdPositions`
- `const gibddPositions`
- `const rankHierarchy`
- `const seniorCategories`
- `const academyCategories`
- `const cities`
- `const departmentAbbreviations`
- `const declensionRules`
- `const departmentDeclension`
- `const declinePosition`
- `const toGenitiveCase`
- `const declineLeaderName`
- `const declineRussianLastName`
- `const declineRussianFirstName`
- `const declineRussianMiddleName`
- `const toInstrumentalCase`

### Шаг 2: Обновить импорты

Уже добавлено в строках 17-22:
```typescript
import { CitySelect, LeaderFioInput, FioInput, DateRangeInputs, RequirementsList, LeaderReportFields } from "./generator/form-fields"
import { guvdPositions, gibddPositions, seniorCategories, academyCategories } from "./generator/constants"
import { parseRanks, getNextRank } from "./generator/utils"
import { generateReport } from "./generator/report-templates"
import { Requirement, ReportType, Department } from "./generator/types"
```

### Шаг 3: Обновить типы состояния

Изменить строку 290:
```typescript
// Было:
const [reportType, setReportType] = useState<"promotion" | "reprimand" | "senior" | null>(null)

// Стало:
const [reportType, setReportType] = useState<ReportType | null>(null)
```

Изменить строку 289:
```typescript
// Было:
const [department, setDepartment] = useState<"ГУВД" | "ГИБДД" | null>(null)

// Стало:
const [department, setDepartment] = useState<Department | null>(null)
```

Изменить строку 300:
```typescript
// Было:
const [requirements, setRequirements] = useState<{ req: string; quantity?: string; link: string }[]>([...])

// Стало:
const [requirements, setRequirements] = useState<Requirement[]>([...])
```

### Шаг 4: Добавить новые поля состояния для лидерского отчёта

После строки 315 добавить:
```typescript
// Leader report specific fields
const [targetFio, setTargetFio] = useState("")
const [disciplinaryViolation, setDisciplinaryViolation] = useState("")
const [disciplinaryPunishment, setDisciplinaryPunishment] = useState("")
const [disciplinaryStatus, setDisciplinaryStatus] = useState("")
```

### Шаг 5: Обновить функцию `parseRanks`

Удалить локальную функцию `parseRanks` (строки 519-530) - она теперь импортируется из `utils.ts`

### Шаг 6: Обновить функцию `getNextRank`

Удалить локальную функцию `getNextRank` (строки 563-569) - она теперь импортируется из `utils.ts`

### Шаг 7: Обновить функцию `generateReport`

Заменить всю функцию `generateReport` (строки 606-794) на:

```typescript
const handleGenerateReport = () => {
  if (!isFormValid()) {
    toast.error("Пожалуйста, заполните все обязательные поля!")
    return
  }

  if (!department) {
    toast.error("Выберите департамент!")
    return
  }

  if (!reportType) {
    toast.error("Выберите тип отчёта!")
    return
  }

  const report = generateReport({
    city,
    leaderFio,
    fio,
    position,
    rank,
    newRank,
    fromDate,
    toDate,
    requirements,
    points,
    violation,
    paymentLink,
    onlineStats,
    signature,
    isVrio,
    selectedCategory,
    department,
    reportType,
    targetFio,
    disciplinaryViolation,
    disciplinaryPunishment,
    disciplinaryStatus,
  })

  setGeneratedReport(report)
}
```

### Шаг 8: Обновить функцию `getAvailableReportTypes`

В функции `getAvailableReportTypes` (строки 826-847) добавить "leader" в массив для лидеров:

```typescript
const getAvailableReportTypes = () => {
  if (!currentUser) return []
  if (
    currentUser.role === "root" ||
    currentUser.role === "super-admin" ||
    currentUser.role === "gs-gibdd" ||
    currentUser.role === "gs-guvd" ||
    currentUser.role === "pgs-gibdd" ||
    currentUser.role === "pgs-guvd" ||
    currentUser.role === "leader-gibdd" ||
    currentUser.role === "leader-guvd"
  ) {
    return ["promotion", "reprimand", "senior", "leader"]  // Добавлен "leader"
  }
  // ... остальное без изменений
}
```

### Шаг 9: Добавить кнопку "Лидерский отчёт"

После кнопки "Отчёт старшего состава" (после строки 961) добавить:

```typescript
{availableReportTypes.includes("leader") && (
  <Button
    onClick={() => setReportType("leader")}
    variant={reportType === "leader" ? "default" : "outline"}
    className={cn(
      "w-60 transition-all duration-300 ease-in-out transform hover:scale-105",
      reportType === "leader" ? "bg-primary hover:bg-primary/90 shadow-lg" : "border-2 hover:bg-muted",
    )}
  >
    Лидерский отчёт
  </Button>
)}
```

### Шаг 10: Обновить форму для лидерского отчёта

В разделе формы (после строки 973) добавить условие для лидерского отчёта:

```typescript
{reportType === "leader" ? (
  <>
    <FioInput fio={fio} setFio={setFio} label="Ваше ФИО (лидер)" placeholder="Хэйдес Манарский" />
    <LeaderReportFields
      targetFio={targetFio}
      setTargetFio={setTargetFio}
      disciplinaryViolation={disciplinaryViolation}
      setDisciplinaryViolation={setDisciplinaryViolation}
      disciplinaryPunishment={disciplinaryPunishment}
      setDisciplinaryPunishment={setDisciplinaryPunishment}
      disciplinaryStatus={disciplinaryStatus}
      setDisciplinaryStatus={setDisciplinaryStatus}
    />
  </>
) : (
  // ... существующая форма
)}
```

### Шаг 11: Обновить валидацию формы

В функции `isFormValid` добавить проверку для лидерского отчёта:

```typescript
const isFormValid = useCallback(() => {
  if (reportType === "leader") {
    return fio.trim() !== "" && 
           targetFio.trim() !== "" && 
           disciplinaryViolation.trim() !== "" && 
           disciplinaryPunishment.trim() !== "" && 
           disciplinaryStatus.trim() !== ""
  }
  
  // ... остальная валидация
}, [
  // ... добавить новые зависимости:
  targetFio,
  disciplinaryViolation,
  disciplinaryPunishment,
  disciplinaryStatus,
])
```

### Шаг 12: Обновить функции сохранения/загрузки черновика

Добавить новые поля в `saveDraft` и `loadDraft`:

```typescript
const draft = {
  // ... существующие поля
  targetFio,
  disciplinaryViolation,
  disciplinaryPunishment,
  disciplinaryStatus,
}
```

## Альтернативный подход (рекомендуется)

Из-за сложности файла рекомендуется:

1. Переименовать текущий `generator-page.tsx` в `generator-page-old.tsx`
2. Создать новый `generator-page.tsx` с нуля, используя модульные компоненты
3. Постепенно переносить функциональность, тестируя каждый шаг
4. После полного переноса удалить старый файл

## Тестирование

После миграции проверить:

1. ✅ Все 4 типа отчётов генерируются корректно
2. ✅ Склонения ФИО и должностей работают
3. ✅ Сохранение/загрузка черновиков
4. ✅ Валидация полей формы
5. ✅ Права доступа по ролям
6. ✅ Копирование отчёта в буфер обмена

## Преимущества после миграции

- Файл уменьшится с 1540 до ~800 строк
- Код станет модульным и переиспользуемым
- Легче добавлять новые типы отчётов
- Проще тестировать отдельные компоненты
- Улучшенная читаемость кода
