"use client"

import { useState } from"react"
import { Badge } from"@/components/ui/badge"
import { Shield, Users, AlertTriangle, Search } from"lucide-react"
import { CopyButton } from"@/components/copy-button"
import { PageHeader } from"@/components/page-header"
import { Input } from"@/components/ui/input"

interface CommandCategory {
 id: string
 title: string
 description: string
 icon: React.ComponentType<any>
 commands: CommandItem[]
 category:"common" |"guvd" |"gibdd"
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
 id:"common",
 title:"Общие команды ГУВД и ГИБДД",
 description:"Общие команды для сотрудников ГУВД и ГИБДД",
 icon: Shield,
 category:"common",
 commands: [
 // Рации
 { command:"/r [text]", description:"Рация ГИБДД/ГУВД" },
 { command:"/rb [text]", description:"NonRP чат рации ГИБДД/ГУВД" },
 { command:"/ro [text]", description:"Общий чат сотрудников ГУВД и ГИБДД" },
 { command:"/rob [text]", description:"Общий NonRP ГУВД и ГИБДД" },
 { command:"/d [Text]", description:"Рация между всеми фракциями", rankRequired:"7+" },
 { command:"/db [Text]", description:"NonRP рация между всеми фракциями", rankRequired:"7+" },
 { command:"/fracvoice [0/1]", description:"Выключить / Включить фракционную голосовую рацию" },

 // Информационные команды
 { command:"/find", description:"Список игроков во фракции онлайн" },
 { command:"/wanted", description:"Список всех игроков онлайн которые находятся в розыске" },
 { command:"/crimrec [ID]", description:"Показывает совершенные преступления игрока" },
 { command:"/paytime", description:"Время до начисления зарплаты" },
 { command:"Клавиша Ю", description:"Список сотрудников фракции", rankRequired:"9+" },

 // Команды задержания
 { command:"/cuff [ID]", description:"Надевает на преступника наручники" },
 { command:"/uncuff [ID]", description:"Снимает наручники с преступника" },
 { command:"/putpl [ID]", description:"Посадить преступника в машину" },
 { command:"/arr [ID]", description:"Конвоировать преступника за собой" },
 { command:"/dearr [ID]", description:"Перестать конвоировать преступника за собой" },
 {
 command:"/arrest [ID]",
 description:
"Посадить игрока в КПЗ (Необходимо находиться вблизи полицейского участка, преступник должен быть в розыске и в наручниках)",
 },

 // Административные команды
 {
 command:"/su [ID] [Уровень розыска 1-6] [Причина]",
 description:"Подать игрока в розыск",
 rankRequired:"2+",
 },
 {
 command:"/tsu [ID] [сумма штрафа] [Причина]",
 description:"Выдать игроку штраф от 500 до 100.000 (ГИБДД)/250.000 (ГУВД)",
 rankRequired:"3/5+",
 },
 {
 command:"/giverank [ID] [Номер ранга]",
 description:"Изменить ранг (9-10 ранги могут повышать до 8 ранг)",
 rankRequired:"9+",
 },
 { command:"/invite [ID]", description:"Принять во фракцию", rankRequired:"10+" },
 { command:"/uninvite [ID]", description:"Уволить из фракции", rankRequired:"9+" },

 // Команды руководства
 { command:"/gov", description:"Написать государственные новости", rankRequired:"10+" },
 ],
 },
 {
 id:"guvd",
 title:"Команды ГУВД",
 description:"Специфичные команды для сотрудников ГУВД",
 icon: Users,
 category:"guvd",
 commands: [
 { command:"/clear [ID]", description:"Убрать розыск с преступника"},
 { command:"/jailbreak [ID]", description:"Выпустить заключенного из КПЗ", rankRequired:"8+" },
 ],
 },
 {
 id:"gibdd",
 title:"Команды ГИБДД",
 description:"Специфичные команды для сотрудников ГИБДД",
 icon: AlertTriangle,
 category:"gibdd",
 commands: [
 { command:"/fines", description:"Список игроков, имеющих штрафы (от 10.000 штрафов)" },
 { command:"/wcar", description:"Список транспорта, находящихся в розыске" },
 { command:"/skan [ID]", description:"Показывает сумму штрафов у гражданина" },
 {
 command:"/takecarlic [ID] [Срок 1-4]",
 description:"Отобрать права на определенный срок",
 rankRequired:"3+",
 },
 {
 command:"/givecarlic [ID]",
 description:"Обнуляет срок отсутствия возможности получить права",
 rankRequired:"9+",
 },
 ],
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
 common: { icon: Shield, color:"from-blue-500/80 to-blue-600/60" },
 guvd: { icon: Users, color:"from-purple-500/80 to-purple-600/60" },
 gibdd: { icon: AlertTriangle, color:"from-yellow-500/80 to-yellow-600/60" },
 }

 return (
 <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
 <PageHeader 
 icon={Shield}
 title="Команды МВД"
 description="Полный список игровых команд и их описание"
 badge={`${filteredCategories.length} категорий`}
 />

 {/* Search */}
 <div className="relative">
 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
 <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
 <Search className="h-4 w-4 text-blue-300" />
 </div>
 </div>
 <Input
 type="text"
 placeholder="Поиск команд..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="pl-12 h-14 text-base border-2 border-blue-400/30 rounded-xl bg-black/5 font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder:text-blue-300/60"
 />
 </div>

 {/* Commands Grid */}
 <div className="space-y-6">
 {filteredCategories.map((category) => {
 const iconData = categoryIcons[category.category]
 const IconComponent = iconData.icon

 return (
 <div key={category.id} className="rounded-2xl border-2 border-primary/20 bg-card shadow-md hover:shadow-md hover:border-primary/40 transition-all overflow-hidden">
 <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b-2 border-primary/20">
 <div className={`w-12 h-12 bg-gradient-to-br ${iconData.color} rounded-xl flex items-center justify-center shadow-lg`}>
 <IconComponent className="h-6 w-6 text-white" />
 </div>
 <div className="flex-1">
 <h2 className="text-xl font-bold uppercase text-foreground">{category.title}</h2>
 <p className="text-sm text-muted-foreground">{category.description}</p>
 </div>
 <Badge variant="secondary" className="text-xs">
 {category.commands.length} {category.commands.length % 10 === 1 && category.commands.length % 100 !== 11
 ? 'команда'
 : category.commands.length % 10 >= 2 && category.commands.length % 10 <= 4 && (category.commands.length % 100 < 10 || category.commands.length % 100 >= 20)
 ? 'команды'
 : 'команд'}
 </Badge>
 </div>

 <div className="space-y-3 p-6">
 {category.commands.map((command, index) => (
 <div
 key={index}
 className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all"
 >
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 mb-2 flex-wrap">
 <code className="font-mono text-sm bg-card/80 text-foreground px-4 py-2 rounded-lg border border-border">
 {command.command}
 </code>
 {command.rankRequired && (
 <Badge variant="outline" className="text-xs border-primary">
 Ранг {command.rankRequired}
 </Badge>
 )}
 </div>
 <p className="text-sm text-muted-foreground leading-relaxed">{command.description}</p>
 </div>
 <div className="flex-shrink-0">
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
 <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
 <Search className="h-10 w-10 text-blue-300" />
 </div>
 <p className="text-xl font-bold text-white mb-2">Команды не найдены</p>
 <p className="text-blue-200/80">Попробуйте изменить поисковый запрос</p>
 </div>
 )}
 </div>
 )
}
