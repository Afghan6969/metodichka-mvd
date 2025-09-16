import { Card } from "@/components/ui/card"

export function GuvdCommandsPage() {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-green-600 mb-8 border-b-2 border-green-200 pb-4">Команды ГУВД</h1>

        <Card className="p-6 mb-6 border-l-4 border-l-green-400">
          <div className="flex items-start gap-3">
            <span className="text-green-500 text-lg">💻</span>
            <div className="w-full">
              <h2 className="text-xl font-semibold text-green-600 mb-4">Команды для ГУВД:</h2>
              <div className="text-gray-700 leading-relaxed space-y-2 font-mono text-sm bg-gray-50 p-4 rounded">
                <p>Специальные команды для подразделений ГУВД будут добавлены в ближайшее время.</p>
                <p>Включает команды для ОМОН, ППС, ОВП и других подразделений.</p>
                <p>Каждое подразделение имеет свой набор специализированных команд.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
