"use client"

import * as React from"react"
import { format } from"date-fns"
import { ru } from"date-fns/locale"
import { Calendar as CalendarIcon } from"lucide-react"

import { cn } from"@/lib/utils"
import { Button } from"@/components/ui/button"
import { Calendar } from"@/components/ui/calendar"
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from"@/components/ui/popover"

interface DatePickerProps {
 date?: Date
 onDateChange?: (date: Date | undefined) => void
 placeholder?: string
 disabled?: boolean
}

export function DatePicker({ date, onDateChange, placeholder ="Выберите дату", disabled }: DatePickerProps) {
 return (
 <Popover>
 <PopoverTrigger asChild>
 <Button
 variant={"outline"}
 className={cn(
"w-full justify-start text-left font-normal bg-black/5 border-blue-400/30 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200",
 !date &&"text-blue-200/60"
 )}
 disabled={disabled}
 >
 <CalendarIcon className="mr-2 h-4 w-4 text-blue-300" />
 {date ? format(date,"dd.MM.yyyy", { locale: ru }) : <span>{placeholder}</span>}
 </Button>
 </PopoverTrigger>
 <PopoverContent className="w-auto p-0 bg-white/10 border-white/20 shadow-md" align="start">
 <div className="animate-in fade-in-0 zoom-in-95 duration-200">
 <Calendar
 mode="single"
 selected={date}
 onSelect={onDateChange}
 initialFocus
 locale={ru}
 />
 </div>
 </PopoverContent>
 </Popover>
 )
}
