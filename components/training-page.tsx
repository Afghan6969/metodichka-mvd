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
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
            <Search className="h-4 w-4 text-blue-300" />
          </div>
        </div>
        <Input
          type="text"
          placeholder="Поиск по тренировкам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-base border-2 border-blue-400/30 rounded-xl bg-white/5 backdrop-blur-sm font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder:text-blue-300/60"
        />
      </div>

      {/* Trainings Grid */}
      <div className="space-y-4">
        {filteredTrainings.map((training) => (
          <div
            key={training.id}
            className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden"
          >
            <Collapsible open={openTrainings[training.id]} onOpenChange={() => toggleTraining(training.id)}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/80 to-blue-600/60 rounded-2xl flex items-center justify-center border border-blue-400/30 shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                      {training.icon === Dumbbell ? (
                        <Dumbbell className="h-6 w-6 text-white" />
                      ) : (
                        <Zap className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-lg font-bold uppercase tracking-wide mb-2 text-white group-hover:text-blue-200 transition-colors">{training.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-blue-400/40 text-blue-300 font-semibold bg-blue-500/10">
                          {categoryLabels[training.category]}
                        </Badge>
                        <Badge variant="outline" className="border-blue-400/40 text-blue-300 font-semibold bg-blue-500/10">
                          <Clock className="h-3 w-3 mr-1" />
                          {training.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-blue-300/80 font-medium">
                    {training.content.length} {training.content.length % 10 === 1 && training.content.length % 100 !== 11
  ? 'команда'
  : training.content.length % 10 >= 2 && training.content.length % 10 <= 4 && (training.content.length % 100 < 10 || training.content.length % 100 >= 20)
  ? 'команды'
  : 'команд'}                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30 group-hover:bg-blue-500/30 transition-colors">
                      {openTrainings[training.id] ? (
                        <ChevronDown className="h-5 w-5 text-blue-300" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-blue-300" />
                      )}
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6">
                  <div className="mt-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="space-y-2">
                      {training.content.map((line, index) => (
                        <div key={index} className="flex items-start gap-3 group hover:bg-white/5 p-2 rounded-lg transition-colors">
                          <div className="flex-1 font-mono text-sm text-blue-100/90 leading-relaxed">{line}</div>
                          {line.trim().startsWith("say ") && (
                            <div className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                              <CopyButton text={line.trim()} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {training.note && (
                      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl">
                        <p className="text-sm font-semibold">
                          <span className="text-blue-300 font-black uppercase">Уточнение:</span> {training.note}
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
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Search className="h-10 w-10 text-blue-300" />
          </div>
          <p className="text-xl font-bold text-white mb-2">Тренировки не найдены</p>
          <p className="text-blue-200/80">Попробуйте изменить поисковый запрос</p>
        </div>
      )}
    </div>
  )
}
