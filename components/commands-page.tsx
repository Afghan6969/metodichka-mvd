export function CommandsPage() {
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Команды</h1>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Рации ГИБДД:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/r [text]</code>
                <span className="text-gray-600">Рация ГИБДД</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/rb [text]</code>
                <span className="text-gray-600">NonRP чат рации ГИБДД</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Рации ГУВД:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/r [text]</code>
                <span className="text-gray-600">Рация ГУВД</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/rb [text]</code>
                <span className="text-gray-600">NonRP чат рации ГУВД</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Общие рации:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/ro [text]</code>
                <span className="text-gray-600">Общий чат сотрудников ГУВД и ГИБДД</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/rob [text]</code>
                <span className="text-gray-600">Общий NonRP ГУВД и ГИБДД</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/d [Text]</code>
                <span className="text-gray-600">Рация между всеми фракциями (7+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/db [Text]</code>
                <span className="text-gray-600">NonRP рация между всеми фракциями (7+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/fracvoice [0/1]</code>
                <span className="text-gray-600">Выключить / Включить фракционную голосовую рацию</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Информационные команды:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/find</code>
                <span className="text-gray-600">Список игроков во фракции онлайн</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/wanted</code>
                <span className="text-gray-600">Выводит список всех игроков онлайн которые находятся в розыске</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/fines</code>
                <span className="text-gray-600">Cписок игроков, имеющих штрафы</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/crimrec [ID]</code>
                <span className="text-gray-600">Показывает совершенные преступления игрока</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/paytime</code>
                <span className="text-gray-600">Время до начисления зарплаты</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">Клавиша Ю</code>
                <span className="text-gray-600">Список сотрудников фракции (9+)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Команды задержания:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/cuff [ID]</code>
                <span className="text-gray-600">Надевает на преступника наручники (игрок должен быть в розыске)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/uncuff [ID]</code>
                <span className="text-gray-600">Снимает наручники с преступника</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/putpl [ID]</code>
                <span className="text-gray-600">Посадить преступника в машину</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/arr [ID]</code>
                <span className="text-gray-600">Конвоировать преступника за собой</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/dearr [ID]</code>
                <span className="text-gray-600">Перестать конвоировать преступника за собой</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/arrest [ID]</code>
                <span className="text-gray-600">
                  Посадить игрока в КПЗ (Необходимо находиться на заднем дворе полиции, преступник должен быть в розыске
                  и наручниках)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Административные команды:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/su [ID] [Уровень розыска 1-3] [Причина]</code>
                <span className="text-gray-600">Подать игрока в розыск (2+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/tsu [ID] [сумма штрафа] [Причина]</code>
                <span className="text-gray-600">Выдать игроку штраф (3+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/clear [ID]</code>
                <span className="text-gray-600">Убрать розыск с преступника (3+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/jailbreak [ID]</code>
                <span className="text-gray-600">Выпустить заключенного из КПЗ (8+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/giverank [ID] [Номер ранга]</code>
                <span className="text-gray-600">Изменить ранг (9-10 ранги могут повышать до 8 ранг) (9+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/invite [ID]</code>
                <span className="text-gray-600">Принять во фракцию (10+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/uninvite [ID]</code>
                <span className="text-gray-600">Уволить из фракции (9+)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Специальные команды ГИБДД:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/takecarlic [ID] [Срок 1-4]</code>
                <span className="text-gray-600">Отобрать права на определенный срок (3+)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/givecarlic [ID]</code>
                <span className="text-gray-600">Обнуляет срок отсутствия возможности получить права (9+)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Команды высшего руководства:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-200">
                <code className="font-mono text-sm">/gov</code>
                <span className="text-gray-600">Написать государственные новости (10+)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Анимации:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <code className="font-mono text-sm">/animarmy [1-9]</code>
                <span className="text-gray-600">Вызов анимации</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Список анимаций:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                <div>1. Отжимания</div>
                <div>2. Приседания</div>
                <div>3. Воинское приветствие</div>
                <div>4. Стойка смирно</div>
                <div>5. Строевой шаг</div>
                <div>6. Поворот кругом</div>
                <div>7. Поворот налево</div>
                <div>8. Поворот направо</div>
                <div>9. Упражнение "полтора"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
