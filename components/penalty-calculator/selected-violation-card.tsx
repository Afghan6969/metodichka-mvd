import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X, ChevronDown, ChevronUp, Scale, DollarSign, Shield, Car, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Violation } from "./types"

interface SelectedViolationCardProps {
  violationKey: string
  violation: Violation
  selectedPenalty: string | undefined
  selectedFineAmount: number | undefined
  selectedSuspensionAmount: number | undefined
  selectedArrestAmount: number | undefined
  onRemove: () => void
  onPenaltyChange: (penalty: string) => void
  onFineAmountChange: (amount: number) => void
  onSuspensionAmountChange: (amount: number) => void
  onArrestAmountChange: (amount: number) => void
}

export function SelectedViolationCard({
  violationKey,
  violation,
  selectedPenalty,
  selectedFineAmount,
  selectedSuspensionAmount,
  selectedArrestAmount,
  onRemove,
  onPenaltyChange,
  onFineAmountChange,
  onSuspensionAmountChange,
  onArrestAmountChange,
}: SelectedViolationCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const selectedAlt = violation.alternatives?.find(alt => alt.name === selectedPenalty)

  return (
    <div className="border border-white/15 rounded-xl bg-white/5 overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-white/5">
        <div className="flex items-center gap-3 flex-1">
          <Badge variant="secondary" className="border-blue-400/40 text-blue-300 bg-blue-500/10 font-semibold">
            {violation.article as string}
          </Badge>
          <span className="text-sm text-white">{violation.description as string}</span>
        </div>
        <div className="flex items-center gap-2">
          {violation.alternatives && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-white/10"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-blue-300" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-300" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-300 text-red-300"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {violation.alternatives && isExpanded && (
        <div className="p-4 space-y-3 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-semibold text-blue-200">Выберите вид наказания:</span>
          </div>
          <div className="grid gap-2">
            {(!selectedPenalty || selectedPenalty === "default") && (
              <div className="p-3 rounded-lg border-2 border-yellow-500/50 bg-yellow-500/10 mb-1">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-yellow-200">⚠️ Требуется выбор наказания</div>
                    <div className="text-xs text-yellow-200/70 mt-1">
                      Выберите один из вариантов ниже, чтобы статья учитывалась в расчёте
                    </div>
                  </div>
                </div>
              </div>
            )}
            {violation.alternatives.map((alt) => (
              <label
                key={alt.name}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                  selectedPenalty === alt.name
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/20 bg-white/5 hover:border-white/30"
                )}
              >
                <input
                  type="radio"
                  name={`penalty-${violationKey}`}
                  checked={selectedPenalty === alt.name}
                  onChange={() => onPenaltyChange(alt.name)}
                  className="mt-0.5 h-4 w-4 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{alt.name}</div>
                  <div className="text-xs text-blue-200/60 mt-1 space-y-0.5">
                    {alt.fine > 0 && <div>• Штраф: {alt.fine.toLocaleString()} ₽</div>}
                    {alt.suspension > 0 && <div>• Лишение прав: {alt.suspension} {alt.suspension === 1 ? "год" : alt.suspension < 5 ? "года" : "лет"}</div>}
                    {alt.arrest > 0 && <div>• Арест: {alt.arrest} {alt.arrest === 1 ? "год" : alt.arrest < 5 ? "года" : "лет"}</div>}
                    {alt.retraining && <div>• Переобучение требуется</div>}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {selectedAlt?.fineRange && (
            <div className="mt-3 p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg border border-green-400/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-300" />
                  <span className="text-sm font-medium text-white">Сумма штрафа</span>
                </div>
                <div className="text-2xl font-bold text-green-300">
                  {(selectedFineAmount ?? selectedAlt.fine).toLocaleString()} ₽
                </div>
              </div>
              <div className="space-y-2">
                <Slider
                  value={[selectedFineAmount ?? selectedAlt.fine]}
                  onValueChange={(value: number[]) => onFineAmountChange(value[0])}
                  min={selectedAlt.fineRange.min}
                  max={selectedAlt.fineRange.max}
                  step={1000}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-green-200/60">
                  <span>{selectedAlt.fineRange.min.toLocaleString()} ₽</span>
                  <span>{selectedAlt.fineRange.max.toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
          )}

          {(violation.arrestRange || selectedAlt?.arrestRange) && (
            <div className="mt-3 p-4 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-lg border border-red-400/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-red-300" />
                <span className="text-sm font-medium text-white">Срок ареста</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Array.from(
                  { length: ((selectedAlt?.arrestRange || violation.arrestRange)!.max - (selectedAlt?.arrestRange || violation.arrestRange)!.min) + 1 },
                  (_, i) => {
                    const range = selectedAlt?.arrestRange || violation.arrestRange!
                    const amount = range.min + i
                    const isSelected = (selectedArrestAmount ?? (selectedAlt?.arrest || violation.arrest || 0)) === amount
                    return (
                      <button
                        key={amount}
                        onClick={() => onArrestAmountChange(amount)}
                        className={cn(
                          "px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                          isSelected
                            ? "border-red-500 bg-red-500/20 text-red-200"
                            : "border-white/20 bg-white/5 text-white hover:border-red-400/40 hover:bg-red-500/10"
                        )}
                      >
                        {amount} {amount === 1 ? "год" : amount < 5 ? "года" : "лет"}
                      </button>
                    )
                  }
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {violation.suspensionRange && (
        <div className="p-4 border-t border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
          <div className="flex items-center gap-2 mb-3">
            <Car className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-medium text-white">Срок лишения прав</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from(
              { length: violation.suspensionRange.max - violation.suspensionRange.min + 1 },
              (_, i) => {
                const amount = violation.suspensionRange!.min + i
                const isSelected = (selectedSuspensionAmount ?? violation.suspension) === amount
                return (
                  <button
                    key={amount}
                    onClick={() => onSuspensionAmountChange(amount)}
                    className={cn(
                      "px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                      isSelected
                        ? "border-blue-500 bg-blue-500/20 text-blue-200"
                        : "border-white/20 bg-white/5 text-white hover:border-blue-400/40 hover:bg-blue-500/10"
                    )}
                  >
                    {amount === 0
                      ? "С переобучением"
                      : `${amount} ${amount === 1 ? "год" : amount < 5 ? "года" : "лет"}`}
                  </button>
                )
              }
            )}
          </div>
        </div>
      )}
    </div>
  )
}
