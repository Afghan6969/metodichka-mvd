"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Shield, FileText, Check, ChevronsUpDown, Trash2, AlertCircle, PenTool } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { toast } from "react-hot-toast"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useAuth } from "@/lib/auth-context"
import { PageHeader } from "@/components/page-header"

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
  const declineLeaderName = (name: string, targetCase: "dative" | "genitive") => {
    if (!name) return ""
    const parts = name.split(" ")
    if (parts.length < 2) return name

    const lastName = parts[0]
    const firstName = parts[1]
    const middleName = parts[2] || ""

    // Правила склонения русских фамилий
    const declinedLastName = declineRussianLastName(lastName, targetCase)
    const declinedFirstName = declineRussianFirstName(firstName, targetCase)
    const declinedMiddleName = middleName ? declineRussianMiddleName(middleName, targetCase) : ""

    return `${declinedLastName} ${declinedFirstName}${declinedMiddleName ? " " + declinedMiddleName : ""}`.trim()
  }

  const declineRussianLastName = (lastName: string, targetCase: "dative" | "genitive") => {
    if (!lastName) return ""

    // Правила склонения русских фамилий
    const endings = {
      dative: {
        "ов": "у", "ев": "у", "ёв": "ёву", "ин": "у", "ын": "у",
        "ий": "ю", "ой": "ому", "ый": "ому", "ая": "ой", "яя": "ей"
      },
      genitive: {
        "ов": "а", "ев": "а", "ёв": "ёва", "ин": "а", "ын": "а",
        "ий": "его", "ой": "ого", "ый": "ого", "ая": "ой", "яя": "ей"
      }
    }

    const rules = endings[targetCase]
    for (const [ending, replacement] of Object.entries(rules)) {
      if (lastName.endsWith(ending)) {
        return lastName.slice(0, -ending.length) + replacement
      }
    }

    // Если не найдено правило, возвращаем как есть (для иностранных фамилий)
    return lastName
  }

  const declineRussianFirstName = (firstName: string, targetCase: "dative" | "genitive") => {
    if (!firstName) return ""

    // Правила склонения русских имен
    const maleEndings = {
      dative: { "ий": "ию", "ей": "ею", "ай": "аю", "я": "е", "а": "е" },
      genitive: { "ий": "ия", "ей": "ея", "ай": "ая", "я": "и", "а": "ы" }
    }

    const femaleEndings = {
      dative: { "а": "е", "я": "е", "ия": "ии" },
      genitive: { "а": "ы", "я": "и", "ия": "ии" }
    }

    // Определяем пол по окончанию (упрощенный алгоритм)
    const isFemale = firstName.endsWith("а") || firstName.endsWith("я")

    const rules = isFemale ? femaleEndings[targetCase] : maleEndings[targetCase]

    for (const [ending, replacement] of Object.entries(rules)) {
      if (firstName.endsWith(ending)) {
        return firstName.slice(0, -ending.length) + replacement
      }
    }

    return firstName
  }

  const declineRussianMiddleName = (middleName: string, targetCase: "dative" | "genitive") => {
    if (!middleName) return ""
    if (targetCase === "dative") {
      return middleName.endsWith("ич") ? middleName.slice(0, -2) + "ичу" : middleName.slice(0, -1) + "не"
    } else {
      return middleName.endsWith("ич") ? middleName.slice(0, -2) + "ича" : middleName.slice(0, -1) + "ны"
    }
  }

const toInstrumentalCase = (position: string, isVrio: boolean) => declinePosition(position, isVrio, "instrumental")

