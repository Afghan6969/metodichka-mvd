"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Search, X, GraduationCap, Target, Radio, Star, Terminal, Book, Car, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SearchResult {
  id: string
  title: string
  content: string
  type: "lecture" | "training" | "report" | "rank" | "command" | "term" | "vehicle" | "ammunition"
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
      content: "Задержание подозреваемых полиция защищает право кратковременное ограничение свободы",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },
    {
      id: "lecture2",
      title: "Лекция 2. Права сотрудников полиции",
      content: "Права полномочия полицейские служебные обязанности законные требования",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },
    {
      id: "lecture3",
      title: "Лекция 3. Обязанности сотрудников полиции",
      content: "Обязанности полиция работает закон ответственность служебный долг",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },
    {
      id: "lecture4",
      title: "Лекция 4. Применение физ. силы и огнестрельного оружия",
      content: "Физическая сила спецсредства огнестрельное оружие применение необходимая оборона",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },
    {
      id: "lecture5",
      title: "Лекция 5. Запреты сотрудников полиции",
      content: "Запреты служебное положение взятки нецензурная брань коррупция",
      type: "lecture",
      icon: GraduationCap,
      page: "lectures",
    },

    // Тренировки
    {
      id: "training1",
      title: "Тренировка Отжимания",
      content: "Отжимания 30 раз физическая подготовка упражнения",
      type: "training",
      icon: Target,
      page: "training",
    },
    {
      id: "training2",
      title: "Тренировка Планка",
      content: "Планка 2 минуты выносливость статическое упражнение",
      type: "training",
      icon: Target,
      page: "training",
    },
    {
      id: "training3",
      title: "Тренировка Приседания",
      content: "Приседания 30 раз ноги мышцы бедра",
      type: "training",
      icon: Target,
      page: "training",
    },
    {
      id: "training4",
      title: "Тренировка Бег",
      content: "Бег 4 круга кардио выносливость",
      type: "training",
      icon: Target,
      page: "training",
    },
    {
      id: "training5",
      title: "Тренировка Стрельба в тире",
      content: "Стрельба тир бутылки Невский точность меткость",
      type: "training",
      icon: Target,
      page: "training",
    },

    // Доклады
    {
      id: "report1",
      title: "Заступление на смену",
      content: "Заступил на смену рация доклад дежурство",
      type: "report",
      icon: Radio,
      page: "reports",
    },
    {
      id: "report2",
      title: "Патрулирование города",
      content: "Патруль города экипаж состояние стабильное безопасность",
      type: "report",
      icon: Radio,
      page: "reports",
    },
    {
      id: "report3",
      title: "Обработка вызова",
      content: "10-5 10-6 место вызова обработан происшествие",
      type: "report",
      icon: Radio,
      page: "reports",
    },

    // Звания
    {
      id: "rank1",
      title: "Рядовой полиции",
      content: "Рядовой полиции младшее звание начальная ступень",
      type: "rank",
      icon: Star,
      page: "ranks",
    },
    {
      id: "rank2",
      title: "Старший лейтенант полиции",
      content: "Старший лейтенант полиции офицерское звание младший офицерский состав",
      type: "rank",
      icon: Star,
      page: "ranks",
    },
    {
      id: "rank3",
      title: "Капитан полиции",
      content: "Капитан полиции средний офицерский состав руководящая должность",
      type: "rank",
      icon: Star,
      page: "ranks",
    },

    // Команды
    {
      id: "command1",
      title: "Команды ГИБДД",
      content: "ГИБДД команды дорожная полиция безопасность движения",
      type: "command",
      icon: Terminal,
      page: "commands",
    },
    {
      id: "command2",
      title: "Команды ГУВД",
      content: "ГУВД команды управление внутренних дел общественная безопасность",
      type: "command",
      icon: Terminal,
      page: "commands",
    },

    // Автопарк ГУВД
    {
      id: "vehicle1",
      title: "Автопарк ГУВД Приволжск",
      content:
        "Lada Priora Chevrolet Cruze УАЗ Патриот Toyota Camry Audi Q7 S8 Land Cruiser ПАЗ ГАЗель ОМОН СОБР Maverick",
      type: "vehicle",
      icon: Car,
      page: "guvd-vehicles",
    },
    {
      id: "vehicle2",
      title: "Автопарк ГУВД Мирный",
      content: "Lada Priora Volkswagen Polo УАЗ Патриот Audi A3 Q7 S8 Land Cruiser ПАЗ ГАЗель ОМОН СОБР Maverick",
      type: "vehicle",
      icon: Car,
      page: "guvd-vehicles",
    },
    {
      id: "vehicle3",
      title: "Автопарк ГУВД Невский",
      content: "Lada Priora Kia Rio УАЗ Патриот Lexus IS 350 Audi Q7 S8 Land Cruiser ПАЗ ГАЗель ОМОН СОБР Maverick",
      type: "vehicle",
      icon: Car,
      page: "guvd-vehicles",
    },
    // Автопарк ГИБДД
    {
      id: "vehicle4",
      title: "Автопарк ГИБДД Приволжск",
      content:
        "Lada Vesta Skoda Octavia Volkswagen Touareg BMW M5 Mercedes E63 AMG Lexus LX570 ПАЗ BMW R1200 Мотобат Maverick",
      type: "vehicle",
      icon: Car,
      page: "gibdd-vehicles",
    },
    {
      id: "vehicle5",
      title: "Автопарк ГИБДД Мирный",
      content:
        "Lada Vesta Skoda Octavia Volkswagen Touareg Mercedes C63 AMG BMW M5 F90 Lexus LX570 ПАЗ BMW R1200 Мотобат Maverick",
      type: "vehicle",
      icon: Car,
      page: "gibdd-vehicles",
    },
    {
      id: "vehicle6",
      title: "Автопарк ГИБДД Невский",
      content:
        "Lada Vesta Skoda Octavia Volkswagen Touareg Kia Stinger Mercedes S AMG Lexus LX570 ПАЗ BMW R1200 Мотобат Maverick",
      type: "vehicle",
      icon: Car,
      page: "gibdd-vehicles",
    },

    {
      id: "ammunition1",
      title: "Аммуниция полиции",
      content: "наручники дубинка бронежилет тазер пистолет МР-443 Грач дробовик МР-133 автомат АК-74М ОМОН СОБР",
      type: "ammunition",
      icon: Shield,
      page: "ammunition",
    },
    {
      id: "ammunition2",
      title: "Табельное оружие по званиям",
      content: "старшина лейтенант пистолет дробовик автомат звание должность ОМОН СОБР тренировки",
      type: "ammunition",
      icon: Shield,
      page: "ammunition",
    },

    // Термины
    {
      id: "term1",
      title: "ГИБДД",
      content: "Государственная инспекция безопасности дорожного движения",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term2",
      title: "Задержание",
      content: "Кратковременное ограничение свободы физического лица",
      type: "term",
      icon: Book,
      page: "terms",
    },
    {
      id: "term3",
      title: "Протокол",
      content: "Процессуальный документ административное правонарушение",
      type: "term",
      icon: Book,
      page: "terms",
    },
  ]

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []

    const searchTerm = query.toLowerCase().trim()
    const searchWords = searchTerm.split(/\s+/).filter((word) => word.length > 0)

    return searchData
      .map((item) => {
        const titleLower = item.title.toLowerCase()
        const contentLower = item.content.toLowerCase()

        let score = 0

        // Exact title match gets highest score
        if (titleLower.includes(searchTerm)) {
          score += 100
        }

        // Exact content match gets high score
        if (contentLower.includes(searchTerm)) {
          score += 50
        }

        // Word matches in title
        searchWords.forEach((word) => {
          if (titleLower.includes(word)) {
            score += 20
          }
          if (contentLower.includes(word)) {
            score += 10
          }
        })

        // Bonus for type matches
        if (item.type.toLowerCase().includes(searchTerm)) {
          score += 30
        }

        return { ...item, score }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15) // Increased limit to 15 results
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

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20" onKeyDown={handleKeyDown}>
      <Card className="w-full max-w-2xl mx-4 bg-background border-border shadow-xl">
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
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {query && (
            <div className="max-h-96 overflow-y-auto">
              {filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
                    >
                      <div className="flex items-start gap-3">
                        <result.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">{result.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{result.content}</p>
                          <span
                            className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                              result.type === "vehicle"
                                ? "bg-blue-100 text-blue-800"
                                : result.type === "ammunition"
                                  ? "bg-red-100 text-red-800"
                                  : result.type === "lecture"
                                    ? "bg-green-100 text-green-800"
                                    : result.type === "training"
                                      ? "bg-orange-100 text-orange-800"
                                      : result.type === "report"
                                        ? "bg-purple-100 text-purple-800"
                                        : result.type === "rank"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : result.type === "command"
                                            ? "bg-gray-100 text-gray-800"
                                            : "bg-primary/10 text-primary"
                            }`}
                          >
                            {result.type === "vehicle"
                              ? "Автопарк"
                              : result.type === "ammunition"
                                ? "Аммуниция"
                                : result.type === "lecture"
                                  ? "Лекция"
                                  : result.type === "training"
                                    ? "Тренировка"
                                    : result.type === "report"
                                      ? "Доклад"
                                      : result.type === "rank"
                                        ? "Звание"
                                        : result.type === "command"
                                          ? "Команда"
                                          : result.type === "term"
                                            ? "Термин"
                                            : result.type}
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
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
