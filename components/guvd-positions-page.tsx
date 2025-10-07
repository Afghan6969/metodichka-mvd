"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Star, Award, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"

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
          title: "Начальник Отряда Мобильного Особого Назначения / Начальник Специального Отряда Быстрого Реагирования",
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
      positions: [{ title: "Боец ОМОНа", abbr: "ОМОН", rank: "Лейтенант–Капитан", level: "5-7 ранг" }],
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
      positions: [
        { title: "Старший инспектор ППС", abbr: "Ст. Инсп. ППС", rank: "Старший Лейтенант–Капитан", level: "6-7 ранг" },
        { title: "Инспектор ППС", abbr: "Инсп. ППС", rank: "Лейтенант", level: "5 ранг" },
        { title: "Младший инспектор ППС", abbr: "Мл. Инсп. ППС", rank: "Старшина–Прапорщик", level: "3-4 ранг" },
      ],
    },
    {
      category: "Полицейская академия",
      icon: Award,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Курсант ПА", abbr: "ПА", rank: "Рядовой–Сержант", level: "1-2 ранг" }],
    },
  ]

  const totalPositions = positions.reduce((sum, section) => sum + section.positions.length, 0)

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={Shield}
        title="Должности ГУВД"
        description="Структура должностей и званий ГУВД МВД РП"
        badge={`${totalPositions} должностей`}
      />

      <div className="grid gap-6">
        {positions.map((section, index) => {
          const Icon = section.icon
          return (
            <Card key={index} className="military-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-foreground text-2xl font-black uppercase tracking-wide">
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

      
    </div>
  )
}

