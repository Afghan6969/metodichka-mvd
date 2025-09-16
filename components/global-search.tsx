"use client"

import type React from "react"

import { useState, useMemo } from "react"
import {
  Search,
  X,
  GraduationCap,
  Target,
  Radio,
  Star,
  Book,
  Car,
  Shield,
  Calculator,
  Keyboard,
  Scale,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SearchResult {
  id: string
  title: string
  content: string
  type:
    | "lecture"
    | "training"
    | "report"
    | "rank"
    | "command"
    | "term"
    | "vehicle"
    | "ammunition"
    | "test"
    | "calculator"
    | "bind"
    | "position"
  icon: React.ComponentType<any>
  page: string
}

interface GlobalSearchProps {
  onResultClick: (page: string) => void
  isOpen: boolean
  onClose: () => void
}

export function GlobalSearch({ onResultClick, isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("")

  const searchData: SearchResult[] = [
    // Лекции
    {
      id: "lecture1",
      title: "Лекция 1. Задержание",
      content: "Задержание подозреваемых полиция защищает право кратковременное ограничение свободы арест наручники",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },
    {
      id: "lecture2",
      title: "Лекция 2. Права сотрудников полиции",
      content: "Права полномочия полицейские служебные обязанности законные требования остановка проверка документов",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },
    {
      id: "lecture3",
      title: "Лекция 3. Обязанности сотрудников полиции",
      content: "Обязанности полиция работает закон ответственность служебный долг защита граждан порядок",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },
    {
      id: "lecture4",
      title: "Лекция 4. Применение физ. силы и огнестрельного оружия",
      content: "Физическая сила спецсредства огнестрельное оружие применение необходимая оборона дубинка тазер",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },
    {
      id: "lecture5",
      title: "Лекция 5. Запреты сотрудников полиции",
      content: "Запреты служебное положение взятки нецензурная брань коррупция этика поведение",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },

    // Тренировки
    {
      id: "training1",
      title: "Тренировка Отжимания",
      content: "Отжимания 30 раз физическая подготовка упражнения сила выносливость",
      type: "training",
      icon: Target,
      page: "training",
    },
    {
      id: "training2",
      title: "Тренировка Планка",
      content: "Планка 2 минуты выносливость статическое упражнение пресс корпус",
      type: "training",
      icon: Target,
      page: "training",
    },
    {
      id: "training3",
      title: "Тренировка Приседания",
      content: "Приседания 30 раз ноги мышцы бедра физподготовка",
      type: "training",
      icon: Target,
      page: "training",
    },
    {
      id: "training4",
      title: "Тренировка Бег",
      content: "Бег 4 круга кардио выносливость стадион физическая форма",
      type: "training",
      icon: Target,
      page: "training",
    },
    {
      id: "training5",
      title: "Тренировка Стрельба в тире",
      content: "Стрельба тир бутылки Невский точность меткость оружие пистолет",
      type: "training",
      icon: Target,
      page: "training",
    },

    // Доклады
    {
      id: "report1",
      title: "Заступление на смену",
      content: "Заступил на смену рация доклад дежурство патруль экипаж",
      type: "report",
      icon: Radio,
      page: "reports",
    },
    {
      id: "report2",
      title: "Патрулирование города",
      content: "Патруль города экипаж состояние стабильное безопасность порядок",
      type: "report",
      icon: Radio,
      page: "reports",
    },
    {
      id: "report3",
      title: "Обработка вызова",
      content: "10-5 10-6 место вызова обработан происшествие нарушение",
      type: "report",
      icon: Radio,
      page: "reports",
    },

    // Звания
    {
      id: "rank1",
      title: "Рядовой полиции",
      content: "Рядовой полиции младшее звание начальная ступень новичок",
      type: "rank",
      icon: Star,
      page: "positions",
    },
    {
      id: "rank2",
      title: "Старший лейтенант полиции",
      content: "Старший лейтенант полиции офицерское звание младший офицерский состав",
      type: "rank",
      icon: Star,
      page: "positions",
    },
    {
      id: "rank3",
      title: "Капитан полиции",
      content: "Капитан полиции средний офицерский состав руководящая должность",
      type: "rank",
      icon: Star,
      page: "positions",
    },
    {
      id: "rank4",
      title: "Майор полиции",
      content: "Майор полиции старший офицерский состав высокое звание",
      type: "rank",
      icon: Star,
      page: "positions",
    },

    // Бинды
    {
      id: "bind1",
      title: "Бинды ГИБДД",
      content: "ГИБДД бинды команды дорожная полиция безопасность движения отыгровка roleplay",
      type: "bind",
      icon: Keyboard,
      page: "gibdd-binds",
    },
    {
      id: "bind2",
      title: "Бинды ГУВД",
      content: "ГУВД бинды команды управление внутренних дел общественная безопасность отыгровка roleplay",
      type: "bind",
      icon: Keyboard,
      page: "guvd-binds",
    },

    // Тесты
    {
      id: "test1",
      title: "Тесты по УК",
      content: "Уголовный кодекс тест экзамен знания законодательство преступления наказания",
      type: "test",
      icon: Scale,
      page: "tests",
    },
    {
      id: "test2",
      title: "Тесты по КоАП",
      content: "КоАП административные правонарушения тест экзамен штрафы нарушения ПДД",
      type: "test",
      icon: Scale,
      page: "tests",
    },

    // Калькулятор штрафов
    {
      id: "calculator1",
      title: "Калькулятор штрафов",
      content: "Калькулятор штрафы расчет нарушения ПДД административные правонарушения сумма",
      type: "calculator",
      icon: Calculator,
      page: "penalty-calculator",
    },

    // Должности
    {
      id: "position1",
      title: "Должности ГУВД",
      content: "ГУВД должности звания структура иерархия полиция управление внутренних дел",
      type: "position",
      icon: Star,
      page: "guvd-positions",
    },
    {
      id: "position2",
      title: "Должности полиции",
      content: "Полиция должности звания структура иерархия служба правопорядок",
      type: "position",
      icon: Star,
      page: "positions",
    },

    // Автопарк ГУВД
    {
      id: "vehicle1",
      title: "Автопарк ГУВД Приволжск",
      content:
        "Lada Priora Chevrolet Cruze УАЗ Патриот Toyota Camry Audi Q7 S8 Land Cruiser ПАЗ ГАЗель ОМОН СОБР Maverick автомобили транспорт",
      type: "vehicle",
      icon: Car,
      page: "guvd-vehicles",
    },
    {
      id: "vehicle2",
      title: "Автопарк ГУВД Мирный",
      content:
        "Lada Priora Volkswagen Polo УАЗ Патриот Audi A3 Q7 S8 Land Cruiser ПАЗ ГАЗель ОМОН СОБР Maverick автомобили транспорт",
      type: "vehicle",
      icon: Car,
      page: "guvd-vehicles",
    },
    {
      id: "vehicle3",
      title: "Автопарк ГУВД Невский",
      content:
        "Lada Priora Kia Rio УАЗ Патриот Lexus IS 350 Audi Q7 S8 Land Cruiser ПАЗ ГАЗель ОМОН СОБР Maverick автомобили транспорт",
      type: "vehicle",
      icon: Car,
      page: "guvd-vehicles",
    },
    // Автопарк ГИБДД
    {
      id: "vehicle4",
      title: "Автопарк ГИБДД Приволжск",
      content:
        "Lada Vesta Skoda Octavia Volkswagen Touareg BMW M5 Mercedes E63 AMG Lexus LX570 ПАЗ BMW R1200 Мотобат Maverick автомобили мотоциклы",
      type: "vehicle",
      icon: Car,
      page: "gibdd-vehicles",
    },
    {
      id: "vehicle5",
      title: "Автопарк ГИБДД Мирный",
      content:
        "Lada Vesta Skoda Octavia Volkswagen Touareg Mercedes C63 AMG BMW M5 F90 Lexus LX570 ПАЗ BMW R1200 Мотобат Maverick автомобили мотоциклы",
      type: "vehicle",
      icon: Car,
      page: "gibdd-vehicles",
    },
    {
      id: "vehicle6",
      title: "Автопарк ГИБДД Невский",
      content:
        "Lada Vesta Skoda Octavia Volkswagen Touareg Kia Stinger Mercedes S AMG Lexus LX570 ПАЗ BMW R1200 Мотобат Maverick автомобили мотоциклы",
      type: "vehicle",
      icon: Car,
      page: "gibdd-vehicles",
    },

    // Аммуниция
    {
      id: "ammunition1",
      title: "Аммуниция полиции",
      content:
        "наручники дубинка бронежилет тазер пистолет МР-443 Грач дробовик МР-133 автомат АК-74М ОМОН СОБР экипировка снаряжение",
      type: "ammunition",
      icon: Shield,
      page: "ammunition",
    },
    {
      id: "ammunition2",
      title: "Табельное оружие по званиям",
      content: "старшина лейтенант пистолет дробовик автомат звание должность ОМОН СОБР тренировки оружие экипировка",
      type: "ammunition",
      icon: Shield,
      page: "ammunition",
    },

    // Термины
    {
      id: "term1",
      title: "ГИБДД",
      content: "Государственная инспекция безопасности дорожного движения ПДД нарушения штрафы",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term2",
      title: "Задержание",
      content: "Кратковременное ограничение свободы физического лица арест наручники",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term3",
      title: "Протокол",
      content: "Процессуальный документ административное правонарушение оформление нарушение",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term4",
      title: "КоАП",
      content: "Кодекс об административных правонарушениях штрафы нарушения административная ответственность",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term5",
      title: "УК",
      content: "Уголовный кодекс преступления наказания арест уголовная ответственность",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term6",
      title: "ГУВД",
      content: "Главное управление внутренних дел полиция правопорядок безопасность",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term7",
      title: "ОМОН",
      content: "Отряд мобильный особого назначения спецподразделение беспорядки",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term8",
      title: "СОБР",
      content: "Специальный отряд быстрого реагирования спецназ операции",
      type: "term",
      icon: Book,
      page: "terms",
    },
  ]

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []

    const searchTerm = query.toLowerCase().trim()
    const searchWords = searchTerm.split(/\s+/).filter((word) => word.length > 1)

    return searchData
      .map((item) => {
        const titleLower = item.title.toLowerCase()
        const contentLower = item.content.toLowerCase()
        const typeLower = item.type.toLowerCase()

        let score = 0

        // Exact title match gets highest score
        if (titleLower === searchTerm) {
          score += 200
        } else if (titleLower.includes(searchTerm)) {
          score += 150
        }

        // Title starts with search term
        if (titleLower.startsWith(searchTerm)) {
          score += 120
        }

        // Exact content match gets high score
        if (contentLower.includes(searchTerm)) {
          score += 80
        }

        // Type match
        if (typeLower.includes(searchTerm)) {
          score += 60
        }

        // Word matches with position bonus
        searchWords.forEach((word, index) => {
          const wordWeight = searchWords.length - index // Earlier words get more weight

          if (titleLower.includes(word)) {
            score += 40 * wordWeight
          }
          if (contentLower.includes(word)) {
            score += 20 * wordWeight
          }
          if (typeLower.includes(word)) {
            score += 30 * wordWeight
          }

          // Bonus for word at start of title or content
          if (titleLower.startsWith(word)) {
            score += 30 * wordWeight
          }
          if (contentLower.startsWith(word)) {
            score += 15 * wordWeight
          }
        })

        // Bonus for multiple word matches
        const titleMatches = searchWords.filter((word) => titleLower.includes(word)).length
        const contentMatches = searchWords.filter((word) => contentLower.includes(word)).length

        if (titleMatches > 1) {
          score += titleMatches * 25
        }
        if (contentMatches > 1) {
          score += contentMatches * 10
        }

        // Penalty for very long content (less relevant)
        if (item.content.length > 200) {
          score *= 0.9
        }

        return { ...item, score }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20) // увеличен лимит результатов до 20
  }, [query])

  const handleResultClick = (result: SearchResult) => {
    onResultClick(result.page)
    onClose()
    setQuery("")
  }

  const clearSearch = () => {
    setQuery("")
  }

  if (!isOpen) return null

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  const getTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      vehicle: "Автопарк",
      ammunition: "Аммуниция",
      lecture: "Лекция",
      training: "Тренировка",
      report: "Доклад",
      rank: "Звание",
      command: "Команда",
      term: "Термин",
      test: "Тест",
      calculator: "Калькулятор",
      bind: "Бинды",
      position: "Должность",
    }
    return typeLabels[type] || type
  }

  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      vehicle: "bg-blue-100 text-blue-800",
      ammunition: "bg-red-100 text-red-800",
      lecture: "bg-green-100 text-green-800",
      training: "bg-orange-100 text-orange-800",
      report: "bg-purple-100 text-purple-800",
      rank: "bg-yellow-100 text-yellow-800",
      command: "bg-gray-100 text-gray-800",
      term: "bg-primary/10 text-primary",
      test: "bg-indigo-100 text-indigo-800",
      calculator: "bg-emerald-100 text-emerald-800",
      bind: "bg-pink-100 text-pink-800",
      position: "bg-amber-100 text-amber-800",
    }
    return typeColors[type] || "bg-primary/10 text-primary"
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 modal-overlay"
      onKeyDown={handleKeyDown}
    >
      <Card className="w-full max-w-2xl mx-4 bg-background border-border shadow-xl modal-content">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Глобальный поиск по всем разделам..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base border-border focus:border-primary focus:ring-primary"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-muted btn-hover"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {query && (
            <div className="mb-3 text-sm text-muted-foreground">
              {filteredResults.length > 0 ? (
                <>Найдено результатов: {filteredResults.length}</>
              ) : (
                <>Результаты не найдены</>
              )}
            </div>
          )}

          {query && (
            <div className="max-h-96 overflow-y-auto">
              {filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border animate-fade-in list-item"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <result.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">{result.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{result.content}</p>
                          <span
                            className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${getTypeColor(result.type)}`}
                          >
                            {getTypeLabel(result.type)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Результаты не найдены по запросу "{query}"</p>
                  <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить поисковый запрос</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end mt-4 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} className="btn-hover bg-transparent">
              Закрыть
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
