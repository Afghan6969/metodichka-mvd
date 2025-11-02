<<<<<<< HEAD
"use client"

import { useState, useEffect, useCallback } from"react"
import { Button } from"@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card"
import { Input } from"@/components/ui/input"
import { Label } from"@/components/ui/label"
import { DatePicker } from"@/components/ui/date-picker"
import { Shield, FileText, Check, ChevronsUpDown, AlertCircle, PenTool } from"lucide-react"
import { motion, AnimatePresence } from"framer-motion"
import { Alert, AlertDescription } from"@/components/ui/alert"
import { cn } from"@/lib/utils"
import { toast } from"react-hot-toast"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from"@/components/ui/command"
import { useAuth } from"@/lib/auth-context"
import { PageHeader } from"@/components/page-header"

// Import modular components
import { CitySelect, LeaderFioInput, FioInput, DateRangeInputs, RequirementsList } from"./generator/form-fields"
import { LeaderReportFieldsNew } from"./generator/leader-report-fields-new"
import { guvdPositions, gibddPositions, seniorCategories, academyCategories, cities, rankHierarchy, departmentAbbreviations } from"./generator/constants"
import { parseRanks, getNextRank, toGenitiveCase, toInstrumentalCase } from"./generator/utils"
import { generateReport } from"./generator/report-templates"
import { Requirement, ReportType, Department } from"./generator/types"

