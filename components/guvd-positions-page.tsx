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
            <div key={index} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
              <div className="flex items-center gap-3 p-6 border-b border-white/10">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                  <Icon className="h-5 w-5 text-blue-300" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-wide text-white group-hover:text-blue-200 transition-colors">{section.category}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {section.positions.map((position, posIndex) => (
                    <div key={posIndex} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/8 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-sm leading-tight mb-2">{position.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className="border-blue-400/40 text-blue-300 bg-blue-500/10 text-xs font-mono">
                              {position.abbr}
                            </Badge>
                            <Badge className="border-purple-400/40 text-purple-300 bg-purple-500/10 text-xs">
                              {position.rank}
                            </Badge>
                            <Badge className="border-green-400/40 text-green-300 bg-green-500/10 text-xs">
                              {position.level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

