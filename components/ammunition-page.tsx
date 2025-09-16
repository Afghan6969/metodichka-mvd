"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, HandCoins as Handcuffs, Hammer, Sun as Gun, Target } from "lucide-react"

interface AmmunitionItem {
  name: string
  description: string
  availability: string
  required: boolean
  icon: React.ComponentType<any>
  category: "basic" | "weapon" | "special"
}

export function AmmunitionPage() {
  const ammunitionData: AmmunitionItem[] = [
    {
      name: "Наручники",
      description: "Средство ограничения подвижности задержанного",
      availability: "Доступны всем сотрудникам полиции",
      required: true,
      icon: Handcuffs,
      category: "basic",
    },
    {
      name: "Полицейская дубинка",
      description: "Средство принуждения и самообороны",
      availability: "Доступна всем сотрудникам полиции",
      required: true,
      icon: Hammer,
      category: "basic",
    },
    {
      name: "Бронежилет",
      description: "Средство индивидуальной защиты",
      availability: "Доступен всем сотрудникам полиции",
      required: true,
      icon: Shield,
      category: "basic",
    },
    {
      name: "Тазер",
      description: "Электрошоковое устройство",
      availability: "Доступен всем сотрудникам полиции",
      required: true,
      icon: Zap,
      category: "basic",
    },
    {
      name: 'Пистолет МР-443 "Грач"',
      description: "Табельное огнестрельное оружие",
      availability: 'Доступен всем сотрудникам, начиная со звания "Старшина"',
      required: true,
      icon: Gun,
      category: "weapon",
    },
    {
      name: "Дробовик МР-133",
      description: "Гладкоствольное ружье для специальных операций",
      availability: 'Доступен начиная со звания "Лейтенант"',
      required: false,
      icon: Target,
      category: "weapon",
    },
    {
      name: "Автомат АК-74М",
      description: "Автоматическое оружие для особых случаев",
      availability: 'Доступен начиная со звания "Лейтенант", а также сотрудникам "ОМОН" и "СОБР"',
      required: false,
      icon: Target,
      category: "special",
    },
  ]

  const getItemIcon = (IconComponent: React.ComponentType<any>) => {
    return <IconComponent className="h-6 w-6" />
  }

  const getCategoryColor = (category: AmmunitionItem["category"]) => {
    switch (category) {
      case "basic":
        return "bg-green-100 text-green-800"
      case "weapon":
        return "bg-yellow-100 text-yellow-800"
      case "special":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryName = (category: AmmunitionItem["category"]) => {
    switch (category) {
      case "basic":
        return "Базовая экипировка"
      case "weapon":
        return "Табельное оружие"
      case "special":
        return "Специальное оружие"
      default:
        return "Прочее"
    }
  }

  const basicItems = ammunitionData.filter((item) => item.category === "basic")
  const weaponItems = ammunitionData.filter((item) => item.category === "weapon")
  const specialItems = ammunitionData.filter((item) => item.category === "special")

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Аммуниция сотрудников полиции</h1>
          <p className="text-muted-foreground">
            Обязательная и дополнительная экипировка согласно пункту 2.7 регламента
          </p>
        </div>

        {/* Базовая экипировка */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Базовая экипировка
            </CardTitle>
            <CardDescription>Обязательная экипировка для всех сотрудников полиции</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {basicItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-green-200 bg-white">
                  <div className="text-green-600 mt-1">{getItemIcon(item.icon)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      {item.required && <Badge className="bg-red-100 text-red-800 text-xs">Обязательно</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <p className="text-xs text-green-700 font-medium">{item.availability}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Табельное оружие */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <Gun className="h-5 w-5" />
              Табельное оружие
            </CardTitle>
            <CardDescription>Огнестрельное оружие по званиям и должностям</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {weaponItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-yellow-200 bg-white">
                  <div className="text-yellow-600 mt-1">{getItemIcon(item.icon)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      {item.required && <Badge className="bg-red-100 text-red-800 text-xs">Обязательно</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <p className="text-xs text-yellow-700 font-medium">{item.availability}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Специальное оружие */}
        <Card className="mb-8 border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Специальное оружие
            </CardTitle>
            <CardDescription>Оружие для специальных подразделений и высших званий</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {specialItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-red-200 bg-white">
                  <div className="text-red-600 mt-1">{getItemIcon(item.icon)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <Badge className="bg-red-100 text-red-800 text-xs">ОМОН/СОБР</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <p className="text-xs text-red-700 font-medium">{item.availability}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Примечания */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Пункт 2.7 - Обязательная экипировка</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                <strong>
                  Сотрудник полиции, при нахождении на смене обязан иметь при себе необходимую амуницию, доступную ему
                  по званию и должности.
                </strong>
              </p>

              <div className="bg-white p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-3">Обязательный минимум:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Наручники</li>
                  <li>• Полицейская дубинка</li>
                  <li>• Бронежилет</li>
                  <li>• Тазер</li>
                  <li>• Пистолет (для званий от "Старшина")</li>
                  <li>• Автомат или дробовик по выбору (для званий от "Лейтенант")</li>
                </ul>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <p className="text-sm text-accent-foreground">
                  <strong>Примечание:</strong> Табельное оружие разрешено использовать для тренировок независимо от
                  звания сотрудника.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
