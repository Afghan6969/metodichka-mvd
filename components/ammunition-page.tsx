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
    return <IconComponent className="h-5 w-5" />
  }

  const basicItems = ammunitionData.filter((item) => item.category === "basic")
  const weaponItems = ammunitionData.filter((item) => item.category === "weapon")
  const specialItems = ammunitionData.filter((item) => item.category === "special")

return (
    <div className="space-y-6 bg-background min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
          <Shield className="h-6 w-6 text-blue-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Аммуниция сотрудников полиции</h1>
          <p className="text-muted-foreground">
            Обязательная и дополнительная экипировка согласно пункту 2.7 регламента
          </p>
        </div>
      </div>

      {/* Базовая экипировка */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-green-400" />
            Базовая экипировка
          </CardTitle>
          <CardDescription className="text-muted-foreground">Обязательная экипировка для всех сотрудников полиции</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {basicItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
              >
                <div className="text-green-400 mt-1">{getItemIcon(item.icon)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                    {item.required && (
                      <Badge className="bg-muted text-foreground border-border text-xs">
                        Обязательно
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <p className="text-xs text-muted-foreground font-medium">{item.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Табельное оружие */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-2 text-xl">
            <Gun className="h-5 w-5 text-yellow-400" />
            Табельное оружие
          </CardTitle>
          <CardDescription className="text-muted-foreground">Огнестрельное оружие по званиям и должностям</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {weaponItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
              >
                <div className="text-yellow-400 mt-1">{getItemIcon(item.icon)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                    {item.required && (
                      <Badge className="bg-muted text-foreground border-border text-xs">
                        Обязательно
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <p className="text-xs text-muted-foreground font-medium">{item.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Специальное оружие */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-2 text-xl">
            <Target className="h-5 w-5 text-red-400" />
            Специальное оружие
          </CardTitle>
          <CardDescription className="text-muted-foreground">Оружие для специальных подразделений и высших званий</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {specialItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
              >
                <div className="text-red-400 mt-1">{getItemIcon(item.icon)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                    <Badge className="bg-muted text-foreground border-border text-xs">
                      ОМОН/СОБР
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <p className="text-xs text-muted-foreground font-medium">{item.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Примечания */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground text-xl">
            Пункт 2.7 - Обязательная экипировка
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              <strong>
                Сотрудник полиции, при нахождении на смене обязан иметь при себе необходимую амуницию, доступную ему по
                званию и должности.
              </strong>
            </p>

            <div className="bg-muted border border-border p-4 rounded-lg">
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

            <div className="bg-muted border border-border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Примечание:</strong> Табельное оружие разрешено использовать для тренировок независимо от звания
                сотрудника.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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