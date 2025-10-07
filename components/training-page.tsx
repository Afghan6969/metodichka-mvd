import type React from "react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, ChevronDown, ChevronRight, Zap, Dumbbell, Search } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"

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

  const categoryLabels = {
    basic: "Базовые",
    advanced: "Продвинутые",
    special: "Специальные"
  }

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={Target}
        title="Тренировки МВД"
        description="Физическая подготовка согласно программе обучения"
        badge={`${filteredTrainings.length} тренировок`}
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
        <Input
          type="text"
          placeholder="Поиск по тренировкам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-base border-2 border-primary/30 rounded-xl bg-background/50 font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Trainings Grid */}
      <div className="space-y-4">
        {filteredTrainings.map((training) => (
          <div 
            key={training.id} 
            className="military-card"
          >
            <Collapsible open={openTrainings[training.id]} onOpenChange={() => toggleTraining(training.id)}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-6 hover:bg-primary/5 rounded-xl transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-xl flex items-center justify-center border-2 border-accent/50 shadow-lg shadow-accent/20">
                      {training.icon === Dumbbell ? (
                        <Dumbbell className="h-6 w-6 text-accent-foreground" />
                      ) : (
                        <Zap className="h-6 w-6 text-accent-foreground" />
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-lg font-black uppercase tracking-wide mb-1">{training.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-accent/40 text-accent font-semibold">
                          {categoryLabels[training.category]}
                        </Badge>
                        <Badge variant="outline" className="border-primary/40 text-primary font-semibold">
                          <Clock className="h-3 w-3 mr-1" />
                          {training.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {openTrainings[training.id] ? (
                    <ChevronDown className="h-6 w-6 text-primary" />
                  ) : (
                    <ChevronRight className="h-6 w-6 text-primary" />
                  )}
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="px-6 pb-6">
                  <div className="mt-4 bg-muted/30 p-6 rounded-xl border-2 border-primary/20">
                    <div className="space-y-2">
                      {training.content.map((line, index) => (
                        <div key={index} className="flex items-start gap-3 group hover:bg-primary/5 p-2 rounded-lg transition-colors">
                          <div className="flex-1 font-mono text-sm text-foreground leading-relaxed">{line}</div>
                          {line.trim().startsWith("say ") && (
                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <CopyButton text={line.trim()} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {training.note && (
                      <div className="mt-4 p-4 bg-accent/10 border-2 border-accent/30 rounded-xl">
                        <p className="text-sm font-semibold">
                          <span className="text-accent font-black uppercase">Уточнение:</span> {training.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>

      {filteredTrainings.length === 0 && searchQuery && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-muted-foreground mb-2">Тренировки не найдены</p>
          <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
        </div>
      )}
    </div>
  )
}
