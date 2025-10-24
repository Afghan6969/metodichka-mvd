"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, HandCoins as Handcuffs, Hammer, Sun as Gun, Target, Package } from "lucide-react"
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
      availability: 'Доступен начиная со звания "Лейтенант" (на выбор с АК-74М)',
      required: false,
      icon: Target,
      category: "weapon",
    },
    {
      name: "Автомат АК-74М",
      description: "Автоматическое оружие для особых случаев",
      availability: 'Доступен начиная со звания "Лейтенант" (на выбор с МР-133)',
      required: false,
      icon: Target,
      category: "weapon",
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
        icon={Package}
        title="Амуниция МВД"
        description="Обязательная и дополнительная экипировка согласно пункту 2.7 регламента"
        badge={`${ammunitionData.length} предметов`}
      />

      {/* Базовая экипировка */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/8 hover:border-white/15 transition-all duration-200">
        <div className="bg-green-950/30 px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-400/30">
              <Shield className="h-5 w-5 text-green-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold uppercase tracking-wide text-white">Базовая экипировка</h2>
              <p className="text-green-200/60 text-xs">Обязательная экипировка для всех сотрудников</p>
            </div>
            <div className="text-xs text-white/50 font-medium">{basicItems.length}</div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid gap-3 md:grid-cols-2">
            {basicItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/10 hover:bg-black/30 transition-colors"
              >
                <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-400/30 shrink-0">
                  <item.icon className="h-5 w-5 text-green-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                    {item.required && (
                      <Badge variant="outline" className="border-green-400/40 text-green-200 bg-green-950/40 text-xs px-2 py-0.5">
                        Обязательно
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-blue-100/80 mb-1.5">{item.description}</p>
                  <p className="text-xs text-blue-200/60">{item.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Табельное оружие */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/8 hover:border-white/15 transition-all duration-200">
        <div className="bg-yellow-950/30 px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-400/30">
              <Gun className="h-5 w-5 text-yellow-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold uppercase tracking-wide text-white">Табельное оружие</h2>
              <p className="text-yellow-200/60 text-xs">Огнестрельное оружие по званиям</p>
            </div>
            <div className="text-xs text-white/50 font-medium">{weaponItems.length}</div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid gap-3">
            {weaponItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/10 hover:bg-black/30 transition-colors"
              >
                <div className="w-9 h-9 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-400/30 shrink-0">
                  <item.icon className="h-5 w-5 text-yellow-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                    {item.required && (
                      <Badge variant="outline" className="border-yellow-400/40 text-yellow-200 bg-yellow-950/40 text-xs px-2 py-0.5">
                        Обязательно
                      </Badge>
                    )}
                    {!item.required && index > 0 && (
                      <Badge variant="outline" className="border-blue-400/40 text-blue-200 bg-blue-950/40 text-xs px-2 py-0.5">
                        На выбор
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-blue-100/80 mb-1.5">{item.description}</p>
                  <p className="text-xs text-blue-200/60">{item.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Примечание о выборе оружия */}
      <div className="bg-blue-950/20 border border-blue-400/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30 shrink-0">
            <Target className="h-4 w-4 text-blue-300" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm mb-1">Выбор основного оружия</h3>
            <p className="text-xs text-blue-100/80">
              Сотрудники со звания <span className="font-semibold text-white">"Лейтенант"</span> выбирают <span className="font-semibold text-white">одно</span> из двух: <span className="text-yellow-200">Дробовик МР-133</span> или <span className="text-yellow-200">Автомат АК-74М</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Примечания */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/8 hover:border-white/15 transition-all duration-200">
        <div className="bg-purple-950/30 px-5 py-3 border-b border-white/10">
          <h2 className="text-base font-bold uppercase tracking-wide text-white">Пункт 2.7 - Обязательная экипировка</h2>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <p className="text-sm text-blue-100/90">
              <span className="font-semibold text-white">

                Сотрудник полиции, при нахождении на смене обязан иметь при себе необходимую амуницию, доступную ему по
                званию и должности.
              </span>
            </p>

            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2 text-sm">Обязательный минимум:</h4>
              <ul className="space-y-1 text-xs text-blue-100/80">
                <li>• Наручники</li>
                <li>• Полицейская дубинка</li>
                <li>• Бронежилет</li>
                <li>• Тазер</li>
                <li>• <span className="text-yellow-200 font-semibold">Пистолет МР-443</span> (для званий от "Старшина")</li>
                <li>• <span className="text-yellow-200 font-semibold">Автомат АК-74М</span> или <span className="text-yellow-200 font-semibold">Дробовик МР-133</span> на выбор (для званий от "Лейтенант")</li>
              </ul>
            </div>

            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <p className="text-xs text-blue-100/80">
                <span className="font-semibold text-white">Примечание:</span> В обязательном порядке при себе необходимо иметь: наручники, дубинку, бронежилет, тазер, пистолет, а также автомат или дробовик по выбору.
                Табельное оружие разрешено использовать для тренировок независимо от звания
                сотрудника.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
