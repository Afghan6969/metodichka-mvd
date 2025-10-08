"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Star, Award, Users, Car, Crown } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export function PositionsPage() {
  const positions = [
    {
      category: "Руководящий состав",
      icon: Crown,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [
        { title: "Начальник ГИБДД", abbr: "Нач. ГИБДД", rank: "Генерал", level: "11 ранг" },
        { title: "Первый заместитель начальника ГИБДД", abbr: "Пр. Зам. Нач.", rank: "Полковник", level: "10 ранг" },
        {
          title: "Заместитель начальника ГИБДД, начальник отдела кадров",
          abbr: "Зам. Нач. От Кдр",
          rank: "Полковник",
          level: "10 ранг",
        },
        {
          title: "Заместитель начальника ГИБДД по работе с личным составом",
          abbr: "Зам. Нач. Рб ЛС",
          rank: "Полковник",
          level: "10 ранг",
        },
        {
          title: "Заместитель начальника ГИБДД по вооружению",
          abbr: "Зам. Нач. Врж",
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
        { title: "Начальник Специализированного Батальона", abbr: "Нач. СБ", rank: "Подполковник", level: "9 ранг" },
        { title: "Начальник Отдельного Батальона", abbr: "Нач. ОБ", rank: "Подполковник", level: "9 ранг" },
        { title: "Начальник Учебного Батальона", abbr: "Нач. УБ", rank: "Подполковник", level: "9 ранг" },
        { title: "Начальник Мотобатальона", abbr: "Нач. МБ", rank: "Подполковник", level: "9 ранг" },
        {
          title: "Заместитель Начальника Специализированного Батальона",
          abbr: "Зам. Нач. СБ",
          rank: "Майор",
          level: "8 ранг",
        },
        { title: "Заместитель Начальника Отдельного Батальона", abbr: "Зам. Нач. ОБ", rank: "Майор", level: "8 ранг" },
        { title: "Заместитель Начальника Учебного Батальона", abbr: "Зам. Нач. УБ", rank: "Майор", level: "8 ранг" },
        { title: "Заместитель Начальника Мотобатальона", abbr: "Зам. Нач. МБ", rank: "Майор", level: "8 ранг" },
      ],
    },
    {
      category: "Мотобатальон",
      icon: Car,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Инспектор МБ", abbr: "МБ", rank: "Старший Лейтенант-Капитан", level: "6-7 ранг" }],
    },
    {
      category: "Специализированный Батальон",
      icon: Award,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Инспектор СБ", abbr: "СБ", rank: "Прапорщик-Капитан", level: "4-7 ранг" }],
    },
    {
      category: "Отдельный Батальон",
      icon: Users,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Инспектор ОБ", abbr: "ОБ", rank: "Старшина-Капитан", level: "3-7 ранг" }],
    },
    {
      category: "Учебный Батальон",
      icon: Shield,
      color: "bg-blue border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Курсант УБ", abbr: "УБ", rank: "Рядовой-Сержант", level: "1-2 ранг" }],
    },
  ]

  const totalPositions = positions.reduce((sum, section) => sum + section.positions.length, 0)

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={Car}
        title="Должности ГИБДД"
        description="Структура должностей и званий ГИБДД МВД РП"
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
