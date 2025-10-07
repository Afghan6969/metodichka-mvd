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
    basic: { icon: MessageSquare, color: "from-primary to-primary/70" },
    patrol: { icon: Radio, color: "from-accent to-accent/70" },
    special: { icon: AlertTriangle, color: "from-primary to-accent" },
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
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
        <Input
          type="text"
          placeholder="Поиск докладов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-base border-2 border-primary/30 rounded-xl bg-background/50 font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Reports Grid */}
      <div className="space-y-6">
        {filteredCategories.map((category) => {
          const IconComponent = category.icon
          const categoryType = categoryIcons[category.category]
          
          return (
            <div key={category.id} className="military-card">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${categoryType.color} rounded-xl flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20`}>
                  <IconComponent className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black uppercase tracking-wide mb-1">{category.title}</h2>
                  <p className="text-muted-foreground font-semibold">{category.description}</p>
                </div>
                <Badge variant="outline" className="border-accent/40 text-accent font-semibold">
                  {categoryLabels[category.category]}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {category.reports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-xl border-2 border-primary/20 bg-muted/30 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-black uppercase tracking-wide mb-3 text-foreground">
                        {report.title}
                      </h3>
                      <div className="bg-background/80 p-4 rounded-lg border border-primary/30">
                        <code className="font-mono text-sm text-foreground font-semibold leading-relaxed">
                          {report.command}
                        </code>
                      </div>
                      {report.description && (
                        <p className="text-sm text-muted-foreground font-medium mt-3 leading-relaxed">
                          {report.description}
                        </p>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
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
          <div className="w-20 h-20 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-muted-foreground mb-2">Доклады не найдены</p>
          <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
        </div>
      )}
    </div>
  )
}
