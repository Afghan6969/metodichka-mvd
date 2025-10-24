"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Star, Award, Users, Car, Crown, Badge as BadgeIcon } from "lucide-react"
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
        icon={BadgeIcon}
        title="Должности ГИБДД"
        description="Структура должностей и званий ГИБДД МВД РП"
        badge={`${totalPositions} должностей`}
      />

      <div className="grid gap-4">
        {positions.map((section, index) => {
          const Icon = section.icon
          return (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/8 hover:border-white/15 transition-all duration-200">
              <div className="bg-blue-950/30 px-5 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                    <Icon className="h-5 w-5 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-bold uppercase tracking-wide text-white">{section.category}</h2>
                  </div>
                  <div className="text-xs text-white/50 font-medium">{section.positions.length}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {section.positions.map((position, posIndex) => (
                    <div key={posIndex} className="bg-black/20 p-3 rounded-lg border border-white/10 hover:bg-black/30 transition-colors">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-white text-sm leading-tight">{position.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-blue-400/40 text-blue-200 bg-blue-950/40 text-xs font-mono px-2.5 py-0.5">
                            {position.abbr}
                          </Badge>
                          <Badge variant="outline" className="border-purple-400/40 text-purple-200 bg-purple-950/40 text-xs px-2.5 py-0.5">
                            {position.rank}
                          </Badge>
                          <Badge variant="outline" className="border-green-400/40 text-green-200 bg-green-950/40 text-xs px-2.5 py-0.5">
                            {position.level}
                          </Badge>
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