export function GeneratorPage() {
 const { currentUser, hasAccess } = useAuth()
 const [department, setDepartment] = useState<Department | null>(null)
 const [reportType, setReportType] = useState<ReportType | null>(null)
 const [city, setCity] = useState("")
 const [leaderFio, setLeaderFio] = useState("")
 const [fio, setFio] = useState("")
 const [position, setPosition] = useState("")
 const [selectedCategory, setSelectedCategory] = useState("")
 const [rank, setRank] = useState("")
 const [newRank, setNewRank] = useState("")
 const [fromDate, setFromDate] = useState<Date | undefined>()
 const [toDate, setToDate] = useState<Date | undefined>()
 const [requirements, setRequirements] = useState<Requirement[]>([
 { req:"", quantity:"", link:"" },
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

 // Leader report fields - all 13 sections
 const [interviews, setInterviews] = useState<string[]>([""])
 const [firedPSG, setFiredPSG] = useState("")
 const [firedOCHS, setFiredOCHS] = useState("")
 const [totalFired, setTotalFired] = useState("")
 const [totalAccepted, setTotalAccepted] = useState("")
 const [firstRanks, setFirstRanks] = useState("")
 const [middleStaff, setMiddleStaff] = useState("")
 const [seniorStaffCount, setSeniorStaffCount] = useState("")
 const [managementStaff, setManagementStaff] = useState("")
 const [totalStaffCount, setTotalStaffCount] = useState("")
 const [callsCount, setCallsCount] = useState("")
 const [callsAccepted, setCallsAccepted] = useState("")
 const [staffChanges, setStaffChanges] = useState<string[]>([""])
 const [reprimands, setReprimands] = useState<string[]>([""])
 const [finesReceived, setFinesReceived] = useState("")
 const [finesPaid, setFinesPaid] = useState("")
 const [finesBalance, setFinesBalance] = useState("")
 const [lectures, setLectures] = useState<Array<{ name: string; link: string }>>([{ name:"", link:"" }])
 const [lecturesFormat, setLecturesFormat] = useState<"separate" |"combined">("separate")
 const [branchEvents, setBranchEvents] = useState<string[]>([""])
 const [interfactionEvents, setInterfactionEvents] = useState<string[]>([""])
 const [seniorEvaluation, setSeniorEvaluation] = useState<string[]>([""])
 const [lineups, setLineups] = useState<string[]>([""])

 const positionsData = department ==="ГУВД" ? guvdPositions : gibddPositions
 const allPositions = Object.values(positionsData).flat()

 useEffect(() => {
 if (currentUser) {
 console.log("Current user:", currentUser)
 console.log("Has access to generator-page:", hasAccess("generator-page"))
 if (
 currentUser.role ==="gibdd" ||
 currentUser.role ==="ss-gibdd" ||
 currentUser.role ==="pgs-gibdd" ||
 currentUser.role ==="gs-gibdd" ||
 currentUser.role ==="leader-gibdd"
 ) {
 setDepartment("ГИБДД")
 } else if (
 currentUser.role ==="guvd" ||
 currentUser.role ==="ss-guvd" ||
 currentUser.role ==="pgs-guvd" ||
 currentUser.role ==="gs-guvd" ||
 currentUser.role ==="leader-guvd"
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
 if (reportType ==="leader") {
 return (
 city.trim() !=="" &&
 fio.trim() !=="" &&
 fromDate !== undefined &&
 toDate !== undefined
 )
 }

 const requiredFields = [city, fio, position, rank, signature]
 if (department ==="ГУВД") {
 requiredFields.push(leaderFio)
 }
 if (reportType ==="promotion" || reportType ==="reprimand" || reportType ==="senior") {
 if (!fromDate || !toDate) return false
 }
 if (department ==="ГИБДД" && (reportType ==="promotion" || reportType ==="reprimand")) {
 requiredFields.push(points)
 }
 if (reportType ==="reprimand" && department ==="ГИБДД") {
 requiredFields.push(violation, paymentLink)
 }
 if (reportType ==="senior" && department ==="ГУВД") {
 requiredFields.push(onlineStats)
 }
 return (
 requiredFields.every((field) => field.trim() !=="") &&
 requirements.every((req) => req.req.trim() !=="" && req.link.trim() !=="")
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
 setCity(parsed.city ||"")
 setLeaderFio(parsed.leaderFio ||"")
 setFio(parsed.fio ||"")
 setPosition(parsed.position ||"")
 setRank(parsed.rank ||"")
 setNewRank(parsed.newRank ||"")
 setFromDate(parsed.fromDate ||"")
 setToDate(parsed.toDate ||"")
 setRequirements(
 parsed.requirements || [{ req:"", quantity: department ==="ГИБДД" ?"" : undefined, link:"" }],
 )
 setPoints(parsed.points ||"")
 setViolation(parsed.violation ||"")
 setPaymentLink(parsed.paymentLink ||"")
 setOnlineStats(parsed.onlineStats ||"")
 setSignature(parsed.signature ||"")
 setIsVrio(parsed.isVrio || false)
 if (parsed.position) {
 const selected = allPositions.find((p) => p.title === parsed.position)
 if (selected) {
 const ranks = parseRanks(selected.rank)
 setPossibleRanks(ranks)
 const isFixed = !selected.rank.includes("-")
 setHasFixedRank(isFixed)
 let cat =""
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
 setRequirements([{ req:"", quantity: department ==="ГИБДД" ?"" : undefined, link:"" }])
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
 let cat =""
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

 useEffect(() => {
 if (rank && reportType ==="promotion") {
 const nextRank = getNextRank(rank)
 setNewRank(nextRank)
 } else {
 setNewRank("")
 }
 }, [rank, reportType, getNextRank])

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

 const handleGenerateReport = () => {
 if (!isFormValid()) {
 toast.error("Пожалуйста, заполните все обязательные поля!")
 return
 }

 if (!department) {
 toast.error("Выберите департамент!")
 return
 }

 if (!reportType) {
 toast.error("Выберите тип отчёта!")
 return
 }

 const report = generateReport({
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
 selectedCategory,
 department,
 reportType,
 // Leader report fields
 interviews,
 firedPSG,
 firedOCHS,
 totalFired,
 totalAccepted,
 firstRanks,
 middleStaff,
 seniorStaff: seniorStaffCount,
 managementStaff,
 totalStaff: totalStaffCount,
 callsCount,
 callsAccepted,
 staffChanges,
 reprimands,
 finesReceived,
 finesPaid,
 finesBalance,
 lectures,
 lecturesFormat,
 branchEvents,
 interfactionEvents,
 seniorEvaluation,
 lineups,
 })

 setGeneratedReport(report)
 }

 if (!currentUser || !hasAccess("generator-page")) {
 console.log("Access denied for role:", currentUser?.role,"with department:", department)
 return (
 <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
 <div className="max-w-md mx-auto mt-16">
 <Card className="p-8 bg-card shadow-md border-border rounded-2xl">
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
 currentUser.role ==="root" ||
 currentUser.role ==="super-admin" ||
 currentUser.role ==="gs-gibdd" ||
 currentUser.role ==="gs-guvd" ||
 currentUser.role ==="pgs-gibdd" ||
 currentUser.role ==="pgs-guvd" ||
 currentUser.role ==="leader-gibdd" ||
 currentUser.role ==="leader-guvd"
 ) {
 return ["promotion","reprimand","senior","leader"]
 }
 if (currentUser.role ==="ss-gibdd" || currentUser.role ==="ss-guvd") {
 return ["promotion","reprimand","senior"]
 }
 if (currentUser.role ==="gibdd" || currentUser.role ==="guvd") {
 return ["promotion","reprimand"]
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
 <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
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
 <div className="bg-white/8 border border-white/15 rounded-3xl p-8 group hover:bg-white/12 hover:border-white/25 transition-colors duration-200">
 <div className="text-center">
 {currentUser?.role ==="root" || currentUser?.role ==="super-admin" ? (
 <div className="flex flex-wrap justify-center gap-4">
 <Button
 onClick={() => setDepartment("ГУВД")}
 variant={department ==="ГУВД" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 department ==="ГУВД"
 ?"bg-primary hover:bg-primary/90 shadow-lg"
 :"border-2 hover:bg-muted",
 )}
 >
 ГУВД
 </Button>
 <Button
 onClick={() => setDepartment("ГИБДД")}
 variant={department ==="ГИБДД" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 department ==="ГИБДД"
 ?"bg-primary hover:bg-primary/90 shadow-lg"
 :"border-2 hover:bg-muted",
 )}
 >
 ГИБДД
 </Button>
 </div>
 ) : (
 <>
 <div className="text-2xl font-bold text-white">{department ||"Не определён"}</div>
 <p className="text-sm text-blue-200/80 mt-2">
 Департамент определён автоматически на основе вашей роли
 </p>
 </>
 )}
 </div>
 </div>

 {department && (
 <div className="bg-white/8 border border-white/15 rounded-3xl p-8 group hover:bg-white/12 hover:border-white/25 transition-colors duration-200">
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
 variant={reportType ==="promotion" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 reportType ==="promotion"
 ?"bg-primary hover:bg-primary/90 shadow-lg"
 :"border-2 hover:bg-muted",
 )}
 >
 Рапорт на повышение
 </Button>
 )}
 {availableReportTypes.includes("reprimand") && (
 <Button
 onClick={() => setReportType("reprimand")}
 variant={reportType ==="reprimand" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 reportType ==="reprimand"
 ?"bg-primary hover:bg-primary/90 shadow-lg"
 :"border-2 hover:bg-muted",
 )}
 >
 Рапорт на отработку выговора
 </Button>
 )}
 {availableReportTypes.includes("senior") && (
 <Button
 onClick={() => setReportType("senior")}
 variant={reportType ==="senior" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 reportType ==="senior" ?"bg-primary hover:bg-primary/90 shadow-lg" :"border-2 hover:bg-muted",
 )}
 >
 Отчёт старшего состава
 </Button>
 )}
 {availableReportTypes.includes("leader") && (
 <Button
 onClick={() => setReportType("leader")}
 variant={reportType ==="leader" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 reportType ==="leader" ?"bg-primary hover:bg-primary/90 shadow-lg" :"border-2 hover:bg-muted",
 )}
 >
 Лидерский отчёт
 </Button>
 )}
 </div>
 </div>
 </div>
 )}

 {department && reportType && (
 <div className="bg-white/8 border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-colors duration-200 overflow-hidden">
 <div className="flex items-center gap-3 p-6 border-b border-white/10">
 <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
 <FileText className="h-5 w-5 text-green-300" />
 </div>
 <h3 className="text-xl font-bold text-white">Форма для заполнения</h3>
 </div>
 <div className="p-8">
 <div className="space-y-6">
 {reportType ==="leader" ? (
 <>
 <CitySelect
 city={city}
 setCity={setCity}
 openCity={openCity}
 setOpenCity={setOpenCity}
 setOpenPosition={setOpenPosition}
 setOpenRank={setOpenRank}
 />
 <FioInput fio={fio} setFio={setFio} label="Ваш Никнейм (лидер)" placeholder="Nick_Name" />
 <DateRangeInputs
 fromDate={fromDate}
 toDate={toDate}
 setFromDate={setFromDate}
 setToDate={setToDate}
 />
 <LeaderReportFieldsNew
 interviews={interviews}
 setInterviews={setInterviews}
 firedPSG={firedPSG}
 setFiredPSG={setFiredPSG}
 firedOCHS={firedOCHS}
 setFiredOCHS={setFiredOCHS}
 totalFired={totalFired}
 setTotalFired={setTotalFired}
 totalAccepted={totalAccepted}
 setTotalAccepted={setTotalAccepted}
 firstRanks={firstRanks}
 setFirstRanks={setFirstRanks}
 middleStaff={middleStaff}
 setMiddleStaff={setMiddleStaff}
 seniorStaff={seniorStaffCount}
 setSeniorStaff={setSeniorStaffCount}
 managementStaff={managementStaff}
 setManagementStaff={setManagementStaff}
 totalStaff={totalStaffCount}
 setTotalStaff={setTotalStaffCount}
 callsCount={callsCount}
 setCallsCount={setCallsCount}
 callsAccepted={callsAccepted}
 setCallsAccepted={setCallsAccepted}
 staffChanges={staffChanges}
 setStaffChanges={setStaffChanges}
 reprimands={reprimands}
 setReprimands={setReprimands}
 finesReceived={finesReceived}
 setFinesReceived={setFinesReceived}
 finesPaid={finesPaid}
 setFinesPaid={setFinesPaid}
 finesBalance={finesBalance}
 setFinesBalance={setFinesBalance}
 lectures={lectures}
 setLectures={setLectures}
 lecturesFormat={lecturesFormat}
 setLecturesFormat={setLecturesFormat}
 branchEvents={branchEvents}
 setBranchEvents={setBranchEvents}
 interfactionEvents={interfactionEvents}
 setInterfactionEvents={setInterfactionEvents}
 seniorEvaluation={seniorEvaluation}
 setSeniorEvaluation={setSeniorEvaluation}
 lineups={lineups}
 setLineups={setLineups}
 />
 </>
 ) : (
 <>
 <CitySelect
 city={city}
 setCity={setCity}
 openCity={openCity}
 setOpenCity={setOpenCity}
 setOpenPosition={setOpenPosition}
 setOpenRank={setOpenRank}
 />
 {department ==="ГУВД" && <LeaderFioInput leaderFio={leaderFio} setLeaderFio={setLeaderFio} />}
 <FioInput fio={fio} setFio={setFio} />
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
 {position ||"Выберите должность..."}
 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
 </Button>
 <AnimatePresence>
 {openPosition && (
 <motion.div
 initial={{ opacity: 0, y: -10, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: -10, scale: 0.95 }}
 transition={{ duration: 0.15, ease:"easeOut" }}
 className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 border border-white/20 rounded-xl shadow-lg"
 >
 <Command>
 <CommandInput placeholder="Поиск должности..." className="bg-black/5 border-white/10 text-white placeholder:text-blue-200/60" />
 <CommandEmpty className="text-blue-200/60">Должности не найдены.</CommandEmpty>
 <CommandList className="max-h-[200px] overflow-y-auto">
 <CommandGroup>
 {Object.entries(positionsData)
 .filter(([category]) =>
 reportType ==="senior"
 ? seniorCategories.includes(category)
 : reportType !=="promotion" || !seniorCategories.includes(category),
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
 position === p.title ?"opacity-100 text-blue-300" :"opacity-0",
=======
"use client"

import { useState, useEffect, useCallback } from"react"
import { Button } from"@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card"
import { Input } from"@/components/ui/input"
import { Label } from"@/components/ui/label"
import { DatePicker } from"@/components/ui/date-picker"
import { Shield, FileText, Check, ChevronsUpDown, AlertCircle, PenTool } from"lucide-react"
import { motion, AnimatePresence } from"framer-motion"
import { Alert, AlertDescription } from"@/components/ui/alert"
import { cn } from"@/lib/utils"
import { toast } from"react-hot-toast"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from"@/components/ui/command"
import { useAuth } from"@/lib/auth-context"
import { PageHeader } from"@/components/page-header"

// Import modular components
import { CitySelect, LeaderFioInput, FioInput, DateRangeInputs, RequirementsList } from"./generator/form-fields"
import { LeaderReportFieldsNew } from"./generator/leader-report-fields-new"
import { guvdPositions, gibddPositions, seniorCategories, academyCategories, cities, rankHierarchy, departmentAbbreviations } from"./generator/constants"
import { parseRanks, getNextRank, toGenitiveCase, toInstrumentalCase } from"./generator/utils"
import { generateReport } from"./generator/report-templates"
import { Requirement, ReportType, Department } from"./generator/types"

export function GeneratorPage() {
 const { currentUser, hasAccess } = useAuth()
 const [department, setDepartment] = useState<Department | null>(null)
 const [reportType, setReportType] = useState<ReportType | null>(null)
 const [city, setCity] = useState("")
 const [leaderFio, setLeaderFio] = useState("")
 const [fio, setFio] = useState("")
 const [position, setPosition] = useState("")
 const [selectedCategory, setSelectedCategory] = useState("")
 const [rank, setRank] = useState("")
 const [newRank, setNewRank] = useState("")
 const [fromDate, setFromDate] = useState<Date | undefined>()
 const [toDate, setToDate] = useState<Date | undefined>()
 const [requirements, setRequirements] = useState<Requirement[]>([
 { req:"", quantity:"", link:"" },
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

 // Leader report fields - all 13 sections
 const [interviews, setInterviews] = useState<string[]>([""])
 const [firedPSG, setFiredPSG] = useState("")
 const [firedOCHS, setFiredOCHS] = useState("")
 const [totalFired, setTotalFired] = useState("")
 const [totalAccepted, setTotalAccepted] = useState("")
 const [firstRanks, setFirstRanks] = useState("")
 const [middleStaff, setMiddleStaff] = useState("")
 const [seniorStaffCount, setSeniorStaffCount] = useState("")
 const [managementStaff, setManagementStaff] = useState("")
 const [totalStaffCount, setTotalStaffCount] = useState("")
 const [callsCount, setCallsCount] = useState("")
 const [callsAccepted, setCallsAccepted] = useState("")
 const [staffChanges, setStaffChanges] = useState<string[]>([""])
 const [reprimands, setReprimands] = useState<string[]>([""])
 const [finesReceived, setFinesReceived] = useState("")
 const [finesPaid, setFinesPaid] = useState("")
 const [finesBalance, setFinesBalance] = useState("")
 const [lectures, setLectures] = useState<Array<{ name: string; link: string }>>([{ name:"", link:"" }])
 const [lecturesFormat, setLecturesFormat] = useState<"separate" |"combined">("separate")
 const [branchEvents, setBranchEvents] = useState<string[]>([""])
 const [interfactionEvents, setInterfactionEvents] = useState<string[]>([""])
 const [seniorEvaluation, setSeniorEvaluation] = useState<string[]>([""])
 const [lineups, setLineups] = useState<string[]>([""])

 const positionsData = department ==="ГУВД" ? guvdPositions : gibddPositions
 const allPositions = Object.values(positionsData).flat()

 useEffect(() => {
 if (currentUser) {
 console.log("Current user:", currentUser)
 console.log("Has access to generator-page:", hasAccess("generator-page"))
 if (
 currentUser.role ==="gibdd" ||
 currentUser.role ==="ss-gibdd" ||
 currentUser.role ==="pgs-gibdd" ||
 currentUser.role ==="gs-gibdd" ||
 currentUser.role ==="leader-gibdd"
 ) {
 setDepartment("ГИБДД")
 } else if (
 currentUser.role ==="guvd" ||
 currentUser.role ==="ss-guvd" ||
 currentUser.role ==="pgs-guvd" ||
 currentUser.role ==="gs-guvd" ||
 currentUser.role ==="leader-guvd"
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
 if (reportType ==="leader") {
 return (
 city.trim() !=="" &&
 fio.trim() !=="" &&
 fromDate !== undefined &&
 toDate !== undefined
 )
 }

 const requiredFields = [city, fio, position, rank, signature]
 if (department ==="ГУВД") {
 requiredFields.push(leaderFio)
 }
 if (reportType ==="promotion" || reportType ==="reprimand" || reportType ==="senior") {
 if (!fromDate || !toDate) return false
 }
 if (department ==="ГИБДД" && (reportType ==="promotion" || reportType ==="reprimand")) {
 requiredFields.push(points)
 }
 if (reportType ==="reprimand" && department ==="ГИБДД") {
 requiredFields.push(violation, paymentLink)
 }
 if (reportType ==="senior" && department ==="ГУВД") {
 requiredFields.push(onlineStats)
 }
 return (
 requiredFields.every((field) => field.trim() !=="") &&
 requirements.every((req) => req.req.trim() !=="" && req.link.trim() !=="")
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
 setCity(parsed.city ||"")
 setLeaderFio(parsed.leaderFio ||"")
 setFio(parsed.fio ||"")
 setPosition(parsed.position ||"")
 setRank(parsed.rank ||"")
 setNewRank(parsed.newRank ||"")
 setFromDate(parsed.fromDate ||"")
 setToDate(parsed.toDate ||"")
 setRequirements(
 parsed.requirements || [{ req:"", quantity: department ==="ГИБДД" ?"" : undefined, link:"" }],
 )
 setPoints(parsed.points ||"")
 setViolation(parsed.violation ||"")
 setPaymentLink(parsed.paymentLink ||"")
 setOnlineStats(parsed.onlineStats ||"")
 setSignature(parsed.signature ||"")
 setIsVrio(parsed.isVrio || false)
 if (parsed.position) {
 const selected = allPositions.find((p) => p.title === parsed.position)
 if (selected) {
 const ranks = parseRanks(selected.rank)
 setPossibleRanks(ranks)
 const isFixed = !selected.rank.includes("-")
 setHasFixedRank(isFixed)
 let cat =""
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
 setRequirements([{ req:"", quantity: department ==="ГИБДД" ?"" : undefined, link:"" }])
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
 let cat =""
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

 useEffect(() => {
 if (rank && reportType ==="promotion") {
 const nextRank = getNextRank(rank)
 setNewRank(nextRank)
 } else {
 setNewRank("")
 }
 }, [rank, reportType, getNextRank])

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

 const handleGenerateReport = () => {
 if (!isFormValid()) {
 toast.error("Пожалуйста, заполните все обязательные поля!")
 return
 }

 if (!department) {
 toast.error("Выберите департамент!")
 return
 }

 if (!reportType) {
 toast.error("Выберите тип отчёта!")
 return
 }

 const report = generateReport({
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
 selectedCategory,
 department,
 reportType,
 // Leader report fields
 interviews,
 firedPSG,
 firedOCHS,
 totalFired,
 totalAccepted,
 firstRanks,
 middleStaff,
 seniorStaff: seniorStaffCount,
 managementStaff,
 totalStaff: totalStaffCount,
 callsCount,
 callsAccepted,
 staffChanges,
 reprimands,
 finesReceived,
 finesPaid,
 finesBalance,
 lectures,
 lecturesFormat,
 branchEvents,
 interfactionEvents,
 seniorEvaluation,
 lineups,
 })

 setGeneratedReport(report)
 }

 if (!currentUser || !hasAccess("generator-page")) {
 console.log("Access denied for role:", currentUser?.role,"with department:", department)
 return (
 <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
 <div className="max-w-md mx-auto mt-16">
 <Card className="p-8 bg-card shadow-md border-border rounded-2xl">
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
 currentUser.role ==="root" ||
 currentUser.role ==="super-admin" ||
 currentUser.role ==="gs-gibdd" ||
 currentUser.role ==="gs-guvd" ||
 currentUser.role ==="pgs-gibdd" ||
 currentUser.role ==="pgs-guvd" ||
 currentUser.role ==="leader-gibdd" ||
 currentUser.role ==="leader-guvd"
 ) {
 return ["promotion","reprimand","senior","leader"]
 }
 if (currentUser.role ==="ss-gibdd" || currentUser.role ==="ss-guvd") {
 return ["promotion","reprimand","senior"]
 }
 if (currentUser.role ==="gibdd" || currentUser.role ==="guvd") {
 return ["promotion","reprimand"]
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
 <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
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
 <div className="bg-white/8 border border-white/15 rounded-3xl p-8 group hover:bg-white/12 hover:border-white/25 transition-colors duration-200">
 <div className="text-center">
 {currentUser?.role ==="root" || currentUser?.role ==="super-admin" ? (
 <div className="flex flex-wrap justify-center gap-4">
 <Button
 onClick={() => setDepartment("ГУВД")}
 variant={department ==="ГУВД" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 department ==="ГУВД"
 ?"bg-primary hover:bg-primary/90 shadow-lg"
 :"border-2 hover:bg-muted",
 )}
 >
 ГУВД
 </Button>
 <Button
 onClick={() => setDepartment("ГИБДД")}
 variant={department ==="ГИБДД" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 department ==="ГИБДД"
 ?"bg-primary hover:bg-primary/90 shadow-lg"
 :"border-2 hover:bg-muted",
 )}
 >
 ГИБДД
 </Button>
 </div>
 ) : (
 <>
 <div className="text-2xl font-bold text-white">{department ||"Не определён"}</div>
 <p className="text-sm text-blue-200/80 mt-2">
 Департамент определён автоматически на основе вашей роли
 </p>
 </>
 )}
 </div>
 </div>

 {department && (
 <div className="bg-white/8 border border-white/15 rounded-3xl p-8 group hover:bg-white/12 hover:border-white/25 transition-colors duration-200">
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
 variant={reportType ==="promotion" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 reportType ==="promotion"
 ?"bg-primary hover:bg-primary/90 shadow-lg"
 :"border-2 hover:bg-muted",
 )}
 >
 Рапорт на повышение
 </Button>
 )}
 {availableReportTypes.includes("reprimand") && (
 <Button
 onClick={() => setReportType("reprimand")}
 variant={reportType ==="reprimand" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 reportType ==="reprimand"
 ?"bg-primary hover:bg-primary/90 shadow-lg"
 :"border-2 hover:bg-muted",
 )}
 >
 Рапорт на отработку выговора
 </Button>
 )}
 {availableReportTypes.includes("senior") && (
 <Button
 onClick={() => setReportType("senior")}
 variant={reportType ==="senior" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 reportType ==="senior" ?"bg-primary hover:bg-primary/90 shadow-lg" :"border-2 hover:bg-muted",
 )}
 >
 Отчёт старшего состава
 </Button>
 )}
 {availableReportTypes.includes("leader") && (
 <Button
 onClick={() => setReportType("leader")}
 variant={reportType ==="leader" ?"default" :"outline"}
 className={cn(
"w-60 transition-colors duration-200 ease-in-out transform hover:scale-105",
 reportType ==="leader" ?"bg-primary hover:bg-primary/90 shadow-lg" :"border-2 hover:bg-muted",
 )}
 >
 Лидерский отчёт
 </Button>
 )}
 </div>
 </div>
 </div>
 )}

 {department && reportType && (
 <div className="bg-white/8 border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-colors duration-200 overflow-hidden">
 <div className="flex items-center gap-3 p-6 border-b border-white/10">
 <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
 <FileText className="h-5 w-5 text-green-300" />
 </div>
 <h3 className="text-xl font-bold text-white">Форма для заполнения</h3>
 </div>
 <div className="p-8">
 <div className="space-y-6">
 {reportType ==="leader" ? (
 <>
 <CitySelect
 city={city}
 setCity={setCity}
 openCity={openCity}
 setOpenCity={setOpenCity}
 setOpenPosition={setOpenPosition}
 setOpenRank={setOpenRank}
 />
 <FioInput fio={fio} setFio={setFio} label="Ваш Никнейм (лидер)" placeholder="Nick_Name" />
 <DateRangeInputs
 fromDate={fromDate}
 toDate={toDate}
 setFromDate={setFromDate}
 setToDate={setToDate}
 />
 <LeaderReportFieldsNew
 interviews={interviews}
 setInterviews={setInterviews}
 firedPSG={firedPSG}
 setFiredPSG={setFiredPSG}
 firedOCHS={firedOCHS}
 setFiredOCHS={setFiredOCHS}
 totalFired={totalFired}
 setTotalFired={setTotalFired}
 totalAccepted={totalAccepted}
 setTotalAccepted={setTotalAccepted}
 firstRanks={firstRanks}
 setFirstRanks={setFirstRanks}
 middleStaff={middleStaff}
 setMiddleStaff={setMiddleStaff}
 seniorStaff={seniorStaffCount}
 setSeniorStaff={setSeniorStaffCount}
 managementStaff={managementStaff}
 setManagementStaff={setManagementStaff}
 totalStaff={totalStaffCount}
 setTotalStaff={setTotalStaffCount}
 callsCount={callsCount}
 setCallsCount={setCallsCount}
 callsAccepted={callsAccepted}
 setCallsAccepted={setCallsAccepted}
 staffChanges={staffChanges}
 setStaffChanges={setStaffChanges}
 reprimands={reprimands}
 setReprimands={setReprimands}
 finesReceived={finesReceived}
 setFinesReceived={setFinesReceived}
 finesPaid={finesPaid}
 setFinesPaid={setFinesPaid}
 finesBalance={finesBalance}
 setFinesBalance={setFinesBalance}
 lectures={lectures}
 setLectures={setLectures}
 lecturesFormat={lecturesFormat}
 setLecturesFormat={setLecturesFormat}
 branchEvents={branchEvents}
 setBranchEvents={setBranchEvents}
 interfactionEvents={interfactionEvents}
 setInterfactionEvents={setInterfactionEvents}
 seniorEvaluation={seniorEvaluation}
 setSeniorEvaluation={setSeniorEvaluation}
 lineups={lineups}
 setLineups={setLineups}
 />
 </>
 ) : (
 <>
 <CitySelect
 city={city}
 setCity={setCity}
 openCity={openCity}
 setOpenCity={setOpenCity}
 setOpenPosition={setOpenPosition}
 setOpenRank={setOpenRank}
 />
 {department ==="ГУВД" && <LeaderFioInput leaderFio={leaderFio} setLeaderFio={setLeaderFio} />}
 <FioInput fio={fio} setFio={setFio} />
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
 {position ||"Выберите должность..."}
 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
 </Button>
 <AnimatePresence>
 {openPosition && (
 <motion.div
 initial={{ opacity: 0, y: -10, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: -10, scale: 0.95 }}
 transition={{ duration: 0.15, ease:"easeOut" }}
 className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 border border-white/20 rounded-xl shadow-lg"
 >
 <Command>
 <CommandInput placeholder="Поиск должности..." className="bg-black/5 border-white/10 text-white placeholder:text-blue-200/60" />
 <CommandEmpty className="text-blue-200/60">Должности не найдены.</CommandEmpty>
 <CommandList className="max-h-[200px] overflow-y-auto">
 <CommandGroup>
 {Object.entries(positionsData)
 .filter(([category]) =>
 reportType ==="senior"
 ? seniorCategories.includes(category)
 : reportType !=="promotion" || !seniorCategories.includes(category),
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
 position === p.title ?"opacity-100 text-blue-300" :"opacity-0",
>>>>>>> d8927b87ef1e7254505d1dce8dfc74472c626307
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
 {rank ||"Выберите текущее звание..."}
 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
 </Button>
 <AnimatePresence>
 {openRank && (
 <motion.div
 initial={{ opacity: 0, y: -10, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: -10, scale: 0.95 }}
 transition={{ duration: 0.15, ease:"easeOut" }}
 className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 border border-white/20 rounded-xl shadow-lg"
 >
 <Command>
 <CommandInput placeholder="Поиск..." className="bg-black/5 border-white/10 text-white placeholder:text-blue-200/60" />
 <CommandEmpty className="text-blue-200/60">Звания не найдены.</CommandEmpty>
 <CommandList className="max-h-[200px] overflow-y-auto">
 <CommandGroup>
 {possibleRanks
 .slice(
 0,
 reportType ==="promotion" && !academyCategories.includes(selectedCategory)
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
 className={cn("mr-2 h-4 w-4", rank === r ?"opacity-100 text-blue-300" :"opacity-0")}
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
 {rank ||"Звание не выбрано"}
 </div>
 </div>
 )}
 {reportType ==="promotion" && rank && (
 <div className="flex-1">
 <Label className="text-sm font-medium text-blue-200/90 mb-2 block">Звание на повышение</Label>
 <div className="text-sm text-green-300 bg-green-500/10 p-3 rounded-lg border border-green-400/20">
 {newRank ||"Нет следующего звания"}
 </div>
 </div>
 )}
 </div>
 )}
 {reportType ==="senior" && (
 <div className="flex justify-center">
 <Button
 variant={isVrio ?"default" :"outline"}
 onClick={() => setIsVrio(!isVrio)}
 className={isVrio ?"bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/40" :"border-blue-400/40 text-blue-300 hover:bg-blue-500/10"}
 >
 ВрИО
 </Button>
 </div>
 )}
 {(reportType ==="promotion" || reportType ==="reprimand" || reportType ==="senior") && (
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
 {department ==="ГИБДД" && (reportType ==="promotion" || reportType ==="reprimand") && (
 <div>
 <Label htmlFor="points" className="text-sm font-medium text-blue-200/90 mb-2 block">Количество баллов</Label>
 <Input id="points" value={points} onChange={(e) => setPoints(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
 </div>
 )}
 {reportType ==="reprimand" && department ==="ГИБДД" && (
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
 {reportType ==="senior" && department ==="ГУВД" && (
 <div>
 <Label htmlFor="onlineStats" className="text-sm font-medium text-blue-200/90 mb-2 block">Статистика онлайна за неделю</Label>
 <Input id="onlineStats" value={onlineStats} onChange={(e) => setOnlineStats(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
 </div>
 )}
 <RequirementsList
 requirements={requirements}
 setRequirements={setRequirements}
 department={department!}
 />
 <div>
 <Label htmlFor="signature" className="text-sm font-medium text-blue-200/90 mb-2 block">Подпись</Label>
 <Input id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" />
 </div>
 </>
 )}
 <div className="flex gap-3 flex-wrap pt-4 border-t border-white/20">
 <Button onClick={handleGenerateReport} disabled={!isFormValid()} className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-400/40">
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


 {generatedReport && (
 <div className="bg-white/8 border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-colors duration-200 overflow-hidden">
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
 {copied ?"Скопировано!" :"Скопировать"}
 </Button>
 </div>
 </div>
 )}
 </div>
 </div>
 )
}
