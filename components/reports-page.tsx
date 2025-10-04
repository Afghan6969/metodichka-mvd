"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, Info, MessageSquare, Phone, AlertTriangle } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

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
  const getItemIcon = (IconComponent: React.ComponentType<any>) => {
    return <IconComponent className="h-5 w-5" />
  }

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

  return (
    <div className="space-y-6 bg-background min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <Radio className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Доклады в рацию</h1>
          <p className="text-muted-foreground">Стандартные фразы для радиосвязи сотрудников МВД</p>
        </div>
      </div>

      {/* Информационная карточка */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-2 text-xl">
            <Info className="h-5 w-5 text-blue-400" />
            Важная информация о тегах
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <p className="text-muted-foreground">
                В тегах <code className="bg-muted text-foreground px-1 rounded">/r</code> указывайте свою должность, например:{" "}
                <Badge className="bg-muted text-foreground border-border text-xs">
                  [МБ]
                </Badge>
                ,{" "}
                <Badge className="bg-muted text-foreground border-border text-xs">
                  [ОМОН]
                </Badge>
                ,{" "}
                <Badge className="bg-muted text-foreground border-border text-xs">
                  [СОБР]
                </Badge>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <p className="text-muted-foreground">
                В тегах <code className="bg-muted text-foreground px-1 rounded">/ro</code> и{" "}
                <code className="bg-muted text-foreground px-1 rounded">/d</code> указывайте свой город, например:{" "}
                <Badge className="bg-muted text-foreground border-border text-xs">
                  [ГИБДД-М]
                </Badge>
                ,{" "}
                <Badge className="bg-muted text-foreground border-border text-xs">
                  [ГУВД-М]
                </Badge>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <p className="text-muted-foreground">
                <strong>Теги в рацию /r - не обязательны</strong>, но рекомендуются для лучшей координации
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Доклады */}
      <div className="space-y-4">
        {reportCategories.map((category) => (
          <Card key={category.id} className="border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground flex items-center gap-2 text-xl">
                {getItemIcon(category.icon)}
                {category.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
                  >
                    <div className="text-blue-400 mt-1">
                      <Radio className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-foreground text-sm">{report.title}</h4>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex-1 font-mono text-sm text-foreground bg-muted p-3 rounded border border-border">
                          {report.command}
                        </div>
                        <CopyButton text={report.command} className="flex-shrink-0 mt-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Разработано{" "}
            <a
              href="https://vk.com/id503251431"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Poseidon_Wagner
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
