"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ChevronsUpDown, Calculator, Star, GraduationCap, X, DollarSign, Car, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface Violation {
  article: string
  description: string
  fine: number
  suspension: number
  suspensionRange?: { min: number; max: number }
  arrest: number
  arrestRange?: { min: number; max: number }
  retraining: boolean
  alternatives?: Array<{
    name: string
    fine: number
    fineRange?: { min: number; max: number }
    suspension: number
    arrest: number
    arrestRange?: { min: number; max: number }
    retraining: boolean
  }>
}

interface ViolationCategory {
  name: string
  items: Record<string, Violation>
}

const PenaltyCalculator = () => {
  const [selectedViolations, setSelectedViolations] = useState<string[]>([])
  const [selectedPenalties, setSelectedPenalties] = useState<Record<string, string>>({})
  const [selectedFineAmounts, setSelectedFineAmounts] = useState<Record<string, number>>({})
  const [selectedSuspensionAmounts, setSelectedSuspensionAmounts] = useState<Record<string, number>>({})
  const [selectedArrestAmounts, setSelectedArrestAmounts] = useState<Record<string, number>>({})
  const [open, setOpen] = useState(false)

  const violations: Record<string, ViolationCategory> = {
    traffic: {
      name: "Дорожные нарушения (КоАП)",
      items: {
        "5.1": {
          article: "КоАП 5.1",
          description: "Управление ТС без документов",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.2": {
          article: "КоАП 5.2",
          description: "Непредоставление документов по требованию полиции",
          fine: 30000,
          suspension: 0,
          arrest: 0,
          retraining: true,
          alternatives: [
            {
              name: "Штраф 30000",
              fine: 30000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Лишение прав с возможностью переобучения",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: true,
            },
          ],
        },
        "5.3": {
          article: "КоАП 5.3",
          description: "Управление незарегистрированным ТС или без номеров",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.4": {
          article: "КоАП 5.4",
          description: "Управление ТС с тонировкой более 30%",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.5": {
          article: "КоАП 5.5",
          description: "Управление ТС с технической неисправностью",
          fine: 30000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 10000-30000",
              fine: 10000,
              fineRange: { min: 10000, max: 30000 },
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "5.6": {
          article: "КоАП 5.6",
          description: "Управление мотоциклом без шлема",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "5.7": {
          article: "КоАП 5.7",
          description: "Нарушение ПДД пешеходами и велосипедистами",
          fine: 15000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000-15000",
              fine: 5000,
              fineRange: { min: 5000, max: 15000 },
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "5.8": {
          article: "КоАП 5.8",
          description: "Посадка/высадка пассажиров со стороны проезжей части",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },

          ],
        },
        "5.9": {
          article: "КоАП 5.9",
          description: "Игнорирование требования об остановке с помощью жезла",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.10": {
          article: "КоАП 5.10",
          description: "Несоблюдение дорожных знаков или разметки",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "6.1": {
          article: "КоАП 6.1",
          description: "Использование приоритета с маячками без безопасности",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "6.2": {
          article: "КоАП 6.2",
          description: "Нарушение правил использования аварийных сигналов",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 10000",
              fine: 10000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "6.3": {
          article: "КоАП 6.3",
          description: "Нарушение правил использования знака аварийной остановки",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 10000",
              fine: 10000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "6.4": {
          article: "КоАП 6.4",
          description: "Управление ТС с выключенными фарами",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "6.5": {
          article: "КоАП 6.5",
          description: "Использование звукового сигнала в нарушение ПДД",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "7.1": {
          article: "КоАП 7.1",
          description: "Проезд на красный сигнал светофора",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "7.2": {
          article: "КоАП 7.2",
          description: "Невыполнение требования об остановке перед стоп-линией",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "8.1": {
          article: "КоАП 8.1",
          description: "Маневры без использования поворотников",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "8.2": {
          article: "КоАП 8.2",
          description: "Непредоставление преимущества при перестроении",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "8.3": {
          article: "КоАП 8.3",
          description: "Поворот или разворот из неправильной полосы",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "8.4": {
          article: "КоАП 8.4",
          description: "Неправильный поворот, разворот или движение задним ходом",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "9.1": {
          article: "КоАП 9.1",
          description: "Движение по полосе, предназначенной для встречного движения",
          fine: 50000,
          suspension: 2,
          suspensionRange: { min: 0, max: 2 },
          arrest: 0,
          retraining: true,
        },
        "9.2": {
          article: "КоАП 9.2",
          description: "Выезд на полосу встречного движения",
          fine: 50000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "9.3": {
          article: "КоАП 9.3",
          description: "Движение по левым полосам при свободных правых",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "9.4": {
          article: "КоАП 9.4",
          description: "Движение по прерывистым линиям разметки",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 10000",
              fine: 10000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "9.5": {
          article: "КоАП 9.5",
          description: "Движение по разделительным полосам, обочинам, тротуарам",
          fine: 30000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "9.6": {
          article: "КоАП 9.6",
          description: "Несоблюдение дистанции или бокового интервала",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 10000",
              fine: 10000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "10.1": {
          article: "КоАП 10.1",
          description: "Обгон ТС с маячками и звуковым сигналом",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "10.2": {
          article: "КоАП 10.2",
          description: "Обгон ТС с цветографическими схемами и маячками",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "10.3": {
          article: "КоАП 10.3",
          description: "Обгон в запрещенных случаях",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "10.4": {
          article: "КоАП 10.4",
          description: "Препятствование обгону",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.1": {
          article: "КоАП 11.1",
          description: "Остановка/стоянка на пешеходном переходе",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.2": {
          article: "КоАП 11.2",
          description: "Остановка/стоянка в местах остановки маршрутных ТС",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.3": {
          article: "КоАП 11.3",
          description: "Остановка/стоянка на трамвайных путях или далее первого ряда",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.4": {
          article: "КоАП 11.4",
          description: "Нарушение остановки/стоянки, создающее препятствия",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.5": {
          article: "КоАП 11.5",
          description: "Нарушение правил остановки/стоянки",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "12.1": {
          article: "КоАП 12.1",
          description: "Нарушение правил проезда перекрестков без опасности",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "12.2": {
          article: "КоАП 12.2",
          description: "Нарушение правил проезда перекрестков с опасностью",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "13.1": {
          article: "КоАП 13.1",
          description: "Пересечение ж/д путей в неположенном месте",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "13.2": {
          article: "КоАП 13.2",
          description: "Выезд на ж/д переезд в запрещенных случаях",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "13.3": {
          article: "КоАП 13.3",
          description: "Остановка ближе 5 м от шлагбаума или 10 м от рельса",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "14.1": {
          article: "КоАП 14.1",
          description: "Движение по автомагистрали со скоростью менее 40 км/ч",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "14.2": {
          article: "КоАП 14.2",
          description: "Движение грузовиков далее второй полосы на автомагистрали",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "14.3": {
          article: "КоАП 14.3",
          description: "Движение по автомагистрали задним ходом",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "14.4": {
          article: "КоАП 14.4",
          description: "Создание пешеходом помех в жилой зоне",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "14.5": {
          article: "КоАП 14.5",
          description: "Сквозное движение, учебная езда, стоянка в жилой зоне",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "14.6": {
          article: "КоАП 14.6",
          description: "Движение в колонне в нарушение ПДД",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 10000",
              fine: 10000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "15.1": {
          article: "КоАП 15.1",
          description: "Непредоставление преимущества ТС с маячками",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "15.2": {
          article: "КоАП 15.2",
          description: "Непредоставление преимущества троллейбусам/автобусам",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "15.3": {
          article: "КоАП 15.3",
          description: "Непредоставление преимущества на главной дороге",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "15.4": {
          article: "КоАП 15.4",
          description: "Непредоставление преимущества пешеходам/велосипедистам",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Штраф 5000",
              fine: 5000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "16.1": {
          article: "КоАП 16.1",
          description: "Оставление места ДТП",
          fine: 30000,
          suspension: 4,
          suspensionRange: { min: 3, max: 4 },
          arrest: 2,
          retraining: false,
        },
        "16.2": {
          article: "КоАП 16.2",
          description: "Неоказание первой помощи при ДТП",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "16.3": {
          article: "КоАП 16.3",
          description: "Невыполнение обязанностей при ДТП",
          fine: 35000,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 10000-35000",
              fine: 10000,
              fineRange: { min: 10000, max: 35000 },
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "17.1.4": {
          article: "КоАП 17.1.4",
          description: "Управление ТС в состоянии опьянения или передача управления",
          fine: 30000,
          suspension: 1,
          suspensionRange: { min: 0, max: 1 },
          arrest: 0,
          retraining: true,
        },
        "17.1.5": {
          article: "КоАП 17.1.5",
          description: "Невыполнение требования о прохождении освидетельствования",
          fine: 30000,
          suspension: 1,
          suspensionRange: { min: 0, max: 1 },
          arrest: 0,
          retraining: true,
        },
        "17.2": {
          article: "КоАП 17.2",
          description: "Опасное вождение",
          fine: 30000,
          suspension: 2,
          suspensionRange: { min: 0, max: 2 },
          arrest: 0,
          retraining: true,
        },
        "17.5": {
          article: "КоАП 17.5",
          description: "Управление ТС с неуплатой штрафов 50.000–100.000 рублей",
          fine: 50000,
          suspension: 1,
          arrest: 0,
          retraining: false,
        },
        "17.6": {
          article: "КоАП 17.6",
          description: "Управление ТС с неуплатой штрафов более 100.000 рублей",
          fine: 100000,
          suspension: 2,
          arrest: 0,
          retraining: false,
        },
        "18.1": {
          article: "КоАП 18.1",
          description: "Превышение скорости на 10-20 км/ч",
          fine: 0,
          suspension: 0,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "18.2": {
          article: "КоАП 18.2",
          description: "Превышение скорости на 20-40 км/ч",
          fine: 2000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "18.3": {
          article: "КоАП 18.3",
          description: "Превышение скорости на 40-60 км/ч",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "18.4": {
          article: "КоАП 18.4",
          description: "Превышение скорости на 60-80 км/ч",
          fine: 7000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "18.5": {
          article: "КоАП 18.5",
          description: "Превышение скорости на 80+ км/ч",
          fine: 10000,
          suspension: 1,
          arrest: 0,
          retraining: false,
        },
        "19.1": {
          article: "КоАП 19.1",
          description: "Мелкое хулиганство",
          fine: 10000,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Арест 10 суток",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
            {
              name: "Штраф 500-10000",
              fine: 500,
              fineRange: { min: 500, max: 10000 },
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "19.2": {
          article: "КоАП 19.2",
          description: "Оскорбление, унижение чести и достоинства",
          fine: 10000,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Арест 10 суток",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
            {
              name: "Штраф 500-10000",
              fine: 500,
              fineRange: { min: 500, max: 10000 },
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "19.3": {
          article: "КоАП 19.3",
          description: "Нанесение побоев",
          fine: 20000,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Арест 10 суток",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
            {
              name: "Штраф 500-20000",
              fine: 500,
              fineRange: { min: 500, max: 20000 },
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "19.4": {
          article: "КоАП 19.4",
          description: "Потребление алкоголя в общественных местах",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "19.5": {
          article: "КоАП 19.5",
          description: "Занятие попрошайничеством",
          fine: 0,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Предупреждение",
              fine: 0,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 10 суток",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
          ],
        },
        "19.6": {
          article: "КоАП 19.6",
          description: "Предпринимательская деятельность без регистрации",
          fine: 100000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "19.7": {
          article: "КоАП 19.7",
          description: "Заведомо ложный вызов экстренных служб",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "19.8": {
          article: "КоАП 19.8",
          description: "Участие в несанкционированном митинге",
          fine: 20000,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Арест 10 суток",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
            {
              name: "Штраф 500-20000",
              fine: 500,
              fineRange: { min: 500, max: 20000 },
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "19.9": {
          article: "КоАП 19.9",
          description: "Неповиновение законному распоряжению полиции",
          fine: 20000,
          suspension: 1,
          arrest: 0,
          retraining: false,
          alternatives: [
            {
              name: "Арест до 20 суток",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 2 },
              retraining: false,
            },
            {
              name: "Штраф 20000",
              fine: 20000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Лишение прав на 1 год",
              fine: 0,
              suspension: 1,
              arrest: 0,
              retraining: false,
            },
          ],
        },
        "19.10": {
          article: "КоАП 19.10",
          description: "Клевета",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
      },
    },
    criminal_personal: {
      name: "Преступления против личности (УК)",
      items: {
        "4.1": {
          article: "УК 4.1",
          description: "Умышленное причинение вреда здоровью без летального исхода",
          fine: 0,
          suspension: 0,
          arrest: 1,
          retraining: false,
        },
        "4.2": {
          article: "УК 4.2",
          description: "Умышленное нанесение особо тяжких телесных повреждений",
          fine: 0,
          suspension: 0,
          arrest: 2,
          retraining: false,
        },
        "4.2.1": {
          article: "УК 4.2.1",
          description: "Особо тяжкие телесные повреждения двум или более лицам",
          fine: 0,
          suspension: 0,
          arrest: 4,
          arrestRange: { min: 4, max: 6 },
          retraining: false,
          alternatives: [
            {
              name: "Арест 4-6 лет",
              fine: 0,
              suspension: 0,
              arrest: 4,
              arrestRange: { min: 4, max: 6 },
              retraining: false,
            },
          ],
        },
        "4.2.2": {
          article: "УК 4.2.2",
          description: "Особо тяжкие телесные повреждения по неосторожности",
          fine: 0,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Арест 1-2 лет",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 2 },
              retraining: false,
            },
          ],
        },
        "4.3": {
          article: "УК 4.3",
          description: "Угроза нанесения особо тяжких телесных повреждений",
          fine: 0,
          suspension: 0,
          arrest: 1,
          retraining: false,
        },
        "4.4": {
          article: "УК 4.4",
          description: "Похищение гражданина или незаконное лишение свободы",
          fine: 0,
          suspension: 0,
          arrest: 4,
          arrestRange: { min: 4, max: 6 },
          retraining: false,
          alternatives: [
            {
              name: "Арест 4-6 лет",
              fine: 0,
              suspension: 0,
              arrest: 4,
              arrestRange: { min: 4, max: 6 },
              retraining: false,
            },
          ],
        },
        "4.5": {
          article: "УК 4.5",
          description: "Действия против половой неприкосновенности",
          fine: 0,
          suspension: 0,
          arrest: 3,
          arrestRange: { min: 3, max: 6 },
          retraining: false,
          alternatives: [
            {
              name: "Арест 3-6 лет",
              fine: 0,
              suspension: 0,
              arrest: 3,
              arrestRange: { min: 3, max: 6 },
              retraining: false,
            },
          ],
        },
        "4.6": {
          article: "УК 4.6",
          description: "Незаконный сбор сведений о частной жизни",
          fine: 30000,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 30000",
              fine: 30000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 1 год",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
          ],
        },
      },
    },
    criminal_state: {
      name: "Преступления против государственной власти (УК)",
      items: {
        "5.1": {
          article: "УК 5.1",
          description: "Получение взятки должностным лицом",
          fine: 50000,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "5.2": {
          article: "УК 5.2",
          description: "Дача взятки должностному лицу",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "5.3": {
          article: "УК 5.3",
          description: "Посягательство на жизнь и здоровье сотрудника полиции",
          fine: 0,
          suspension: 0,
          arrest: 3,
          arrestRange: { min: 3, max: 6 },
          retraining: false,
          alternatives: [
            {
              name: "Арест 3-6 лет",
              fine: 0,
              suspension: 0,
              arrest: 3,
              arrestRange: { min: 3, max: 6 },
              retraining: false,
            },
          ],
        },
        "5.4": {
          article: "УК 5.4",
          description: "Применение насилия в отношении представителя власти",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
          alternatives: [
            {
              name: "Арест 1-3 лет",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 3 },
              retraining: false,
            },
          ],
        },
        "5.5": {
          article: "УК 5.5",
          description: "Хамство, борзость, дерзость по отношению к сотруднику",
          fine: 15000,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 15000",
              fine: 15000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 1 год",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
          ],
        },
        "5.6": {
          article: "УК 5.6",
          description: "Публичное оскорбление представителей власти",
          fine: 25000,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 25000",
              fine: 25000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 2 года",
              fine: 0,
              suspension: 0,
              arrest: 2,
              retraining: false,
            },
          ],
        },
        "5.7": {
          article: "УК 5.7",
          description: "Провокационные действия в отношении сотрудников",
          fine: 50000,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 50000",
              fine: 50000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 1-2 года",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 2 },
              retraining: false,
            },
          ],
        },
        "5.7.1": {
          article: "УК 5.7.1",
          description: "Длительное преследование экипажа полиции",
          fine: 50000,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 50000",
              fine: 50000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 1-2 года",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 2 },
              retraining: false,
            },
          ],
        },
        "5.8": {
          article: "УК 5.8",
          description: "Неоднократное неповиновение законному распоряжению",
          fine: 0,
          suspension: 0,
          arrest: 2,
          retraining: false,
        },
        "5.8.1": {
          article: "УК 5.8.1",
          description: "Уход от полиции с нанесением ущерба имуществу",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "5.8.2": {
          article: "УК 5.8.2",
          description: "Уход от полиции с причинением телесных повреждений",
          fine: 0,
          suspension: 0,
          arrest: 4,
          retraining: false,
        },
        "5.9": {
          article: "УК 5.9",
          description: "Уничтожение имущества государственных организаций",
          fine: 50000,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 50000",
              fine: 50000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 2 года",
              fine: 0,
              suspension: 0,
              arrest: 2,
              retraining: false,
            },
          ],
        },
        "5.10": {
          article: "УК 5.10",
          description: "Заведомо ложный донос о совершении преступления",
          fine: 25000,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 25000",
              fine: 25000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 2 года",
              fine: 0,
              suspension: 0,
              arrest: 2,
              retraining: false,
            },
          ],
        },
        "5.11": {
          article: "УК 5.11",
          description: "Разглашение секретных данных",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
          alternatives: [
            {
              name: "Арест 1-3 лет",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 3 },
              retraining: false,
            },
          ],
        },
        "5.12": {
          article: "УК 5.12",
          description: "Представление себя служащим государственной организации",
          fine: 30000,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 30000",
              fine: 30000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 1 год",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
          ],
        },
        "5.13": {
          article: "УК 5.13",
          description: "Халатность должностного лица",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
          alternatives: [
            {
              name: "Арест 1-3 лет",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 3 },
              retraining: false,
            },
          ],
        },
      },
    },
    criminal_public: {
      name: "Преступления против общественного порядка (УК)",
      items: {
        "6.1": {
          article: "УК 6.1",
          description: "Терроризм",
          fine: 0,
          suspension: 0,
          arrest: 6,
          retraining: false,
          alternatives: [
            {
              name: "Арест 1-6 лет",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 6 },
              retraining: false,
            },
          ],
        },
        "6.2": {
          article: "УК 6.2",
          description: "Заведомо ложное сообщение о готовящихся взрыве",
          fine: 50000,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "6.3": {
          article: "УК 6.3",
          description: "Захват или удержание заложника",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
          alternatives: [
            {
              name: "Арест 1-3 лет",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 3 },
              retraining: false,
            },
          ],
        },
        "6.4": {
          article: "УК 6.4",
          description: "Организация массовых беспорядков",
          fine: 100000,
          suspension: 0,
          arrest: 1,
          retraining: false,          
          alternatives: [
            {
              name: "Арест 1-6 лет",
              fine: 100000,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 6 },
              retraining: false,
            },
          ],
        },
        "6.5": {
          article: "УК 6.5",
          description: "Создание устойчивой группы для нападений (банды)",
          fine: 0,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Арест 1-6 лет",
              fine: 0,
              suspension: 0,
              arrest: 1,
              arrestRange: { min: 1, max: 6 },
              retraining: false,
            },
          ],
        },
        "6.6": {
          article: "УК 6.6",
          description: "Вандализм",
          fine: 10000,
          suspension: 0,
          arrest: 1,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 10000",
              fine: 10000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 1 год",
              fine: 0,
              suspension: 0,
              arrest: 1,
              retraining: false,
            },
          ],
        },
        "6.7": {
          article: "УК 6.7",
          description: "Незаконное проникновение в жилище",
          fine: 0,
          suspension: 0,
          arrest: 2,
          retraining: false,
        },
        "6.8": {
          article: "УК 6.8",
          description: "Самовольное проникновение на охраняемый объект",
          fine: 10000,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 10000",
              fine: 10000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 2 года",
              fine: 0,
              suspension: 0,
              arrest: 2,
              retraining: false,
            },
          ],
        },
        "6.9": {
          article: "УК 6.9",
          description: "Незаконное обращение с огнестрельным оружием",
          fine: 20000,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "6.10": {
          article: "УК 6.10",
          description: "Незаконные действия с наркотическими средствами",
          fine: 20000,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "6.11": {
          article: "УК 6.11",
          description: "Неоказание медицинской помощи",
          fine: 0,
          suspension: 0,
          arrest: 1,
          retraining: false,
        },
        "6.12": {
          article: "УК 6.12",
          description: "Попытка срыва мероприятий",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "6.13": {
          article: "УК 6.13",
          description: "Подделка официального документа",
          fine: 20000,
          suspension: 0,
          arrest: 3,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 20000",
              fine: 20000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 3 года",
              fine: 0,
              suspension: 0,
              arrest: 3,
              retraining: false,
            },
          ],
        },
        "6.14": {
          article: "УК 6.14",
          description: "Превышение должностных полномочий",
          fine: 50000,
          suspension: 0,
          arrest: 3,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 500-50000",
              fine: 500,
              fineRange: { min: 500, max: 50000 },
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 1-3 года",
              fine: 0,
              suspension: 0,
              arrest: 3,
              arrestRange: { min: 1, max: 3 },
              retraining: false,
            },
          ],
        },
      },
    },
    criminal_economic: {
      name: "Экономические преступления (УК)",
      items: {
        "7.1": {
          article: "УК 7.1",
          description: "Мошенничество",
          fine: 50000,
          suspension: 0,
          arrest: 3,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 50000 и возмещение ущерба",
              fine: 50000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 3 года",
              fine: 0,
              suspension: 0,
              arrest: 3,
              retraining: false,
            },
          ],
        },
        "7.2": {
          article: "УК 7.2",
          description: "Грабеж или кража чужого имущества",
          fine: 0,
          suspension: 0,
          arrest: 2,
          retraining: false,
        },
        "7.3": {
          article: "УК 7.3",
          description: "Вымогательство",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "7.4": {
          article: "УК 7.4",
          description: "Умышленное уничтожение чужого имущества",
          fine: 50000,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 50000 и возмещение ущерба",
              fine: 50000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 2 года",
              fine: 0,
              suspension: 0,
              arrest: 2,
              retraining: false,
            },
          ],
        },
        "7.5": {
          article: "УК 7.5",
          description: "Организация азартных игр в общественных местах",
          fine: 50000,
          suspension: 0,
          arrest: 2,
          retraining: false,
          alternatives: [
            {
              name: "Штраф 50000",
              fine: 50000,
              suspension: 0,
              arrest: 0,
              retraining: false,
            },
            {
              name: "Арест 2 года",
              fine: 0,
              suspension: 0,
              arrest: 2,
              retraining: false,
            },
          ],
        },
      },
    },
  }

const getAllViolations = () => {
    const allViolations: Array<{ key: string; violation: Violation; category: string }> = []
    Object.entries(violations).forEach(([categoryKey, category]) => {
      Object.entries(category.items).forEach(([violationKey, violation]) => {
        allViolations.push({ key: `${categoryKey}.${violationKey}`, violation, category: category.name })
      })
    })
    return allViolations
  }

  const calculateTotals = () => {
    let totalFine = 0
    let totalSuspension = 0
    let totalArrest = 0
    let hasRetraining = false

    selectedViolations.forEach((violationKey) => {
      const allViolations = getAllViolations()
      const found = allViolations.find((v) => v.key === violationKey)
      if (found) {
        const violation = found.violation
        const selectedPenalty = selectedPenalties[violationKey] || "default"
        let penalty = violation

        if (selectedPenalty !== "default" && violation.alternatives) {
          const selectedAlt = violation.alternatives.find((alt) => alt.name === selectedPenalty)
          if (selectedAlt) {
            penalty = selectedAlt
          }
        }

        if (penalty.fineRange && selectedFineAmounts[violationKey] !== undefined) {
          penalty = {
            ...penalty,
            fine: selectedFineAmounts[violationKey],
          }
        }

        if (penalty.arrestRange && selectedArrestAmounts[violationKey] !== undefined) {
          penalty = {
            ...penalty,
            arrest: selectedArrestAmounts[violationKey],
          }
        }

        const suspension = violation.suspensionRange && selectedSuspensionAmounts[violationKey] !== undefined
          ? selectedSuspensionAmounts[violationKey]
          : penalty.suspension

        totalFine += penalty.fine
        totalSuspension += suspension
        totalArrest += penalty.arrest
        if (penalty.retraining || (violation.suspensionRange && selectedSuspensionAmounts[violationKey] === 0)) {
          hasRetraining = true
        }
      }
    })

    totalSuspension = Math.min(totalSuspension, 4)
    totalArrest = Math.min(totalArrest, 6)

    return {
      fine: totalFine,
      suspension: totalSuspension,
      arrest: totalArrest,
      retraining: hasRetraining,
    }
  }

  const getAlternatives = () => {
    const alternatives: Array<{
      name: string
      fine: number
      suspension: number
      arrest: number
      retraining: boolean
      hasRange?: boolean
      range?: { min: number; max: number }
      hasArrestRange?: boolean
      arrestRange?: { min: number; max: number }
    }> = []

    selectedViolations.forEach((violationKey) => {
      const allViolations = getAllViolations()
      const found = allViolations.find((v) => v.key === violationKey)
      if (found) {
        const violation = found.violation
        const selectedPenalty = selectedPenalties[violationKey] || "default"
        let penalty = violation

        if (selectedPenalty !== "default" && violation.alternatives) {
          const selectedAlt = violation.alternatives.find((alt) => alt.name === selectedPenalty)
          if (selectedAlt) {
            penalty = selectedAlt
          }
        }

        const fineAmount = penalty.fineRange 
          ? (selectedFineAmounts[violationKey] ?? penalty.fine) 
          : penalty.fine

        const arrestAmount = penalty.arrestRange
          ? (selectedArrestAmounts[violationKey] ?? penalty.arrest)
          : penalty.arrest

        const altName = selectedPenalty !== "default" && penalty.name ? penalty.name : "Основное наказание"

        alternatives.push({
          name: `${violation.article}: ${altName}`,
          fine: fineAmount,
          suspension: penalty.suspension,
          arrest: arrestAmount,
          retraining: penalty.retraining,
          hasRange: !!penalty.fineRange,
          range: penalty.fineRange,
          hasArrestRange: !!penalty.arrestRange,
          arrestRange: penalty.arrestRange,
        })
      }
    })

    return alternatives
  }

  const totals = calculateTotals()
  const alternatives = getAlternatives()

  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
  }

  const getSelectedAlternative = (violationKey: string) => {
    const found = getAllViolations().find((v) => v.key === violationKey)
    if (!found || !selectedPenalties[violationKey]) return null
    return found.violation.alternatives?.find(alt => alt.name === selectedPenalties[violationKey])
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Калькулятор штрафов и наказаний
        </CardTitle>
        <CardDescription>Выберите статьи нарушений для расчета общего размера наказания</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Выбор статей</h3>
            {selectedViolations.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedViolations([])
                  setSelectedPenalties({})
                  setSelectedFineAmounts({})
                  setSelectedSuspensionAmounts({})
                  setSelectedArrestAmounts({})
                }}
              >
                Очистить все
              </Button>
            )}
          </div>

          <div className="relative w-full">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-transparent"
              onClick={() => setOpen(!open)}
            >
              {selectedViolations.length === 0 ? "Выберите статьи..." : `Выбрано статей: ${selectedViolations.length}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>

            {open && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                <Command>
                  <CommandInput placeholder="Поиск статей..." />
                  <CommandEmpty>Статьи не найдены.</CommandEmpty>
                  <CommandList className="max-h-[300px] overflow-y-auto">
                    {Object.entries(violations).map(([categoryKey, category]) => (
                      <CommandGroup key={categoryKey} heading={category.name}>
                        {Object.entries(category.items).map(([violationKey, violation]) => (
                          <CommandItem
                            key={violationKey}
                            value={`${categoryKey}.${violationKey}`}
                            onSelect={(currentValue) => {
                              setSelectedViolations((prev) =>
                                prev.includes(currentValue) ? prev.filter((item) => item !== currentValue) : [...prev, currentValue]
                              )
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedViolations.includes(`${categoryKey}.${violationKey}`)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex-1">
                              <div className="font-medium">{violation.article}</div>
                              <div className="text-sm text-muted-foreground">{violation.description}</div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))}
                  </CommandList>
                </Command>
              </div>
            )}
          </div>

          {selectedViolations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Выбранные статьи:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedViolations.map((violationKey) => {
                  const found = getAllViolations().find((v) => v.key === violationKey)
                  if (!found) return null
                  const violation = found.violation
                  const selectedAlt = getSelectedAlternative(violationKey)

                  if (violation.arrestRange && selectedArrestAmounts[violationKey] === undefined) {
                    setSelectedArrestAmounts((prev) => ({
                      ...prev,
                      [violationKey]: violation.arrest,
                    }))
                  }
                  if (selectedAlt?.arrestRange && selectedArrestAmounts[violationKey] === undefined) {
                    setSelectedArrestAmounts((prev) => ({
                      ...prev,
                      [violationKey]: selectedAlt.arrest,
                    }))
                  }

                  return (
                    <div key={violationKey} className="flex flex-col gap-2 p-3 border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {violation.article}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => {
                              setSelectedViolations((prev) => prev.filter((v) => v !== violationKey))
                              setSelectedPenalties((prev) => {
                                const newPenalties = { ...prev }
                                delete newPenalties[violationKey]
                                return newPenalties
                              })
                              setSelectedFineAmounts((prev) => {
                                const newAmounts = { ...prev }
                                delete newAmounts[violationKey]
                                return newAmounts
                              })
                              setSelectedSuspensionAmounts((prev) => {
                                const newAmounts = { ...prev }
                                delete newAmounts[violationKey]
                                return newAmounts
                              })
                              setSelectedArrestAmounts((prev) => {
                                const newAmounts = { ...prev }
                                delete newAmounts[violationKey]
                                return newAmounts
                              })
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                        <span className="text-xs text-muted-foreground">{violation.description}</span>
                      </div>

                      {violation.alternatives && (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">Наказание:</span>
                            <Select
                              value={selectedPenalties[violationKey] || "default"}
                              onValueChange={(newPenalty) => {
                                setSelectedPenalties((prev) => ({
                                  ...prev,
                                  [violationKey]: newPenalty,
                                }))
                                if (newPenalty === "default") {
                                  setSelectedFineAmounts((prev) => {
                                    const newAmounts = { ...prev }
                                    delete newAmounts[violationKey]
                                    return newAmounts
                                  })
                                  setSelectedArrestAmounts((prev) => {
                                    const newAmounts = { ...prev }
                                    if (violation.arrestRange) {
                                      newAmounts[violationKey] = violation.arrest
                                    } else {
                                      delete newAmounts[violationKey]
                                    }
                                    return newAmounts
                                  })
                                } else {
                                  const alt = violation.alternatives?.find(a => a.name === newPenalty)
                                  if (alt) {
                                    setSelectedFineAmounts((prev) => ({
                                      ...prev,
                                      [violationKey]: alt.fineRange ? alt.fine : prev[violationKey],
                                    }))
                                    setSelectedArrestAmounts((prev) => ({
                                      ...prev,
                                      [violationKey]: alt.arrestRange ? alt.arrest : prev[violationKey] ?? violation.arrest,
                                    }))
                                  }
                                }
                              }}
                            >
                              <SelectTrigger className="text-xs bg-background border-gray-200">
                                <SelectValue placeholder="Выбрать наказание" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="default">Выбрать наказание</SelectItem>
                                {violation.alternatives.map((alt) => (
                                  <SelectItem key={alt.name} value={alt.name}>
                                    {alt.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {selectedAlt?.fineRange && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">Сумма штрафа:</span>
                              <Select
                                value={(selectedFineAmounts[violationKey] ?? selectedAlt.fine).toString()}
                                onValueChange={(value) =>
                                  setSelectedFineAmounts((prev) => ({
                                    ...prev,
                                    [violationKey]: parseInt(value),
                                  }))
                                }
                              >
                                <SelectTrigger className="text-xs bg-background border-gray-200">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from(
                                    { length: (selectedAlt.fineRange.max - selectedAlt.fineRange.min) / 500 + 1 },
                                    (_, i) => {
                                      const amount = selectedAlt.fineRange!.min + i * 500
                                      return (
                                        <SelectItem key={amount} value={amount.toString()}>
                                          {amount.toLocaleString()} ₽
                                        </SelectItem>
                                      )
                                    }
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {(violation.arrestRange || selectedAlt?.arrestRange) && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">Срок ареста:</span>
                              <Select
                                value={(selectedArrestAmounts[violationKey] ?? (selectedAlt?.arrest || violation.arrest)).toString()}
                                onValueChange={(value) => {
                                  const newValue = parseInt(value)
                                  setSelectedArrestAmounts((prev) => ({
                                    ...prev,
                                    [violationKey]: newValue,
                                  }))
                                }}
                              >
                                <SelectTrigger className="text-xs bg-background border-gray-200">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from(
                                    { length: ((selectedAlt?.arrestRange || violation.arrestRange)!.max - (selectedAlt?.arrestRange || violation.arrestRange)!.min) + 1 },
                                    (_, i) => {
                                      const range = selectedAlt?.arrestRange || violation.arrestRange!
                                      const amount = range.min + i
                                      return (
                                        <SelectItem key={amount} value={amount.toString()}>
                                          {amount} {amount === 1 ? "год" : amount < 5 ? "года" : "лет"}
                                        </SelectItem>
                                      )
                                    }
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      )}

                      {violation.suspensionRange && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">Срок лишения:</span>
                          <Select
                            value={(selectedSuspensionAmounts[violationKey] ?? violation.suspension).toString()}
                            onValueChange={(value) => {
                              const newValue = parseInt(value)
                              setSelectedSuspensionAmounts((prev) => ({
                                ...prev,
                                [violationKey]: newValue,
                              }))
                            }}
                          >
                            <SelectTrigger className="text-xs bg-background border-gray-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                { length: violation.suspensionRange.max - violation.suspensionRange.min + 1 },
                                (_, i) => {
                                  const amount = violation.suspensionRange!.min + i
                                  return (
                                    <SelectItem key={amount} value={amount.toString()}>
                                      {amount === 0
                                        ? "Лишение прав (с переобучением)"
                                        : `${amount} ${amount === 1 ? "год" : amount < 5 ? "года" : "лет"}`}
                                    </SelectItem>
                                  )
                                }
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Итоговое наказание</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Штраф
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totals.fine.toLocaleString()} ₽</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Лишение прав
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {totals.suspension > 0
                    ? `${totals.suspension} ${totals.suspension === 1 ? "год" : totals.suspension < 5 ? "года" : "лет"}`
                    : "Нет"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Арест
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {totals.arrest > 0
                    ? `${totals.arrest} ${totals.arrest === 1 ? "год" : totals.arrest < 5 ? "года" : "лет"}`
                    : "Нет"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Переобучение
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totals.retraining ? "Требуется" : "Не требуется"}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {alternatives.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Детализация наказаний</h3>
              <div className="space-y-2">
                {alternatives.map((alt, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3 border rounded-lg">
                    <div className="font-medium">{alt.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Штраф: {alt.fine.toLocaleString()} ₽</div>
                      <div>
                        Лишение прав: {alt.suspension > 0
                          ? `${alt.suspension} ${alt.suspension === 1 ? "год" : alt.suspension < 5 ? "года" : "лет"}`
                          : "Нет"}
                      </div>
                      <div>
                        Арест: {alt.arrest > 0
                          ? `${alt.arrest} ${alt.arrest === 1 ? "год" : alt.arrest < 5 ? "года" : "лет"}`
                          : "Нет"}
                      </div>
                      <div>Переобучение: {alt.retraining ? "Требуется" : "Не требуется"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default PenaltyCalculator