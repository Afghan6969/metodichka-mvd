import { PasswordProtected } from "./password-protected"

export function ClassifiedSection() {
  return (
    <PasswordProtected
      password="mvd2024"
      title="Секретный раздел"
      description="Доступ только для уполномоченных сотрудников"
    >
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">🔒</span>
            </div>
            <h1 className="text-3xl font-bold text-red-700">Секретные материалы</h1>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-700 mb-4">⚠️ Конфиденциальная информация</h2>
              <p className="text-red-600 mb-4">
                Данный раздел содержит служебную информацию, доступ к которой ограничен.
              </p>

              <div className="bg-white rounded-lg p-4 border border-red-100">
                <h3 className="font-medium text-red-600 mb-2">Специальные коды операций:</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="bg-gray-100 p-2 rounded">Код "Альфа" - Особо важная персона</div>
                  <div className="bg-gray-100 p-2 rounded">Код "Браво" - Террористическая угроза</div>
                  <div className="bg-gray-100 p-2 rounded">Код "Чарли" - Массовые беспорядки</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PasswordProtected>
  )
}
