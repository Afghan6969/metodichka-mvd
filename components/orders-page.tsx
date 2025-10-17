"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CopyButton } from "./copy-button"
import { DatePicker } from "@/components/ui/date-picker"
import { FileText, Shield, User, Briefcase, Search, Edit, X, Plus, Trash2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { useAuth } from "@/lib/auth-context"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface Order {
  id: string
  title: string
  category: string
  content: string
}

export function OrdersPage() {
  const { currentUser } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [position, setPosition] = useState<string>("")
  const [nickname, setNickname] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const [multiNicknames, setMultiNicknames] = useState<string[]>(["", ""])
  const [promotionType, setPromotionType] = useState<"same" | "new">("same")
  const [bonusSource, setBonusSource] = useState<"personal" | "fund" | "both">("personal")
  const [fineRequired, setFineRequired] = useState<boolean>(true)
  const [disciplineUp, setDisciplineUp] = useState<number>(0)
  const [disciplineP, setDisciplineP] = useState<number>(0)
  const [disciplineV, setDisciplineV] = useState<number>(0)
  const [vacationStartDate, setVacationStartDate] = useState<Date | undefined>(undefined)
  const [vacationEndDate, setVacationEndDate] = useState<Date | undefined>(undefined)

  // Загружаем сохраненные данные из localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem("orders-position")
    const savedNickname = localStorage.getItem("orders-nickname")
    if (savedPosition) setPosition(savedPosition)
    if (savedNickname) setNickname(savedNickname)
  }, [])

  // Сохраняем данные в localStorage при изменении
  useEffect(() => {
    if (position) localStorage.setItem("orders-position", position)
    if (nickname) localStorage.setItem("orders-nickname", nickname)
  }, [position, nickname])

  // Проверка авторизации
  if (!currentUser) {
    return (
      <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
        <div className="max-w-md mx-auto mt-16">
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-400/30">
                <Shield className="h-10 w-10 text-blue-300" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Приказы в ДО</h1>
              <p className="text-blue-200/80">Требуется авторизация</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Проверка доступа (только старший состав и выше)
  const allowedRoles = ["ss-gibdd", "ss-guvd", "leader-gibdd", "leader-guvd", "pgs-gibdd", "pgs-guvd", "gs-gibdd", "gs-guvd", "root", "super-admin"]
  if (!currentUser.role || !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
        <div className="max-w-md mx-auto mt-16">
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-400/30">
                <Shield className="h-10 w-10 text-red-300" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Доступ ограничен</h1>
              <p className="text-blue-200/80 mb-4">Эта страница доступна только старшему составу и выше</p>
              <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                <p className="text-sm text-red-300 leading-relaxed">
                  Для доступа к приказам необходима одна из ролей:<br/>
                  <strong>СС ГИБДД/ГУВД</strong>, <strong>Лидер ГИБДД/ГУВД</strong>, <strong>ПГС ГИБДД/ГУВД</strong>, <strong>ГС ГИБДД/ГУВД</strong>, <strong>Владелец</strong> или <strong>Разработчик</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const orders: Order[] = [
    {
      id: "1",
      title: "Приказ о проведении генерального построения",
      category: "Построения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о проведении генерального построения

Время: [Время] (МСК)
Обязательная явка всего личного состава.
Явка для всех сотрудников обязательна. Отсутствие без уважительной причины будет рассматриваться дисциплинарно.`
    },
    {
      id: "2",
      title: "Приказ о проведении учебных мероприятий",
      category: "Построения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о проведении учебных мероприятий (лекции и тренировки)

Время: [Время] (МСК)
Обязательная явка всего личного состава ГИБДД г. Невский.
Цель: проведение обучающих лекций, тренировок и организационных мероприятий.
Отсутствие без уважительной причины рассматривается дисциплинарно.`
    },
    {
      id: "3",
      title: "Приказ о приёме (открытое собеседование)",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о приёме сотрудника по результатам открытого собеседования

Принят сотрудник: [Ник]
Присвоено звание рядового, назначена должность курсанта учебного батальона.
Желаем успешной службы и профессионального роста.

Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "4",
      title: "Приказ о приёме (закрытое собеседование)",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о приёме сотрудника по результатам закрытого собеседования

Принят сотрудник: [Ник]
Присвоено звание лейтенант, назначена должность [Должность]
Желаем успешной службы и профессионального роста.

Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "5",
      title: "Приказ о добровольном увольнении",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о добровольном увольнении

Сотрудник [Ник] уволен из ГИБДД г. Невский по собственному желанию.
Неустойка за увольнение оплачена в полном объёме/не требуется.

Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "6",
      title: "Приказ о внесении в ОЧС",
      category: "Дисциплинарные взыскания",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о внесении в Общий Чёрный Список

В связи с нарушением пункта [Пункт ОЧС] — [Краткая причина ОЧСа], сотрудник [Ник] уволен с последующим внесением в Чёрный Список сроком на [количество дней] дней.
Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "7",
      title: "Приказ о взыскании по жалобе",
      category: "Дисциплинарные взыскания",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о наложении дисциплинарного взыскания по жалобе

По результатам рассмотрения жалобы: [ссылка]
На сотрудника [Ник] налагаются дисциплинарные взыскания за:
[Пункт который нарушил] — [Краткая причина].

Взыскание: [Тип взыскания]
Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "8",
      title: "Приказ о внутреннем взыскании",
      category: "Дисциплинарные взыскания",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о наложении внутреннего дисциплинарного взыскания

По результатам служебного расследования:
На сотрудника [Ник] наложено дисциплинарное взыскание за нарушение пункта:
[Пункт который нарушил] — [Краткая причина].

Взыскание: [Тип взыскания]
Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "9",
      title: "Приказ о построении по поставке",
      category: "Построения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о проведении построения по поставке

Время: [Время] (МСК)
Цель — организация поставки боеприпасов.
Явка для всех сотрудников на смене обязательна. Отсутствие без уважительной причины рассматривается дисциплинарно.`
    },
    {
      id: "10",
      title: "Приказ о предоставлении отпуска",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о предоставлении отпуска

Сотруднику [Ник] предоставляется отпуск с [Дата] по [Дата].
Невозвращение после отпуска без уважительной причины повлечёт ответственность по пункту 0.1.9 ОЧС.`
    },
    {
      id: "11",
      title: "Приказ о повышении",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о кадровых изменениях

В связи с добросовестной службой и инициативой:
[Ник] — повышен в звании до [Звание].

Должность остаётся без изменений: [Текущая должность]

или

Назначен на новую должность: [Новая должность]
Переведён в батальон: [Название батальона]
Поздравляем с заслуженным повышением!`
    },
    {
      id: "12",
      title: "Приказ о переводе",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о кадровых изменениях

В связи с одобренным заявлением сотрудник [Ник] переведён в [Батальон/подразделение].
Назначена новая должность: [Должность]
Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "13",
      title: "Приказ о проверке медкарт",
      category: "Другое",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о проверке медицинских карт личного состава

Время: [Время] (МСК)
Следующие сотрудники обязаны предоставить скриншот действующей медицинской карты в беседу своего города:
• [Никнейм]
• [Никнейм]
В случае непредоставления скриншота до указанного времени будут применены дисциплинарные меры.
При наличии уважительных причин необходимо заранее сообщить руководству в ЛС.`
    },
    {
      id: "14",
      title: "Приказ о снятии выговора",
      category: "Дисциплинарные взыскания",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о снятии выговора по рапорту

На основании одобренного рапорта сотрудника [Ник] принято решение о снятии ранее наложенного выговора.
Учитывая добросовестную службу, положительные характеристики и отсутствие повторных нарушений, выговор считается аннулированным.
Неустойка оплачена в полном объёме / не требуется.

Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "15",
      title: "Приказ об окончании отпуска",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ об окончании отпуска

Сотрудник [Ник] завершил отпуск и приступает к исполнению своих служебных обязанностей.`
    },
    {
      id: "16",
      title: "Приказ о совместном мероприятии",
      category: "Построения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о проведении совместного мероприятия с другими фракциями

Дата проведения: [Дата]
Время: [Время]
Планируется проведение совместного мероприятия с участием фракций:
– [Название фракции 1]
– [Название фракции 2]
Название мероприятия: [Название]
Задачи: [Задача/суть]
Строй: [Место организации строя]
Явка обязательна для всех сотрудников, находящихся на смене.`
    },
    {
      id: "17",
      title: "Приказ о постановлении в старший состав",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о постановлении в старший состав

[Ник] назначен на должность [Должность] с присвоением звания [Звание] по результатам обзвона.
Желаем профессионального роста и дисциплинированной службы.`
    },
    {
      id: "18",
      title: "Приказ о кадровых изменениях (СС)",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о кадровых изменениях в старшем составе

В связи с добросовестной службой и высокой дисциплиной сотрудник [Ник] назначен на новую должность.
Новая должность: [Должность]
Звание:
Текущее дисциплинарное состояние: УП — 0/5 | П — 0/5 | В — 0/3.`
    },
    {
      id: "19",
      title: "Приказ о премировании",
      category: "Другое",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о премировании сотрудника

В связи с проявленной инициативой и примерной дисциплиной, сотрудник [Ник] поощряется денежной премией в размере [Сумма].
Источник выплаты:
• [Сумма] — с личного счёта начальника
• [Сумма] — с фонда неустоек`
    },
    {
      id: "20",
      title: "Приказ о смене паспортных данных",
      category: "Кадровые изменения",
      content: `[ [Ваша должность] | [Ваш никнейм] ]
Приказ о смене паспортных данных сотрудника

На основании предоставленного сотрудником заявления и подтверждающих документов, в личное дело внесены изменения:
Сотрудник: [Старый никнейм]
Новый никнейм: [Новый никнейм]`
    }
  ]

  const categories = ["all", "Кадровые изменения", "Дисциплинарные взыскания", "Построения", "Другое"]
  
  // Извлечение всех плейсхолдеров из текста
  const extractPlaceholders = (content: string): string[] => {
    const regex = /\[([^\]]+)\]/g
    const matches = content.match(regex) || []
    return Array.from(new Set(matches))
  }

  // Открытие редактора приказа
  const openEditor = (order: Order) => {
    setEditingOrder(order)
    const placeholders = extractPlaceholders(order.content)
    const initialData: { [key: string]: string } = {}
    
    placeholders.forEach(placeholder => {
      const key = placeholder.replace(/[\[\]]/g, '')
      if (key === 'Ваша должность') {
        initialData[placeholder] = position
      } else if (key === 'Ваш никнейм') {
        initialData[placeholder] = nickname
      } else {
        initialData[placeholder] = ''
      }
    })
    
    setFormData(initialData)
    setMultiNicknames(["", ""])
    setPromotionType("same")
    setBonusSource("personal")
    setFineRequired(true)
    setDisciplineUp(0)
    setDisciplineP(0)
    setDisciplineV(0)
    setVacationStartDate(undefined)
    setVacationEndDate(undefined)
  }

  // Закрытие редактора
  const closeEditor = () => {
    setEditingOrder(null)
    setFormData({})
    setMultiNicknames(["", ""])
    setPromotionType("same")
    setBonusSource("personal")
    setFineRequired(true)
    setDisciplineUp(0)
    setDisciplineP(0)
    setDisciplineV(0)
    setVacationStartDate(undefined)
    setVacationEndDate(undefined)
  }

  // Применение замен
  const applyReplacements = (content: string): string => {
    let result = content
    
    // Специальная обработка для приказа о повышении (id: 11)
    if (editingOrder?.id === "11") {
      if (promotionType === "same") {
        result = result.replace(
          /Должность остаётся без изменений: \[Текущая должность\]\n\nили\n\nНазначен на новую должность: \[Новая должность\]\nПереведён в батальон: \[Название батальона\]/,
          `Должность остаётся без изменений: ${formData["[Текущая должность]"] || "[Текущая должность]"}`
        )
      } else {
        result = result.replace(
          /Должность остаётся без изменений: \[Текущая должность\]\n\nили\n\nНазначен на новую должность: \[Новая должность\]\nПереведён в батальон: \[Название батальона\]/,
          `Назначен на новую должность: ${formData["[Новая должность]"] || "[Новая должность]"}\nПереведён в батальон: ${formData["[Название батальона]"] || "[Название батальона]"}`
        )
      }
    }
    
    // Специальная обработка для приказа о медкартах (id: 13)
    if (editingOrder?.id === "13") {
      const nicknamesList = multiNicknames.filter(n => n.trim()).map(n => `• ${n}`).join('\n')
      result = result.replace(/• \[Никнейм\]\n• \[Никнейм\]/, nicknamesList || '• [Никнейм]\n• [Никнейм]')
    }
    
    // Специальная обработка для приказа о премировании (id: 19)
    if (editingOrder?.id === "19") {
      const sum = formData["[Сумма]"] || "[Сумма]"
      if (bonusSource === "personal") {
        result = result.replace(
          /Источник выплаты:\n• \[Сумма\] — с личного счёта начальника\n• \[Сумма\] — с фонда неустоек/,
          `Источник выплаты:\n• ${sum} — с личного счёта начальника`
        )
      } else if (bonusSource === "fund") {
        result = result.replace(
          /Источник выплаты:\n• \[Сумма\] — с личного счёта начальника\n• \[Сумма\] — с фонда неустоек/,
          `Источник выплаты:\n• ${sum} — с фонда неустоек`
        )
      } else {
        const personalSum = formData["[Сумма личная]"] || "[Сумма]"
        const fundSum = formData["[Сумма фонд]"] || "[Сумма]"
        result = result.replace(
          /Источник выплаты:\n• \[Сумма\] — с личного счёта начальника\n• \[Сумма\] — с фонда неустоек/,
          `Источник выплаты:\n• ${personalSum} — с личного счёта начальника\n• ${fundSum} — с фонда неустоек`
        )
      }
    }
    
    // Специальная обработка для приказа об отпуске (id: 10)
    if (editingOrder?.id === "10") {
      if (vacationStartDate && vacationEndDate) {
        const startDateStr = format(vacationStartDate, "dd.MM.yyyy", { locale: ru })
        const endDateStr = format(vacationEndDate, "dd.MM.yyyy", { locale: ru })
        result = result.replace(/предоставляется отпуск с \[Дата\] по \[Дата\]\./, `предоставляется отпуск с ${startDateStr} по ${endDateStr}.`)
      }
    }
    
    // Специальная обработка для приказа о добровольном увольнении (id: 5)
    if (editingOrder?.id === "5") {
      result = result.replace(
        /Неустойка за увольнение оплачена в полном объёме\/не требуется\./,
        fineRequired ? "Неустойка за увольнение оплачена в полном объёме." : "Неустойка за увольнение не требуется."
      )
    }
    
    // Специальная обработка для приказа о снятии выговора (id: 14)
    if (editingOrder?.id === "14") {
      result = result.replace(
        /Неустойка оплачена в полном объёме \/ не требуется\./,
        fineRequired ? "Неустойка оплачена в полном объёме." : "Неустойка не требуется."
      )
    }
    
    // Замена дисциплинарного состояния для всех приказов, где оно есть
    const hasDiscipline = result.includes("Текущее дисциплинарное состояние:")
    if (hasDiscipline) {
      result = result.replace(
        /Текущее дисциплинарное состояние: УП — \d+\/5 \| П — \d+\/5 \| В — \d+\/3\./,
        `Текущее дисциплинарное состояние: УП — ${disciplineUp}/5 | П — ${disciplineP}/5 | В — ${disciplineV}/3.`
      )
    }
    
    // Обычные замены
    Object.entries(formData).forEach(([placeholder, value]) => {
      if (value) {
        result = result.replaceAll(placeholder, value)
      }
    })
    
    return result
  }

  // Функция замены плейсхолдеров на реальные данные (для обычного просмотра)
  const replaceOrderContent = (content: string): string => {
    // Возвращаем контент как есть, без замены должности и никнейма
    return content
  }
  
  // Фильтрация по категории и поиску
  const filteredOrders = orders
    .filter(order => selectedCategory === "all" || order.category === selectedCategory)
    .filter(order => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        order.title.toLowerCase().includes(query) ||
        order.content.toLowerCase().includes(query) ||
        order.category.toLowerCase().includes(query)
      )
    })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Кадровые изменения": return "bg-blue-500/20 text-blue-300 border-blue-400/40"
      case "Дисциплинарные взыскания": return "bg-red-500/20 text-red-300 border-red-400/40"
      case "Построения": return "bg-green-500/20 text-green-300 border-green-400/40"
      case "Другое": return "bg-purple-500/20 text-purple-300 border-purple-400/40"
      default: return "bg-white/10 text-white border-white/20"
    }
  }

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={FileText}
        title="Приказы в ДО"
        description="Шаблоны приказов для старшего состава МВД"
        badge={`${orders.length} приказов`}
      />

      {/* Поиск и фильтры */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/15 rounded-3xl p-6 shadow-xl">
        <div className="grid md:grid-cols-[1fr,auto] gap-6 items-end">
          {/* Поиск */}
          <div>
            <Label className="text-sm text-blue-200/90 mb-3 flex items-center gap-2 font-semibold">
              <Search className="h-4 w-4" />
              Поиск приказов
            </Label>
            <div className="relative">
              <Input
                placeholder="Введите название, категорию или содержание..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/30 border-blue-400/30 text-white placeholder:text-blue-200/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 pl-4 pr-10 h-12 rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 hover:text-blue-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-blue-300/70 mt-2 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Найдено: {filteredOrders.length} {filteredOrders.length === 1 ? 'приказ' : filteredOrders.length < 5 ? 'приказа' : 'приказов'}
              </p>
            )}
          </div>

          {/* Фильтры */}
          <div>
            <Label className="text-sm text-blue-200/90 mb-3 font-semibold">Категория</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm ${
                    selectedCategory === category
                      ? "bg-blue-500/30 text-white border-2 border-blue-400/60 shadow-lg shadow-blue-500/20"
                      : "bg-white/5 text-blue-200/70 border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {category === "all" ? "Все" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Список приказов */}
      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/15 rounded-3xl overflow-hidden group hover:from-white/15 hover:to-white/8 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
          >
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-400/30">
                      <FileText className="h-5 w-5 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{order.title}</h3>
                  </div>
                  <Badge className={`${getCategoryColor(order.category)} text-xs px-3 py-1.5 font-medium`}>
                    {order.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => openEditor(order)}
                    className="bg-gradient-to-r from-blue-500/30 to-blue-500/20 hover:from-blue-500/40 hover:to-blue-500/30 text-white border border-blue-400/50 h-10 px-5 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Заполнить
                  </Button>
                  <CopyButton 
                    text={replaceOrderContent(order.content)} 
                    className="shrink-0 h-10 px-4 rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-black/20">
              <pre className="font-mono text-sm text-blue-50/95 leading-relaxed whitespace-pre-wrap">
                {replaceOrderContent(order.content)}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-12 text-center">
          <p className="text-blue-200/80">Приказы не найдены</p>
        </div>
      )}

      {/* Модальное окно редактора */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1a0000] via-black to-[#1a0000] border border-red-900/30 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.3)]">
            {/* Заголовок */}
            <div className="bg-gradient-to-r from-red-900/20 via-red-900/10 to-transparent p-6 border-b border-red-900/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-900/30 rounded-xl border border-red-800/40">
                      <FileText className="h-5 w-5 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{editingOrder.title}</h2>
                  </div>
                  <Badge className={`${getCategoryColor(editingOrder.category)} text-xs px-3 py-1.5 font-medium`}>
                    {editingOrder.category}
                  </Badge>
                </div>
                <Button
                  onClick={closeEditor}
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-red-900/20 rounded-xl"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Контент */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              <div className="space-y-6">
                {/* Инфо */}
                <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-3xl p-5">
                  <p className="text-sm text-red-100/70 leading-relaxed">
                    Заполните необходимые поля. Все данные будут автоматически подставлены в приказ.
                  </p>
                </div>

                {/* Специальная обработка для приказа о повышении */}
                {editingOrder?.id === "11" && (
                  <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-2xl p-5">
                    <Label className="text-base font-semibold text-white mb-4 block">Тип изменения</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPromotionType("same")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          promotionType === "same"
                            ? "bg-red-900/40 border-red-700/60 text-white shadow-lg shadow-red-900/20"
                            : "bg-black/30 border-red-900/30 text-red-100/70 hover:bg-red-950/30 hover:border-red-800/40"
                        }`}
                      >
                        <div className="font-semibold mb-1">Без изменений</div>
                        <div className="text-xs opacity-80">Должность остаётся прежней</div>
                      </button>
                      <button
                        onClick={() => setPromotionType("new")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          promotionType === "new"
                            ? "bg-red-900/40 border-red-700/60 text-white shadow-lg shadow-red-900/20"
                            : "bg-black/30 border-red-900/30 text-red-100/70 hover:bg-red-950/30 hover:border-red-800/40"
                        }`}
                      >
                        <div className="font-semibold mb-1">Новая должность</div>
                        <div className="text-xs opacity-80">Назначение + перевод</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Специальная обработка для приказа о медкартах */}
                {editingOrder?.id === "13" && (
                  <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-2xl p-5">
                    <Label className="text-base font-semibold text-white mb-4 block flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Список сотрудников
                    </Label>
                    <div className="space-y-3">
                      {multiNicknames.map((nick, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder={`Никнейм ${index + 1}`}
                            value={nick}
                            onChange={(e) => {
                              const newNicks = [...multiNicknames]
                              newNicks[index] = e.target.value
                              setMultiNicknames(newNicks)
                            }}
                            className="flex-1 bg-black/40 border-red-900/40 text-white placeholder:text-red-100/40 focus:border-red-700 focus:ring-2 focus:ring-red-900/30 rounded-xl"
                          />
                          {multiNicknames.length > 2 && (
                            <Button
                              onClick={() => setMultiNicknames(multiNicknames.filter((_, i) => i !== index))}
                              variant="ghost"
                              size="icon"
                              className="text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        onClick={() => setMultiNicknames([...multiNicknames, ""])}
                        variant="outline"
                        className="w-full border-dashed border-red-900/40 text-red-300 hover:bg-red-950/30 hover:border-red-800/60 rounded-xl"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить сотрудника
                      </Button>
                    </div>
                  </div>
                )}

                {/* Специальная обработка для приказа о премировании */}
                {editingOrder?.id === "19" && (
                  <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-2xl p-5">
                    <Label className="text-base font-semibold text-white mb-4 block">Источник выплаты</Label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <button
                        onClick={() => setBonusSource("personal")}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          bonusSource === "personal"
                            ? "bg-red-900/40 border-red-700/60 text-white shadow-lg shadow-red-900/20"
                            : "bg-black/30 border-red-900/30 text-red-100/70 hover:bg-red-950/30 hover:border-red-800/40"
                        }`}
                      >
                        Личный счёт
                      </button>
                      <button
                        onClick={() => setBonusSource("fund")}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          bonusSource === "fund"
                            ? "bg-red-900/40 border-red-700/60 text-white shadow-lg shadow-red-900/20"
                            : "bg-black/30 border-red-900/30 text-red-100/70 hover:bg-red-950/30 hover:border-red-800/40"
                        }`}
                      >
                        Фонд неустоек
                      </button>
                      <button
                        onClick={() => setBonusSource("both")}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          bonusSource === "both"
                            ? "bg-red-900/40 border-red-700/60 text-white shadow-lg shadow-red-900/20"
                            : "bg-black/30 border-red-900/30 text-red-100/70 hover:bg-red-950/30 hover:border-red-800/40"
                        }`}
                      >
                        Оба источника
                      </button>
                    </div>
                    {bonusSource === "both" && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div>
                          <Label className="text-sm text-red-100/80 mb-2 block">Сумма с личного счёта</Label>
                          <Input
                            placeholder="Например: 50000"
                            value={formData["[Сумма личная]"] || ""}
                            onChange={(e) => setFormData({ ...formData, "[Сумма личная]": e.target.value })}
                            className="bg-black/40 border-red-900/40 text-white placeholder:text-red-100/40 focus:border-red-700 focus:ring-2 focus:ring-red-900/30 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-red-100/80 mb-2 block">Сумма с фонда</Label>
                          <Input
                            placeholder="Например: 50000"
                            value={formData["[Сумма фонд]"] || ""}
                            onChange={(e) => setFormData({ ...formData, "[Сумма фонд]": e.target.value })}
                            className="bg-black/40 border-red-900/40 text-white placeholder:text-red-100/40 focus:border-red-700 focus:ring-2 focus:ring-red-900/30 rounded-xl"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Специальная обработка для приказа об отпуске (id: 10) */}
                {editingOrder?.id === "10" && (
                  <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-2xl p-5">
                    <Label className="text-base font-semibold text-white mb-4 block">Даты отпуска</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-red-100/80 mb-2 block font-medium">С (начало отпуска)</Label>
                        <DatePicker
                          date={vacationStartDate}
                          onDateChange={setVacationStartDate}
                          placeholder="Выберите дату начала"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-red-100/80 mb-2 block font-medium">По (конец отпуска)</Label>
                        <DatePicker
                          date={vacationEndDate}
                          onDateChange={setVacationEndDate}
                          placeholder="Выберите дату окончания"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Специальная обработка для приказов с неустойкой (id: 5, 14) */}
                {(editingOrder?.id === "5" || editingOrder?.id === "14") && (
                  <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-2xl p-5">
                    <Label className="text-base font-semibold text-white mb-4 block">Неустойка</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setFineRequired(true)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          fineRequired
                            ? "bg-red-900/40 border-red-700/60 text-white shadow-lg shadow-red-900/20"
                            : "bg-black/30 border-red-900/30 text-red-100/70 hover:bg-red-950/30 hover:border-red-800/40"
                        }`}
                      >
                        <div className="font-semibold mb-1">Оплачена</div>
                        <div className="text-xs opacity-80">В полном объёме</div>
                      </button>
                      <button
                        onClick={() => setFineRequired(false)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          !fineRequired
                            ? "bg-red-900/40 border-red-700/60 text-white shadow-lg shadow-red-900/20"
                            : "bg-black/30 border-red-900/30 text-red-100/70 hover:bg-red-950/30 hover:border-red-800/40"
                        }`}
                      >
                        <div className="font-semibold mb-1">Не требуется</div>
                        <div className="text-xs opacity-80">Освобождён от оплаты</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Дисциплинарное состояние для всех приказов где оно есть */}
                {editingOrder && editingOrder.content.includes("Текущее дисциплинарное состояние:") && (
                  <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-2xl p-5">
                    <Label className="text-base font-semibold text-white mb-4 block">Дисциплинарное состояние</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm text-red-100/80 mb-2 block font-medium">УП</Label>
                        <div className="relative">
                          <select
                            value={disciplineUp}
                            onChange={(e) => setDisciplineUp(Number(e.target.value))}
                            className="w-full appearance-none bg-gradient-to-br from-black/50 to-black/30 border border-red-900/40 text-white rounded-xl px-4 py-3 pr-10 focus:border-red-700 focus:ring-2 focus:ring-red-900/30 outline-none cursor-pointer hover:border-red-800/50 hover:bg-black/40 transition-all font-medium"
                          >
                            {[0, 1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num} className="bg-[#1a0000] text-white">{num}/5</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-red-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-red-100/80 mb-2 block font-medium">П</Label>
                        <div className="relative">
                          <select
                            value={disciplineP}
                            onChange={(e) => setDisciplineP(Number(e.target.value))}
                            className="w-full appearance-none bg-gradient-to-br from-black/50 to-black/30 border border-red-900/40 text-white rounded-xl px-4 py-3 pr-10 focus:border-red-700 focus:ring-2 focus:ring-red-900/30 outline-none cursor-pointer hover:border-red-800/50 hover:bg-black/40 transition-all font-medium"
                          >
                            {[0, 1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num} className="bg-[#1a0000] text-white">{num}/5</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-red-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-red-100/80 mb-2 block font-medium">В</Label>
                        <div className="relative">
                          <select
                            value={disciplineV}
                            onChange={(e) => setDisciplineV(Number(e.target.value))}
                            className="w-full appearance-none bg-gradient-to-br from-black/50 to-black/30 border border-red-900/40 text-white rounded-xl px-4 py-3 pr-10 focus:border-red-700 focus:ring-2 focus:ring-red-900/30 outline-none cursor-pointer hover:border-red-800/50 hover:bg-black/40 transition-all font-medium"
                          >
                            {[0, 1, 2, 3].map(num => (
                              <option key={num} value={num} className="bg-[#1a0000] text-white">{num}/3</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-red-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Обычные поля */}
                {Object.keys(formData).filter(placeholder => {
                  // Фильтруем специальные поля
                  if (editingOrder?.id === "11" && (
                    placeholder === "[Текущая должность]" && promotionType === "new" ||
                    (placeholder === "[Новая должность]" || placeholder === "[Название батальона]") && promotionType === "same"
                  )) return false
                  if (editingOrder?.id === "13" && placeholder === "[Никнейм]") return false
                  if (editingOrder?.id === "19" && (placeholder === "[Сумма личная]" || placeholder === "[Сумма фонд]")) return false
                  if (editingOrder?.id === "10" && placeholder === "[Дата]") return false
                  return true
                }).length > 0 && (
                  <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-2xl p-5">
                    <Label className="text-base font-semibold text-white mb-4 block">Основные данные</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(formData).filter(placeholder => {
                        // Фильтруем специальные поля
                        if (editingOrder?.id === "11" && (
                          placeholder === "[Текущая должность]" && promotionType === "new" ||
                          (placeholder === "[Новая должность]" || placeholder === "[Название батальона]") && promotionType === "same"
                        )) return false
                        if (editingOrder?.id === "13" && placeholder === "[Никнейм]") return false
                        if (editingOrder?.id === "19" && (placeholder === "[Сумма личная]" || placeholder === "[Сумма фонд]")) return false
                        if (editingOrder?.id === "10" && placeholder === "[Дата]") return false
                        return true
                      }).map((placeholder) => {
                        const label = placeholder.replace(/[\[\]]/g, '')
                        return (
                          <div key={placeholder}>
                            <Label className="text-sm text-red-100/80 mb-2 block font-medium">
                              {label}
                            </Label>
                            <Input
                              placeholder={`Введите ${label.toLowerCase().replace(/никнейм/i, 'никнейм').replace(/дата/i, 'дату').replace(/должность/i, 'должность').replace(/сумма/i, 'сумму').replace(/причина/i, 'причину').replace(/название/i, 'название')}...`}
                              value={formData[placeholder]}
                              onChange={(e) => setFormData({ ...formData, [placeholder]: e.target.value })}
                              className="bg-black/40 border-red-900/40 text-white placeholder:text-red-100/40 focus:border-red-700 focus:ring-2 focus:ring-red-900/30 rounded-xl"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Предпросмотр */}
                <div className="bg-red-950/20 backdrop-blur-sm border border-red-900/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-red-900/30 rounded-lg">
                      <FileText className="h-5 w-5 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Предпросмотр приказа</h3>
                  </div>
                  <div className="bg-black/50 border border-red-900/20 rounded-xl p-5">
                    <pre className="font-mono text-sm text-red-50/90 leading-relaxed whitespace-pre-wrap">
                      {applyReplacements(editingOrder.content)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Футер */}
            <div className="border-t border-red-900/20 p-6 bg-gradient-to-r from-red-950/20 to-transparent">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-red-100/60">
                  Проверьте все данные перед копированием
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={closeEditor}
                    variant="outline"
                    className="border-red-900/30 text-white hover:bg-red-950/30 hover:border-red-800/40 rounded-xl px-6"
                  >
                    Отмена
                  </Button>
                  <CopyButton
                    text={applyReplacements(editingOrder.content)}
                    className="bg-red-900/40 hover:bg-red-900/50 text-white border border-red-700/50 rounded-xl px-6 shadow-lg hover:shadow-red-900/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
