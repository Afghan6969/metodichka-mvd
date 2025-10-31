"use client"

import { useState, useRef } from"react"
import { Button } from"@/components/ui/button"
import { Badge } from"@/components/ui/badge"
import { Separator } from"@/components/ui/separator"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from"@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select"
import { Input } from"@/components/ui/input"
import { Check, ChevronsUpDown, Scale, DollarSign, Car, Shield, GraduationCap, X, Star, Search, ChevronDown, ChevronUp } from"lucide-react"
import { cn } from"@/lib/utils"
import { koapViolations } from"./koap-violations"
import { ukViolations } from"./uk-violations"
import { PageHeader } from"@/components/page-header"
import { SelectedViolationCard } from"./selected-violation-card"
import type { Violation, ViolationCategory, PenaltyTotals, Alternative } from"./types"

const PenaltyCalculator = () => {
 const [selectedViolations, setSelectedViolations] = useState<string[]>([])
 const [selectedPenalties, setSelectedPenalties] = useState<Record<string, string>>({})
 const [selectedFineAmounts, setSelectedFineAmounts] = useState<Record<string, number>>({})
 const [selectedSuspensionAmounts, setSelectedSuspensionAmounts] = useState<Record<string, number>>({})
 const [selectedArrestAmounts, setSelectedArrestAmounts] = useState<Record<string, number>>({})
 const [openKoap, setOpenKoap] = useState(false)
 const [openUk, setOpenUk] = useState(false)
 const [expandedViolations, setExpandedViolations] = useState<Record<string, boolean>>({})

 // Рефы для прямого управления полями ввода
 const fineInputRefs = useRef<Record<string, HTMLInputElement>>({})

 // Объединяем все нарушения
 const violations: Record<string, ViolationCategory> = {
 ...koapViolations,
 ...ukViolations,
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

 const calculateTotals = (): PenaltyTotals => {
 let totalFine = 0
 let totalSuspension = 0
 let totalArrest = 0
 let hasRetraining = false

 selectedViolations.forEach((violationKey) => {
 const allViolations = getAllViolations()
 const found = allViolations.find((v) => v.key === violationKey)
 if (found) {
 const violation = found.violation
 const selectedPenalty = selectedPenalties[violationKey] ||"default"

 // Если статья имеет альтернативы и не выбрана альтернатива - пропускаем
 if (violation.alternatives && selectedPenalty ==="default") {
 return
 }

 let penalty = violation

 if (selectedPenalty !=="default" && violation.alternatives) {
 const selectedAlt = violation.alternatives.find((alt: any) => alt.name === selectedPenalty)
 if (selectedAlt) {
 penalty = selectedAlt
 }
 }

 // Only check fineRange if penalty is an alternative (not the main violation) AND has fineRange
 if (selectedPenalty !=="default" && selectedFineAmounts[violationKey] !== undefined && (penalty as any).fineRange) {
 penalty = {
 ...penalty,
 fine: selectedFineAmounts[violationKey],
 }
 }

 // Only check arrestRange if penalty is an alternative (not the main violation) AND has arrestRange
 if (selectedPenalty !=="default" && selectedArrestAmounts[violationKey] !== undefined && (penalty as any).arrestRange) {
 penalty = {
 ...penalty,
 arrest: selectedArrestAmounts[violationKey],
 }
 }

 // Only check suspensionRange if penalty has suspensionRange
 if (selectedSuspensionAmounts[violationKey] !== undefined && (penalty as any).suspensionRange) {
 penalty = {
 ...penalty,
 suspension: selectedSuspensionAmounts[violationKey],
 }
 }

 const suspension = penalty.suspension

 totalFine += penalty.fine
 totalSuspension += suspension
 totalArrest += penalty.arrest
 if (penalty.retraining) {
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

 const getAlternatives = (): Alternative[] => {
 const alternatives: Alternative[] = []

 selectedViolations.forEach((violationKey) => {
 const allViolations = getAllViolations()
 const found = allViolations.find((v) => v.key === violationKey)
 if (found) {
 const violation = found.violation
 const selectedPenalty = selectedPenalties[violationKey] ||"default"

 // Если статья имеет альтернативы и не выбрана альтернатива - пропускаем
 if (violation.alternatives && selectedPenalty ==="default") {
 return
 }

 let penalty = violation

 if (selectedPenalty !=="default" && violation.alternatives) {
 const selectedAlt = violation.alternatives.find((alt: any) => alt.name === selectedPenalty)
 if (selectedAlt) {
 penalty = selectedAlt
 }
 }

 // Apply selected amounts if they exist and the penalty supports ranges
 let finalFine = penalty.fine
 let finalSuspension = penalty.suspension
 let finalArrest = penalty.arrest

 if (selectedPenalty !=="default" && selectedFineAmounts[violationKey] !== undefined && (penalty as any).fineRange) {
 finalFine = selectedFineAmounts[violationKey]
 }

 if (selectedSuspensionAmounts[violationKey] !== undefined && (penalty as any).suspensionRange) {
 finalSuspension = selectedSuspensionAmounts[violationKey]
 }

 if (selectedPenalty !=="default" && selectedArrestAmounts[violationKey] !== undefined && (penalty as any).arrestRange) {
 finalArrest = selectedArrestAmounts[violationKey]
 }

 const altName = selectedPenalty !=="default" && (penalty as any).name ? (penalty as any).name :"Основное наказание"

 alternatives.push({
 name: `${violation.article as string}: ${altName}`,
 fine: finalFine,
 suspension: finalSuspension,
 arrest: finalArrest,
 retraining: penalty.retraining,
 hasRange: false,
 range: undefined,
 hasArrestRange: false,
 arrestRange: undefined,
 })
 }
 })

 return alternatives
 }

 const totals = calculateTotals()
 const alternatives = getAlternatives()

 const getSelectedAlternative = (violationKey: string) => {
 const found = getAllViolations().find((v) => v.key === violationKey)
 if (!found || !selectedPenalties[violationKey]) return null
 return found.violation.alternatives?.find(alt => alt.name === selectedPenalties[violationKey])
 }

 return (
 <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
 <PageHeader
 icon={Scale}
 title="Калькулятор наказаний"
 description="Расчёт штрафов, ареста и лишения прав по КоАП и УК"
 badge={`${selectedViolations.length} ${selectedViolations.length % 10 === 1 && selectedViolations.length % 100 !== 11 ? 'статья' : selectedViolations.length % 10 >= 2 && selectedViolations.length % 10 <= 4 && (selectedViolations.length % 100 < 10 || selectedViolations.length % 100 >= 20) ? 'статьи' : 'статей'}`}
 />

 <div className="bg-white/8 border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-colors duration-200">
 <div className="space-y-6 p-8">
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <h3 className="text-lg font-bold text-white">Выбор статей</h3>
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
 className="border-red-400/40 text-red-300 hover:bg-red-500/10 hover:text-red-200"
 >
 Очистить все
 </Button>
 )}
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {/* КоАП меню */}
 <div className="relative w-full">
 <Button
 variant="outline"
 role="combobox"
 aria-expanded={openKoap}
 className="w-full justify-between h-14 border border-blue-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
 onClick={() => setOpenKoap(!openKoap)}
 >
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
 <Car className="h-4 w-4 text-blue-300" />
 </div>
 <div className="flex flex-col items-start">
 <span className="text-xs font-medium text-blue-200/70 uppercase tracking-wide">
 КоАП
 </span>
 <span className="text-sm font-semibold">
 {selectedViolations.filter(v => Object.keys(koapViolations).some(k => v.startsWith(k))).length === 0 
 ?"Выберите статьи" 
 : `Выбрано: ${selectedViolations.filter(v => Object.keys(koapViolations).some(k => v.startsWith(k))).length}`}
 </span>
 </div>
 </div>
 <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
 </Button>

 {openKoap && (
 <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-black/90 border border-white/15 rounded-xl shadow-lg overflow-hidden">
 <Command className="bg-transparent">
 <div className="border-b border-white/10 bg-white/5 p-2">
 <CommandInput 
 placeholder="Поиск в КоАП..." 
 className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/60 h-10 rounded-lg px-3 focus:outline-none focus:ring-0" 
 />
 </div>
 <CommandEmpty className="text-blue-200/60 py-6 text-center text-sm">
 Статьи не найдены
 </CommandEmpty>
 <CommandList className="max-h-[500px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
 {Object.entries(koapViolations).map(([categoryKey, category]) => (
 <CommandGroup 
 key={categoryKey} 
 heading={category.name} 
 className="text-blue-200 font-semibold text-xs uppercase tracking-wide mb-1 px-2 py-1"
 >
 {Object.entries(category.items).map(([violationKey, violation]) => (
 <CommandItem
 key={violationKey}
 value={`${categoryKey}.${violationKey}|${violation.article as string}|${violation.description as string}`}
 onSelect={(currentValue) => {
 const [key] = currentValue.split('|');
 setSelectedViolations((prev) =>
 prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
 )
 }}
 className="hover:bg-white/15 text-white rounded-lg mb-1 p-2.5 cursor-pointer transition-all duration-150"
 >
 <div className="flex items-center gap-2 w-full">
 <div className={cn(
"w-4 h-4 rounded border-2 flex items-center justify-center shrink-0",
 selectedViolations.includes(`${categoryKey}.${violationKey}`)
 ?"bg-blue-500 border-blue-500"
 :"border-white/30"
 )}>
 {selectedViolations.includes(`${categoryKey}.${violationKey}`) && (
 <Check className="h-3 w-3 text-white" />
 )}
 </div>
 <div className="flex-1">
 <div className="font-semibold text-white text-sm">{violation.article as string}</div>
 <div className="text-xs text-blue-200/80 mt-0.5">{violation.description as string}</div>
 </div>
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

 {/* УК меню */}
 <div className="relative w-full">
 <Button
 variant="outline"
 role="combobox"
 aria-expanded={openUk}
 className="w-full justify-between h-14 border border-red-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
 onClick={() => setOpenUk(!openUk)}
 >
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-400/30">
 <Shield className="h-4 w-4 text-red-300" />
 </div>
 <div className="flex flex-col items-start">
 <span className="text-xs font-medium text-red-200/70 uppercase tracking-wide">
 УК
 </span>
 <span className="text-sm font-semibold">
 {selectedViolations.filter(v => Object.keys(ukViolations).some(k => v.startsWith(k))).length === 0 
 ?"Выберите статьи" 
 : `Выбрано: ${selectedViolations.filter(v => Object.keys(ukViolations).some(k => v.startsWith(k))).length}`}
 </span>
 </div>
 </div>
 <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
 </Button>

 {openUk && (
 <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-black/90 border border-white/15 rounded-xl shadow-lg overflow-hidden">
 <Command className="bg-transparent">
 <div className="border-b border-white/10 bg-white/5 p-2">
 <CommandInput 
 placeholder="Поиск в УК..." 
 className="bg-white/5 border-white/10 text-white placeholder:text-red-200/60 h-10 rounded-lg px-3 focus:outline-none focus:ring-0" 
 />
 </div>
 <CommandEmpty className="text-red-200/60 py-6 text-center text-sm">
 Статьи не найдены
 </CommandEmpty>
 <CommandList className="max-h-[500px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
 {Object.entries(ukViolations).map(([categoryKey, category]) => (
 <CommandGroup 
 key={categoryKey} 
 heading={category.name} 
 className="text-red-200 font-semibold text-xs uppercase tracking-wide mb-1 px-2 py-1"
 >
 {Object.entries(category.items).map(([violationKey, violation]) => (
 <CommandItem
 key={violationKey}
 value={`${categoryKey}.${violationKey}|${violation.article as string}|${violation.description as string}`}
 onSelect={(currentValue) => {
 const [key] = currentValue.split('|');
 setSelectedViolations((prev) =>
 prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
 )
 }}
 className="hover:bg-white/15 text-white rounded-lg mb-1 p-2.5 cursor-pointer transition-all duration-150"
 >
 <div className="flex items-center gap-2 w-full">
 <div className={cn(
"w-4 h-4 rounded border-2 flex items-center justify-center shrink-0",
 selectedViolations.includes(`${categoryKey}.${violationKey}`)
 ?"bg-red-500 border-red-500"
 :"border-white/30"
 )}>
 {selectedViolations.includes(`${categoryKey}.${violationKey}`) && (
 <Check className="h-3 w-3 text-white" />
 )}
 </div>
 <div className="flex-1">
 <div className="font-semibold text-white text-sm">{violation.article as string}</div>
 <div className="text-xs text-red-200/80 mt-0.5">{violation.description as string}</div>
 </div>
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
 </div>

 {selectedViolations.length > 0 && (
 <div className="space-y-3">
 <h4 className="text-sm font-medium text-blue-200/80">Выбранные статьи:</h4>
 <div className="space-y-3">
 {selectedViolations.map((violationKey) => {
 const found = getAllViolations().find((v) => v.key === violationKey)
 if (!found) return null
 const violation = found.violation
 const selectedAlt = getSelectedAlternative(violationKey)

 if (violation.suspensionRange && selectedSuspensionAmounts[violationKey] === undefined) {
 setSelectedSuspensionAmounts((prev) => ({
 ...prev,
 [violationKey]: violation.suspension,
 }))
 }
 if (selectedAlt?.suspensionRange && selectedSuspensionAmounts[violationKey] === undefined) {
 setSelectedSuspensionAmounts((prev) => ({
 ...prev,
 [violationKey]: selectedAlt.suspension,
 }))
 }

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
 <SelectedViolationCard
 key={violationKey}
 violationKey={violationKey}
 violation={violation}
 selectedPenalty={selectedPenalties[violationKey]}
 selectedFineAmount={selectedFineAmounts[violationKey]}
 selectedSuspensionAmount={selectedSuspensionAmounts[violationKey]}
 selectedArrestAmount={selectedArrestAmounts[violationKey]}
 onRemove={() => {
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
 onPenaltyChange={(newPenalty) => {
 setSelectedPenalties((prev) => ({
 ...prev,
 [violationKey]: newPenalty,
 }))
 if (newPenalty ==="default") {
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
 setSelectedSuspensionAmounts((prev) => {
 const newAmounts = { ...prev }
 if (alt.suspensionRange) {
 newAmounts[violationKey] = alt.suspension
 } else {
 delete newAmounts[violationKey]
 }
 return newAmounts
 })
 setSelectedArrestAmounts((prev) => {
 const newAmounts = { ...prev }
 if (alt.arrestRange) {
 newAmounts[violationKey] = alt.arrest
 } else {
 delete newAmounts[violationKey]
 }
 return newAmounts
 })
 }
 }
 }}
 onFineAmountChange={(amount) => {
 setSelectedFineAmounts((prev) => ({
 ...prev,
 [violationKey]: amount,
 }))
 }}
 onSuspensionAmountChange={(amount) => {
 setSelectedSuspensionAmounts((prev) => ({
 ...prev,
 [violationKey]: amount,
 }))
 }}
 onArrestAmountChange={(amount) => {
 setSelectedArrestAmounts((prev) => ({
 ...prev,
 [violationKey]: amount,
 }))
 }}
 />
 )
 })}
 </div>
 </div>
 )}
 </div>

 <Separator />

 <div className="space-y-4 p-6">
 <h3 className="text-lg font-semibold text-white flex items-center gap-2">
 <Scale className="h-5 w-5 text-blue-300" />
 Итоговое наказание
 </h3>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-8 h-8 bg-green-500/15 rounded-lg flex items-center justify-center">
 <DollarSign className="h-4 w-4 text-green-400" />
 </div>
 <span className="text-sm text-white/70">Штраф</span>
 </div>
 <p className="text-2xl font-bold text-green-300">{totals.fine.toLocaleString()} ₽</p>
 </div>

 <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center">
 <Car className="h-4 w-4 text-blue-400" />
 </div>
 <span className="text-sm text-white/70">Лишение</span>
 </div>
 <p className="text-2xl font-bold text-blue-300">
 {totals.suspension > 0
 ? `${totals.suspension} ${totals.suspension === 1 ?"г" : totals.suspension < 5 ?"г" :"л"}`
 :"—"}
 </p>
 </div>

 <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-8 h-8 bg-red-500/15 rounded-lg flex items-center justify-center">
 <Shield className="h-4 w-4 text-red-400" />
 </div>
 <span className="text-sm text-white/70">Арест</span>
 </div>
 <p className="text-2xl font-bold text-red-300">
 {totals.arrest > 0
 ? `${totals.arrest} ${totals.arrest === 1 ?"г" : totals.arrest < 5 ?"г" :"л"}`
 :"—"}
 </p>
 </div>

 <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-8 h-8 bg-purple-500/15 rounded-lg flex items-center justify-center">
 <GraduationCap className="h-4 w-4 text-purple-400" />
 </div>
 <span className="text-sm text-white/70">Переобучение</span>
 </div>
 <p className="text-2xl font-bold text-purple-300">{totals.retraining ?"Да" :"—"}</p>
 </div>
 </div>
 </div>

 {alternatives.length > 0 && (
 <>
 <Separator />
 <div className="space-y-6 p-8">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
 <Star className="h-5 w-5 text-white" />
 </div>
 <div>
 <h3 className="text-xl font-bold text-white">Детализация наказаний</h3>
 <p className="text-sm text-blue-200/60">Разбивка по каждой статье</p>
 </div>
 </div>
 <div className="space-y-3">
 {alternatives.map((alt, index) => (
 <div key={index} className="bg-gradient-to-r from-white/10 to-white/5 p-5 rounded-xl border border-white/15 hover:border-white/30 transition-colors duration-200 shadow-lg">
 <div className="font-bold text-white mb-3 text-lg flex items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-blue-400"></div>
 {alt.name}
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="flex items-center gap-2">
 <DollarSign className="h-4 w-4 text-green-400" />
 <div>
 <div className="text-xs text-green-200/60">Штраф</div>
 <div className="text-sm font-semibold text-green-300">{alt.fine.toLocaleString()} ₽</div>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <Car className="h-4 w-4 text-blue-400" />
 <div>
 <div className="text-xs text-blue-200/60">Лишение прав</div>
 <div className="text-sm font-semibold text-blue-300">
 {alt.suspension > 0
 ? `${alt.suspension} ${alt.suspension === 1 ?"год" : alt.suspension < 5 ?"года" :"лет"}`
 :"Нет"}
 </div>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <Shield className="h-4 w-4 text-red-400" />
 <div>
 <div className="text-xs text-red-200/60">Арест</div>
 <div className="text-sm font-semibold text-red-300">
 {alt.arrest > 0
 ? `${alt.arrest} ${alt.arrest === 1 ?"год" : alt.arrest < 5 ?"года" :"лет"}`
 :"Нет"}
 </div>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <GraduationCap className="h-4 w-4 text-purple-400" />
 <div>
 <div className="text-xs text-purple-200/60">Переобучение</div>
 <div className="text-sm font-semibold text-purple-300">{alt.retraining ?"Требуется" :"Нет"}</div>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </>
 )}
 </div>
 </div>
 </div>
 )
}

export { PenaltyCalculator }
export default PenaltyCalculator
