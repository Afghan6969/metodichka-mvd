"use client"

import { Badge as UIBadge } from"@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card"
import { Shield, Star, Award, Users, Car, Crown, Badge as BadgeIcon } from"lucide-react"
import { PageHeader } from"@/components/page-header"

export function GuvdPositionsPage() {
 const positions = [
 {
 category:"Руководящий состав",
 icon: Shield,
 color:"bg-blue border-border",
 titleColor:"text-foreground",
 positions: [
 { title:"Начальник ГУВД", abbr:"Нач. ГУВД", rank:"Генерал", level:"11 ранг" },
 { title:"Первый заместитель начальника ГУВД", abbr:"Пр. Зам. Нач.", rank:"Полковник", level:"10 ранг" },
 {
 title:"Заместитель начальника ГУВД, ответственный за спец. подразделения",
 abbr:"Зам. Нач. отв. за СП",
 rank:"Полковник",
 level:"10 ранг",
 },
 {
 title:"Заместитель начальника ГУВД, начальник отдела кадров",
 abbr:"Зам. Нач. нач. ОК",
 rank:"Полковник",
 level:"10 ранг",
 },
 {
 title:"Заместитель начальника ГУВД, начальник тыла",
 abbr:"Зам. Нач. нач. тыла",
 rank:"Полковник",
 level:"10 ранг",
 },
 ],
 },
 {
 category:"Старший состав",
 icon: Star,
 color:"bg-blue border-border",
 titleColor:"text-foreground",
 positions: [
 {
 title:"Начальник Отряда Мобильного Особого Назначения / Начальник Специального Отряда Быстрого Реагирования",
 abbr:"Нач. ОМОН / Нач. СОБР",
 rank:"Подполковник",
 level:"9 ранг",
 },
 { title:"Начальник Патрульно-постовой службы", abbr:"Нач. ППС", rank:"Подполковник", level:"9 ранг" },
 { title:"Начальник Полицейской академии", abbr:"Нач. ПА", rank:"Подполковник", level:"9 ранг" },
 {
 title:"Начальник Отдела воздушного патрулирования",
 abbr:"Нач. ОВП",
 rank:"Подполковник",
 level:"9 ранг",
 },
 ],
 },
 {
 category:"Отдел воздушного патрулирования",
 icon: Award,
 color:"bg-blue border-border",
 titleColor:"text-foreground",
 positions: [{ title:"Сотрудник ОВП", abbr:"ОВП", rank:"Лейтенант–Майор", level:"5-8 ранг" }],
 },
 {
 category:"Отряд мобильного особого назначения",
 icon: Shield,
 color:"bg-blue border-border",
 titleColor:"text-foreground",
 positions: [{ title:"Боец ОМОНа", abbr:"ОМОН", rank:"Лейтенант–Капитан", level:"5-7 ранг" }],
 },
 {
 category:"Специальный отряд быстрого реагирования",
 icon: Shield,
 color:"bg-blue border-border",
 titleColor:"text-foreground",
 positions: [{ title:"Боец СОБРа", abbr:"СОБР", rank:"Лейтенант–Капитан", level:"5-7 ранг" }],
 },
 {
 category:"Патрульно-постовая служба",
 icon: Users,
 color:"bg-blue border-border",
 titleColor:"text-foreground",
 positions: [
 { title:"Старший инспектор ППС", abbr:"Ст. Инсп. ППС", rank:"Старший Лейтенант–Капитан", level:"6-7 ранг" },
 { title:"Инспектор ППС", abbr:"Инсп. ППС", rank:"Лейтенант", level:"5 ранг" },
 { title:"Младший инспектор ППС", abbr:"Мл. Инсп. ППС", rank:"Старшина–Прапорщик", level:"3-4 ранг" },
 ],
 },
 {
 category:"Полицейская академия",
 icon: Award,
 color:"bg-blue border-border",
 titleColor:"text-foreground",
 positions: [{ title:"Курсант ПА", abbr:"ПА", rank:"Рядовой–Сержант", level:"1-2 ранг" }],
 },
 ]

 const totalPositions = positions.reduce((sum, section) => sum + section.positions.length, 0)

 return (
 <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
 <PageHeader
 icon={BadgeIcon}
 title="Должности ГУВД"
 description="Структура должностей и званий ГУВД МВД РП"
 badge={`${totalPositions} должностей`}
 />

 <div className="grid gap-4">
 {positions.map((section, index) => {
 const Icon = section.icon
 return (
 <div key={index} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/8 hover:border-white/15 transition-all duration-200">
 <div className="bg-red-950/30 px-5 py-3 border-b border-white/10">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-400/30">
 <Icon className="h-5 w-5 text-red-300" />
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
 <UIBadge variant="outline" className="border-blue-400/40 text-blue-200 bg-blue-950/40 text-xs font-mono px-2.5 py-0.5">
 {position.abbr}
 </UIBadge>
 <UIBadge variant="outline" className="border-purple-400/40 text-purple-200 bg-purple-950/40 text-xs px-2.5 py-0.5">
 {position.rank}
 </UIBadge>
 <UIBadge variant="outline" className="border-green-400/40 text-green-200 bg-green-950/40 text-xs px-2.5 py-0.5">
 {position.level}
 </UIBadge>
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

