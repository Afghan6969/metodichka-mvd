import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { toGenitiveCase, toInstrumentalCase, declineLeaderName } from "./utils"
import { Requirement, Department, ReportType } from "./types"
import { departmentAbbreviations, cityAbbreviations } from "./constants"

interface ReportData {
  city: string
  leaderFio: string
  fio: string
  position: string
  rank: string
  newRank?: string
  fromDate?: Date
  toDate?: Date
  requirements: Requirement[]
  points?: string
  violation?: string
  paymentLink?: string
  onlineStats?: string
  signature: string
  isVrio: boolean
  selectedCategory: string
  department: Department
  reportType: ReportType
  // Leader report fields
  interviews?: string[]
  firedPSG?: string
  firedOCHS?: string
  totalFired?: string
  totalAccepted?: string
  firstRanks?: string
  middleStaff?: string
  seniorStaff?: string
  managementStaff?: string
  totalStaff?: string
  callsCount?: string
  callsAccepted?: string
  staffChanges?: string[]
  reprimands?: string[]
  finesReceived?: string
  finesPaid?: string
  finesBalance?: string
  lectures?: Array<{ name: string; link: string }>
  lecturesFormat?: "separate" | "combined"
  branchEvents?: string[]
  interfactionEvents?: string[]
  seniorEvaluation?: string[]
  lineups?: string[]
}

