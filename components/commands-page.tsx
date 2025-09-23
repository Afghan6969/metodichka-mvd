"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, Terminal, Shield, Users, AlertTriangle, Crown } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

interface CommandCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  commands: CommandItem[]
  category: "radio" | "info" | "arrest" | "admin" | "special"
  rankRequired?: string
}

interface CommandItem {
  command: string
  description: string
  rankRequired?: string
}

export function CommandsPage() {
  const getItemIcon = (IconComponent: React.ComponentType<any>) => {
    return <IconComponent className="h-5 w-5" />
  }

  const commandCategories: CommandCategory[] = [
    {
      id: "radio",
      title: "Рации",
      description: "Команды для радиосвязи",
      icon: Radio,
      category: "radio",
      commands: [
        { command: "/r [text]", description: "Рация ГИБДД/ГУВД" },
        { command: "/rb [text]", description: "NonRP чат рации ГИБДД/ГУВД" },
        { command: "/ro [text]", description: "Общий чат сотрудников ГУВД и ГИБДД" },
        { command: "/rob [text]", description: "Общий NonRP ГУВД и ГИБДД" },
        { command: "/d [Text]", description: "Рация между всеми фракциями", rankRequired: "7+" },
        { command: "/db [Text]", description: "NonRP рация между всеми фракциями", rankRequired: "7+" },
        { command: "/fracvoice [0/1]", description: "Выключить / Включить фракционную голосовую рацию" },
      ],
    },
    {
      id: "info",
      title: "Информационные команды",
      description: "Получение информации и статистики",
      icon: Terminal,
      category: "info",
      commands: [
        { command: "/find", description: "Список игроков во фракции онлайн" },
        { command: "/wanted", description: "Список всех игроков онлайн которые находятся в розыске" },
        { command: "/fines", description: "Список игроков, имеющих штрафы" },
        { command: "/crimrec [ID]", description: "Показывает совершенные преступления игрока" },
        { command: "/paytime", description: "Время до начисления зарплаты" },
        { command: "Клавиша Ю", description: "Список сотрудников фракции", rankRequired: "9+" },
      ],
    },
    {
      id: "arrest",
      title: "Команды задержания",
      description: "Задержание и конвоирование преступников",
      icon: Shield,
      category: "arrest",
      commands: [
        { command: "/cuff [ID]", description: "Надевает на преступника наручники (игрок должен быть в розыске)" },
        { command: "/uncuff [ID]", description: "Снимает наручники с преступника" },
        { command: "/putpl [ID]", description: "Посадить преступника в машину" },
        { command: "/arr [ID]", description: "Конвоировать преступника за собой" },
        { command: "/dearr [ID]", description: "Перестать конвоировать преступника за собой" },
        {
          command: "/arrest [ID]",
          description:
            "Посадить игрока в КПЗ (Необходимо находиться на заднем дворе полиции, преступник должен быть в розыске и наручниках)",
        },
      ],
    },
    {
      id: "admin",
      title: "Административные команды",
      description: "Управление розыском и штрафами",
      icon: Users,
      category: "admin",
      commands: [
        {
          command: "/su [ID] [Уровень розыска 1-3] [Причина]",
          description: "Подать игрока в розыск",
          rankRequired: "2+",
        },
        {
          command: "/tsu [ID] [сумма штрафа] [Причина]",
          description: "Выдать игроку штраф от 500 до 100.000 (ГИБДД)/250.000 (ГУВД)",
          rankRequired: "3/5+",
        },
        { command: "/clear [ID]", description: "Убрать розыск с преступника", rankRequired: "3+" },
        { command: "/jailbreak [ID]", description: "Выпустить заключенного из КПЗ", rankRequired: "8+" },
        {
          command: "/giverank [ID] [Номер ранга]",
          description: "Изменить ранг (9-10 ранги могут повышать до 8 ранг)",
          rankRequired: "9+",
        },
        { command: "/invite [ID]", description: "Принять во фракцию", rankRequired: "10+" },
        { command: "/uninvite [ID]", description: "Уволить из фракции", rankRequired: "9+" },
      ],
    },
    {
      id: "gibdd",
      title: "Специальные команды ГИБДД",
      description: "Команды для работы с водительскими правами",
      icon: AlertTriangle,
      category: "special",
      commands: [
        {
          command: "/takecarlic [ID] [Срок 1-4]",
          description: "Отобрать права на определенный срок",
          rankRequired: "3+",
        },
        {
          command: "/givecarlic [ID]",
          description: "Обнуляет срок отсутствия возможности получить права",
          rankRequired: "9+",
        },
      ],
    },
    {
      id: "leadership",
      title: "Команды высшего руководства",
      description: "Команды для руководящего состава",
      icon: Crown,
      category: "special",
      commands: [{ command: "/gov", description: "Написать государственные новости", rankRequired: "10+" }],
    },
  ]

  const radioCommands = commandCategories.filter((cat) => cat.category === "radio")
  const infoCommands = commandCategories.filter((cat) => cat.category === "info")
  const arrestCommands = commandCategories.filter((cat) => cat.category === "arrest")
  const adminCommands = commandCategories.filter((cat) => cat.category === "admin")
  const specialCommands = commandCategories.filter((cat) => cat.category === "special")

  return (
    <div className="space-y-6 bg-background min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
          <Terminal className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Команды сотрудников МВД</h1>
          <p className="text-muted-foreground">Полный список игровых команд и их описание</p>
        </div>
      </div>

      {/* Команды рации */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-card-foreground flex items-center gap-2 text-xl">
            <Radio className="h-5 w-5 text-blue-400" />
            Команды рации
          </CardTitle>
          <CardDescription className="text-muted-foreground">Радиосвязь между сотрудниками и фракциями</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {radioCommands[0].commands.map((command, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
              >
                <div className="text-blue-400 mt-1">
                  <Radio className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="font-mono text-sm bg-muted text-foreground px-3 py-1.5 rounded border border-border">
                      {command.command}
                    </code>
                    {command.rankRequired && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                        {command.rankRequired}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{command.description}</p>
                </div>
                <CopyButton
                  text={command.command}
                  className="flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Информационные команды */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-card-foreground flex items-center gap-2 text-xl">
            <Terminal className="h-5 w-5 text-green-400" />
            Информационные команды
          </CardTitle>
          <CardDescription className="text-muted-foreground">Получение данных и статистики</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {infoCommands[0].commands.map((command, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
              >
                <div className="text-green-400 mt-1">
                  <Terminal className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="font-mono text-sm bg-muted text-foreground px-3 py-1.5 rounded border border-border">
                      {command.command}
                    </code>
                    {command.rankRequired && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                        {command.rankRequired}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{command.description}</p>
                </div>
                <CopyButton
                  text={command.command}
                  className="flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Команды задержания */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-card-foreground flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-yellow-400" />
            Команды задержания
          </CardTitle>
          <CardDescription className="text-muted-foreground">Задержание и конвоирование преступников</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {arrestCommands[0].commands.map((command, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
              >
                <div className="text-yellow-400 mt-1">
                  <Shield className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="font-mono text-sm bg-muted text-foreground px-3 py-1.5 rounded border border-border">
                      {command.command}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">{command.description}</p>
                </div>
                <CopyButton
                  text={command.command}
                  className="flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Административные команды */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-card-foreground flex items-center gap-2 text-xl">
            <Users className="h-5 w-5 text-orange-400" />
            Административные команды
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Управление розыском, штрафами и персоналом
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminCommands[0].commands.map((command, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
              >
                <div className="text-orange-400 mt-1">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="font-mono text-sm bg-muted text-foreground px-3 py-1.5 rounded border border-border">
                      {command.command}
                    </code>
                    {command.rankRequired && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                        {command.rankRequired}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{command.description}</p>
                </div>
                <CopyButton
                  text={command.command}
                  className="flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Специальные команды */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-card-foreground flex items-center gap-2 text-xl">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Специальные команды
          </CardTitle>
          <CardDescription className="text-muted-foreground">Команды ГИБДД и высшего руководства</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {specialCommands.map((category) => (
              <div key={category.id} className="space-y-3">
                <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                  {getItemIcon(category.icon)}
                  {category.title}
                </h3>
                <div className="space-y-2">
                  {category.commands.map((command, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm"
                    >
                      <div className="text-red-400 mt-1">{getItemIcon(category.icon)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <code className="font-mono text-sm bg-muted text-foreground px-3 py-1.5 rounded border border-border">
                            {command.command}
                          </code>
                          {command.rankRequired && (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                              {command.rankRequired}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{command.description}</p>
                      </div>
                      <CopyButton
                        text={command.command}
                        className="flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Анимации */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-card-foreground flex items-center gap-2 text-xl">
            <Users className="h-5 w-5 text-purple-400" />
            Анимации
          </CardTitle>
          <CardDescription className="text-muted-foreground">Команды для воспроизведения анимаций</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm">
              <div className="text-purple-400 mt-1">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <code className="font-mono text-sm bg-muted text-foreground px-3 py-1.5 rounded border border-border">
                    /animarmy [1-9]
                  </code>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Вызов анимации</p>
                <div className="bg-background border border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Список анимаций:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>1. Отжимания</div>
                    <div>2. Приседания</div>
                    <div>3. Воинское приветствие</div>
                    <div>4. Стойка смирно</div>
                    <div>5. Строевой шаг</div>
                    <div>6. Поворот кругом</div>
                    <div>7. Поворот налево</div>
                    <div>8. Поворот направо</div>
                    <div className="col-span-2">9. Упражнение "полтора"</div>
                  </div>
                </div>
              </div>
              <CopyButton
                text="/animarmy [1-9]"
                className="flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity"
              />
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
