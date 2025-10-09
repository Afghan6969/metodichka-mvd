"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Radio, MessageSquare, Phone, AlertTriangle, Search, FileText } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"

interface ReportCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  reports: ReportItem[]
  category: "basic" | "patrol" | "special"
}

interface ReportItem {
  title: string
  command: string
  description?: string
}

export function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const reportCategories: ReportCategory[] = [
    {
      id: "shift",
      title: "Смена",
      description: "Доклады при заступлении и сдаче смены",
      icon: MessageSquare,
      category: "basic",
      reports: [
        {
          title: "Заступление на смену",
          command: "/r [ТЕГ] Заступил на смену.",
        },
        {
          title: "Сдача смены",
          command: "/r [ТЕГ] Сдал смену.",
        },
      ],
    },
    {
      id: "checkpoint",
      title: "КПП/Дежурная часть",
      description: "Доклады при работе на стационарных постах",
      icon: Phone,
      category: "basic",
      reports: [
        {
          title: "Заступление на пост",
          command: "/r [ТЕГ] Заступил на пост КПП/Дежурная часть.",
        },
        {
          title: "Доклад о состоянии",
          command: "/r [ТЕГ] Продолжаю стоять на посту КПП/Дежурная часть. Состояние: стабильное.",
        },
        {
          title: "Покидание поста",
          command: "/r [ТЕГ] Покидаю пост КПП/Дежурная часть.",
        },
      ],
    },
    {
      id: "patrol",
      title: "Патрулирование города",
      description: "Доклады при автомобильном патрулировании",
      icon: Radio,
      category: "patrol",
      reports: [
        {
          title: "Выезд в патруль",
          command: "/r [ТЕГ] Выехал в патруль города | Экипаж: 1.",
        },
        {
          title: "Продолжение патруля",
          command: "/r [ТЕГ] Продолжаю патрулирование города | Состояние: стабильное | Экипаж: 1.",
        },
        {
          title: "Завершение патруля",
          command: "/r [ТЕГ] Завершаю патрулирование города | Состояние: стабильное | Экипаж: 1.",
        },
      ],
    },
    {
      id: "footpatrol",
      title: "Пеший патруль",
      description: "Доклады при пешем патрулировании",
      icon: MessageSquare,
      category: "patrol",
      reports: [
        {
          title: "Выход в пеший патруль",
          command: "/r [ТЕГ] Вышел в пеший патруль города.",
        },
        {
          title: "Продолжение пешего патруля",
          command: "/r [ТЕГ] Продолжаю пеший патруль города | Состояние: стабильное.",
        },
        {
          title: "Завершение пешего патруля",
          command: "/r [ТЕГ] Завершил пеший патруль города.",
        },
      ],
    },
    {
      id: "airpatrol",
      title: "Воздушный патруль",
      description: "Доклады при патрулировании на вертолёте",
      icon: Radio,
      category: "special",
      reports: [
        {
          title: "Вылет в воздушный патруль",
          command: "/r [ТЕГ] Вылетел в воздушный патруль города | Экипаж: 1.",
        },
        {
          title: "Воздушный патруль",
          command: "/r [ТЕГ] Воздушный патруль города | Состояние: стабильное | Экипаж: 1.",
        },
        {
          title: "Завершение воздушного патруля",
          command: "/r [ТЕГ] Завершил воздушный патруль города | Экипаж: 1.",
        },
      ],
    },
    {
      id: "calls",
      title: "Обработка вызовов",
      description: "Доклады при работе с вызовами",
      icon: AlertTriangle,
      category: "special",
      reports: [
        {
          title: "Принятие вызова",
          command: "/ro [ТЕГ] 10-5 | *место вызова*.",
        },
        {
          title: "Завершение вызова",
          command: "/ro [ТЕГ] 10-6 | *место вызова* | Ложный/Обработан.",
        },
      ],
    },
  ]

  const filteredCategories = reportCategories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.reports.some(
      (report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.command.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const categoryIcons: Record<string, { icon: any; color: string }> = {
    basic: { icon: MessageSquare, color: "from-blue-500/80 to-blue-600/60" },
    patrol: { icon: Radio, color: "from-green-500/80 to-green-600/60" },
    special: { icon: AlertTriangle, color: "from-red-500/80 to-red-600/60" },
  }

  const categoryLabels = {
    basic: "Базовые",
    patrol: "Патрулирование",
    special: "Специальные"
  }

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={FileText}
        title="Доклады МВД"
        description="Шаблоны докладов для различных ситуаций"
        badge={`${filteredCategories.length} категорий`}
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
          placeholder="Поиск докладов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-base border-2 border-blue-400/30 rounded-xl bg-black/5 backdrop-blur-sm font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder:text-blue-300/60"
        />
      </div>

      {/* Reports Grid */}
      <div className="space-y-6">
        {filteredCategories.map((category) => {
          const IconComponent = category.icon
          const categoryType = categoryIcons[category.category]

          return (
            <div key={category.id} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
              <div className="flex items-center gap-4 p-6 border-b border-white/10">
                <div className={`w-14 h-14 bg-gradient-to-br ${categoryType.color} rounded-xl flex items-center justify-center border border-blue-400/30 shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300`}>
                  <IconComponent className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold uppercase tracking-wide mb-1 text-white group-hover:text-blue-200 transition-colors">{category.title}</h2>
                  <p className="text-blue-200/80 font-medium">{category.description}</p>
                </div>
                <Badge variant="outline" className="border-blue-400/40 text-blue-300 font-semibold bg-blue-500/10">
                  {categoryLabels[category.category]}
                </Badge>
              </div>

              <div className="space-y-2 p-6">
                {category.reports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-black/5 border border-white/10 hover:bg-white/8 transition-colors group"
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-bold uppercase tracking-wide mb-2 text-blue-100 group-hover:text-white transition-colors">
                        {report.title}
                      </h3>
                      <div className="bg-white/10 p-3 rounded-lg border border-blue-400/20">
                        <code className="font-mono text-sm text-blue-100 font-semibold leading-relaxed">
                          {report.command}
                        </code>
                      </div>
                      {report.description && (
                        <p className="text-sm text-blue-200/80 font-medium mt-2 leading-relaxed">
                          {report.description}
                        </p>
                      )}
                    </div>
                    <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={report.command} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {filteredCategories.length === 0 && searchQuery && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Search className="h-10 w-10 text-blue-300" />
          </div>
          <p className="text-xl font-bold text-white mb-2">Доклады не найдены</p>
          <p className="text-blue-200/80">Попробуйте изменить поисковый запрос</p>
        </div>
      )}
    </div>
  )
}
