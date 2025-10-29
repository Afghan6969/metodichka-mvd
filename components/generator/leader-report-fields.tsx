"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface LeaderReportFieldsProps {
  // Пункт 2: Собеседования
  interviews: string[]
  setInterviews: (value: string[]) => void
  
  // Пункт 3: Принятые/уволенные
  firedPSG: string
  setFiredPSG: (value: string) => void
  firedOCHS: string
  setFiredOCHS: (value: string) => void
  totalFired: string
  setTotalFired: (value: string) => void
  totalAccepted: string
  setTotalAccepted: (value: string) => void
  
  // Пункт 4: Количество сотрудников
  firstRanks: string
  setFirstRanks: (value: string) => void
  middleStaff: string
  setMiddleStaff: (value: string) => void
  seniorStaff: string
  setSeniorStaff: (value: string) => void
  managementStaff: string
  setManagementStaff: (value: string) => void
  totalStaff: string
  setTotalStaff: (value: string) => void
  
  // Пункт 5: Обзвоны
  callsCount: string
  setCallsCount: (value: string) => void
  callsAccepted: string
  setCallsAccepted: (value: string) => void
  
  // Пункт 6: Кадровые перестановки
  staffChanges: string
  setStaffChanges: (value: string) => void
  
  // Пункт 7: Выговоры
  reprimands: string
  setReprimands: (value: string) => void
  
  // Пункт 8: Фонд неустоек
  finesReceived: string
  setFinesReceived: (value: string) => void
  finesPaid: string
  setFinesPaid: (value: string) => void
  finesBalance: string
  setFinesBalance: (value: string) => void
  
  // Пункт 9: Лекции и тренировки
  lectures: string
  setLectures: (value: string) => void
  
  // Пункт 10: Мероприятия филиалов
  branchEvents: string
  setBranchEvents: (value: string) => void
  
  // Пункт 11: Межфракционные мероприятия
  interfactionEvents: string
  setInterfactionEvents: (value: string) => void
  
  // Пункт 12: Оценка старшего состава
  seniorEvaluation: string
  setSeniorEvaluation: (value: string) => void
  
  // Пункт 13: Генеральные построения
  lineups: string
  setLineups: (value: string) => void
}

