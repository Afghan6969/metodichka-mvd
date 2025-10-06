
import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, ChevronDown, ChevronRight, Zap, Dumbbell } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { CopyButton } from "@/components/copy-button"
import { Footer } from "@/components/footer"

interface Training {
  id: string
  title: string
  icon: React.ComponentType<any>
  duration: string
  content: string[]
  note?: string
  category: "basic" | "advanced" | "special"
}

export function TrainingPage() {
  const [openTrainings, setOpenTrainings] = useState<{ [key: string]: boolean }>({})
  const [searchQuery, setSearchQuery] = useState("")

  const toggleTraining = (trainingId: string) => {
    setOpenTrainings((prev) => ({
      ...prev,
      [trainingId]: !prev[trainingId],
    }))
  }

  const trainings: Training[] = [
    {
      id: "pushups",
      title: 'Тренировка "Отжимания"',
      icon: Dumbbell,
      duration: "1 мин",
      category: "basic",
      content: [
        'say Тренировка "Отжимания" 30 раз! Приступили к выполнению!',
        'say На этом тренировка "Отжимания" закончена.',
      ],
    },
    {
      id: "plank",
      title: 'Тренировка "Планка"',
      icon: Dumbbell,
      duration: "2 мин",
      category: "basic",
      content: ['say Тренировка "Планка" 2 минуты! Начинаем!', 'say На этом тренировка "Планка" закончена.'],
    },
    {
      id: "squats",
      title: 'Тренировка "Приседания"',
      icon: Dumbbell,
      duration: "1 мин",
      category: "basic",
      content: ['say Тренировка "Приседания" 30 раз! Приступаем!', 'say На этом тренировка "Приседания" закончена.'],
    },
    {
      id: "running",
      title: 'Тренировка "Бег"',
      icon: Zap,
      duration: "4 круга",
      category: "advanced",
      content: ['say Тренировка "Бег" 4 круга! Вперёд!', 'say На этом тренировка "Бег" закончена.'],
    },
    {
      id: "obstacles",
      title: 'Тренировка "Прыжки через препятствия"',
      icon: Zap,
      duration: "10 раз",
      category: "advanced",
      content: [
        'say Тренировка "Прыжки через препятствия " 10 раз! В работу!',
        'say На этом тренировка "Прыжки через препятствия " закончена.',
      ],
      note: "перед началом тренировки устанавливаются заборы и всяческие препятствия.",
    },
    {
      id: "parachute",
      title: 'Тренировка "Прыжки с парашютом"',
      icon: Zap,
      duration: "1 прыжок",
      category: "special",
      content: [
        'say Тренировка "Прыжки с парашютом" 1 раз! Приступаем!',
        'say На этом тренировка "Прыжки с парашютом" закончена.',
      ],
      note: "перед прыжком купить парашют в городе Мирный и совершить прыжок в поле.",
    },
    {
      id: "punching",
      title: 'Тренировка "Удары по груше"',
      icon: Zap,
      duration: "2 мин",
      category: "special",
      content: [
        'say Тренировка "Удары по груше" 2 минуты! Начинаем!',
        'say На этом тренировка "Удары по груше" закончена.',
      ],
      note: "выполняется в спортзале г. Мирный.",
    },
    {
      id: "noparachute",
      title: 'Тренировка "Прыжки без парашюта"',
      icon: Zap,
      duration: "1 прыжок",
      category: "special",
      content: [
        'say Тренировка "Прыжки без парашюта" 1 раз! Вперёд!',
        'say На этом тренировка "Прыжки без парашюта " закончена.',
      ],
      note: "запрещено выполнять во время зимы. Прыжки совершаются по аналогии с прыжками с парашютом, но в воду.",
    },
    {
      id: "shooting",
      title: 'Тренировка "Стрельба в тире"',
      icon: Target,
      duration: "2 раза",
      category: "special",
      content: [
        'say Тренировка "Стрельба в тире" 2 раза! Приступаем!',
        'say На этом тренировка "Стрельба в тире " закончена.',
      ],
      note: "стрельба по бутылкам в тире в городе Невском.",
    },
    {
      id: "runobstacles",
      title: 'Тренировка "Бег через препятствия"',
      icon: Zap,
      duration: "2 раза",
      category: "advanced",
      content: [
        'say Тренировка "Бег через препятствия" 2 раза! В работу!',
        'say На этом тренировка "Бег через препятствия" закончена.',
      ],
      note: "выставить заборы/барьеры для создания препятствий по прямой в ограниченной зоне.",
    },
    {
      id: "swimming",
      title: 'Тренировка "Заплыв"',
      icon: Zap,
      duration: "2 раза",
      category: "advanced",
      content: ['say Тренировка "Заплыв" 2 раза! Начинаем!', 'say На этом тренировка "Заплыв" закончена.'],
      note: "выполняется в бассейне в городе Приволжск.",
    },
    {
      id: "maneuvers",
      title: 'Тренировка "Спец. Манёвры"',
      icon: Zap,
      duration: "2 мин",
      category: "special",
      content: [
        'say Тренировка "Спец. Манёвры" 2 минуты! Вперёд!',
        'say На этом тренировка "Спец. Манёвры" закончена.',
      ],
      note: "выполняется на треке либо на тест-драйве автомобилей в городе Приволжск.",
    },
  ]

  const getItemIcon = (IconComponent: React.ComponentType<any>) => {
    return <IconComponent className="h-5 w-5" />
  }

  const filteredTrainings = trainings.filter(
    (training) =>
      training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.content.some((line) => line.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (training.note && training.note.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <Target className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Тренировки сотрудников МВД</h1>
          <p className="text-muted-foreground">Физическая подготовка согласно программе обучения</p>
        </div>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={setSearchQuery} placeholder="Поиск тренировок..." />
      </div>

      {/* Все тренировки в одном списке */}
      <div className="space-y-4">
        {filteredTrainings.map((training) => (
          <Card key={training.id} className="border-border bg-card/50">
            <CardContent className="p-0">
              <div className="flex items-start gap-4 p-4">
                <div className="text-primary mt-1">{getItemIcon(training.icon)}</div>
                <div className="flex-1">
                  <Collapsible open={openTrainings[training.id]} onOpenChange={() => toggleTraining(training.id)}>
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground text-sm">{training.title}</h3>
                        </div>
                        {openTrainings[training.id] ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-3 bg-muted/50 p-4 rounded-lg border border-border">
                        {training.content.map((line, index) => (
                          <div key={index} className="flex items-start gap-2 mb-1 last:mb-0 group">
                            <div className="flex-1 font-mono text-sm text-foreground">{line}</div>
                            {line.trim().startsWith("say ") && (
                              <div className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <CopyButton text={line.trim()} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {training.note && (
                        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                          <p className="text-black-800 dark:text-black-200 text-sm">
                            <strong>Уточнение:</strong> {training.note}
                          </p>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Информационная карточка */}
      <Card className="border-border bg-card/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-foreground font-medium text-sm leading-relaxed">
                Примерное время на проведение каждой из тренировок - 1 минута.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Время может варьироваться в зависимости от сложности упражнения.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Завершающая карточка */}
      <Card className="border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✅</span>
            <div className="w-full">
              <div className="flex items-start gap-2">
                <div className="w-full relative group">
                  <div className="font-mono text-sm text-foreground bg-background p-4 rounded-lg border border-border">
                    say На этом наши тренировки подошли к концу!
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton text="say На этом наши тренировки подошли к концу!" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredTrainings.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Тренировки не найдены по запросу "{searchQuery}"</p>
        </div>
      )}
      <Footer />
    </div>
  )
}