export function GeneratorPage() {
  const { currentUser, hasAccess } = useAuth()
  const [department, setDepartment] = useState<"ГУВД" | "ГИБДД" | null>(null)
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

  const positionsData = department === "ГУВД" ? guvdPositions : gibddPositions
  const allPositions = Object.values(positionsData).flat()

  useEffect(() => {
    if (currentUser) {
      console.log("Current user:", currentUser)
      console.log("Has access to generator-page:", hasAccess("generator-page"))
      if (
        currentUser.role === "gibdd" ||
        currentUser.role === "ss-gibdd" ||
        currentUser.role === "pgs-gibdd" ||
        currentUser.role === "gs-gibdd" ||
        currentUser.role === "leader-gibdd"
      ) {
        setDepartment("ГИБДД")
      } else if (
        currentUser.role === "guvd" ||
        currentUser.role === "ss-guvd" ||
        currentUser.role === "pgs-guvd" ||
        currentUser.role === "gs-guvd" ||
        currentUser.role === "leader-guvd"
      ) {
        setDepartment("ГУВД")
      }
      // Для ролей root и super-admin департамент не устанавливается автоматически, пользователь выберет вручную
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
    if (department === "ГУВД") {
      requiredFields.push(leaderFio)
    }
    if (reportType === "promotion" || reportType === "reprimand" || reportType === "senior") {
      if (!fromDate || !toDate) return false
    }
    if (department === "ГИБДД" && (reportType === "promotion" || reportType === "reprimand")) {
      requiredFields.push(points)
    }
    if (reportType === "reprimand" && department === "ГИБДД") {
      requiredFields.push(violation, paymentLink)
    }
    if (reportType === "senior" && department === "ГУВД") {
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
        parsed.requirements || [{ req: "", quantity: department === "ГИБДД" ? "" : undefined, link: "" }],
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
    setRequirements([{ req: "", quantity: department === "ГИБДД" ? "" : undefined, link: "" }])
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
    setRequirements([...requirements, { req: "", quantity: department === "ГИБДД" ? "" : undefined, link: "" }])
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
    
    // Склонение ФИО лидера в дательный падеж
    const declineLeaderFio = (name: string) => {
      if (!name) return ""
      const parts = name.split(" ")
      if (parts.length < 2) return name
      
      const lastName = parts[0]
      const firstName = parts[1] || ""
      const middleName = parts[2] || ""
      
      // Склонение фамилии
      let declinedLastName = lastName
      if (lastName.endsWith("ов") || lastName.endsWith("ев") || lastName.endsWith("ин")) {
        declinedLastName = lastName.slice(0, -2) + "у"
      } else if (lastName.endsWith("ий")) {
        declinedLastName = lastName.slice(0, -2) + "ому"
      } else if (lastName.endsWith("ский") || lastName.endsWith("цкий")) {
        declinedLastName = lastName.slice(0, -2) + "ому"
      }
      
      // Склонение имени
      let declinedFirstName = firstName
      if (firstName.endsWith("й") || firstName.endsWith("ий")) {
        declinedFirstName = firstName.slice(0, -1) + "ю"
      }
      
      // Склонение отчества
      let declinedMiddleName = middleName
      if (middleName.endsWith("ич")) {
        declinedMiddleName = middleName.slice(0, -2) + "ичу"
      } else if (middleName.endsWith("на")) {
        declinedMiddleName = middleName.slice(0, -1) + "не"
      }
      
      return `${declinedLastName} ${declinedFirstName}${declinedMiddleName ? " " + declinedMiddleName : ""}`
    }
    
    const leaderFioDative = declineLeaderFio(leaderFio)
    
    // Склонение ФИО пользователя в родительный падеж
    const declineUserFio = (name: string) => {
      if (!name) return ""
      const parts = name.split(" ")
      if (parts.length < 2) return name
      
      const lastName = parts[0]
      const firstName = parts[1] || ""
      const middleName = parts[2] || ""
      
      // Склонение фамилии в родительный падеж
      let declinedLastName = lastName
      if (lastName.endsWith("ов") || lastName.endsWith("ев") || lastName.endsWith("ин")) {
        declinedLastName = lastName.slice(0, -2) + "а"
      } else if (lastName.endsWith("ий")) {
        declinedLastName = lastName.slice(0, -2) + "ого"
      } else if (lastName.endsWith("ский") || lastName.endsWith("цкий")) {
        declinedLastName = lastName.slice(0, -2) + "ого"
      }
      
      // Склонение имени в родительный падеж
      let declinedFirstName = firstName
      if (firstName.endsWith("й") || firstName.endsWith("ий")) {
        declinedFirstName = firstName.slice(0, -1) + "я"
      } else if (firstName.endsWith("а")) {
        declinedFirstName = firstName.slice(0, -1) + "ы"
      } else if (firstName.endsWith("я")) {
        declinedFirstName = firstName.slice(0, -1) + "и"
      }
      
      // Склонение отчества в родительный падеж
      let declinedMiddleName = middleName
      if (middleName.endsWith("ич")) {
        declinedMiddleName = middleName.slice(0, -2) + "ича"
      } else if (middleName.endsWith("на")) {
        declinedMiddleName = middleName.slice(0, -1) + "ны"
      }
      
      return `${declinedLastName} ${declinedFirstName}${declinedMiddleName ? " " + declinedMiddleName : ""}`
    }
    
    const userFioGenitive = declineUserFio(fio)
    
    let template = ""
    let reqList = ""
    if (department === "ГУВД") {
      reqList = requirements.map((r, i) => `${i + 1}. ${r.req} - ${r.link}`).join("\n")
    } else {
      reqList = requirements.map((r, i) => `${i + 1}. ${r.req} – ${r.quantity} – ${r.link}`).join("\n")
    }

    if (department === "ГУВД") {
      if (reportType === "promotion") {
        template = `Начальнику ГУВД по г. ${city}
Генерал-майору ${leaderFioDative}
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
Генерал-майору ${leaderFioDative}
От ${displayPosition}, ${rank}
"${userFioGenitive}"

Рапорт о проделанной работе.
Я, ${fio}, являющийся ${instrumentalPosition}, находящийся в звании ${rank}, оставляю отчет о проделанной работе. В связи с выполнением мной нормы работы прошу снять с меня письменное дисциплинарное взыскание в виде выговора.
С правилами подачи рапорта ознакомлен(-на).

К рапорту прикладываю необходимый объём работы:
${reqList}

Дата: ${currentDate}
Подпись: ${signature}`
      } else if (reportType === "senior") {
        template = `Начальнику ГУВД по г. ${city}
Генерал-майору ${leaderFioDative}
От ${displayPosition}, ${rank}
"${userFioGenitive}"

Рапорт.
Я, ${rank} ${fio}, являющийся ${instrumentalPosition}, оставляю рапорт и докладываю Вам о проделанной мною работе в период с ${formattedFromDate} по ${formattedToDate}.

${reqList}

Ваша статистика онлайна за неделю: ${onlineStats}

Дата: ${currentDate}
Подпись: ${signature}`
      }
    } else if (department === "ГИБДД") {
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
От ${displayPosition}, находящегося в звании ${rank}, ${userFioGenitive}.

Я, ${fio}, являющийся ${instrumentalPosition}, прошу Вас рассмотреть мой рапорт на аннулирование дисциплинарного взыскания в виде выговора, полученного за нарушение ${violation}. К рапорту прикладываю сведения о выполнении плана и количестве набранных баллов: ${points}

${reqList}

Также прикладываю подтверждение об оплате неустойки на счёт лидера – ${paymentLink}
Подпись: ${signature}
Дата: ${currentDate}`
      } else if (reportType === "senior") {
        template = `Генералу Республики Провинция
Начальнику ГИБДД по городу ${city}
От ${displayPosition}, находящегося в звании ${rank}, ${userFioGenitive}.

Я, ${fio}, являющийся ${instrumentalPosition}, докладываю о состоянии несения службы и выполненной мной работе за промежуток времени с ${formattedFromDate} по ${formattedToDate}. За данный промежуток времени мною был выполнен следующий объём работ:

${reqList}

Дата: ${currentDate}
Подпись: ${signature}`
      }
    }

    setGeneratedReport(template)
  }

  if (!currentUser || !hasAccess("generator-page")) {
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
                  Доступ к генератору отчётов предоставлен авторизованному составу МВД и администраторам системы.
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
      currentUser.role === "super-admin" ||
      currentUser.role === "gs-gibdd" ||
      currentUser.role === "gs-guvd" ||
      currentUser.role === "pgs-gibdd" ||
      currentUser.role === "pgs-guvd" ||
      currentUser.role === "leader-gibdd" ||
      currentUser.role === "leader-guvd"
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
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={PenTool}
        title="Генератор отчётов"
        description="Генератор рапортов для ГУВД и ГИБДД МВД РП"
        badge={department || undefined}
      />

      {/* Important Notice */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-400/30">
            <AlertCircle className="h-5 w-5 text-yellow-300" />
          </div>
          <div className="text-sm text-blue-200/90">
            <span className="font-bold text-yellow-300">Внимание:</span> Генератор может выдавать неверные склонения в должностях и званиях, а также ФИО. Проверяйте текст перед использованием.
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-8 group hover:bg-white/12 hover:border-white/25 transition-all duration-300">
          <div className="text-center">
            {currentUser?.role === "root" || currentUser?.role === "super-admin" ? (
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => setDepartment("ГУВД")}
                  variant={department === "ГУВД" ? "default" : "outline"}
                  className={cn(
                    "w-60 transition-all duration-300 ease-in-out transform hover:scale-105",
                    department === "ГУВД"
                      ? "bg-primary hover:bg-primary/90 shadow-lg"
                      : "border-2 hover:bg-muted",
                  )}
                >
                  ГУВД
                </Button>
                <Button
                  onClick={() => setDepartment("ГИБДД")}
                  variant={department === "ГИБДД" ? "default" : "outline"}
                  className={cn(
                    "w-60 transition-all duration-300 ease-in-out transform hover:scale-105",
                    department === "ГИБДД"
                      ? "bg-primary hover:bg-primary/90 shadow-lg"
                      : "border-2 hover:bg-muted",
                  )}
                >
                  ГИБДД
                </Button>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-white">{department || "Не определён"}</div>
                <p className="text-sm text-blue-200/80 mt-2">
                  Департамент определён автоматически на основе вашей роли
                </p>
              </>
            )}
          </div>
        </div>

        {department && (
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-8 group hover:bg-white/12 hover:border-white/25 transition-all duration-300">
            <div className="text-center">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                  <FileText className="h-5 w-5 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Выбор типа отчёта</h3>
              </div>
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
            </div>
          </div>
        )}

        {department && reportType && (
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="flex items-center gap-3 p-6 border-b border-white/10">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
                <FileText className="h-5 w-5 text-green-300" />
              </div>
              <h3 className="text-xl font-bold text-white">Форма для заполнения</h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-blue-200/90 mb-2 block">Город</Label>
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
                      {city || "Выберите город..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    <AnimatePresence>
                      {openCity && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg"
                        >
                          <Command>
                            <CommandInput placeholder="Поиск города..." className="bg-black/5 border-white/10 text-white placeholder:text-blue-200/60" />
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
                                    <Check className={cn("mr-2 h-4 w-4", city === c ? "opacity-100 text-blue-300" : "opacity-0")} />
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
                {department === "ГУВД" && (
                  <div>
                    <Label htmlFor="leaderFio" className="text-sm font-medium text-blue-200/90 mb-2 block">
                      ФИО лидера <span className="text-xs text-blue-300/70">(в дательном падеже: Иванову Ивану Ивановичу)</span>
                    </Label>
                    <Input 
                      id="leaderFio" 
                      value={leaderFio} 
                      onChange={(e) => setLeaderFio(e.target.value)} 
                      placeholder="Иванов Иван Иванович"
                      className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" 
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="fio" className="text-sm font-medium text-blue-200/90 mb-2 block">Ваше ФИО</Label>
                  <Input id="fio" value={fio} onChange={(e) => setFio(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
                </div>
                <div>
                  <Label htmlFor="position" className="text-sm font-medium text-blue-200/90 mb-2 block">Должность</Label>
                  <div className="relative w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPosition}
                      className="w-full justify-between bg-black/5 border-blue-400/30 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
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
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg"
                        >
                          <Command>
                            <CommandInput placeholder="Поиск должности..." className="bg-black/5 border-white/10 text-white placeholder:text-blue-200/60" />
                            <CommandEmpty className="text-blue-200/60">Должности не найдены.</CommandEmpty>
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
                                      className="hover:bg-white/10 text-white data-[selected]:text-blue-200 data-[selected]:bg-transparent"
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          position === p.title ? "opacity-100 text-blue-300" : "opacity-0",
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
                        <Label htmlFor="rank" className="text-sm font-medium text-blue-200/90 mb-2 block">Текущее звание</Label>
                        <div className="relative w-full">
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openRank}
                            className="w-full justify-between bg-black/5 border-blue-400/30 text-white hover:bg-black/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
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
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg"
                              >
                                <Command>
                                  <CommandInput placeholder="Поиск..." className="bg-black/5 border-white/10 text-white placeholder:text-blue-200/60" />
                                  <CommandEmpty className="text-blue-200/60">Звания не найдены.</CommandEmpty>
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
                                            className="hover:bg-white/10 text-white data-[selected]:text-blue-200 data-[selected]:bg-transparent"
                                          >
                                            <Check
                                              className={cn("mr-2 h-4 w-4", rank === r ? "opacity-100 text-blue-300" : "opacity-0")}
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
                        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">Текущее звание</Label>
                        <div className="text-sm text-blue-100 bg-white/10 p-3 rounded-lg border border-blue-400/20">
                          {rank || "Звание не выбрано"}
                        </div>
                      </div>
                    )}
                    {reportType === "promotion" && rank && (
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">Звание на повышение</Label>
                        <div className="text-sm text-green-300 bg-green-500/10 p-3 rounded-lg border border-green-400/20">
                          {newRank || "Нет следующего звания"}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {reportType === "senior" && (
                  <div className="flex justify-center">
                    <Button
                      variant={isVrio ? "default" : "outline"}
                      onClick={() => setIsVrio(!isVrio)}
                      className={isVrio ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/40" : "border-blue-400/40 text-blue-300 hover:bg-blue-500/10"}
                    >
                      ВрИО
                    </Button>
                  </div>
                )}
                {(reportType === "promotion" || reportType === "reprimand" || reportType === "senior") && (
                  <>
                    <div>
                      <Label htmlFor="fromDate" className="text-sm font-medium text-blue-200/90 mb-2 block">Дата с</Label>
                      <DatePicker date={fromDate} onDateChange={setFromDate} placeholder="Выберите дату начала" />
                    </div>
                    <div>
                      <Label htmlFor="toDate" className="text-sm font-medium text-blue-200/90 mb-2 block">Дата по</Label>
                      <DatePicker date={toDate} onDateChange={setToDate} placeholder="Выберите дату окончания" />
                    </div>
                  </>
                )}
                {department === "ГИБДД" && (reportType === "promotion" || reportType === "reprimand") && (
                  <div>
                    <Label htmlFor="points" className="text-sm font-medium text-blue-200/90 mb-2 block">Количество баллов</Label>
                    <Input id="points" value={points} onChange={(e) => setPoints(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
                  </div>
                )}
                {reportType === "reprimand" && department === "ГИБДД" && (
                  <>
                    <div>
                      <Label htmlFor="violation" className="text-sm font-medium text-blue-200/90 mb-2 block">Пункт нарушения (Пункт УГ)</Label>
                      <Input id="violation" value={violation} onChange={(e) => setViolation(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
                    </div>
                    <div>
                      <Label htmlFor="paymentLink" className="text-sm font-medium text-blue-200/90 mb-2 block">Ссылка на оплату неустойки</Label>
                      <Input id="paymentLink" value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
                    </div>
                  </>
                )}
                {reportType === "senior" && department === "ГУВД" && (
                  <div>
                    <Label htmlFor="onlineStats" className="text-sm font-medium text-blue-200/90 mb-2 block">Статистика онлайна за неделю</Label>
                    <Input id="onlineStats" value={onlineStats} onChange={(e) => setOnlineStats(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
                    Требования/Задачи
                    {department === "ГИБДД" && (
                      <span className="text-xs text-blue-300/70 ml-2">(Важно: 1 лекция или тренировка = 1 ссылка)</span>
                    )}
                  </Label>
                  {requirements.map((req, index) => (
                    <div key={index} className="flex gap-3 mt-2 items-center">
                      <Input
                        placeholder="Название задачи/требования"
                        value={req.req}
                        onChange={(e) => updateRequirement(index, "req", e.target.value)}
                        className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 flex-1"
                      />
                      {department === "ГИБДД" && (
                        <Input
                          placeholder="Количество"
                          value={req.quantity || ""}
                          onChange={(e) => updateRequirement(index, "quantity", e.target.value)}
                          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 w-28"
                        />
                      )}
                      <Input
                        placeholder="Ссылка/ссылки"
                        value={req.link}
                        onChange={(e) => updateRequirement(index, "link", e.target.value)}
                        className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 flex-1"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeRequirement(index)}
                        disabled={requirements.length === 1}
                        className="h-10 w-10 bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addRequirement} className="mt-2 border-blue-400/40 text-blue-300 hover:bg-blue-500/10">
                    Добавить требование
                  </Button>
                </div>
                <div>
                  <Label htmlFor="signature" className="text-sm font-medium text-blue-200/90 mb-2 block">Подпись</Label>
                  <Input id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
                </div>
                <div className="flex gap-3 flex-wrap pt-4 border-t border-white/20">
                  <Button onClick={generateReport} disabled={!isFormValid()} className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-400/40">
                    Сгенерировать отчёт
                  </Button>
                  <Button variant="outline" onClick={saveDraft} className="border-blue-400/40 text-blue-300 hover:bg-blue-500/10">
                    Сохранить черновик
                  </Button>
                  <Button variant="outline" onClick={loadDraft} className="border-blue-400/40 text-blue-300 hover:bg-blue-500/10">
                    Загрузить черновик
                  </Button>
                  <Button variant="destructive" onClick={deleteDraft} className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/40">
                    Удалить черновик
                  </Button>
                  <Button variant="destructive" onClick={clearForm} className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/40">
                    Очистить всё
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Examples Section */}
        {department && reportType && (
          <Card className="relative bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-zinc-50/40 dark:from-slate-900/30 dark:via-gray-900/20 dark:to-zinc-900/10 border-2 border-border/60 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100/30 via-transparent to-zinc-100/20 dark:from-slate-800/20 dark:via-transparent dark:to-zinc-800/10"></div>
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tr from-purple-500/8 to-indigo-500/4 rounded-full blur-xl"></div>

            <CardHeader className="relative text-center pb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-2xl mb-4 mx-auto">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Примеры отчётов
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Образцы готовых отчётов для вашего типа и департамента
              </CardDescription>
            </CardHeader>

            <CardContent className="relative">
              <div className="space-y-4">
                {(() => {
                  // Функции склонения для примеров
                  const declineLeaderNameForExample = (name: string) => {
                    if (!name) return "Генерал-майору Иванову Ивану Ивановичу"
                    const parts = name.split(" ")
                    if (parts.length < 2) return `Генерал-майору ${name}`
                    
                    const lastName = parts[0]
                    const firstName = parts[1] || ""
                    const middleName = parts[2] || ""
                    
                    // Склонение в дательный падеж
                    const declinedLastName = lastName.endsWith("ов") || lastName.endsWith("ев") || lastName.endsWith("ин") 
                      ? lastName.slice(0, -2) + "у" 
                      : lastName.endsWith("ий") ? lastName.slice(0, -2) + "ому" : lastName
                    
                    const declinedFirstName = firstName.endsWith("й") || firstName.endsWith("ий") 
                      ? firstName.slice(0, -1) + "ю" 
                      : firstName
                    
                    const declinedMiddleName = middleName.endsWith("ич") 
                      ? middleName.slice(0, -2) + "ичу" 
                      : middleName.endsWith("на") ? middleName.slice(0, -1) + "не" : middleName
                    
                    return `Генерал-майору ${declinedLastName} ${declinedFirstName}${declinedMiddleName ? " " + declinedMiddleName : ""}`
                  }
                  
                  const displayPositionForExample = position ? toGenitiveCase(position, false) : "Старшего инспектора ППС"
                  const currentRank = rank || "Капитана"
                  const currentFio = fio || "Петрова Петра Петровича"
                  const leaderFioFormatted = declineLeaderNameForExample(leaderFio)
                  const currentCity = city || "Мирный"
                  
                  const examples = {
                    ГУВД: {
                      promotion: `Начальнику ГУВД по г. ${currentCity}
${leaderFioFormatted}
От ${displayPositionForExample}, ${currentRank}
"${currentFio}"

Рапорт о проделанной работе.
Я, ${fio || "Петров Петр Петрович"}, являющийся ${position ? toInstrumentalCase(position, false) : "Старшим инспектором ППС"} подразделения ${selectedCategory ? (departmentAbbreviations[selectedCategory] || selectedCategory) : "ППС"}, находящийся в звании ${rank || "Капитан"}, оставляю отчет о проделанной работе. В связи с выполнением мной всех необходимых нормативов и требований прошу повысить меня до звания ${newRank || "Майор"}.
С правилами подачи рапорта ознакомлен(-на).

К рапорту прикладываю необходимый объём работы:
1. Лекция по тактике - https://example.com/lecture1
2. Тренировка по стрельбе - https://example.com/training1

Дата: 15.10.2024
Подпись: Петров П.П.`,
                      reprimand: `Начальнику ГУВД по г. ${currentCity}
${leaderFioFormatted}
От ${displayPositionForExample}, ${currentRank}
"${currentFio}"

Рапорт о проделанной работе.
Я, ${fio || "Петров Петр Петрович"}, являющийся ${position ? toInstrumentalCase(position, false) : "Старшим инспектором ППС"}, находящийся в звании ${rank || "Капитан"}, оставляю отчет о проделанной работе. В связи с выполнением мной нормы работы прошу снять с меня письменное дисциплинарное взыскание в виде выговора.
С правилами подачи рапорта ознакомлен(-на).

К рапорту прикладываю необходимый объём работы:
1. Лекция по дисциплине - https://example.com/lecture2
2. Тренировка по этике - https://example.com/training2

Дата: 15.10.2024
Подпись: Петров П.П.`,

                      senior: `Начальнику ГУВД по г. ${currentCity}
${leaderFioFormatted}
От ${displayPositionForExample}, ${currentRank}
"${currentFio}"

Рапорт.
Я, ${rank || "Капитан"} ${fio || "Петров Петр Петрович"}, являющийся ${position ? toInstrumentalCase(position, false) : "Старшим инспектором ППС"}, оставляю рапорт и докладываю Вам о проделанной мною работе в период с 01.10.2024 по 15.10.2024.

1. Лекция по тактике - https://example.com/lecture3
2. Тренировка по стрельбе - https://example.com/training3

Ваша статистика онлайна за неделю: 45 часов

Дата: 15.10.2024
Подпись: Петров П.П.`
                    },
                    ГИБДД: {
                      promotion: `Генералу Республики Провинция
Начальнику ГИБДД по городу ${currentCity}
От ${displayPositionForExample}, находящегося в звании ${rank || "Старший Лейтенант"}, ${currentFio}.

Я, ${fio || "Петров Петр Петрович"}, являющийся ${position ? toInstrumentalCase(position, false) : "Инспектором СБ"}, докладываю о состоянии несения службы и выполненной мной работе за период с 01.10.2024 по 15.10.2024 и прошу рассмотреть моё заявление о повышении в звании до ${newRank || "Капитана"}. За указанный период мною был выполнен следующий объём работы, а также набрано соответствующее количество баллов: 150

1. Лекция по ПДД - https://example.com/lecture1 – 5 – https://example.com/proof1
2. Тренировка по вождению - https://example.com/training1 – 3 – https://example.com/proof2

Подпись: Петров П.П.
Дата: 15.10.2024`,

                      reprimand: `Генералу Республики Провинция
Начальнику ГИБДД по городу ${currentCity}
От ${displayPositionForExample}, находящегося в звании ${rank || "Старший Лейтенант"}, ${currentFio}.

Я, ${fio || "Петров Петр Петрович"}, являющийся ${position ? toInstrumentalCase(position, false) : "Инспектором СБ"}, прошу Вас рассмотреть мой рапорт на аннулирование дисциплинарного взыскания в виде выговора, полученного за нарушение Пункт 4.6 ПСГО. К рапорту прикладываю сведения о выполнении плана и количестве набранных баллов: 120

1. Лекция по дисциплине - https://example.com/lecture2 – 4 – https://example.com/proof1
2. Тренировка по этике - https://example.com/training2 – 3 – https://example.com/proof2

Также прикладываю подтверждение об оплате неустойки на счёт лидера – https://example.com/payment
Подпись: Петров П.П.
Дата: 15.10.2024`,

                      senior: `Генералу Республики Провинция
Начальнику ГИБДД по городу ${currentCity}
От ${displayPositionForExample}, находящегося в звании ${rank || "Старший Лейтенант"}, ${currentFio}.

Я, ${fio || "Петров Петр Петрович"}, являющийся ${position ? toInstrumentalCase(position, false) : "Инспектором СБ"}, докладываю о состоянии несения службы и выполненной мной работе за промежуток времени с 01.10.2024 по 15.10.2024. За данный промежуток времени мною был выполнен следующий объём работ:

1. Лекция по ПДД - https://example.com/lecture3
2. Тренировка по вождению - https://example.com/training3

Дата: 15.10.2024
Подпись: Петров П.П.`
                    }
                  }

                  const currentExample = examples[department as keyof typeof examples]?.[reportType as keyof typeof examples.ГУВД]

                  return currentExample ? (
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <h4 className="text-lg font-semibold text-white mb-4">Пример {reportType === 'promotion' ? 'рапорт на повышение' : reportType === 'reprimand' ? 'рапорт на отработку выговора' : 'отчёт старшего состава'}</h4>
                      <pre className="font-mono text-sm text-blue-100 whitespace-pre-wrap leading-relaxed bg-black/20 p-4 rounded-lg border border-blue-400/20">
                        {currentExample}
                      </pre>
                    </div>
                  ) : null
                })()}
              </div>
            </CardContent>
          </Card>
        )}

        {generatedReport && (
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="flex items-center gap-3 p-6 border-b border-white/10">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                <FileText className="h-5 w-5 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-white">Сгенерированный отчёт</h3>
            </div>
            <div className="p-8">
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <pre className="font-mono text-sm text-blue-100 whitespace-pre-wrap leading-relaxed">
                  {generatedReport}
                </pre>
              </div>
              <Button
                variant="outline"
                className="mt-4 border-blue-400/40 text-blue-300 hover:bg-blue-500/10"
                onClick={copyReport}
                disabled={!generatedReport}
              >
                {copied ? "Скопировано!" : "Скопировать"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
