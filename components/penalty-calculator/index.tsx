"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ChevronsUpDown, Calculator, DollarSign, Car, Shield, GraduationCap, X, Star, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { koapViolations } from "./koap-violations"
import { ukViolations } from "./uk-violations"
import { PageHeader } from "@/components/page-header"
import type { Violation, ViolationCategory, PenaltyTotals, Alternative } from "./types"

const PenaltyCalculator = () => {
  const [selectedViolations, setSelectedViolations] = useState<string[]>([])
  const [selectedPenalties, setSelectedPenalties] = useState<Record<string, string>>({})
  const [selectedFineAmounts, setSelectedFineAmounts] = useState<Record<string, number>>({})
  const [selectedSuspensionAmounts, setSelectedSuspensionAmounts] = useState<Record<string, number>>({})
  const [selectedArrestAmounts, setSelectedArrestAmounts] = useState<Record<string, number>>({})
  const [open, setOpen] = useState(false)

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

  const getAlternatives = (): Alternative[] => {
    const alternatives: Alternative[] = []

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

  const getSelectedAlternative = (violationKey: string) => {
    const found = getAllViolations().find((v) => v.key === violationKey)
    if (!found || !selectedPenalties[violationKey]) return null
    return found.violation.alternatives?.find(alt => alt.name === selectedPenalties[violationKey])
  }

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={Calculator}
        title="Калькулятор наказаний"
        description="Расчёт штрафов, ареста и лишения прав по КоАП и УК"
        badge={`${selectedViolations.length} ${
          selectedViolations.length % 10 === 1 && selectedViolations.length % 100 !== 11
            ? 'статья'
            : selectedViolations.length % 10 >= 2 && selectedViolations.length % 10 <= 4 &&
              (selectedViolations.length % 100 < 10 || selectedViolations.length % 100 >= 20)
            ? 'статьи'
            : 'статей'
        }`}
              />

      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
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

          <div className="relative w-full">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-14 border-blue-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
              onClick={() => setOpen(!open)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                  <Search className="h-4 w-4 text-blue-300" />
                </div>
                <span className="text-base font-semibold">
                  {selectedViolations.length === 0 ? "Выберите статьи..." : `Выбрано статей: ${selectedViolations.length}`}
                </span>
              </div>
              <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-60" />
            </Button>

            {open && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
                <Command>
                  <CommandInput placeholder="Поиск статей..." className="bg-black/5 border-white/10 text-white placeholder:text-blue-200/60" />
                  <CommandEmpty className="text-blue-200/60">Статьи не найдены.</CommandEmpty>
                  <CommandList className="max-h-[300px] overflow-y-auto">
                    {Object.entries(violations).map(([categoryKey, category]) => (
                      <CommandGroup key={categoryKey} heading={category.name} className="text-blue-100">
                        {Object.entries(category.items).map(([violationKey, violation]) => (
                          <CommandItem
                            key={violationKey}
                            value={`${categoryKey}.${violationKey}|${violation.article}|${violation.description}`}
                            onSelect={(currentValue) => {
                              const [key] = currentValue.split('|');
                              setSelectedViolations((prev) =>
                                prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
                              )
                              setOpen(false)
                            }}
                            className="hover:bg-white/10 text-white data-[selected]:text-blue-200 data-[selected]:bg-transparent"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedViolations.includes(`${categoryKey}.${violationKey}`)
                                  ? "opacity-100 text-blue-300"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex-1">
                              <div className="font-medium text-white">{violation.article}</div>
                              <div className="text-sm text-blue-200/80">{violation.description}</div>
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
              <h4 className="text-sm font-medium text-blue-200/80">Выбранные статьи:</h4>
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
                        <Badge variant="secondary" className="flex items-center gap-1 border-blue-400/40 text-blue-300 bg-blue-500/10">
                          {violation.article}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-red-500/20 hover:text-red-300 border border-red-400/30 text-red-300"
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
                        <span className="text-xs text-blue-200/80">{violation.description}</span>
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
                              <SelectTrigger className="text-xs h-8 border-blue-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                                <SelectValue placeholder="Выбрать наказание" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/10 backdrop-blur-sm border-white/20">
                                <SelectItem value="default" className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">Выбрать наказание</SelectItem>
                                {violation.alternatives.map((alt) => (
                                  <SelectItem key={alt.name} value={alt.name} className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">
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
                                <SelectTrigger className="text-xs h-8 border-blue-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white/10 backdrop-blur-sm border-white/20">
                                  {Array.from(
                                    { length: (selectedAlt.fineRange.max - selectedAlt.fineRange.min) / 500 + 1 },
                                    (_, i) => {
                                      const amount = selectedAlt.fineRange!.min + i * 500
                                      return (
                                        <SelectItem key={amount} value={amount.toString()} className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">
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
                                <SelectTrigger className="text-xs h-8 border-blue-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white/10 backdrop-blur-sm border-white/20">
                                  {Array.from(
                                    { length: ((selectedAlt?.arrestRange || violation.arrestRange)!.max - (selectedAlt?.arrestRange || violation.arrestRange)!.min) + 1 },
                                    (_, i) => {
                                      const range = selectedAlt?.arrestRange || violation.arrestRange!
                                      const amount = range.min + i
                                      return (
                                        <SelectItem key={amount} value={amount.toString()} className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">
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
                            <SelectTrigger className="text-xs h-8 border-blue-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white/10 backdrop-blur-sm border-white/20">
                              {Array.from(
                                { length: violation.suspensionRange.max - violation.suspensionRange.min + 1 },
                                (_, i) => {
                                  const amount = violation.suspensionRange!.min + i
                                  return (
                                    <SelectItem key={amount} value={amount.toString()} className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">
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
          <h3 className="text-lg font-medium text-white">Итоговое наказание</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
                  <DollarSign className="h-5 w-5 text-green-300" />
                </div>
                <h4 className="text-lg font-bold text-white">Штраф</h4>
              </div>
              <p className="text-2xl font-black text-green-300">{totals.fine.toLocaleString()} ₽</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                  <Car className="h-5 w-5 text-blue-300" />
                </div>
                <h4 className="text-lg font-bold text-white">Лишение прав</h4>
              </div>
              <p className="text-2xl font-black text-blue-300">
                {totals.suspension > 0
                  ? `${totals.suspension} ${totals.suspension === 1 ? "год" : totals.suspension < 5 ? "года" : "лет"}`
                  : "Нет"}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-400/30">
                  <Shield className="h-5 w-5 text-red-300" />
                </div>
                <h4 className="text-lg font-bold text-white">Арест</h4>
              </div>
              <p className="text-2xl font-black text-red-300">
                {totals.arrest > 0
                  ? `${totals.arrest} ${totals.arrest === 1 ? "год" : totals.arrest < 5 ? "года" : "лет"}`
                  : "Нет"}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                  <GraduationCap className="h-5 w-5 text-purple-300" />
                </div>
                <h4 className="text-lg font-bold text-white">Переобучение</h4>
              </div>
              <p className="text-2xl font-black text-purple-300">{totals.retraining ? "Требуется" : "Не требуется"}</p>
            </div>
          </div>
        </div>

        {alternatives.length > 0 && (
          <>
            <div className="border-t border-white/20"></div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Детализация наказаний</h3>
              <div className="space-y-3">
                {alternatives.map((alt, index) => (
                  <div key={index} className="bg-black/5 p-4 rounded-xl border border-white/10">
                    <div className="font-bold text-white mb-2">{alt.name}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-green-300">Штраф: {alt.fine.toLocaleString()} ₽</div>
                      <div className="text-blue-300">
                        Лишение прав: {alt.suspension > 0
                          ? `${alt.suspension} ${alt.suspension === 1 ? "год" : alt.suspension < 5 ? "года" : "лет"}`
                          : "Нет"}
                      </div>
                      <div className="text-red-300">
                        Арест: {alt.arrest > 0
                          ? `${alt.arrest} ${alt.arrest === 1 ? "год" : alt.arrest < 5 ? "года" : "лет"}`
                          : "Нет"}
                      </div>
                      <div className="text-purple-300">Переобучение: {alt.retraining ? "Требуется" : "Не требуется"}</div>
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



