"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Radio, Terminal, Shield, Users, AlertTriangle, Crown, Search } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"

interface CommandCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  commands: CommandItem[]
  category: "radio" | "info" | "arrest" | "admin" | "special"
}

interface CommandItem {
  command: string
  description: string
  rankRequired?: string
}

export function CommandsPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
        { command: "/skan [ID]", description: "Показывает сумму штрафов у гражданина" },
        { command: "/wanted", description: "Список всех игроков онлайн которые находятся в розыске" },
        { command: "/fines", description: "Список игроков, имеющих штрафы (от 10.000 штрафов)" },
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
        { command: "/cuff [ID]", description: "Надевает на преступника наручники" },
        { command: "/uncuff [ID]", description: "Снимает наручники с преступника" },
        { command: "/putpl [ID]", description: "Посадить преступника в машину" },
        { command: "/arr [ID]", description: "Конвоировать преступника за собой" },
        { command: "/dearr [ID]", description: "Перестать конвоировать преступника за собой" },
        {
          command: "/arrest [ID]",
          description:
            "Посадить игрока в КПЗ (Необходимо находиться вблизи полицейского участка, преступник должен быть в розыске и в наручниках)",
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
          command: "/su [ID] [Уровень розыска 1-6] [Причина]",
          description: "Подать игрока в розыск",
          rankRequired: "2+",
        },
        {
          command: "/tsu [ID] [сумма штрафа] [Причина]",
          description: "Выдать игроку штраф от 500 до 100.000 (ГИБДД)/250.000 (ГУВД)",
          rankRequired: "3/5+",
        },
        { command: "/clear [ID]", description: "Убрать розыск с преступника"},
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

  const filteredCategories = commandCategories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.commands.some(
      (cmd) =>
        cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const categoryIcons: Record<string, { icon: any; color: string }> = {
    radio: { icon: Radio, color: "from-accent to-accent/70" },
    info: { icon: Terminal, color: "from-primary to-primary/70" },
    arrest: { icon: Shield, color: "from-accent to-accent/70" },
    admin: { icon: Users, color: "from-primary to-primary/70" },
    special: { icon: Crown, color: "from-accent to-primary" },
  }

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={Terminal}
        title="Команды МВД"
        description="Полный список игровых команд и их описание"
        badge={`${filteredCategories.length} категорий`}
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
        <Input
          type="text"
          placeholder="Поиск команд..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-base border-2 border-primary/30 rounded-xl bg-background/50 font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Commands Grid */}
      <div className="space-y-6">
        {filteredCategories.map((category) => {
          const iconData = categoryIcons[category.category]
          const IconComponent = iconData.icon
          
          return (
            <div key={category.id} className="military-card">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${iconData.color} rounded-xl flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20`}>
                  <IconComponent className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black uppercase tracking-wide mb-1">{category.title}</h2>
                  <p className="text-muted-foreground font-semibold">{category.description}</p>
                </div>
                <Badge variant="outline" className="border-accent/40 text-accent font-semibold">
                  {category.commands.length} команд
                </Badge>
              </div>
              
              <div className="space-y-3">
                {category.commands.map((command, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl border-2 border-primary/20 bg-muted/30 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-background/80 text-foreground px-3 py-1.5 rounded-lg border border-primary/30 font-semibold">
                          {command.command}
                        </code>
                        {command.rankRequired && (
                          <Badge variant="outline" className="border-primary/40 text-primary font-semibold">
                            Ранг {command.rankRequired}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed">{command.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={command.command} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {filteredCategories.length === 0 && searchQuery && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-muted-foreground mb-2">Команды не найдены</p>
          <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
        </div>
      )}
    </div>
  )
}
