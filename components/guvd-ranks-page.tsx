import { Card } from "@/components/ui/card"

export function GuvdRanksPage() {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-green-600 mb-8 border-b-2 border-green-200 pb-4">Звания и ранги ГУВД</h1>

        <Card className="p-6 mb-6 border-l-4 border-l-green-400">
          <div className="flex items-start gap-3">
            <span className="text-green-500 text-lg">⭐</span>
            <div className="w-full">
              <h2 className="text-xl font-semibold text-green-600 mb-4">Система званий ГУВД:</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Руководящий состав:</h3>
                  <div className="text-gray-700 leading-relaxed space-y-1 font-mono text-sm bg-gray-50 p-4 rounded">
                    <p>Начальник ГУВД (генерал полиции) [11/11] - [Нач. ГУВД]</p>
                    <p>Первый заместитель начальника ГУВД (полковник полиции) [10/11] - [Первый Зам. Нач. ГУВД]</p>
                    <p>
                      Заместитель начальника ГУВД, ответственный за спец. подразделения (полковник полиции) [10/11] -
                      [Зам. Нач. ГУВД отв. за СП]
                    </p>
                    <p>
                      Заместитель начальника ГУВД || Начальник отдела кадров (полковник полиции) [10/11] - [Зам. Нач.
                      ГУВД || Нач. ОК]
                    </p>
                    <p>
                      Заместитель начальника ГУВД || Начальник тыла (полковник полиции) [10/11] - [Зам. Нач. ГУВД ||
                      Нач. тыла]
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Старший состав:</h3>
                  <div className="text-gray-700 leading-relaxed space-y-1 font-mono text-sm bg-gray-50 p-4 rounded">
                    <p>Начальник отряда мобильного особого назначения (подполковник полиции) [9/11] - [Нач. ОМОН]</p>
                    <p>Начальник патрульно-постовой службы (подполковник полиции) [9/11] - [Нач. ППС]</p>
                    <p>Начальник полицейской академии (подполковник полиции) - [9/11] - [Нач. ПА]</p>
                    <p>Начальник отдела воздушного патрулирования (подполковник полиции) - [9/11] - [Нач. ОВП]</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Отдел воздушного патрулирования:</h3>
                  <div className="text-gray-700 leading-relaxed space-y-1 font-mono text-sm bg-gray-50 p-4 rounded">
                    <p>Сотрудник ОВП (лейтенант-майор полиции) [5-8/11] - [ОВП]</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Отряд мобильный особого назначения:</h3>
                  <div className="text-gray-700 leading-relaxed space-y-1 font-mono text-sm bg-gray-50 p-4 rounded">
                    <p>Боец ОМОН (лейтенант-капитан полиции) [5-7/11] - [ОМОН]</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Патрульно-постовая служба:</h3>
                  <div className="text-gray-700 leading-relaxed space-y-1 font-mono text-sm bg-gray-50 p-4 rounded">
                    <p>Старший инспектор ППС (ст. лейтенант-капитан полиции) [6-7/11] - [Ст. Инсп. ППС]</p>
                    <p>Инспектор ППС (лейтенант полиции) [5/11] - [Инсп. ППС]</p>
                    <p>Младший инспектор ППС (старшина-прапорщик полиции) [3-4/11] - [Мл. Инсп. ППС]</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Полицейская академия:</h3>
                  <div className="text-gray-700 leading-relaxed space-y-1 font-mono text-sm bg-gray-50 p-4 rounded">
                    <p>Курсант ПА (рядовой-сержант полиции) [1-2/11] - [ПА]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
