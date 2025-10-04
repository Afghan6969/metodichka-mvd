"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, GitBranch, Plus, Bug, Zap } from "lucide-react"

export function VersionsPage() {
  const versions = [
    {
      version: "2.1",
      date: "16 сентября 2025",
      type: "major",
      changes: [
        {
          type: "feature",
          description: "Добавлен раздел 'Версии' с полным changelog",
        },
        {
          type: "improvement",
          description: "Улучшен интерфейс Гос волны с обработкой ошибок",
        },
        {
          type: "improvement",
          description: "Обновлена типографика - добавлены шрифты Inter, Merriweather и JetBrains Mono",
        },
        {
          type: "feature",
          description: "Добавлены отдельные разделы биндов для ГИБДД и ГУВД",
        },
        {
          type: "improvement",
          description: "Разделены длинные бинды на части (максимум 3 отыгровки на клавишу)",
        },
        {
          type: "feature",
          description: "Добавлены кнопки копирования для каждого бинда",
        },
        {
          type: "improvement",
          description: "Упрощены названия Гос волны (убраны УБ и ПА)",
        },
        {
          type: "feature",
          description: "Добавлен футер со ссылкой на разработчика на всех страницах",
        },
      ],
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Plus className="h-4 w-4" />
      case "improvement":
        return <Zap className="h-4 w-4" />
      case "fix":
        return <Bug className="h-4 w-4" />
      default:
        return <GitBranch className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "feature":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Новое
          </Badge>
        )
      case "improvement":
        return (
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
            Улучшение
          </Badge>
        )
      case "fix":
        return (
          <Badge variant="default" className="bg-red-500 hover:bg-red-600">
            Исправление
          </Badge>
        )
      default:
        return <Badge variant="secondary">Изменение</Badge>
    }
  }

  const getVersionBadge = (type: string) => {
    switch (type) {
      case "major":
        return (
          <Badge variant="default" className="bg-purple-500 hover:bg-purple-600">
            Мажорное обновление
          </Badge>
        )
      case "minor":
        return (
          <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">
            Минорное обновление
          </Badge>
        )
      case "patch":
        return <Badge variant="secondary">Патч</Badge>
      case "initial":
        return (
          <Badge variant="default" className="bg-indigo-500 hover:bg-indigo-600">
            Первый релиз
          </Badge>
        )
      default:
        return <Badge variant="secondary">Обновление</Badge>
    }
  }

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">История версий</h1>
          <p className="text-lg text-muted-foreground">
            Полный список изменений и обновлений методического пособия МВД
          </p>
        </div>

        <div className="space-y-8">
          {versions.map((version, index) => (
            <Card key={version.version} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-2xl font-bold">Версия {version.version}</CardTitle>
                    {getVersionBadge(version.type)}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{version.date}</span>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Текущая версия - крупное обновление с новыми функциями
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {version.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2 mt-0.5">
                        {getTypeIcon(change.type)}
                        {getTypeBadge(change.type)}
                      </div>
                      <p className="text-sm leading-relaxed flex-1">{change.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Разработано для МВД Республики Провинция (РП)</p>
            <a
              href="https://vk.com/id503251431"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Разработчик: Poseidon_Wagner
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
