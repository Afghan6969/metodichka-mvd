"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Shield, FileText, Check, ChevronsUpDown, Trash2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { toast } from "react-hot-toast"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useAuth } from "@/lib/auth-context"
import { Footer } from "@/components/footer"

interface Position {
  title: string
  rank: string
  level: string
}

interface DepartmentPositions {
  [key: string]: Position[]
}

const guvdPositions: DepartmentPositions = {
  "Руководящий состав": [
    { title: "Первый заместитель начальника ГУВД", rank: "Полковник", level: "10 ранг" },
    {
      title: "Заместитель начальника ГУВД, ответственный за спец. подразделения",
      rank: "Полковник",
      level: "10 ранг",
    },
    {
      title: "Заместитель начальника ГУВД, начальник отдела кадров",
      rank: "Полковник",
      level: "10 ранг",
    },
    {
      title: "Заместитель начальника ГУВД, начальник тыла",
      rank: "Полковник",
      level: "10 ранг",
    },
  ],
  "Старший состав": [
    {
      title: "Начальник Отряда мобильного особого назначения / Начальник СОБРа",
      rank: "Подполковник",
      level: "9 ранг",
    },
    { title: "Начальник Патрульно-постовой службы", rank: "Подполковник", level: "9 ранг" },
    { title: "Начальник Полицейской академии", rank: "Подполковник", level: "9 ранг" },
    {
      title: "Начальник Отдела воздушного патрулирования",
      rank: "Подполковник",
      level: "9 ранг",
    },
  ],
  "Отдел воздушного патрулирования": [{ title: "Сотрудник ОВП", rank: "Лейтенант-Майор", level: "5-8 ранг" }],
  "Отряд мобильного особого назначения": [{ title: "Боец ОМОН", rank: "Лейтенант-Капитан", level: "5-7 ранг" }],
  "Специальный отряд быстрого реагирования": [{ title: "Боец СОБРа", rank: "Лейтенант-Капитан", level: "5-7 ранг" }],
  "Патрульно-постовая служба": [
    { title: "Старший инспектор ППС", rank: "Старший Лейтенант-Капитан", level: "6-7 ранг" },
    { title: "Инспектор ППС", rank: "Лейтенант", level: "5 ранг" },
    { title: "Младший инспектор ППС", rank: "Старшина-Прапорщик", level: "3-4 ранг" },
  ],
  "Полицейская академия": [{ title: "Курсант ПА", rank: "Рядовой-Сержант", level: "1-2 ранг" }],
}

const gibddPositions: DepartmentPositions = {
  "Руководящий состав": [
    { title: "Первый заместитель начальника ГИБДД", rank: "Полковник", level: "10 ранг" },
    {
      title: "Заместитель начальника ГИБДД, начальник отдела кадров",
      rank: "Полковник",
      level: "10 ранг",
    },
    {
      title: "Заместитель начальника ГИБДД по работе с личным составом",
      rank: "Полковник",
      level: "10 ранг",
    },
    {
      title: "Заместитель начальника ГИБДД по вооружению",
      rank: "Полковник",
      level: "10 ранг",
    },
  ],
  "Старший состав": [
    { title: "Начальник Специализированного Батальона", rank: "Подполковник", level: "9 ранг" },
    { title: "Начальник Отдельного Батальона", rank: "Подполковник", level: "9 ранг" },
    { title: "Начальник Учебного Батальона", rank: "Подполковник", level: "9 ранг" },
    { title: "Начальник Мотобатальона", rank: "Подполковник", level: "9 ранг" },
    {
      title: "Заместитель Начальника Специализированного Батальона",
      rank: "Майор",
      level: "8 ранг",
    },
    { title: "Заместитель Начальника Отдельного Батальона", rank: "Майор", level: "8 ранг" },
    { title: "Заместитель Начальника Учебного Батальона", rank: "Майор", level: "8 ранг" },
    { title: "Заместитель Начальника Мотобатальона", rank: "Майор", level: "8 ранг" },
  ],
  Мотобатальон: [{ title: "Инспектор МБ", rank: "Старший Лейтенант-Капитан", level: "6-7 ранг" }],
  "Специализированный Батальон": [{ title: "Инспектор СБ", rank: "Прапорщик-Капитан", level: "4-7 ранг" }],
  "Отдельный Батальон": [{ title: "Инспектор ОБ", rank: "Старшина-Капитан", level: "3-7 ранг" }],
  "Учебный Батальон": [{ title: "Курсант УБ", rank: "Рядовой-Сержант", level: "1-2 ранг" }],
}

