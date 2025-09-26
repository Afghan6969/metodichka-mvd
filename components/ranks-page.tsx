export function RanksPage() {
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Звания и ранги</h1>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Младший Состав:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">1 ранг</span>
                <span className="text-gray-700">Рядовой</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">2 ранг</span>
                <span className="text-gray-700">Сержант</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">3 ранг</span>
                <span className="text-gray-700">Старшина</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">4 ранг</span>
                <span className="text-gray-700">Прапорщик</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">5 ранг</span>
                <span className="text-gray-700">Лейтенант</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">Средний Состав:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">6 ранг</span>
                <span className="text-gray-700">Ст. Лейтенант</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">7 ранг</span>
                <span className="text-gray-700">Капитан</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-orange-600 mb-6">Старший Состав:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">8 ранг</span>
                <span className="text-gray-700">Майор</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">9 ранг</span>
                <span className="text-gray-700">Подполковник</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-6">Руководящий Состав:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">10 ранг</span>
                <span className="text-gray-700">Полковник</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">11 ранг</span>
                <span className="text-gray-700">Генерал</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