export const generateReport = (data: ReportData): string => {
  const currentDate = format(new Date(), "dd.MM.yyyy", { locale: ru })
  const formattedFromDate = data.fromDate ? format(data.fromDate, "dd.MM.yyyy", { locale: ru }) : ""
  const formattedToDate = data.toDate ? format(data.toDate, "dd.MM.yyyy", { locale: ru }) : ""
  const displayPosition = toGenitiveCase(data.position, data.isVrio && data.reportType === "senior")
  const instrumentalPosition = toInstrumentalCase(data.position, data.isVrio && data.reportType === "senior")
  const deptAbbr = departmentAbbreviations[data.selectedCategory] || data.selectedCategory

  const leaderFioDative = declineLeaderName(data.leaderFio, "dative")
  const userFioGenitive = declineLeaderName(data.fio, "genitive")

  let reqList = ""
  if (data.department === "ГУВД") {
    reqList = data.requirements.map((r, i) => `${i + 1}. ${r.req} - ${r.link}`).join("\n")
  } else {
    reqList = data.requirements.map((r, i) => `${i + 1}. ${r.req} – ${r.quantity} – ${r.link}`).join("\n")
  }

  if (data.department === "ГУВД") {
    if (data.reportType === "promotion") {
      return `Начальнику ГУВД по г. ${data.city}
Генерал-майору ${leaderFioDative}
От ${displayPosition}, ${data.rank}
"${data.fio}"

Рапорт о проделанной работе.
Я, ${data.fio}, являющийся ${instrumentalPosition} подразделения ${deptAbbr}, находящийся в звании ${data.rank}, оставляю отчет о проделанной работе. В связи с выполнением мной всех необходимых нормативов и требований прошу повысить меня до звания ${data.newRank}.
С правилами подачи рапорта ознакомлен(-на).

К рапорту прикладываю необходимый объём работы:
${reqList}

Дата: ${currentDate}
Подпись: ${data.signature}`
    } else if (data.reportType === "reprimand") {
      return `Начальнику ГУВД по г. ${data.city}
Генерал-майору ${leaderFioDative}
От ${displayPosition}, ${data.rank}
"${userFioGenitive}"

Рапорт о проделанной работе.
Я, ${data.fio}, являющийся ${instrumentalPosition}, находящийся в звании ${data.rank}, оставляю отчет о проделанной работе. В связи с выполнением мной нормы работы прошу снять с меня письменное дисциплинарное взыскание в виде выговора.
С правилами подачи рапорта ознакомлен(-на).

К рапорту прикладываю необходимый объём работы:
${reqList}

Дата: ${currentDate}
Подпись: ${data.signature}`
    } else if (data.reportType === "senior") {
      return `Начальнику ГУВД по г. ${data.city}
Генерал-майору ${leaderFioDative}
От ${displayPosition}, ${data.rank}
"${userFioGenitive}"

Рапорт.
Я, ${data.rank} ${data.fio}, являющийся ${instrumentalPosition}, оставляю рапорт и докладываю Вам о проделанной мною работе в период с ${formattedFromDate} по ${formattedToDate}.

${reqList}

Ваша статистика онлайна за неделю: ${data.onlineStats}

Дата: ${currentDate}
Подпись: ${data.signature}`
    } else if (data.reportType === "leader") {
      const formatInterviews = data.interviews?.map((link, i) => `${i + 1}. ${link}`).join("\n") || ""
      const formatStaffChanges = data.staffChanges?.filter(c => c.trim()).join("\n") || "-"
      const formatReprimands = data.reprimands?.filter(r => r.trim()).join("\n") || "-"
      
      const formatLectures = data.lecturesFormat === "combined" 
        ? (data.lectures?.[0]?.name || "")
        : data.lectures?.map((lec, i) => `${i + 1}. ${lec.name} - ${lec.link}`).join("\n") || ""
      
      const formatBranchEvents = data.branchEvents?.map((event, i) => `${i + 1}. ${event}`).join("\n") || ""
      const formatInterfactionEvents = data.interfactionEvents?.map((event, i) => `${i + 1}. ${event}`).join("\n") || ""
      const formatSeniorEval = data.seniorEvaluation?.filter(e => e.trim()).join("\n") || ""
      const formatLineups = data.lineups?.map((link, i) => `${i + 1}. ${link}`).join("\n") || ""
      const citySuffix = cityAbbreviations[data.city] || ""
      const departmentWithCity = citySuffix ? `${data.department}-${citySuffix}` : data.department
      
      return `1) Отчет от лидера ${departmentWithCity} ${data.fio} в период с ${formattedFromDate} по ${formattedToDate}

2) Количество и доказательства проведенных собеседований на сервере.
${formatInterviews}

3) Количество принятых, уволенных ПСЖ, уволенных с ОЧС сотрудников во фракцию.
Кол-во уволенных ПСЖ - ${data.firedPSG || "0"}
Кол-во уволенных с ОЧС - ${data.firedOCHS || "0"}
Общее кол-во уволенных - ${data.totalFired || "0"}
Кол-во принятых - ${data.totalAccepted || "0"}

4) Количество сотрудников во фракции на момент сдачи отчета - первые ранги, младший состав, средний состав, старший состав, общее количество.
Первые ранги - ${data.firstRanks || "0"}
Средний состав - ${data.middleStaff || "0"}
Старший состав - ${data.seniorStaff || "0"}
Руководящий состав - ${data.managementStaff || "0"}, с учетом лидера
Общее количество сотрудников - ${data.totalStaff || "0"}

5) Количество проведенных обзвонов и принятых сотрудников в старший состав.
Количество обзвонов за неделю - ${data.callsCount || "0"}
Количество принятых - ${data.callsAccepted || "0"}

6) Список кадровых перестановок в старшем составе - никнеймы, отделы, повышения, понижения.
${formatStaffChanges}

7) Список выданных выговоров - никнеймы, причины, количество.
${formatReprimands}

8) Фонд неустоек - список полученных и выплаченных, остаток фонда на момент сдачи отчета.
Получено - ${data.finesReceived || "0"}
Выплачено - ${data.finesPaid || "0"}
Остаток - ${data.finesBalance || "0"}

9) Список проведенных во фракции лекций, тренировок, RP мероприятий и т.п.
${formatLectures}

10) Мероприятий от всех филиалов организации.
${formatBranchEvents}

11) Проведение двух межфракционных мероприятий. (С непосредственным участием лидера)
${formatInterfactionEvents}

12) Краткая оценка работы каждого сотрудника старшего состава фракции - заслуги, преуспевания, допущенные ошибки, намеренные нарушения.
${formatSeniorEval}

13) Проведение генеральных построений
${formatLineups}`
    }
  } else if (data.department === "ГИБДД") {
    if (data.reportType === "promotion") {
      return `Генералу Республики Провинция
Начальнику ГИБДД по городу ${data.city}
От ${displayPosition}, находящегося в звании ${data.rank}, ${data.fio}.

Я, ${data.fio}, являющийся ${instrumentalPosition}, докладываю о состоянии несения службы и выполненной мной работе за период с ${formattedFromDate} по ${formattedToDate} и прошу рассмотреть моё заявление о повышении в звании до ${data.newRank}. За указанный период мною был выполнен следующий объём работы, а также набрано соответствующее количество баллов: ${data.points}

${reqList}

Подпись: ${data.signature}
Дата: ${currentDate}`
    } else if (data.reportType === "reprimand") {
      return `Генералу Республики Провинция
Начальнику ГИБДД по городу ${data.city}
От ${displayPosition}, находящегося в звании ${data.rank}, ${userFioGenitive}.

Я, ${data.fio}, являющийся ${instrumentalPosition}, прошу Вас рассмотреть мой рапорт на аннулирование дисциплинарного взыскания в виде выговора, полученного за нарушение ${data.violation}. К рапорту прикладываю сведения о выполнении плана и количестве набранных баллов: ${data.points}

${reqList}

Также прикладываю подтверждение об оплате неустойки на счёт лидера – ${data.paymentLink}
Подпись: ${data.signature}
Дата: ${currentDate}`
    } else if (data.reportType === "senior") {
      return `Генералу Республики Провинция
Начальнику ГИБДД по городу ${data.city}
От ${displayPosition}, находящегося в звании ${data.rank}, ${userFioGenitive}.

Я, ${data.fio}, являющийся ${instrumentalPosition}, докладываю о состоянии несения службы и выполненной мной работе за промежуток времени с ${formattedFromDate} по ${formattedToDate}. За данный промежуток времени мною был выполнен следующий объём работ:

${reqList}

Дата: ${currentDate}
Подпись: ${data.signature}`
    } else if (data.reportType === "leader") {
      const formatInterviews = data.interviews?.map((link, i) => `${i + 1}. ${link}`).join("\n") || ""
      const formatStaffChanges = data.staffChanges?.filter(c => c.trim()).join("\n") || "-"
      const formatReprimands = data.reprimands?.filter(r => r.trim()).join("\n") || "-"
      
      const formatLectures = data.lecturesFormat === "combined" 
        ? (data.lectures?.[0]?.name || "")
        : data.lectures?.map((lec, i) => `${i + 1}. ${lec.name} - ${lec.link}`).join("\n") || ""
      
      const formatBranchEvents = data.branchEvents?.map((event, i) => `${i + 1}. ${event}`).join("\n") || ""
      const formatInterfactionEvents = data.interfactionEvents?.map((event, i) => `${i + 1}. ${event}`).join("\n") || ""
      const formatSeniorEval = data.seniorEvaluation?.filter(e => e.trim()).join("\n") || ""
      const formatLineups = data.lineups?.map((link, i) => `${i + 1}. ${link}`).join("\n") || ""
      const citySuffix = cityAbbreviations[data.city] || ""
      const departmentWithCity = citySuffix ? `${data.department}-${citySuffix}` : data.department
      
      return `1) Отчет от лидера ${departmentWithCity} ${data.fio} в период с ${formattedFromDate} по ${formattedToDate}

2) Количество и доказательства проведенных собеседований на сервере.
${formatInterviews}

3) Количество принятых, уволенных ПСЖ, уволенных с ОЧС сотрудников во фракцию.
Кол-во уволенных ПСЖ - ${data.firedPSG || "0"}
Кол-во уволенных с ОЧС - ${data.firedOCHS || "0"}
Общее кол-во уволенных - ${data.totalFired || "0"}
Кол-во принятых - ${data.totalAccepted || "0"}

4) Количество сотрудников во фракции на момент сдачи отчета - первые ранги, младший состав, средний состав, старший состав, общее количество.
Первые ранги - ${data.firstRanks || "0"}
Средний состав - ${data.middleStaff || "0"}
Старший состав - ${data.seniorStaff || "0"}
Руководящий состав - ${data.managementStaff || "0"}, с учетом лидера
Общее количество сотрудников - ${data.totalStaff || "0"}

5) Количество проведенных обзвонов и принятых сотрудников в старший состав.
Количество обзвонов за неделю - ${data.callsCount || "0"}
Количество принятых - ${data.callsAccepted || "0"}

6) Список кадровых перестановок в старшем составе - никнеймы, отделы, повышения, понижения.
${formatStaffChanges}

7) Список выданных выговоров - никнеймы, причины, количество.
${formatReprimands}

8) Фонд неустоек - список полученных и выплаченных, остаток фонда на момент сдачи отчета.
Получено - ${data.finesReceived || "0"}
Выплачено - ${data.finesPaid || "0"}
Остаток - ${data.finesBalance || "0"}

9) Список проведенных во фракции лекций, тренировок, RP мероприятий и т.п.
${formatLectures}

10) Мероприятий от всех филиалов организации.
${formatBranchEvents}

11) Проведение двух межфракционных мероприятий. (С непосредственным участием лидера)
${formatInterfactionEvents}

12) Краткая оценка работы каждого сотрудника старшего состава фракции - заслуги, преуспевания, допущенные ошибки, намеренные нарушения.
${formatSeniorEval}

13) Проведение генеральных построений
${formatLineups}`
    }
  }

  return ""
}
