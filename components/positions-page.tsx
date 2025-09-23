"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Star, Award, Users, Car, Crown } from "lucide-react"

export function PositionsPage() {
  const positions = [
    {
      category: "Руководящий состав",
      icon: Crown,
      color: "bg-primary/10 border-border",
      titleColor: "text-foreground",
      positions: [
        { title: "Начальник ГИБДД", abbr: "Нач ГИБДД", rank: "Генерал", level: "11 ранг" },
        { title: "Первый заместитель начальника ГИБДД", abbr: "Пр Зам Нач", rank: "Полковник", level: "10 ранг" },
        {
          title: "Заместитель начальника, Начальник отдела кадров",
          abbr: "Зам Нач От Кдр",
          rank: "Полковник",
          level: "10 ранг",
        },
        {
          title: "Заместитель начальника, по работе с личным составом",
          abbr: "Зам Нач Рб ЛС",
          rank: "Полковник",
          level: "10 ранг",
        },
        {
          title: "Заместитель начальника ГИБДД, по вооружению",
          abbr: "Зам Нач Врж",
          rank: "Полковник",
          level: "10 ранг",
        },
      ],
    },
    {
      category: "Старший состав",
      icon: Star,
      color: "bg-primary/10 border-border",
      titleColor: "text-foreground",
      positions: [
        { title: "Начальник Специализированного Батальона", abbr: "Нач СБ", rank: "Подполковник", level: "9 ранг" },
        { title: "Начальник Отдельного Батальона", abbr: "Нач ОБ", rank: "Подполковник", level: "9 ранг" },
        { title: "Начальник Учебного Батальона", abbr: "Нач УБ", rank: "Подполковник", level: "9 ранг" },
        { title: "Начальник Мотобатальона", abbr: "Нач МБ", rank: "Подполковник", level: "9 ранг" },
        {
          title: "Заместитель Начальника Специализированного Батальона",
          abbr: "Зам Нач СБ",
          rank: "Майор",
          level: "8 ранг",
        },
        { title: "Заместитель Начальника Отдельного Батальона", abbr: "Зам Нач ОБ", rank: "Майор", level: "8 ранг" },
        { title: "Заместитель Начальника Учебного Батальона", abbr: "Зам Нач УБ", rank: "Майор", level: "8 ранг" },
        { title: "Заместитель Начальника Мотобатальона", abbr: "Зам Нач МБ", rank: "Майор", level: "8 ранг" },
      ],
    },
    {
      category: "Мотобатальон",
      icon: Car,
      color: "bg-primary/10 border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Инспектор МБ", abbr: "МБ", rank: "Старший Лейтенант-Капитан", level: "6-7 ранг" }],
    },
    {
      category: "Специализированный Батальон",
      icon: Award,
      color: "bg-primary/10 border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Инспектор СБ", abbr: "СБ", rank: "Прапорщик-Капитан", level: "4-7 ранг" }],
    },
    {
      category: "Отдельный Батальон",
      icon: Users,
      color: "bg-primary/10 border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Инспектор ОБ", abbr: "ОБ", rank: "Старшина-Капитан", level: "3-7 ранг" }],
    },
    {
      category: "Учебный Батальон",
      icon: Shield,
      color: "bg-primary/10 border-border",
      titleColor: "text-foreground",
      positions: [{ title: "Курсант УБ", abbr: "УБ", rank: "Рядовой-Сержант", level: "1-2 ранг" }],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Car className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Должности ГИБДД</h1>
          <p className="text-muted-foreground">Структура должностей и званий ГИБДД МВД РП</p>
        </div>
      </div>

      <div className="grid gap-6">
        {positions.map((section, index) => {
          const Icon = section.icon
          return (
            <Card key={index} className={`${section.color} border-2`}>
              <CardHeader className="pb-4">
                <CardTitle className={`flex items-center gap-3 ${section.titleColor} text-xl`}>
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