export function LeaderReportFields({
  interviews, setInterviews,
  firedPSG, setFiredPSG,
  firedOCHS, setFiredOCHS,
  totalFired, setTotalFired,
  totalAccepted, setTotalAccepted,
  firstRanks, setFirstRanks,
  middleStaff, setMiddleStaff,
  seniorStaff, setSeniorStaff,
  managementStaff, setManagementStaff,
  totalStaff, setTotalStaff,
  callsCount, setCallsCount,
  callsAccepted, setCallsAccepted,
  staffChanges, setStaffChanges,
  reprimands, setReprimands,
  finesReceived, setFinesReceived,
  finesPaid, setFinesPaid,
  finesBalance, setFinesBalance,
  lectures, setLectures,
  branchEvents, setBranchEvents,
  interfactionEvents, setInterfactionEvents,
  seniorEvaluation, setSeniorEvaluation,
  lineups, setLineups,
}: LeaderReportFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Пункт 2: Собеседования */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          2) Количество и доказательства проведенных собеседований на сервере
        </Label>
        <Textarea
          value={interviews}
          onChange={(e) => setInterviews(e.target.value)}
          placeholder="1. Ссылка&#10;2. Ссылка&#10;3. Ссылка"
          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[100px]"
        />
      </div>

      {/* Пункт 3: Принятые/уволенные */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          3) Количество принятых, уволенных ПСЖ, уволенных с ОЧС сотрудников
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Кол-во уволенных ПСЖ</Label>
            <Input value={firedPSG} onChange={(e) => setFiredPSG(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Кол-во уволенных с ОЧС</Label>
            <Input value={firedOCHS} onChange={(e) => setFiredOCHS(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Общее кол-во уволенных</Label>
            <Input value={totalFired} onChange={(e) => setTotalFired(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Кол-во принятых</Label>
            <Input value={totalAccepted} onChange={(e) => setTotalAccepted(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
        </div>
      </div>

      {/* Пункт 4: Количество сотрудников */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          4) Количество сотрудников во фракции на момент сдачи отчета
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Первые ранги</Label>
            <Input value={firstRanks} onChange={(e) => setFirstRanks(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Средний состав</Label>
            <Input value={middleStaff} onChange={(e) => setMiddleStaff(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Старший состав</Label>
            <Input value={seniorStaff} onChange={(e) => setSeniorStaff(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Руководящий состав (с учетом лидера)</Label>
            <Input value={managementStaff} onChange={(e) => setManagementStaff(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div className="col-span-2">
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Общее количество сотрудников</Label>
            <Input value={totalStaff} onChange={(e) => setTotalStaff(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
        </div>
      </div>

      {/* Пункт 5: Обзвоны */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          5) Количество проведенных обзвонов и принятых сотрудников в старший состав
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Количество обзвонов за неделю</Label>
            <Input value={callsCount} onChange={(e) => setCallsCount(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Количество принятых</Label>
            <Input value={callsAccepted} onChange={(e) => setCallsAccepted(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
        </div>
      </div>

      {/* Пункт 6: Кадровые перестановки */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          6) Список кадровых перестановок в старшем составе
        </Label>
        <Textarea
          value={staffChanges}
          onChange={(e) => setStaffChanges(e.target.value)}
          placeholder="Nick_Name - повышен до...&#10;Nick_Name2 - понижен с...&#10;(Если нет ставим -)"
          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[80px]"
        />
      </div>

      {/* Пункт 7: Выговоры */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          7) Список выданных выговоров
        </Label>
        <Textarea
          value={reprimands}
          onChange={(e) => setReprimands(e.target.value)}
          placeholder="Nick_Name - получает выговор за нарушение 4.8 ПСГО&#10;Nick_Name2 - получает выговор по 3.28 ПСГО"
          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[100px]"
        />
      </div>

      {/* Пункт 8: Фонд неустоек */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          8) Фонд неустоек
        </Label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Получено</Label>
            <Input value={finesReceived} onChange={(e) => setFinesReceived(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Выплачено</Label>
            <Input value={finesPaid} onChange={(e) => setFinesPaid(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Остаток</Label>
            <Input value={finesBalance} onChange={(e) => setFinesBalance(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
        </div>
      </div>

      {/* Пункт 9: Лекции */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          9) Список проведенных во фракции лекций, тренировок, RP мероприятий
        </Label>
        <Textarea
          value={lectures}
          onChange={(e) => setLectures(e.target.value)}
          placeholder="1. Название - Ссылка&#10;2. Название - Ссылка"
          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[100px]"
        />
      </div>

      {/* Пункт 10: Мероприятия филиалов */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          10) Мероприятия от всех филиалов организации
        </Label>
        <Textarea
          value={branchEvents}
          onChange={(e) => setBranchEvents(e.target.value)}
          placeholder="1. Название - Ссылка&#10;2. Название - Ссылка"
          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[100px]"
        />
      </div>

      {/* Пункт 11: Межфракционные мероприятия */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          11) Проведение двух межфракционных мероприятий (С непосредственным участием лидера)
        </Label>
        <Textarea
          value={interfactionEvents}
          onChange={(e) => setInterfactionEvents(e.target.value)}
          placeholder="1. Название - Ссылка&#10;2. Название - Ссылка"
          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[80px]"
        />
      </div>

      {/* Пункт 12: Оценка старшего состава */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          12) Краткая оценка работы каждого сотрудника старшего состава фракции
        </Label>
        <Textarea
          value={seniorEvaluation}
          onChange={(e) => setSeniorEvaluation(e.target.value)}
          placeholder="Nick_Name - 8/10 хорошая работа, претензий нет&#10;Nick_Name2 - 9/10 отличная работа, претензий нет"
          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[100px]"
        />
      </div>

      {/* Пункт 13: Генеральные построения */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          13) Проведение генеральных построений
        </Label>
        <Textarea
          value={lineups}
          onChange={(e) => setLineups(e.target.value)}
          placeholder="1. Ссылка&#10;2. Ссылка"
          className="bg-black/5 border-blue-400/30 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[80px]"
        />
      </div>
    </div>
  )
}
