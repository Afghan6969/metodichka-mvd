"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Target } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { SearchBar } from "@/components/search-bar"

export function TrainingPage() {
  const [openTrainings, setOpenTrainings] = useState<{ [key: string]: boolean }>({})
  const [searchQuery, setSearchQuery] = useState("")

  const toggleTraining = (trainingId: string) => {
    setOpenTrainings((prev) => ({
      ...prev,
      [trainingId]: !prev[trainingId],
    }))
  }

  const trainings = [
    {
      id: "pushups",
      title: 'Тренировка "Отжимания"',
      icon: "💪",
      content: [
        'say Тренировка "Отжимания" 30 раз! Приступили к выполнению!',
        'say На этом тренировка "Отжимания" закончена.',
      ],
    },
    {
      id: "plank",
      title: 'Тренировка "Планка"',
      icon: "🏋️",
      content: ['say Тренировка "Планка" 2 минуты! Начинаем!', 'say На этом тренировка "Планка" закончена.'],
    },
    {
      id: "squats",
      title: 'Тренировка "Приседания"',
      icon: "🦵",
      content: ['say Тренировка "Приседания" 30 раз! Приступаем!', 'say На этом тренировка "Приседания" закончена.'],
    },
    {
      id: "running",
      title: 'Тренировка "Бег"',
      icon: "🏃",
      content: ['say Тренировка "Бег" 4 круга! Вперёд!', 'say На этом тренировка "Бег" закончена.'],
    },
    {
      id: "obstacles",
      title: 'Тренировка "Прыжки через препятствия"',
      icon: "🏃‍♂️",
      content: [
        'say Тренировка "Прыжки через препятствия " 10 раз! В работу!',
        'say На этом тренировка "Прыжки через препятствия " закончена.',
      ],
      note: "перед началом тренировки устанавливаются заборы и всяческие препятствия.",
    },
    {
      id: "parachute",
      title: 'Тренировка "Прыжки с парашютом"',
      icon: "🪂",
      content: [
        'say Тренировка "Прыжки с парашютом" 1 раз! Приступаем!',
        'say На этом тренировка "Прыжки с парашютом" закончена.',
      ],
      note: "перед прыжком купить парашют в городе Мирный и совершить прыжок в поле.",
    },
    {
      id: "punching",
      title: 'Тренировка "Удары по груше"',
      icon: "🥊",
      content: [
        'say Тренировка "Удары по груше" 2 минуты! Начинаем!',
        'say На этом тренировка "Удары по груше" закончена.',
      ],
      note: "выполняется в спортзале г. Мирный.",
    },
    {
      id: "noparachute",
      title: 'Тренировка "Прыжки без парашюта"',
      icon: "🌊",
      content: [
        'say Тренировка "Прыжки без парашюта" 1 раз! Вперёд!',
        'say На этом тренировка "Прыжки без парашюта " закончена.',
      ],
      note: "запрещено выполнять во время зимы. Прыжки совершаются по аналогии с прыжками с парашютом, но в воду.",
    },
    {
      id: "shooting",
      title: 'Тренировка "Стрельба в тире"',
      icon: "🎯",
      content: [
        'say Тренировка "Стрельба в тире" 2 раза! Приступаем!',
        'say На этом тренировка "Стрельба в тире " закончена.',
      ],
      note: "стрельба по бутылкам в тире в городе Невском.",
    },
    {
      id: "runobstacles",
      title: 'Тренировка "Бег через препятствия"',
      icon: "🏃‍♀️",
      content: [
        'say Тренировка "Бег через препятствия" 2 раза! В работу!',
        'say На этом тренировка "Бег через препятствия" закончена.',
      ],
      note: "выставить заборы/барьеры для создания препятствий по прямой в ограниченной зоне.",
    },
    {
      id: "swimming",
      title: 'Тренировка "Заплыв"',
      icon: "🏊",
      content: ['say Тренировка "Заплыв" 2 раза! Начинаем!', 'say На этом тренировка "Заплыв" закончена.'],
      note: "выполняется в бассейне в городе Приволжск.",
    },
    {
      id: "maneuvers",
      title: 'Тренировка "Спец. Манёвры"',
      icon: "🚗",
      content: [
        'say Тренировка "Спец. Манёвры" 2 минуты! Вперёд!',
        'say На этом тренировка "Спец. Манёвры" закончена.',
      ],
      note: "выполняется на треке либо на тест-драйве автомобилей в городе Приволжск.",
    },
  ]

  const filteredTrainings = trainings.filter(
    (training) =>
      training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.content.some((line) => line.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (training.note && training.note.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Изменил цвета заголовка на оранжевые */}
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-8 w-8 text-orange-600" />
          <h1 className="text-3xl font-bold text-orange-700">Тренировки</h1>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={setSearchQuery} placeholder="Поиск тренировок..." />
        </div>

        {/* Изменил цвета информационного блока на оранжевые */}
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-800 font-medium">Примерное время на проведение каждой из тренировок - 1 минута.</p>
        </div>

        <div className="space-y-4">
          {filteredTrainings.map((training) => (
            <Card key={training.id} className="bg-white border border-gray-200 shadow-sm">
              <Collapsible open={openTrainings[training.id]} onOpenChange={() => toggleTraining(training.id)}>
                <CollapsibleTrigger className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Изменил цвет иконки на оранжевый */}
                      <span className="text-orange-600 text-lg">{training.icon}</span>
                      <h2 className="text-xl font-semibold text-orange-700">{training.title}</h2>
                    </div>
                    {openTrainings[training.id] ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      {training.content.map((line, index) => (
                        <div key={index} className="flex items-start gap-2 mb-2 last:mb-0">
                          <div className="flex-1 font-mono text-sm text-gray-700">{line}</div>
                          {line.trim().startsWith("say ") && (
                            <CopyButton text={line.trim()} className="flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      ))}
                    </div>
                    {training.note && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                          <strong>Уточнение:</strong> {training.note}
                        </p>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {filteredTrainings.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500">Тренировки не найдены по запросу "{searchQuery}"</p>
          </div>
        )}

        {/* Изменил цвета финального блока на зеленые */}
        <Card className="p-6 mb-6 mt-6 bg-emerald-50 border border-emerald-200 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-emerald-600 text-lg">✅</span>
            <div className="w-full">
              <div className="flex items-start gap-2">
                <div className="flex-1 font-mono text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border">
                  say На этом наши тренировки подошли к концу!
                </div>
                <CopyButton text="say На этом наши тренировки подошли к концу!" className="flex-shrink-0 mt-4" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
