"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown, Calculator, Star, GraduationCap, X, DollarSign, Car, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface Violation {
  article: string
  description: string
  fine: number
  suspension: number
  arrest: number
  retraining: boolean
  alternatives?: Array<{
    name: string
    fine: number
    suspension: number
    arrest: number
    retraining: boolean
  }>
}

interface ViolationCategory {
  name: string
  items: Record<string, Violation>
}

const PenaltyCalculator = () => {
  const [selectedViolations, setSelectedViolations] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(0)

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
          description: "Непредоставление документов по требованию",
          fine: 30000,
          suspension: 0,
          arrest: 0,
          retraining: true,
        },
        "5.3": {
          article: "КоАП 5.3",
          description: "Управление незарегистрированным ТС",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.4": {
          article: "КоАП 5.4",
          description: "Управление ТС с тонировкой",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.5": {
          article: "КоАП 5.5",
          description: "Управление ТС при технической неисправности",
          fine: 30000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.6": {
          article: "КоАП 5.6",
          description: "Управление мотоциклом без шлема",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.7": {
          article: "КоАП 5.7",
          description: "Нарушение ПДД пешеходами и велосипедистами",
          fine: 15000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.8": {
          article: "КоАП 5.8",
          description: "Посадка/высадка пассажиров со стороны проезжей части",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "5.9": {
          article: "КоАП 5.9",
          description: "Игнорирование требования об остановке",
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
          description: "Использование приоритета без убеждения в безопасности",
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
        },
        "6.3": {
          article: "КоАП 6.3",
          description: "Нарушение правил использования знака аварийной остановки",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "6.4": {
          article: "КоАП 6.4",
          description: "Управление ТС с выключенными фарами",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "6.5": {
          article: "КоАП 6.5",
          description: "Использование звукового сигнала в нарушение ПДД",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "7.1": {
          article: "КоАП 7.1",
          description: "Проезд на красный свет или запрещающий жест",
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
          description: "Маневрирование без сигнала поворота",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
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
          description: "Поворот из неположенной полосы",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "8.4": {
          article: "КоАП 8.4",
          description: "Поворот или разворот в нарушение ПДД",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "9.1": {
          article: "КоАП 9.1",
          description: "Движение по встречной полосе",
          fine: 50000,
          suspension: 2,
          arrest: 0,
          retraining: false,
        },
        "9.2": {
          article: "КоАП 9.2",
          description: "Выезд на встречную полосу",
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
        },
        "9.4": {
          article: "КоАП 9.4",
          description: "Движение по прерывистым линиям разметки",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "9.5": {
          article: "КоАП 9.5",
          description: "Движение по обочинам, тротуарам, газону",
          fine: 30000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "9.6": {
          article: "КоАП 9.6",
          description: "Несоблюдение дистанции и бокового интервала",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "10.1": {
          article: "КоАП 10.1",
          description: "Обгон спецтранспорта с синим маячком",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "10.2": {
          article: "КоАП 10.2",
          description: "Обгон спецтранспорта с синим/красным маячком",
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
          description: "Остановка на пешеходном переходе или тротуаре",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.2": {
          article: "КоАП 11.2",
          description: "Остановка в местах остановки маршрутных ТС",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.3": {
          article: "КоАП 11.3",
          description: "Остановка на трамвайных путях или газоне",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.4": {
          article: "КоАП 11.4",
          description: "Нарушение правил остановки с созданием препятствий",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "11.5": {
          article: "КоАП 11.5",
          description: "Прочие нарушения правил остановки",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "12.1": {
          article: "КоАП 12.1",
          description: "Нарушения проезда перекрестков без опасности",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "12.2": {
          article: "КоАП 12.2",
          description: "Нарушения проезда перекрестков с опасностью",
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
          description: "Остановка ближе 5м от шлагбаума",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "14.1": {
          article: "КоАП 14.1",
          description: "Движение по автомагистрали ТС менее 40 км/ч",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "14.2": {
          article: "КоАП 14.2",
          description: "Движение грузовых ТС далее второй полосы",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
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
          description: "Создание помех пешеходом в жилых зонах",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "14.5": {
          article: "КоАП 14.5",
          description: "Сквозное движение, учебная езда в жилых зонах",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "14.6": {
          article: "КоАП 14.6",
          description: "Движение в колонне в нарушение ПДД",
          fine: 10000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "15.1": {
          article: "КоАП 15.1",
          description: "Непредоставление преимущества спецтранспорту",
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
          description: "Непредоставление преимущества пешеходам",
          fine: 5000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "16.1": {
          article: "КоАП 16.1",
          description: "Оставление места ДТП",
          fine: 30000,
          suspension: 4,
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
        },
        "17.1.4": {
          article: "КоАП 17.1.4",
          description: "Управление в состоянии опьянения",
          fine: 30000,
          suspension: 1,
          arrest: 0,
          retraining: false,
        },
        "17.1.5": {
          article: "КоАП 17.1.5",
          description: "Отказ от медосвидетельствования",
          fine: 30000,
          suspension: 1,
          arrest: 0,
          retraining: false,
        },
        "17.2": {
          article: "КоАП 17.2",
          description: "Опасное вождение",
          fine: 30000,
          suspension: 2,
          arrest: 0,
          retraining: false,
        },
        "17.3": {
          article: "КоАП 17.3",
          description: "Управление с неуплатой штрафов до 10.000",
          fine: 0,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "17.4": {
          article: "КоАП 17.4",
          description: "Управление с неуплатой штрафов 10.000-50.000",
          fine: 30000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "17.5": {
          article: "КоАП 17.5",
          description: "Управление с неуплатой штрафов 50.000-100.000",
          fine: 50000,
          suspension: 1,
          arrest: 0,
          retraining: false,
        },
        "17.6": {
          article: "КоАП 17.6",
          description: "Управление с неуплатой штрафов более 100.000",
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
      },
    },
    public_order: {
      name: "Общественный порядок (КоАП)",
      items: {
        "19.1": {
          article: "КоАП 19.1",
          description: "Мелкое хулиганство",
          fine: 10000,
          suspension: 0,
          arrest: 1,
          retraining: false,
        },
        "19.2": {
          article: "КоАП 19.2",
          description: "Оскорбление",
          fine: 10000,
          suspension: 0,
          arrest: 1,
          retraining: false,
        },
        "19.3": {
          article: "КоАП 19.3",
          description: "Нанесение побоев",
          fine: 20000,
          suspension: 0,
          arrest: 1,
          retraining: false,
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
          description: "Заведомо ложный вызов служб",
          fine: 20000,
          suspension: 0,
          arrest: 0,
          retraining: false,
        },
        "19.8": {
          article: "КоАП 19.8",
          description: "Организация несанкционированного митинга",
          fine: 20000,
          suspension: 0,
          arrest: 1,
          retraining: false,
        },
        "19.9": {
          article: "КоАП 19.9",
          description: "Неповиновение сотруднику полиции",
          fine: 20000,
          suspension: 1,
          arrest: 2,
          retraining: false,
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
          arrest: 6,
          retraining: false,
        },
        "4.2.2": {
          article: "УК 4.2.2",
          description: "Особо тяжкие телесные повреждения по неосторожности",
          fine: 0,
          suspension: 0,
          arrest: 2,
          retraining: false,
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
          arrest: 6,
          retraining: false,
        },
        "4.5": {
          article: "УК 4.5",
          description: "Действия против половой неприкосновенности",
          fine: 0,
          suspension: 0,
          arrest: 6,
          retraining: false,
        },
        "4.6": {
          article: "УК 4.6",
          description: "Незаконный сбор сведений о частной жизни",
          fine: 30000,
          suspension: 0,
          arrest: 1,
          retraining: false,
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
          arrest: 6,
          retraining: false,
        },
        "5.4": {
          article: "УК 5.4",
          description: "Применение насилия в отношении представителя власти",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "5.5": {
          article: "УК 5.5",
          description: "Хамство, борзость, дерзость по отношению к сотруднику",
          fine: 15000,
          suspension: 0,
          arrest: 1,
          retraining: false,
        },
        "5.6": {
          article: "УК 5.6",
          description: "Публичное оскорбление представителей власти",
          fine: 25000,
          suspension: 0,
          arrest: 2,
          retraining: false,
        },
        "5.7": {
          article: "УК 5.7",
          description: "Провокационные действия в отношении сотрудников",
          fine: 50000,
          suspension: 0,
          arrest: 2,
          retraining: false,
        },
        "5.7.1": {
          article: "УК 5.7.1",
          description: "Длительное преследование экипажа полиции",
          fine: 50000,
          suspension: 0,
          arrest: 2,
          retraining: false,
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
        },
        "5.10": {
          article: "УК 5.10",
          description: "Заведомо ложный донос о совершении преступления",
          fine: 25000,
          suspension: 0,
          arrest: 2,
          retraining: false,
        },
        "5.11": {
          article: "УК 5.11",
          description: "Разглашение секретных данных",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
        "5.12": {
          article: "УК 5.12",
          description: "Представление себя служащим государственной организации",
          fine: 30000,
          suspension: 0,
          arrest: 1,
          retraining: false,
        },
        "5.13": {
          article: "УК 5.13",
          description: "Халатность должностного лица",
          fine: 0,
          suspension: 0,
          arrest: 3,
          retraining: false,
        },
      },
    },
    criminal_public: {
      name: "Преступления против общественного порядка (УК)",
      items: {
        "6.1": { article: "УК 6.1", description: "Терроризм", fine: 0, suspension: 0, arrest: 6, retraining: false },
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
        },
        "6.4": {
          article: "УК 6.4",
          description: "Организация массовых беспорядков",
          fine: 100000,
          suspension: 0,
          arrest: 6,
          retraining: false,
        },
        "6.5": {
          article: "УК 6.5",
          description: "Создание устойчивой группы для нападений (банды)",
          fine: 0,
          suspension: 0,
          arrest: 6,
          retraining: false,
        },
        "6.6": {
          article: "УК 6.6",
          description: "Вандализм",
          fine: 10000,
          suspension: 0,
          arrest: 1,
          retraining: false,
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
        },
        "6.14": {
          article: "УК 6.14",
          description: "Превышение должностных полномочий",
          fine: 50000,
          suspension: 0,
          arrest: 3,
          retraining: false,
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
        },
        "7.5": {
          article: "УК 7.5",
          description: "Организация азартных игр в общественных местах",
          fine: 50000,
          suspension: 0,
          arrest: 2,
          retraining: false,
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
    let maxSuspension = 0
    let totalArrest = 0
    let hasRetraining = false

    selectedViolations.forEach((violationKey) => {
      const allViolations = getAllViolations()
      const found = allViolations.find((v) => v.key === violationKey)
      if (found) {
        const violation = found.violation
        totalFine += violation.fine
        maxSuspension = Math.max(maxSuspension, violation.suspension)
        totalArrest += violation.arrest
        if (violation.retraining) hasRetraining = true
      }
    })

    maxSuspension = Math.min(maxSuspension, 4)
    totalArrest = Math.min(totalArrest, 6)

    return {
      fine: totalFine,
      suspension: maxSuspension,
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
    }> = []

    selectedViolations.forEach((violationKey) => {
      const allViolations = getAllViolations()
      const found = allViolations.find((v) => v.key === violationKey)
      if (found?.violation.alternatives) {
        found.violation.alternatives.forEach((alt) => {
          alternatives.push({
            name: `${found.violation.article}: ${alt.name}`,
            fine: alt.fine,
            suspension: alt.suspension,
            arrest: alt.arrest,
            retraining: alt.retraining,
          })
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
              <Button variant="outline" size="sm" onClick={() => setSelectedViolations([])}>
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
                  <CommandList className="max-h-[300px]">
                    {Object.entries(violations).map(([categoryKey, category]) => (
                      <CommandGroup key={categoryKey} heading={category.name}>
                        {Object.entries(category.items).map(([violationKey, violation]) => (
                          <CommandItem
                            key={violationKey}
                            value={violationKey}
                            onSelect={(currentValue) => {
                              const fullKey = `${categoryKey}.${currentValue}`
                              setSelectedViolations((prev) =>
                                prev.includes(fullKey) ? prev.filter((item) => item !== fullKey) : [...prev, fullKey],
                              )
                              setOpen(false)
                              setForceUpdate((prev) => prev + 1)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedViolations.includes(`${categoryKey}.${violationKey}`)
                                  ? "opacity-100"
                                  : "opacity-0",
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
                  return (
                    <Badge key={violationKey} variant="secondary" className="flex items-center gap-1">
                      {found.violation.article}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setSelectedViolations((prev) => prev.filter((v) => v !== violationKey))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Результат расчета</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{totals.fine.toLocaleString()} ₽</div>
                <div className="text-sm text-muted-foreground">Штраф</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-600">
                    {totals.suspension > 0
                      ? `${totals.suspension} ${totals.suspension === 1 ? "год" : totals.suspension < 5 ? "года" : "лет"}`
                      : "—"}
                  </div>
                  {totals.retraining && <GraduationCap className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="text-sm text-muted-foreground">
                  Лишение прав {totals.retraining && "(с переобучением)"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-1">
                  {totals.arrest > 0 ? (
                    renderStars(totals.arrest)
                  ) : (
                    <span className="text-2xl font-bold text-red-600">—</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Уровень розыска{" "}
                  {totals.arrest > 0 &&
                    `(${totals.arrest} ${totals.arrest === 1 ? "звезда" : totals.arrest < 5 ? "звезды" : "звезд"})`}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{selectedViolations.length}</div>
                <div className="text-sm text-muted-foreground">Статей выбрано</div>
              </CardContent>
            </Card>
          </div>
          {alternatives.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Альтернативные варианты наказания:</h3>
              <div className="space-y-3">
                {alternatives.map((alt, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg border">
                    <h4 className="font-medium text-foreground mb-2">{alt.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>{alt.fine.toLocaleString()} ₽</span>
                      </div>
                      {alt.suspension > 0 && (
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-orange-600" />
                          <span>
                            {alt.suspension} {alt.suspension === 1 ? "год" : alt.suspension < 5 ? "года" : "лет"}
                          </span>
                          {alt.retraining && <GraduationCap className="h-4 w-4 text-blue-600" />}
                        </div>
                      )}
                      {alt.arrest > 0 && (
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-600" />
                          <div className="flex">
                            {Array.from({ length: Math.min(alt.arrest, 6) }, (_, i) => (
                              <Star key={i} className="h-4 w-4 fill-red-600 text-red-600" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedViolations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">Выберите статьи для расчета наказания</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export { PenaltyCalculator }
export default PenaltyCalculator
