# 🎯 Оптимизация страницы "Приказы в ДО"

## Проблема:
1000+ строк кода в файле `orders-page.tsx` вызывают лаги.

## Решение:
Добавить пагинацию - показывать только 10-15 приказов за раз вместо всех 60+.

---

## ✅ Что нужно добавить:

### 1. В начало компонента (после существующих useState):

```typescript
// Пагинация для оптимизации
const [currentPage, setCurrentPage] = useState<number>(1)
const ITEMS_PER_PAGE = 10
```

### 2. После `filteredOrders` добавить:

```typescript
// Пагинация - показываем только 10 приказов за раз
const paginatedOrders = useMemo(() => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  return filteredOrders.slice(startIndex, endIndex)
}, [filteredOrders, currentPage])

const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)

// Сброс на первую страницу при изменении фильтров
useEffect(() => {
  setCurrentPage(1)
}, [selectedCategory, debouncedSearchQuery])
```

### 3. Заменить в рендере:

**Было:**
```typescript
{filteredOrders.map((order) => (
```

**Стало:**
```typescript
{paginatedOrders.map((order) => (
```

### 4. Добавить кнопки пагинации после списка приказов:

```typescript
{/* Пагинация */}
{totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 mt-8">
    <Button
      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
      disabled={currentPage === 1}
      className="bg-white/10 hover:bg-white/15 text-white"
    >
      Назад
    </Button>
    
    <div className="flex gap-2">
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
        const page = i + 1
        return (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page 
              ? 'bg-blue-500/30 border-2 border-blue-400' 
              : 'bg-white/10'
            }
          >
            {page}
          </Button>
        )
      })}
    </div>
    
    <Button
      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
      disabled={currentPage === totalPages}
      className="bg-white/10 hover:bg-white/15 text-white"
    >
      Вперёд
    </Button>
  </div>
)}

{/* Инфо */}
{filteredOrders.length > ITEMS_PER_PAGE && (
  <div className="text-center text-sm text-white/60 mt-4">
    Показано {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} из {filteredOrders.length}
  </div>
)}
```

---

## 📊 Результат:

### До:
- Рендерится 60+ приказов одновременно
- 1000+ строк кода
- Лаги при скролле

### После:
- Рендерится только 10 приказов
- Плавный скролл
- Быстрая навигация

---

## 💡 Альтернатива (если не хочется менять код):

Можно просто увеличить `ITEMS_PER_PAGE` до 15-20, если 10 слишком мало.

---

## 🚀 Инструкция:

1. Откройте `components/orders-page.tsx`
2. Найдите строку `const [editingOrder, setEditingOrder] = useState<Order | null>(null)`
3. Добавьте после неё:
```typescript
const [currentPage, setCurrentPage] = useState<number>(1)
const ITEMS_PER_PAGE = 10
```

4. Найдите `const filteredOrders = useMemo(...)`
5. Добавьте после него код пагинации из пункта 2

6. Найдите `{filteredOrders.map((order) => (`
7. Замените на `{paginatedOrders.map((order) => (`

8. Добавьте кнопки пагинации перед `{filteredOrders.length === 0 && (`

Готово! Теперь будет показываться только 10 приказов за раз.
