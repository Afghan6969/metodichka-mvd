import { Radio } from "lucide-react"

export function ReportsPage() {
  return (
    <div className="flex-1 p-8 overflow-auto bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Radio className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-sans font-bold text-primary">Доклады в рацию</h1>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-card-foreground mb-2">ℹ️ Важная информация о тегах:</h3>
          <ul className="text-card-foreground space-y-1 text-sm">
            <li>
              • В тегах <code className="bg-muted px-1 rounded">/r</code> указывайте свою должность, например:{" "}
              <code className="bg-muted px-1 rounded">[МБ]</code>, <code className="bg-muted px-1 rounded">[ОМОН]</code>
              , <code className="bg-muted px-1 rounded">[СОБР]</code>
            </li>
            <li>
              • В тегах <code className="bg-muted px-1 rounded">/ro</code> и{" "}
              <code className="bg-muted px-1 rounded">/d</code> указывайте свой город, например:{" "}
              <code className="bg-muted px-1 rounded">[ГИБДД-М]</code>,{" "}
              <code className="bg-muted px-1 rounded">[ГУВД-М]</code>
            </li>
            <li>
              • <strong>Теги в рацию /r - не обязательны</strong>, но рекомендуются для лучшей координации
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
              📋 Примеры использования
            </h2>
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <h3 className="font-medium text-primary mb-2">Пример 1: Заступление на смену (Мотобат)</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <span>/r [МБ] Заступил на смену.</span>
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <h3 className="font-medium text-primary mb-2">Пример 2: Патрулирование (ОМОН)</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <span>/r [ОМОН] Выехал в патруль города | Экипаж: 1.</span>
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <h3 className="font-medium text-primary mb-2">Пример 3: Обработка вызова</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <span>/ro [ГИБДД-М] 10-5 | Центральная площадь.</span>
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <h3 className="font-medium text-primary mb-2">Пример 4: Без тега (допустимо)</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <span>/r Заступил на смену.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Доклад при заступлении на смену:</h2>
            <div className="bg-muted p-4 rounded-md font-mono text-sm">
              <span>/r [ТЕГ] Заступил на смену.</span>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Доклад при покидании смены:</h2>
            <div className="bg-muted p-4 rounded-md font-mono text-sm">
              <span>/r [ТЕГ] Сдал смену.</span>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Доклады на посту КПП/Дежурная часть:</h2>
            <div className="space-y-2">
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Заступил на пост КПП/Дежурная часть.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Продолжаю стоять на посту КПП/Дежурная часть. Состояние: стабильное.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Покидаю пост КПП/Дежурная часть.</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Доклады при патрулировании города:</h2>
            <div className="space-y-2">
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Выехал в патруль города | Экипаж: 1.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Продолжаю патрулирование города | Состояние: стабильное | Экипаж: 1.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Завершаю патрулирование города | Состояние: стабильное | Экипаж: 1.</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Доклады на автомобильном посту:</h2>
            <div className="space-y-2">
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Заступил на пост | *Название поста* | Экипаж: 1.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Пост | *Название поста* | Состояние: стабильное. | Экипаж: 1.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Покидаю пост | *Название поста* | Экипаж: 1.</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Доклады при пешем патрулировании города:</h2>
            <div className="space-y-2">
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Вышел в пеший патруль города.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Продолжаю пеший патруль города | Состояние: стабильное.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Завершил пеший патруль города.</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibent text-primary mb-4">Доклады при обработке вызова:</h2>
            <div className="space-y-2">
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/ro [ТЕГ] 10-5 | *место вызова*.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/ro [ТЕГ] 10-6 | *место вызова* | Ложный/Обработан.</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Доклады при воздушном патрулировании:</h2>
            <div className="space-y-2">
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Вылетел в воздушный патруль города | Экипаж: 1.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Воздушный патруль города | Состояние: стабильное | Экипаж: 1.</span>
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <span>/r [ТЕГ] Завершил воздушный патруль города | Экипаж: 1.</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">План перехват (ООП/ООН):</h2>
            <div className="bg-muted p-4 rounded-md font-mono text-sm">
              <span>/ro [ТЕГ] Объявляю план "Перехват" ООП/ООН. По базе данных: *Имя_Фамилия преступника*</span>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Доклад при принятии плана перехвата:</h2>
            <div className="bg-muted p-4 rounded-md font-mono text-sm">
              <span>/ro [ТЕГ] Принято! Выезжаем на подмогу.</span>
            </div>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Пробитие номера при запросе ГУВД:</h2>
            <div className="bg-muted p-4 rounded-md font-mono text-sm">
              <span>
                /ro [ТЕГ] - [ТЕГ] Автомобиль с номерами *номер* принадлежит гражданину с номером паспорта *ID игрока*
                *Имя Фамилия*.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