const rankHierarchy = [
  "Рядовой",
  "Сержант",
  "Старшина",
  "Прапорщик",
  "Лейтенант",
  "Старший Лейтенант",
  "Капитан",
  "Майор",
  "Подполковник",
  "Полковник",
]

const seniorCategories = ["Руководящий состав", "Старший состав"]
const academyCategories = ["Полицейская академия", "Учебный Батальон"]
const cities = ["Мирный", "Невский", "Приволжск"]

const departmentAbbreviations: { [key: string]: string } = {
  "Патрульно-постовая служба": "ППС",
  "Полицейская академия": "ПА",
  "Отдел воздушного патрулирования": "ОВП",
  "Отряд мобильного особого назначения": "ОМОН",
  "Специальный отряд быстрого реагирования": "СОБР",
}

const declensionRules: Record<string, { genitive: string; instrumental: string }> = {
  Боец: { genitive: "Бойца", instrumental: "Бойцом" },
  Курсант: { genitive: "Курсанта", instrumental: "Курсантом" },
  Инспектор: { genitive: "Инспектора", instrumental: "Инспектором" },
  Сотрудник: { genitive: "Сотрудника", instrumental: "Сотрудником" },
  Начальник: { genitive: "Начальника", instrumental: "Начальником" },
  Заместитель: { genitive: "Заместителя", instrumental: "Заместителем" },
  Первый: { genitive: "Первого", instrumental: "Первым" },
}

const departmentDeclension = {
  академии: { genitive: "ии", instrumental: "ией" },
  отряда: { genitive: "отряда", instrumental: "отрядом" },
  службы: { genitive: "службы", instrumental: "службой" },
  отдела: { genitive: "отдела", instrumental: "отделом" },
  батальона: { genitive: "батальона", instrumental: "батальоном" },
}

const declinePosition = (position: string, isVrio: boolean, caseType: "genitive" | "instrumental") => {
  if (!position) return ""
  const prefix = isVrio ? "ВрИО " : ""
  const title = isVrio ? position.replace(/^ВрИО /, "") : position
  const words = title.trim().split(/\s+/)
  let modifier = ""
  let mainNoun = words[0]
  let department = words.slice(1).join(" ")

  if (["Первый", "Заместитель"].includes(words[0])) {
    modifier = words[0]
    mainNoun = words[1] || ""
    department = words.slice(2).join(" ")
  }

  const nounDeclension = declensionRules[mainNoun] || {
    genitive: !mainNoun.endsWith("а") && !mainNoun.endsWith("о") && !mainNoun.endsWith("е") ? mainNoun + "а" : mainNoun,
    instrumental:
      !mainNoun.endsWith("а") && !mainNoun.endsWith("о") && !mainNoun.endsWith("е") ? mainNoun + "ом" : mainNoun,
  }

  let declinedDept = department
  if (
    department &&
    !["ОМОН", "СОБР", "ППС", "ОВП", "ПА", "ГУВД", "ГИБДД", "МБ", "СБ", "ОБ", "УБ"].some((abbr) =>
      department.includes(abbr),
    )
  ) {
    for (const [key, declension] of Object.entries(departmentDeclension)) {
      if (department.endsWith(key)) {
        declinedDept = department.replace(new RegExp(`${key}$`), declension[caseType])
        break
      }
    }
  }

  if (modifier === "Первый") {
    return prefix + `Перв${caseType === "genitive" ? "ого" : "ым"} Заместителя ${declinedDept}`.trim()
  } else if (modifier === "Заместитель") {
    return prefix + `Заместителя ${declinedDept}`.trim()
  }
  return prefix + (declinedDept ? `${nounDeclension[caseType]} ${declinedDept}` : nounDeclension[caseType]).trim()
}

const toGenitiveCase = (position: string, isVrio: boolean) => declinePosition(position, isVrio, "genitive")
const toInstrumentalCase = (position: string, isVrio: boolean) => declinePosition(position, isVrio, "instrumental")

