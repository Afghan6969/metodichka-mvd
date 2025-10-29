"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface LeaderReportFieldsProps {
  // Пункт 2: Собеседования (массив ссылок)
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
  
  // Пункт 6: Кадровые перестановки (массив)
  staffChanges: string[]
  setStaffChanges: (value: string[]) => void
  
  // Пункт 7: Выговоры (массив)
  reprimands: string[]
  setReprimands: (value: string[]) => void
  
  // Пункт 8: Фонд неустоек
  finesReceived: string
  setFinesReceived: (value: string) => void
  finesPaid: string
  setFinesPaid: (value: string) => void
  finesBalance: string
  setFinesBalance: (value: string) => void
  
  // Пункт 9: Лекции (массив с выбором формата)
  lectures: Array<{ name: string; link: string }>
  setLectures: (value: Array<{ name: string; link: string }>) => void
  lecturesFormat: "separate" | "combined"
  setLecturesFormat: (value: "separate" | "combined") => void
  
  // Пункт 10: Мероприятия филиалов (массив)
  branchEvents: string[]
  setBranchEvents: (value: string[]) => void
  
  // Пункт 11: Межфракционные мероприятия (массив)
  interfactionEvents: string[]
  setInterfactionEvents: (value: string[]) => void
  
  // Пункт 12: Оценка старшего состава (массив)
  seniorEvaluation: string[]
  setSeniorEvaluation: (value: string[]) => void
  
  // Пункт 13: Генеральные построения (массив)
  lineups: string[]
  setLineups: (value: string[]) => void
}

