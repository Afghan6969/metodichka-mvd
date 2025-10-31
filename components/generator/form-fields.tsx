"use client"

import { Button } from"@/components/ui/button"
import { Input } from"@/components/ui/input"
import { Label } from"@/components/ui/label"
import { DatePicker } from"@/components/ui/date-picker"
import { Check, ChevronsUpDown, Trash2 } from"lucide-react"
import { motion, AnimatePresence } from"framer-motion"
import { cn } from"@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from"@/components/ui/command"
import { cities } from"./constants"
import { Requirement, Department, ReportType } from"./types"

interface CitySelectProps {
 city: string
 setCity: (city: string) => void
 openCity: boolean
 setOpenCity: (open: boolean) => void
 setOpenPosition: (open: boolean) => void
 setOpenRank: (open: boolean) => void
}

export function CitySelect({
 city,
 setCity,
 openCity,
 setOpenCity,
 setOpenPosition,
 setOpenRank,
}: CitySelectProps) {
 return (
 <div>
 <Label htmlFor="city" className="text-sm font-medium text-blue-200/90 mb-2 block">
 Город
 </Label>
 <div className="relative w-full">
 <Button
 variant="outline"
 role="combobox"
 aria-expanded={openCity}
 className="w-full justify-between bg-black/5 border-blue-400/30 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
 onClick={() => {
 setOpenCity(!openCity)
 setOpenPosition(false)
 setOpenRank(false)
 }}
 >
 {city ||"Выберите город..."}
 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
 </Button>
 <AnimatePresence>
 {openCity && (
 <motion.div
 initial={{ opacity: 0, y: -10, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: -10, scale: 0.95 }}
 transition={{ duration: 0.15, ease:"easeOut" }}
 className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 border border-white/20 rounded-xl shadow-lg"
 >
 <Command>
 <CommandInput
 placeholder="Поиск города..."
 className="bg-black/5 border-white/10 text-white placeholder:text-blue-200/60"
 />
 <CommandEmpty className="text-blue-200/60">Города не найдены.</CommandEmpty>
 <CommandList className="max-h-[200px] overflow-y-auto">
 <CommandGroup>
 {cities.map((c) => (
 <CommandItem
 key={c}
 value={c}
 onSelect={() => {
 setCity(c)
 setOpenCity(false)
 }}
 className="hover:bg-white/10 text-white data-[selected]:text-blue-200 data-[selected]:bg-transparent"
 >
 <Check
 className={cn("mr-2 h-4 w-4", city === c ?"opacity-100 text-blue-300" :"opacity-0")}
 />
 {c}
 </CommandItem>
 ))}
 </CommandGroup>
 </CommandList>
 </Command>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 )
}

interface LeaderFioInputProps {
 leaderFio: string
 setLeaderFio: (fio: string) => void
}

export function LeaderFioInput({ leaderFio, setLeaderFio }: LeaderFioInputProps) {
 return (
 <div>
 <Label htmlFor="leaderFio" className="text-sm font-medium text-blue-200/90 mb-2 block">
 ФИО лидера <span className="text-xs text-blue-300/70">(Иванов Иван Иванович)</span>
 </Label>
 <Input
 id="leaderFio"
 value={leaderFio}
 onChange={(e) => setLeaderFio(e.target.value)}
 placeholder="Иванов Иван Иванович"
 className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
 />
 </div>
 )
}

interface FioInputProps {
 fio: string
 setFio: (fio: string) => void
 label?: string
 placeholder?: string
}

export function FioInput({ fio, setFio, label ="Ваше ФИО", placeholder ="Иванов Иван Иванович" }: FioInputProps) {
 return (
 <div>
 <Label htmlFor="fio" className="text-sm font-medium text-blue-200/90 mb-2 block">
 {label}
 </Label>
 <Input
 id="fio"
 value={fio}
 onChange={(e) => setFio(e.target.value)}
 placeholder={placeholder}
 className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
 />
 </div>
 )
}

interface DateRangeInputsProps {
 fromDate?: Date
 toDate?: Date
 setFromDate: (date?: Date) => void
 setToDate: (date?: Date) => void
}

export function DateRangeInputs({ fromDate, toDate, setFromDate, setToDate }: DateRangeInputsProps) {
 return (
 <>
 <div>
 <Label htmlFor="fromDate" className="text-sm font-medium text-blue-200/90 mb-2 block">
 Дата с
 </Label>
 <DatePicker date={fromDate} onDateChange={setFromDate} placeholder="Выберите дату начала" />
 </div>
 <div>
 <Label htmlFor="toDate" className="text-sm font-medium text-blue-200/90 mb-2 block">
 Дата по
 </Label>
 <DatePicker date={toDate} onDateChange={setToDate} placeholder="Выберите дату окончания" />
 </div>
 </>
 )
}

interface RequirementsListProps {
 requirements: Requirement[]
 setRequirements: (requirements: Requirement[]) => void
 department: Department
}

export function RequirementsList({ requirements, setRequirements, department }: RequirementsListProps) {
 const addRequirement = () => {
 setRequirements([...requirements, { req:"", quantity: department ==="ГИБДД" ?"" : undefined, link:"" }])
 }

 const removeRequirement = (index: number) => {
 if (requirements.length > 1) {
 setRequirements(requirements.filter((_, i) => i !== index))
 }
 }

 const updateRequirement = (index: number, field:"req" |"quantity" |"link", value: string) => {
 const newReqs = [...requirements]
 newReqs[index][field] = value
 setRequirements(newReqs)
 }

 return (
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <div>
 <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
 Требования/Задачи
 {department ==="ГИБДД" && (
 <p className="text-xs text-blue-300/70 ml-10 mt-1">💡 Важно: 1 лекция или тренировка = 1 ссылка</p>
 )}
 </Label>
 </div>
 </div>

 <div className="space-y-3">
 {requirements.map((req, index) => (
 <div
 key={index}
 className="relative bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 hover:border-white/20 transition-all duration-200 group"
 >
 <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center border border-blue-400/40 text-xs font-bold text-blue-200">
 {index + 1}
 </div>

 <div className="flex gap-3 items-start">
 <div className="flex-1 space-y-3">
 <div>
 <Label className="text-xs text-blue-300/80 mb-1.5 block">Название задачи</Label>
 <Input
 placeholder="Например: Патрулирование, Оформление ДТП, Лекция..."
 value={req.req}
 onChange={(e) => updateRequirement(index,"req", e.target.value)}
 className="bg-black/20 border-blue-400/30 text-white placeholder:text-blue-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
 />
 </div>

 <div
 className="grid gap-3"
 style={{ gridTemplateColumns: department ==="ГИБДД" ?"120px 1fr" :"1fr" }}
 >
 {department ==="ГИБДД" && (
 <div>
 <Label className="text-xs text-blue-300/80 mb-1.5 block">Количество</Label>
 <Input
 placeholder="0"
 value={req.quantity ||""}
 onChange={(e) => updateRequirement(index,"quantity", e.target.value)}
 className="bg-black/20 border-blue-400/30 text-white placeholder:text-blue-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-center font-semibold"
 />
 </div>
 )}
 <div>
 <Label className="text-xs text-blue-300/80 mb-1.5 block">Ссылка на подтверждение</Label>
 <Input
 placeholder="https://..."
 value={req.link}
 onChange={(e) => updateRequirement(index,"link", e.target.value)}
 className="bg-black/20 border-blue-400/30 text-white placeholder:text-blue-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
 />
 </div>
 </div>
 </div>

 <Button
 variant="ghost"
 size="icon"
 onClick={() => removeRequirement(index)}
 disabled={requirements.length === 1}
 className="h-9 w-9 mt-6 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-400/20 hover:border-red-400/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
 title="Удалить требование"
 >
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 </div>
 ))}
 </div>

 <Button
 variant="outline"
 onClick={addRequirement}
 className="w-full border-2 border-dashed border-blue-400/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/60 transition-all duration-200 py-6 group"
 >
 <div className="flex items-center gap-2">
 <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
 <span className="text-lg leading-none">+</span>
 </div>
 <span className="font-medium">Добавить требование</span>
 </div>
 </Button>
 </div>
 )
}

// Leader report uses standard fields: FioInput, DateRangeInputs, RequirementsList
