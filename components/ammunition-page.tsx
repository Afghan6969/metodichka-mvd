"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, HandCoins as Handcuffs, Hammer, Sun as Gun, Target } from "lucide-react"
import { PageHeader } from "@/components/page-header"

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
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={Shield}
        title="Амуниция МВД"
        description="Обязательная и дополнительная экипировка согласно пункту 2.7 регламента"
        badge={`${ammunitionData.length} предметов`}
      />

      {/* Базовая экипировка */}
      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
            <Shield className="h-5 w-5 text-green-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Базовая экипировка</h2>
            <p className="text-blue-200/80 text-sm">Обязательная экипировка для всех сотрудников полиции</p>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {basicItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-400/30 mt-1">
                  <item.icon className="h-5 w-5 text-green-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                    {item.required && (
                      <Badge className="border-green-400/40 text-green-300 bg-green-500/10 text-xs">
                        Обязательно
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-blue-100/90 mb-2">{item.description}</p>
                  <p className="text-xs text-blue-200/70 font-medium">{item.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Табельное оружие */}
      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-400/30">
            <Gun className="h-5 w-5 text-yellow-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Табельное оружие</h2>
            <p className="text-blue-200/80 text-sm">Огнестрельное оружие по званиям и должностям</p>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {weaponItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
              >
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-400/30 mt-1">
                  <item.icon className="h-5 w-5 text-yellow-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                    {item.required && (
                      <Badge className="border-yellow-400/40 text-yellow-300 bg-yellow-500/10 text-xs">
                        Обязательно
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-blue-100/90 mb-2">{item.description}</p>
                  <p className="text-xs text-blue-200/70 font-medium">{item.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Специальное оружие */}
      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-400/30">
            <Target className="h-5 w-5 text-red-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Специальное оружие</h2>
            <p className="text-blue-200/80 text-sm">Оружие для специальных подразделений и высших званий</p>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {specialItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
              >
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-400/30 mt-1">
                  <item.icon className="h-5 w-5 text-red-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                    <Badge className="border-red-400/40 text-red-300 bg-red-500/10 text-xs">
                      ОМОН/СОБР
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-100/90 mb-2">{item.description}</p>
                  <p className="text-xs text-blue-200/70 font-medium">{item.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Примечания */}
      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Пункт 2.7 - Обязательная экипировка</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-sm text-blue-100/90">
              <span className="font-bold text-white">
                Сотрудник полиции, при нахождении на смене обязан иметь при себе необходимую амуницию, доступную ему по
                званию и должности.
              </span>
            </p>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h4 className="font-bold text-white mb-3">Обязательный минимум:</h4>
              <ul className="space-y-1 text-sm text-blue-100/90">
                <li>• Наручники</li>
                <li>• Полицейская дубинка</li>
                <li>• Бронежилет</li>
                <li>• Тазер</li>
                <li>• Пистолет (для званий от "Старшина")</li>
                <li>• Автомат или дробовик по выбору (для званий от "Лейтенант")</li>
              </ul>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <p className="text-sm text-blue-100/90">
                <span className="font-bold text-white">Примечание:</span> Табельное оружие разрешено использовать для тренировок независимо от звания
                сотрудника.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