export function GeneratorPage() {
  const { currentUser, hasAccess } = useAuth()
  const [department, setDepartment] = useState<"GUVD" | "GIBDD" | null>(null)
  const [reportType, setReportType] = useState<"promotion" | "reprimand" | "senior" | null>(null)
  const [city, setCity] = useState("")
  const [leaderFio, setLeaderFio] = useState("")
  const [fio, setFio] = useState("")
  const [position, setPosition] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [rank, setRank] = useState("")
  const [newRank, setNewRank] = useState("")
  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()
  const [requirements, setRequirements] = useState<{ req: string; quantity?: string; link: string }[]>([
    { req: "", quantity: "", link: "" },
  ])
  const [points, setPoints] = useState("")
  const [violation, setViolation] = useState("")
  const [paymentLink, setPaymentLink] = useState("")
  const [onlineStats, setOnlineStats] = useState("")
  const [generatedReport, setGeneratedReport] = useState("")
  const [possibleRanks, setPossibleRanks] = useState<string[]>([])
  const [hasFixedRank, setHasFixedRank] = useState(false)
  const [signature, setSignature] = useState("")
  const [isVrio, setIsVrio] = useState(false)
  const [openCity, setOpenCity] = useState(false)
  const [openPosition, setOpenPosition] = useState(false)
  const [openRank, setOpenRank] = useState(false)
  const [copied, setCopied] = useState(false)

  const positionsData = department === "GUVD" ? guvdPositions : gibddPositions
  const allPositions = Object.values(positionsData).flat()

  useEffect(() => {
    if (currentUser) {
      console.log("Current user:", currentUser)
      console.log("Has access to generator-page:", hasAccess("generator-page", department || undefined, undefined))
      if (
        currentUser.role === "gibdd" ||
        currentUser.role === "ss-gibdd" ||
        currentUser.role === "pgs-gibdd" ||
        currentUser.role === "gs-gibdd"
      ) {
        setDepartment("GIBDD")
      } else if (
        currentUser.role === "guvd" ||
        currentUser.role === "ss-guvd" ||
        currentUser.role === "pgs-guvd" ||
        currentUser.role === "gs-guvd"
      ) {
        setDepartment("GUVD")
      }
      // Для роли root департамент не устанавливается автоматически, пользователь выберет вручную
    }
  }, [currentUser])

  useEffect(() => {
    setRank("")
    setNewRank("")
    setPossibleRanks([])
    setHasFixedRank(false)
    setPosition("")
    setSelectedCategory("")
    setIsVrio(false)
  }, [reportType])

  useEffect(() => {
    setPosition("")
    setRank("")
    setNewRank("")
    setPossibleRanks([])
    setSelectedCategory("")
    setIsVrio(false)
    setHasFixedRank(false)
  }, [department])

  const isFormValid = useCallback(() => {
    const requiredFields = [city, fio, position, rank, signature]
    if (department === "GUVD") {
      requiredFields.push(leaderFio)
    }
    if (reportType === "promotion" || reportType === "reprimand" || reportType === "senior") {
      if (!fromDate || !toDate) return false
    }
    if (department === "GIBDD" && (reportType === "promotion" || reportType === "reprimand")) {
      requiredFields.push(points)
    }
    if (reportType === "reprimand" && department === "GIBDD") {
      requiredFields.push(violation, paymentLink)
    }
    if (reportType === "senior" && department === "GUVD") {
      requiredFields.push(onlineStats)
    }
    return (
      requiredFields.every((field) => field.trim() !== "") &&
      requirements.every((req) => req.req.trim() !== "" && req.link.trim() !== "")
    )
  }, [
    city,
    leaderFio,
    fio,
    position,
    rank,
    signature,
    fromDate,
    toDate,
    points,
    violation,
    paymentLink,
    onlineStats,
    requirements,
    department,
    reportType,
  ])

  const saveDraft = useCallback(() => {
    const draft = {
      department,
      reportType,
      city,
      leaderFio,
      fio,
      position,
      rank,
      newRank,
      fromDate,
      toDate,
      requirements,
      points,
      violation,
      paymentLink,
      onlineStats,
      signature,
      isVrio,
    }
    localStorage.setItem("reportDraft", JSON.stringify(draft))
    toast.success("Черновик сохранён!")
  }, [
    department,
    reportType,
    city,
    leaderFio,
    fio,
    position,
    rank,
    newRank,
    fromDate,
    toDate,
    requirements,
    points,
    violation,
    paymentLink,
    onlineStats,
    signature,
    isVrio,
  ])

  const loadDraft = useCallback(() => {
    const draft = localStorage.getItem("reportDraft")
    if (draft) {
      const parsed = JSON.parse(draft)
      setDepartment(parsed.department || null)
      setReportType(parsed.reportType || null)
      setCity(parsed.city || "")
      setLeaderFio(parsed.leaderFio || "")
      setFio(parsed.fio || "")
      setPosition(parsed.position || "")
      setRank(parsed.rank || "")
      setNewRank(parsed.newRank || "")
      setFromDate(parsed.fromDate || "")
      setToDate(parsed.toDate || "")
      setRequirements(
        parsed.requirements || [{ req: "", quantity: department === "GIBDD" ? "" : undefined, link: "" }],
      )
      setPoints(parsed.points || "")
      setViolation(parsed.violation || "")
      setPaymentLink(parsed.paymentLink || "")
      setOnlineStats(parsed.onlineStats || "")
      setSignature(parsed.signature || "")
      setIsVrio(parsed.isVrio || false)
      if (parsed.position) {
        const selected = allPositions.find((p) => p.title === parsed.position)
        if (selected) {
          const ranks = parseRanks(selected.rank)
          setPossibleRanks(ranks)
          const isFixed = !selected.rank.includes("-")
          setHasFixedRank(isFixed)
          let cat = ""
          for (const [category, pos] of Object.entries(positionsData)) {
            if (pos.some((p) => p.title === parsed.position)) {
              cat = category
              break
            }
          }
          setSelectedCategory(cat)
        }
      }
      toast.success("Черновик загружен!")
    } else {
      toast.error("Черновик не найден!")
    }
  }, [allPositions, positionsData, department])

  const deleteDraft = useCallback(() => {
    localStorage.removeItem("reportDraft")
    toast.success("Черновик удалён!")
  }, [])

  const clearForm = useCallback(() => {
    setCity("")
    setLeaderFio("")
    setFio("")
    setPosition("")
    setRank("")
    setNewRank("")
    setFromDate(undefined)
    setToDate(undefined)
    setRequirements([{ req: "", quantity: department === "GIBDD" ? "" : undefined, link: "" }])
    setPoints("")
    setViolation("")
    setPaymentLink("")
    setOnlineStats("")
    setSignature("")
    setIsVrio(false)
    setSelectedCategory("")
    setPossibleRanks([])
    setHasFixedRank(false)
    toast.success("Форма очищена!")
  }, [department])

  const parseRanks = (rankString: string): string[] => {
    const normalizedRankString = rankString.replace("—", "-")
    if (normalizedRankString.includes("-")) {
      const [start, end] = normalizedRankString.split("-").map((s) => s.trim())
      const startIndex = rankHierarchy.indexOf(start)
      const endIndex = rankHierarchy.indexOf(end)
      if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
        return rankHierarchy.slice(startIndex, endIndex + 1)
      }
    }
    return [rankString.trim()]
  }

  const handlePositionChange = useCallback(
    (value: string) => {
      const selected = allPositions.find((p) => p.title === value)
      if (selected) {
        setPosition(selected.title)
        const ranks = parseRanks(selected.rank)
        setPossibleRanks(ranks)
        const isFixed = !selected.rank.includes("-")
        setHasFixedRank(isFixed)
        if (isFixed) {
          setRank(selected.rank)
        } else {
          setRank("")
        }
        setNewRank("")
        let cat = ""
        for (const [category, pos] of Object.entries(positionsData)) {
          if (pos.some((p) => p.title === value)) {
            cat = category
            break
          }
        }
        setSelectedCategory(cat)
        setOpenPosition(false)
        setOpenCity(false)
        setOpenRank(false)
      }
    },
    [allPositions, positionsData],
  )

  const getNextRank = useCallback((currentRank: string) => {
    const currentIndex = rankHierarchy.indexOf(currentRank)
    if (currentIndex !== -1 && currentIndex < rankHierarchy.length - 1) {
      return rankHierarchy[currentIndex + 1]
    }
    return ""
  }, [])

  useEffect(() => {
    if (rank && reportType === "promotion") {
      const nextRank = getNextRank(rank)
      setNewRank(nextRank)
    } else {
      setNewRank("")
    }
  }, [rank, reportType, getNextRank])

  const addRequirement = () => {
    setRequirements([...requirements, { req: "", quantity: department === "GIBDD" ? "" : undefined, link: "" }])
  }

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index))
    }
  }

  const updateRequirement = (index: number, field: "req" | "quantity" | "link", value: string) => {
    const newReqs = [...requirements]
    newReqs[index][field] = value
    setRequirements(newReqs)
  }

  const copyReport = () => {
    navigator.clipboard
      .writeText(generatedReport)
      .then(() => {
        setCopied(true)
        toast.success("Отчёт скопирован!")
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        toast.error("Ошибка при копировании!")
      })
  }

  const generateReport = () => {
    if (!isFormValid()) {
      toast.error("Пожалуйста, заполните все обязательные поля, включая департамент!")
      return
    }
    const currentDate = format(new Date(), "dd.MM.yyyy", { locale: ru })
    const formattedFromDate = fromDate ? format(fromDate, "dd.MM.yyyy", { locale: ru }) : ""
    const formattedToDate = toDate ? format(toDate, "dd.MM.yyyy", { locale: ru }) : ""
    const displayPosition = toGenitiveCase(position, isVrio && reportType === "senior")
    const instrumentalPosition = toInstrumentalCase(position, isVrio && reportType === "senior")
    const deptAbbr = departmentAbbreviations[selectedCategory] || selectedCategory
    let template = ""
    let reqList = ""
    if (department === "GUVD") {
      reqList = requirements.map((r, i) => `${i + 1}. ${r.req} - ${r.link}`).join("\n")
    } else {
      reqList = requirements.map((r, i) => `${i + 1}. ${r.req} – ${r.quantity} – ${r.link}`).join("\n")
    }

    if (department === "GUVD") {
      if (reportType === "promotion") {
        template = `Начальнику ГУВД по г. ${city}
Генерал-майору ${leaderFio}
От ${displayPosition}, ${rank}
"${fio}"

Рапорт о проделанной работе.
Я, ${fio}, являющийся ${instrumentalPosition} подразделения ${deptAbbr}, находящийся в звании ${rank}, оставляю отчет о проделанной работе. В связи с выполнением мной всех необходимых нормативов и требований прошу повысить меня до звания ${newRank}.
С правилами подачи рапорта ознакомлен(-на).

К рапорту прикладываю необходимый объём работы:
${reqList}

Дата: ${currentDate}
Подпись: ${signature}`
      } else if (reportType === "reprimand") {
        template = `Начальнику ГУВД по г. ${city}
Генерал-майору ${leaderFio}
От ${displayPosition}, ${rank}
"${fio}"

Рапорт о проделанной работе.
Я, ${fio}, являющийся ${instrumentalPosition}, находящийся в звании ${rank}, оставляю отчет о проделанной работе. В связи с выполнением мной нормы работы прошу снять с меня письменное дисциплинарное взыскание в виде выговора.
С правилами подачи рапорта ознакомлен(-на).

К рапорту прикладываю необходимый объём работы:
${reqList}

Дата: ${currentDate}
Подпись: ${signature}`
      } else if (reportType === "senior") {
        template = `Начальнику ГУВД по г. ${city}
Генерал-майору ${leaderFio}
От ${displayPosition}, ${rank}
"${fio}"

Рапорт.
Я, ${rank} ${fio}, являющийся ${instrumentalPosition}, оставляю рапорт и докладываю Вам о проделанной мною работе в период с ${formattedFromDate} по ${formattedToDate}.

${reqList}

Ваша статистика онлайна за неделю: ${onlineStats}

Дата: ${currentDate}
Подпись: ${signature}`
      }
    } else if (department === "GIBDD") {
      if (reportType === "promotion") {
        template = `Генералу Республики Провинция
Начальнику ГИБДД по городу ${city}
От ${displayPosition}, находящегося в звании ${rank}, ${fio}.

Я, ${fio}, являющийся ${instrumentalPosition}, докладываю о состоянии несения службы и выполненной мной работе за период с ${formattedFromDate} по ${formattedToDate} и прошу рассмотреть моё заявление о повышении в звании до ${newRank}. За указанный период мною был выполнен следующий объём работы, а также набрано соответствующее количество баллов: ${points}

${reqList}

Подпись: ${signature}
Дата: ${currentDate}`
      } else if (reportType === "reprimand") {
        template = `Генералу Республики Провинция
Начальнику ГИБДД по городу ${city}
От ${displayPosition}, находящегося в звании ${rank}, ${fio}.

Я, ${fio}, являющийся ${instrumentalPosition}, прошу Вас рассмотреть мой рапорт на аннулирование дисциплинарного взыскания в виде выговора, полученного за нарушение ${violation}. К рапорту прикладываю сведения о выполнении плана и количестве набранных баллов: ${points}

${reqList}

Также прикладываю подтверждение об оплате неустойки на счёт лидера – ${paymentLink}
Подпись: ${signature}
Дата: ${currentDate}`
      } else if (reportType === "senior") {
        template = `Генералу Республики Провинция
Начальнику ГИБДД по городу ${city}
От ${displayPosition}, находящегося в звании ${rank}, ${fio}.

Я, ${fio}, являющийся ${instrumentalPosition}, докладываю о состоянии несения службы и выполненной мной работе за промежуток времени с ${formattedFromDate} по ${formattedToDate}. За данный промежуток времени мною был выполнен следующий объём работ:

${reqList}

Дата: ${currentDate}
Подпись: ${signature}`
      }
    }

    setGeneratedReport(template)
  }

  if (!currentUser || !hasAccess("generator-page", department || undefined, undefined)) {
    console.log("Access denied for role:", currentUser?.role, "with department:", department)
    return (
      <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
        <div className="max-w-md mx-auto mt-16">
          <Card className="p-8 bg-card shadow-xl border-border rounded-2xl">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Генератор отчётов</h1>
              <p className="text-muted-foreground">Требуется авторизация</p>
            </div>
            <div className="space-y-6">
              <Alert className="border-border bg-muted">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <AlertDescription className="text-muted-foreground text-sm">
                  Для доступа к генератору отчётов необходимо иметь роль ГИБДД, ГУВД, СС ГИБДД, СС ГУВД, ПГС ГИБДД, ПГС ГУВД, ГС ГИБДД, ГС ГУВД или root.
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const getAvailableReportTypes = () => {
    if (!currentUser) return []
    if (
      currentUser.role === "root" ||
      currentUser.role === "gs-gibdd" ||
      currentUser.role === "gs-guvd" ||
      currentUser.role === "pgs-gibdd" ||
      currentUser.role === "pgs-guvd"
    ) {
      return ["promotion", "reprimand", "senior"]
    }
    if (currentUser.role === "ss-gibdd" || currentUser.role === "ss-guvd") {
      return ["promotion", "reprimand", "senior"]
    }
    if (currentUser.role === "gibdd" || currentUser.role === "guvd") {
      return ["promotion", "reprimand"]
    }
    return []
  }

  const availableReportTypes = getAvailableReportTypes()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <FileText className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Генератор отчётов</h1>
          <p className="text-muted-foreground">Генератор рапортов для ГУВД и ГИБДД МВД РП</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card className="bg-blue border-border dark:bg-opacity-20 border-2 mx-auto w-full max-w-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-foreground dark:opacity-90 text-xl justify-center">
              <Shield className="h-5 w-5" />
              Ваш департамент
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {currentUser?.role === "root" ? (
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => setDepartment("GUVD")}
                  variant={department === "GUVD" ? "default" : "outline"}
                  className={cn(
                    "w-60 transition-all duration-300 ease-in-out transform hover:scale-105",
                    department === "GUVD"
                      ? "bg-primary hover:bg-primary/90 shadow-lg"
                      : "border-2 hover:bg-muted",
                  )}
                >
                  ГУВД
                </Button>
                <Button
                  onClick={() => setDepartment("GIBDD")}
                  variant={department === "GIBDD" ? "default" : "outline"}
                  className={cn(
                    "w-60 transition-all duration-300 ease-in-out transform hover:scale-105",
                    department === "GIBDD"
                      ? "bg-primary hover:bg-primary/90 shadow-lg"
                      : "border-2 hover:bg-muted",
                  )}
                >
                  ГИБДД
                </Button>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-primary">{department || "Не определён"}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Департамент определён автоматически на основе вашей роли
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {department && (
          <Card className="bg-blue border-border dark:bg-opacity-20 border-2 mx-auto w-full max-w-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-foreground dark:opacity-90 text-xl">
                <FileText className="h-5 w-5" />
                Выбор типа отчёта
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                {availableReportTypes.includes("promotion") && (
                  <Button
                    onClick={() => setReportType("promotion")}
                    variant={reportType === "promotion" ? "default" : "outline"}
                    className={cn(
                      "w-60 transition-all duration-300 ease-in-out transform hover:scale-105",
                      reportType === "promotion"
                        ? "bg-primary hover:bg-primary/90 shadow-lg"
                        : "border-2 hover:bg-muted",
                    )}
                  >
                    Рапорт на повышение
                  </Button>
                )}
                {availableReportTypes.includes("reprimand") && (
                  <Button
                    onClick={() => setReportType("reprimand")}
                    variant={reportType === "reprimand" ? "default" : "outline"}
                    className={cn(
                      "w-60 transition-all duration-300 ease-in-out transform hover:scale-105",
                      reportType === "reprimand"
                        ? "bg-primary hover:bg-primary/90 shadow-lg"
                        : "border-2 hover:bg-muted",
                    )}
                  >
                    Рапорт на отработку выговора
                  </Button>
                )}
                {availableReportTypes.includes("senior") && (
                  <Button
                    onClick={() => setReportType("senior")}
                    variant={reportType === "senior" ? "default" : "outline"}
                    className={cn(
                      "w-60 transition-all duration-300 ease-in-out transform hover:scale-105",
                      reportType === "senior" ? "bg-primary hover:bg-primary/90 shadow-lg" : "border-2 hover:bg-muted",
                    )}
                  >
                    Отчёт старшего состава
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {department && reportType && (
          <Card className="bg-blue border-border dark:bg-opacity-20 border-2 md:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-foreground dark:opacity-90 text-xl">
                <FileText className="h-5 w-5" />
                Форма для заполнения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="city">Город</Label>
                  <div className="relative w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCity}
                      className="w-full justify-between bg-transparent text-foreground border-border"
                      onClick={() => {
                        setOpenCity(!openCity)
                        setOpenPosition(false)
                        setOpenRank(false)
                      }}
                    >
                      {city || "Выберите город..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    <AnimatePresence>
                      {openCity && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 z-50 mt-1 bg-muted border border-border rounded-md shadow-lg"
                        >
                          <Command>
                            <CommandInput placeholder="Поиск города..." />
                            <CommandEmpty>Города не найдены.</CommandEmpty>
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
                                  >
                                    <Check className={cn("mr-2 h-4 w-4", city === c ? "opacity-100" : "opacity-0")} />
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
                {department === "GUVD" && (
                  <div>
                    <Label htmlFor="leaderFio">ФИО лидера</Label>
                    <Input id="leaderFio" value={leaderFio} onChange={(e) => setLeaderFio(e.target.value)} />
                  </div>
                )}
                <div>
                  <Label htmlFor="fio">Ваше ФИО</Label>
                  <Input id="fio" value={fio} onChange={(e) => setFio(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="position">Должность</Label>
                  <div className="relative w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPosition}
                      className="w-full justify-between bg-transparent text-foreground border-border"
                      onClick={() => {
                        setOpenPosition(!openPosition)
                        setOpenCity(false)
                        setOpenRank(false)
                      }}
                    >
                      {position || "Выберите должность..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    <AnimatePresence>
                      {openPosition && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 z-50 mt-1 bg-muted border border-border rounded-md shadow-lg"
                        >
                          <Command>
                            <CommandInput placeholder="Поиск должности..." />
                            <CommandEmpty>Должности не найдены.</CommandEmpty>
                            <CommandList className="max-h-[200px] overflow-y-auto">
                              <CommandGroup>
                                {Object.entries(positionsData)
                                  .filter(([category]) =>
                                    reportType === "senior"
                                      ? seniorCategories.includes(category)
                                      : reportType !== "promotion" || !seniorCategories.includes(category),
                                  )
                                  .flatMap(([category, pos]) => pos)
                                  .map((p) => (
                                    <CommandItem
                                      key={p.title}
                                      value={p.title}
                                      onSelect={() => handlePositionChange(p.title)}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          position === p.title ? "opacity-100" : "opacity-0",
                                        )}
                                      />
                                      {p.title} ({p.rank}, {p.level})
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
                {position && (
                  <div className="flex items-center gap-4">
                    {!hasFixedRank && possibleRanks.length > 0 ? (
                      <div className="flex-1">
                        <Label htmlFor="rank">Текущее звание</Label>
                        <div className="relative w-full">
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openRank}
                            className="w-full justify-between bg-transparent text-foreground border-border"
                            onClick={() => {
                              setOpenRank(!openRank)
                              setOpenCity(false)
                              setOpenPosition(false)
                            }}
                          >
                            {rank || "Выберите текущее звание..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                          <AnimatePresence>
                            {openRank && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 z-50 mt-1 bg-muted border border-border rounded-md shadow-lg"
                              >
                                <Command>
                                  <CommandInput placeholder="Поиск звания..." />
                                  <CommandEmpty>Звания не найдены.</CommandEmpty>
                                  <CommandList className="max-h-[200px] overflow-y-auto">
                                    <CommandGroup>
                                      {possibleRanks
                                        .slice(
                                          0,
                                          reportType === "promotion" && !academyCategories.includes(selectedCategory)
                                            ? -1
                                            : undefined,
                                        )
                                        .map((r) => (
                                          <CommandItem
                                            key={r}
                                            value={r}
                                            onSelect={(value) => {
                                              setRank(value)
                                              setOpenRank(false)
                                            }}
                                          >
                                            <Check
                                              className={cn("mr-2 h-4 w-4", rank === r ? "opacity-100" : "opacity-0")}
                                            />
                                            {r}
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
                    ) : (
                      <div className="flex-1">
                        <Label>Текущее звание</Label>
                        <div className="text-sm text-foreground bg-muted p-2 rounded-md">
                          {rank || "Звание не выбрано"}
                        </div>
                      </div>
                    )}
                    {reportType === "promotion" && rank && (
                      <div className="flex-1">
                        <Label>Звание на повышение</Label>
                        <div className="text-sm text-foreground bg-muted p-2 rounded-md">
                          {newRank || "Нет следующего звания"}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {reportType === "senior" && (
                  <div>
                    <Button variant={isVrio ? "default" : "outline"} onClick={() => setIsVrio(!isVrio)}>
                      ВрИО
                    </Button>
                  </div>
                )}
                {(reportType === "promotion" || reportType === "reprimand" || reportType === "senior") && (
                  <>
                    <div>
                      <Label htmlFor="fromDate">Дата с</Label>
                      <DatePicker date={fromDate} onDateChange={setFromDate} placeholder="Выберите дату начала" />
                    </div>
                    <div>
                      <Label htmlFor="toDate">Дата по</Label>
                      <DatePicker date={toDate} onDateChange={setToDate} placeholder="Выберите дату окончания" />
                    </div>
                  </>
                )}
                {department === "GIBDD" && (reportType === "promotion" || reportType === "reprimand") && (
                  <div>
                    <Label htmlFor="points">Количество баллов</Label>
                    <Input id="points" value={points} onChange={(e) => setPoints(e.target.value)} />
                  </div>
                )}
                {reportType === "reprimand" && department === "GIBDD" && (
                  <>
                    <div>
                      <Label htmlFor="violation">Пункт нарушения (Пункт УГ)</Label>
                      <Input id="violation" value={violation} onChange={(e) => setViolation(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="paymentLink">Ссылка на оплату неустойки</Label>
                      <Input id="paymentLink" value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} />
                    </div>
                  </>
                )}
                {reportType === "senior" && department === "GUVD" && (
                  <div>
                    <Label htmlFor="onlineStats">Статистика онлайна за неделю</Label>
                    <Input id="onlineStats" value={onlineStats} onChange={(e) => setOnlineStats(e.target.value)} />
                  </div>
                )}
                <div>
                  <Label>Требования/Задачи</Label>
                  {requirements.map((req, index) => (
                    <div key={index} className="flex gap-2 mt-2 items-center">
                      <Input
                        placeholder="Название задачи/требования"
                        value={req.req}
                        onChange={(e) => updateRequirement(index, "req", e.target.value)}
                        className="w-full md:w-125"
                      />
                      {department === "GIBDD" && (
                        <Input
                          placeholder="Количество"
                          value={req.quantity || ""}
                          onChange={(e) => updateRequirement(index, "quantity", e.target.value)}
                          className="w-full md:w-40"
                        />
                      )}
                      <Input
                        placeholder="Ссылка"
                        value={req.link}
                        onChange={(e) => updateRequirement(index, "link", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeRequirement(index)}
                        disabled={requirements.length === 1}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addRequirement} className="mt-2 bg-transparent">
                    Добавить требование
                  </Button>
                </div>
                <div>
                  <Label htmlFor="signature">Подпись</Label>
                  <Input id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={generateReport} disabled={!isFormValid()}>
                    Сгенерировать отчёт
                  </Button>
                  <Button variant="outline" onClick={saveDraft}>
                    Сохранить черновик
                  </Button>
                  <Button variant="outline" onClick={loadDraft}>
                    Загрузить черновик
                  </Button>
                  <Button variant="destructive" onClick={deleteDraft}>
                    Удалить черновик
                  </Button>
                  <Button variant="destructive" onClick={clearForm}>
                    Очистить всё
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {generatedReport && (
          <Card className="bg-blue border-border dark:bg-opacity-20 border-2 md:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-foreground dark:opacity-90 text-xl">
                <FileText className="h-5 w-5" />
                Сгенерированный отчёт
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded font-mono text-sm text-foreground whitespace-pre-wrap">
                {generatedReport}
              </div>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={copyReport}
                disabled={!generatedReport}
              >
                {copied ? "Скопировано!" : "Скопировать"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}