export function LeaderReportFieldsNew(props: LeaderReportFieldsProps) {
  const addInterview = () => props.setInterviews([...props.interviews, ""])
  const removeInterview = (index: number) => props.setInterviews(props.interviews.filter((_, i) => i !== index))
  const updateInterview = (index: number, value: string) => {
    const newInterviews = [...props.interviews]
    newInterviews[index] = value
    props.setInterviews(newInterviews)
  }

  const addStaffChange = () => props.setStaffChanges([...props.staffChanges, ""])
  const removeStaffChange = (index: number) => props.setStaffChanges(props.staffChanges.filter((_, i) => i !== index))
  const updateStaffChange = (index: number, value: string) => {
    const newChanges = [...props.staffChanges]
    newChanges[index] = value
    props.setStaffChanges(newChanges)
  }

  const addReprimand = () => props.setReprimands([...props.reprimands, ""])
  const removeReprimand = (index: number) => props.setReprimands(props.reprimands.filter((_, i) => i !== index))
  const updateReprimand = (index: number, value: string) => {
    const newReprimands = [...props.reprimands]
    newReprimands[index] = value
    props.setReprimands(newReprimands)
  }

  const addLecture = () => props.setLectures([...props.lectures, { name: "", link: "" }])
  const removeLecture = (index: number) => props.setLectures(props.lectures.filter((_, i) => i !== index))
  const updateLecture = (index: number, field: "name" | "link", value: string) => {
    const newLectures = [...props.lectures]
    newLectures[index][field] = value
    props.setLectures(newLectures)
  }

  const addBranchEvent = () => props.setBranchEvents([...props.branchEvents, ""])
  const removeBranchEvent = (index: number) => props.setBranchEvents(props.branchEvents.filter((_, i) => i !== index))
  const updateBranchEvent = (index: number, value: string) => {
    const newEvents = [...props.branchEvents]
    newEvents[index] = value
    props.setBranchEvents(newEvents)
  }

  const addInterfactionEvent = () => props.setInterfactionEvents([...props.interfactionEvents, ""])
  const removeInterfactionEvent = (index: number) => props.setInterfactionEvents(props.interfactionEvents.filter((_, i) => i !== index))
  const updateInterfactionEvent = (index: number, value: string) => {
    const newEvents = [...props.interfactionEvents]
    newEvents[index] = value
    props.setInterfactionEvents(newEvents)
  }

  const addSeniorEval = () => props.setSeniorEvaluation([...props.seniorEvaluation, ""])
  const removeSeniorEval = (index: number) => props.setSeniorEvaluation(props.seniorEvaluation.filter((_, i) => i !== index))
  const updateSeniorEval = (index: number, value: string) => {
    const newEvals = [...props.seniorEvaluation]
    newEvals[index] = value
    props.setSeniorEvaluation(newEvals)
  }

  const addLineup = () => props.setLineups([...props.lineups, ""])
  const removeLineup = (index: number) => props.setLineups(props.lineups.filter((_, i) => i !== index))
  const updateLineup = (index: number, value: string) => {
    const newLineups = [...props.lineups]
    newLineups[index] = value
    props.setLineups(newLineups)
  }

  return (
    <div className="space-y-6">
      {/* Пункт 2: Собеседования */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          2) Количество и доказательства проведенных собеседований на сервере
        </Label>
        <div className="space-y-2">
          {props.interviews.map((interview, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={interview}
                onChange={(e) => updateInterview(index, e.target.value)}
                placeholder="Ссылка"
                className="bg-black/5 border-blue-400/30 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeInterview(index)}
                disabled={props.interviews.length === 1}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addInterview} variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Добавить ссылку
          </Button>
        </div>
      </div>

      {/* Пункт 3: Принятые/уволенные */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          3) Количество принятых, уволенных ПСЖ, уволенных с ОЧС сотрудников
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Кол-во уволенных ПСЖ</Label>
            <Input value={props.firedPSG} onChange={(e) => props.setFiredPSG(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Кол-во уволенных с ОЧС</Label>
            <Input value={props.firedOCHS} onChange={(e) => props.setFiredOCHS(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Общее кол-во уволенных</Label>
            <Input value={props.totalFired} onChange={(e) => props.setTotalFired(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Кол-во принятых</Label>
            <Input value={props.totalAccepted} onChange={(e) => props.setTotalAccepted(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
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
            <Input value={props.firstRanks} onChange={(e) => props.setFirstRanks(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Средний состав</Label>
            <Input value={props.middleStaff} onChange={(e) => props.setMiddleStaff(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Старший состав</Label>
            <Input value={props.seniorStaff} onChange={(e) => props.setSeniorStaff(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Руководящий состав (с учетом лидера)</Label>
            <Input value={props.managementStaff} onChange={(e) => props.setManagementStaff(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div className="col-span-2">
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Общее количество сотрудников</Label>
            <Input value={props.totalStaff} onChange={(e) => props.setTotalStaff(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
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
            <Input value={props.callsCount} onChange={(e) => props.setCallsCount(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Количество принятых</Label>
            <Input value={props.callsAccepted} onChange={(e) => props.setCallsAccepted(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
        </div>
      </div>

      {/* Пункт 6: Кадровые перестановки */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          6) Список кадровых перестановок в старшем составе
        </Label>
        <div className="space-y-2">
          {props.staffChanges.map((change, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={change}
                onChange={(e) => updateStaffChange(index, e.target.value)}
                placeholder="Nick_Name - повышен до..."
                className="bg-black/5 border-blue-400/30 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeStaffChange(index)}
                disabled={props.staffChanges.length === 1}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addStaffChange} variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Добавить перестановку
          </Button>
        </div>
      </div>

      {/* Пункт 7: Выговоры */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          7) Список выданных выговоров
        </Label>
        <div className="space-y-2">
          {props.reprimands.map((reprimand, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={reprimand}
                onChange={(e) => updateReprimand(index, e.target.value)}
                placeholder="Nick_Name - получает выговор за нарушение 4.8 ПСГО"
                className="bg-black/5 border-blue-400/30 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeReprimand(index)}
                disabled={props.reprimands.length === 1}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addReprimand} variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Добавить выговор
          </Button>
        </div>
      </div>

      {/* Пункт 8: Фонд неустоек */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          8) Фонд неустоек
        </Label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Получено</Label>
            <Input value={props.finesReceived} onChange={(e) => props.setFinesReceived(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Выплачено</Label>
            <Input value={props.finesPaid} onChange={(e) => props.setFinesPaid(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
          <div>
            <Label className="text-xs text-blue-300/80 mb-1.5 block">Остаток</Label>
            <Input value={props.finesBalance} onChange={(e) => props.setFinesBalance(e.target.value)} placeholder="0" className="bg-black/5 border-blue-400/30 text-white" />
          </div>
        </div>
      </div>

      {/* Пункт 9: Лекции с выбором формата */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          9) Список проведенных во фракции лекций, тренировок, RP мероприятий
        </Label>
        <RadioGroup value={props.lecturesFormat} onValueChange={(v) => props.setLecturesFormat(v as "separate" | "combined")} className="flex gap-4 mb-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="separate" id="separate" />
            <Label htmlFor="separate" className="text-sm text-blue-200/90 cursor-pointer">Название и ссылка отдельно</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="combined" id="combined" />
            <Label htmlFor="combined" className="text-sm text-blue-200/90 cursor-pointer">Вставить весь список (сплошмя)</Label>
          </div>
        </RadioGroup>
        {props.lecturesFormat === "separate" ? (
          <div className="space-y-2">
            {props.lectures.map((lecture, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={lecture.name}
                  onChange={(e) => updateLecture(index, "name", e.target.value)}
                  placeholder="Название"
                  className="bg-black/5 border-blue-400/30 text-white flex-1"
                />
                <Input
                  value={lecture.link}
                  onChange={(e) => updateLecture(index, "link", e.target.value)}
                  placeholder="Ссылка"
                  className="bg-black/5 border-blue-400/30 text-white flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLecture(index)}
                  disabled={props.lectures.length === 1}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addLecture} variant="outline" className="w-full border-dashed">
              <Plus className="h-4 w-4 mr-2" /> Добавить лекцию
            </Button>
          </div>
        ) : (
          <Textarea
            value={props.lectures[0]?.name || ""}
            onChange={(e) => updateLecture(0, "name", e.target.value)}
            placeholder="Вставьте весь список лекций (каждая с новой строки)&#10;Например:&#10;1. Лекция по тактике - https://example.com/1&#10;2. Тренировка по стрельбе - https://example.com/2"
            className="bg-black/5 border-blue-400/30 text-white min-h-[150px]"
            rows={8}
          />
        )}
      </div>

      {/* Пункт 10: Мероприятия филиалов */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          10) Мероприятия от всех филиалов организации
        </Label>
        <div className="space-y-2">
          {props.branchEvents.map((event, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={event}
                onChange={(e) => updateBranchEvent(index, e.target.value)}
                placeholder="Название - Ссылка"
                className="bg-black/5 border-blue-400/30 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeBranchEvent(index)}
                disabled={props.branchEvents.length === 1}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addBranchEvent} variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Добавить мероприятие
          </Button>
        </div>
      </div>

      {/* Пункт 11: Межфракционные мероприятия */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          11) Проведение двух межфракционных мероприятий (С непосредственным участием лидера)
        </Label>
        <div className="space-y-2">
          {props.interfactionEvents.map((event, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={event}
                onChange={(e) => updateInterfactionEvent(index, e.target.value)}
                placeholder="Название - Ссылка"
                className="bg-black/5 border-blue-400/30 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeInterfactionEvent(index)}
                disabled={props.interfactionEvents.length === 1}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addInterfactionEvent} variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Добавить мероприятие
          </Button>
        </div>
      </div>

      {/* Пункт 12: Оценка старшего состава */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          12) Краткая оценка работы каждого сотрудника старшего состава фракции
        </Label>
        <div className="space-y-2">
          {props.seniorEvaluation.map((evaluation, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={evaluation}
                onChange={(e) => updateSeniorEval(index, e.target.value)}
                placeholder="Nick_Name - 8/10 хорошая работа, претензий нет"
                className="bg-black/5 border-blue-400/30 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSeniorEval(index)}
                disabled={props.seniorEvaluation.length === 1}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addSeniorEval} variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Добавить оценку
          </Button>
        </div>
      </div>

      {/* Пункт 13: Генеральные построения */}
      <div>
        <Label className="text-sm font-medium text-blue-200/90 mb-2 block">
          13) Проведение генеральных построений
        </Label>
        <div className="space-y-2">
          {props.lineups.map((lineup, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={lineup}
                onChange={(e) => updateLineup(index, e.target.value)}
                placeholder="Ссылка"
                className="bg-black/5 border-blue-400/30 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLineup(index)}
                disabled={props.lineups.length === 1}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addLineup} variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Добавить ссылку
          </Button>
        </div>
      </div>
    </div>
  )
}
