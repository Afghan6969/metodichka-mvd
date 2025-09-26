"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Star, Award, Users } from "lucide-react"

export function GuvdPositionsPage() {
  const positions = [
    {
      category: "Руководящий состав",
      icon: Shield,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [
        { title: "Начальник ГУВД", abbr: "Нач. ГУВД", rank: "Генерал", level: "11 ранг" },
        { title: "Первый заместитель начальника ГУВД", abbr: "Пр. Зам. Нач.", rank: "Полковник", level: "10 ранг" },
        {
          title: "Заместитель начальника ГУВД, ответственный за спец. подразделения",
          abbr: "Зам. Нач. отв. за СП",
          rank: "Полковник",
          level: "10 ранг",
        },
        {
          title: "Заместитель начальника ГУВД, начальник отдела кадров",
          abbr: "Зам. Нач. нач. ОК",
          rank: "Полковник",
          level: "10 ранг",
        },
        {
          title: "Заместитель начальника ГУВД, начальник тыла",
          abbr: "Зам. Нач. нач. тыла",
          rank: "Полковник",
          level: "10 ранг",
        },
      ],
    },
    {
      category: "Старший состав",
      icon: Star,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [
        {
          title: "Начальник Отряда мобильного особого назначения / Начальник СОБРа",
          abbr: "Нач. ОМОН / Нач. СОБР",
          rank: "Подполковник",
          level: "9 ранг",
        },
        { title: "Начальник Патрульно-постовой службы", abbr: "Нач. ППС", rank: "Подполковник", level: "9 ранг" },
        { title: "Начальник Полицейской академии", abbr: "Нач. ПА", rank: "Подполковник", level: "9 ранг" },
        {
          title: "Начальник Отдела воздушного патрулирования",
          abbr: "Нач. ОВП",
          rank: "Подполковник",
          level: "9 ранг",
        },
      ],
    },
    {
      category: "Отдел воздушного патрулирования",
      icon: Award,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Сотрудник ОВП", abbr: "ОВП", rank: "Лейтенант–Майор", level: "5-8 ранг" }],
    },
    {
      category: "Отряд мобильного особого назначения",
      icon: Shield,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Боец ОМОН", abbr: "ОМОН", rank: "Лейтенант–Капитан", level: "5-7 ранг" }],
    },
    {
      category: "Специальный отряд быстрого реагирования",
      icon: Shield,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Боец СОБРа", abbr: "СОБР", rank: "Лейтенант–Капитан", level: "5-7 ранг" }],
    },
    {
      category: "Патрульно-постовая служба",
      icon: Users,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Инспектор ППС", abbr: "ППС", rank: "Лейтенант", level: "3-7 ранг" }],
    },
    {
      category: "Полицейская академия",
      icon: Award,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Курсант ПА", abbr: "ПА", rank: "Рядовой–Сержант", level: "1-2 ранг" }],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Shield className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Должности ГУВД</h1>
          <p className="text-muted-foreground">Структура должностей и званий ГУВД МВД РП</p>
        </div>
      </div>

      <div className="grid gap-6">
        {positions.map((section, index) => {
          const Icon = section.icon
          return (
            <Card key={index} className={`${section.color} dark:bg-opacity-20 border-2`}>
              <CardHeader className="pb-4">
                <CardTitle className={`flex items-center gap-3 ${section.titleColor} dark:opacity-90 text-xl`}>
                  <Icon className="h-5 w-5" />
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.positions.map((position, posIndex) => (
                    <div key={posIndex} className="bg-card rounded-lg p-4 shadow-sm border">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-sm leading-tight">{position.title}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs font-mono">
                              {position.abbr}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {position.rank}
                            </Badge>
                            <Badge variant="default" className="text-xs bg-primary">
                              {position.level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Разработано{" "}
            <a
              href="https://vk.com/id503251431"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Poseidon_Wagner
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
