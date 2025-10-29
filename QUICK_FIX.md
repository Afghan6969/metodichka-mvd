# Быстрое исправление generator-page.tsx

## Текущая проблема

В файле `generator-page.tsx` есть конфликты импортов - локальные константы конфликтуют с импортированными из модулей.

## Быстрое решение

Удалите из `generator-page.tsx` строки **24-285** (все константы и функции склонения).

### Что нужно удалить:

```typescript
// УДАЛИТЬ ВСЁ ОТ СТРОКИ 24 ДО 285:

interface Position {
  title: string
  rank: string
  level: string
}

interface DepartmentPositions {
  [key: string]: Position[]
}

const guvdPositions: DepartmentPositions = { ... }
const gibddPositions: DepartmentPositions = { ... }
const rankHierarchy = [ ... ]
const seniorCategories = [ ... ]
const academyCategories = [ ... ]
const cities = [ ... ]
const departmentAbbreviations: { ... } = { ... }
const declensionRules: Record<...> = { ... }
const departmentDeclension = { ... }
const declinePosition = (...) => { ... }
const toGenitiveCase = (...) => { ... }
const declineLeaderName = (...) => { ... }
const declineRussianLastName = (...) => { ... }
const declineRussianFirstName = (...) => { ... }
const declineRussianMiddleName = (...) => { ... }
const toInstrumentalCase = (...) => { ... }
```

### Что оставить:

Строка 287 и далее - начало компонента:
```typescript
export function GeneratorPage() {
  const { currentUser, hasAccess } = useAuth()
  // ... остальной код
```

## После удаления

Файл автоматически будет использовать импортированные модули из строк 17-22:

```typescript
import { CitySelect, LeaderFioInput, FioInput, DateRangeInputs, RequirementsList, LeaderReportFields } from "./generator/form-fields"
import { guvdPositions, gibddPositions, seniorCategories, academyCategories } from "./generator/constants"
import { parseRanks, getNextRank } from "./generator/utils"
import { generateReport } from "./generator/report-templates"
import { Requirement, ReportType, Department } from "./generator/types"
```

## Команда для быстрого удаления (PowerShell)

```powershell
# Создать резервную копию (уже сделано)
# Теперь нужно вручную удалить строки 24-285 в редакторе
```

## Проверка после исправления

1. Файл должен компилироваться без ошибок
2. Все импорты должны работать
3. Генератор должен запускаться

## Дополнительные изменения для лидерского отчёта

После исправления конфликтов, добавьте:

### 1. Новые поля состояния (после строки ~50 в компоненте):

```typescript
// Leader report specific fields
const [targetFio, setTargetFio] = useState("")
const [disciplinaryViolation, setDisciplinaryViolation] = useState("")
const [disciplinaryPunishment, setDisciplinaryPunishment] = useState("")
const [disciplinaryStatus, setDisciplinaryStatus] = useState("")
```

### 2. Обновить типы (строки ~25-27):

```typescript
const [department, setDepartment] = useState<Department | null>(null)
const [reportType, setReportType] = useState<ReportType | null>(null)
const [requirements, setRequirements] = useState<Requirement[]>([{ req: "", quantity: "", link: "" }])
```

### 3. Добавить "leader" в getAvailableReportTypes:

```typescript
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
```

### 4. Добавить кнопку лидерского отчёта (после кнопки "Отчёт старшего состава"):

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

### 5. Обновить форму для лидерского отчёта:

В разделе формы добавить условие:

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
  // Существующая форма для других типов отчётов
  <>
    <CitySelect ... />
    {department === "ГУВД" && <LeaderFioInput ... />}
    <FioInput ... />
    // ... остальные поля
  </>
)}
```

### 6. Обновить isFormValid:

```typescript
const isFormValid = useCallback(() => {
  if (reportType === "leader") {
    return fio.trim() !== "" && 
           targetFio.trim() !== "" && 
           disciplinaryViolation.trim() !== "" && 
           disciplinaryPunishment.trim() !== "" && 
           disciplinaryStatus.trim() !== ""
  }
  
  // Существующая валидация для других типов
  const requiredFields = [city, fio, position, rank, signature]
  // ...
}, [
  city, leaderFio, fio, position, rank, signature,
  fromDate, toDate, points, violation, paymentLink,
  onlineStats, requirements, department, reportType,
  targetFio, disciplinaryViolation, disciplinaryPunishment, disciplinaryStatus,
])
```

### 7. Заменить функцию generateReport на handleGenerateReport:

Найти функцию `generateReport` (большую функцию с шаблонами) и заменить на:

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

И обновить кнопку генерации:

```typescript
<Button onClick={handleGenerateReport} disabled={!isFormValid()} ...>
  Сгенерировать отчёт
</Button>
```

## Итог

После всех изменений:
- ✅ Файл уменьшится с 1540 до ~1300 строк
- ✅ Код станет модульным
- ✅ Добавлен новый тип отчёта "Лидерский"
- ✅ Все функции работают через импорты
