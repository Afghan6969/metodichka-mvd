"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CopyButton } from "./copy-button"
import { AlertCircle, ExternalLink, Shield, Radio } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { PageHeader } from "@/components/page-header"

const timeSlots = [
  "00:00-01:00",
  "01:30-02:30",
  "03:00-04:00",
  "04:30-05:30",
  "06:00-07:00",
  "07:30-08:30",
  "09:00-10:00",
  "10:30-11:30",
  "12:00-13:00",
  "13:30-14:30",
  "15:00-16:00",
  "16:30-17:30",
  "18:00-19:00",
  "19:30-20:30",
  "21:00-22:00",
  "22:30-23:30",
]

const cities = [
  { name: "Приволжск", tag: "П" },
  { name: "Мирный", tag: "М" },
  { name: "Невский", tag: "Н" },
]

export function GibddGovWavePage() {
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const { currentUser } = useAuth()

  if (!currentUser) {
    return (
      <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
        <div className="max-w-md mx-auto mt-16">
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-400/30">
                <Shield className="h-10 w-10 text-blue-300" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">ГИБДД - Учебный Батальон</h1>
              <p className="text-blue-200/80">Требуется авторизация</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                    <AlertCircle className="h-4 w-4 text-blue-300" />
                  </div>
                  <div className="text-sm text-blue-100/90">
                    Для доступа к гос волне ГИБДД необходимо войти в систему. Нажмите кнопку "Войти" в шапке сайта.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const generateMessages = (time: string, city: string) => {
    const [startTime, endTime] = time.split("-")
    const [startHour, startMinute] = startTime.split(":")

    // Добавляем 30 минут к времени начала для получения времени собеседования
    let interviewHour = Number.parseInt(startHour)
    let interviewMinute = Number.parseInt(startMinute) + 30

    if (interviewMinute >= 60) {
      interviewHour = (interviewHour + 1) % 24
      interviewMinute = interviewMinute - 60
    }

    const interviewTime = `${interviewHour.toString().padStart(2, "0")}:${interviewMinute.toString().padStart(2, "0")}`

    const cityData = cities.find((c) => c.name === city)
    const tag = cityData ? `ГИБДД-${cityData.tag}` : "ГИБДД-Н"

    return {
      announcement:
        `gov Уважаемые жители Республики Провинция! Сегодня в ${interviewTime} пройдет собеседование в Учебный Батальон ГИБДД г. ${city}.\\n` +
        `gov Требования к кандидатам: опрятный вид, юридическое образование, военный билет, медкарта, полный пакет документов и прописка от 5 лет.\\n` +
        `gov Собеседование пройдет в здании Полицейского участка г. ${city}. Мы ждем именно Вас!`,

      start:
        `gov Собеседование в Учебный Батальон ГИБДД г. ${city} начато!\\n` +
        `gov Требования к кандидатам: опрятный вид, юридическое образование, военный билет, медкарта, полный пакет документов и прописка от 5 лет.\\n` +
        `gov Собеседование проходит в здании Полицейского участка г. ${city}. Мы ждем именно Вас!`,

      continue:
        `gov Собеседование в Учебный Батальон ГИБДД г. ${city} продолжается!\\n` +
        `gov Требования к кандидатам: опрятный вид, юридическое образование, военный билет, медкарта, полный пакет документов и прописка от 5 лет.\\n` +
        `gov Собеседование проходит в здании Полицейского участка г. ${city}. Мы ждем именно Вас!`,

      end:
        `gov Собеседование в Учебный Батальон ГИБДД г. ${city} окончено.\\n` +
        `gov На государственном портале Республики открыты электронные заявления на трудоустройство в звании «Рядовой» и «Старшина».\\n` +
        `gov Если у вас уже есть опыт в ГИБДД, вы можете оставить электронное заявление на восстановление в звании и должности.`,
    }
  }

  const messages = selectedTime && selectedCity ? generateMessages(selectedTime, selectedCity) : null

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={Radio}
        title="Гос волна ГИБДД"
        description="Учебный батальон - генерация сообщений для собеседования"
      />

      <div className="flex justify-end mb-4">
        <a
          href="https://province.status-journal.com/gov"
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          Перейти на Гос Волну
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="max-w-4xl mx-auto">

        <div className="space-y-6">
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Настройки собеседования</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-3 text-blue-200/90">Время собеседования</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="h-12 border-blue-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/10 backdrop-blur-sm border-white/20">
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot} className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-blue-200/90">Город</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="h-12 border-blue-400/30 bg-black/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/10 backdrop-blur-sm border-white/20">
                      {cities.map((city) => (
                        <SelectItem key={city.name} value={city.name} className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Правила гос волны</h2>
            </div>
            <div className="p-6">
              <div className="text-sm text-blue-100/90 space-y-2">
                <p>• Сообщения государственной волны (/gov) видны всем игрокам на сервере.</p>
                <p>• Руководство по использованию государственной волны, а также расписание — закреплены в беседе VK — "Гос. волна".</p>
                <p>• Эфирное время расставляется на сайте.</p>
                <p>• В государственную волну запрещено писать что-либо, кроме новостей о предстоящих собеседованиях и мероприятиях организации.</p>
                <p>• Организация вправе занять государственную волну на час и не более с момента первых сообщений, заканчивая последними.</p>
                <p>• Интервал между подачей сообщений должен быть не менее 10-ти минут.</p>
                <p>• Интервал между строчками должен быть не менее 3-х секунд.</p>
                <p>• Максимальное количество строк — 4 (четыре).</p>
                <p>• Подача сообщений в государственную волну должна быть только от лица одного персонажа (за исключением непредвиденных обстоятельств).</p>
                <p>• Сообщения в государственную волну о мероприятиях должны сопровождаться тэгом — [МП].</p>
                <p>• При отмене запланированного собеседования/мероприятия лидер обязан отписать об отмене в беседу VK — "Гос. волна". Причина отмены должна быть обоснованной.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Правила проведения собеседования</h2>
            </div>
            <div className="p-6">
              <div className="text-sm text-blue-100/90 space-y-2">
                <p><span className="font-bold text-white">Собеседование проводится по следующему плану:</span></p>
                <p>• Получить информацию о предстоящем собеседовании можно через новостные источники, либо по факту приглашения кандидата через электронное заявление на государственном портале в разделе государственной организации.</p>
                <p>• Гражданин, заявивший, что он иностранец, не может служить/работать в государственной организации. Требуется гражданство Республики Провинция.</p>
                <p>• Знакомство с гражданином: уточнение Ф.И.О, возраста, образования, места проживания и т.д.</p>
                <p>• Изучение документов гражданина: предоставление паспорта, трудовой книжки, диплома и т.д.</p>
                <p>• Опрос знаний и проверка квалификации гражданина, если того требует будущая должность.</p>
                <p>• Дополнительные этапы, предусмотренные конкретной организацией. Например, более тщательное изучение биографии личности.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Требования к кандидатам</h2>
            </div>
            <div className="p-6">
              <div className="text-sm text-blue-100/90 space-y-2">
                <p>• Возраст от 18-ти до 40-ка лет включительно.</p>
                <p>• Опрятный внешний вид гражданина.</p>
                <p>• Не менее 5-ти лет проживания в Республике Провинция.</p>
                <p>• Наличие действующей медкарты.</p>
                <p>• Наличие военного билета, подтверждающего прохождение срочной службы.</p>
                <p>• Наличие юридического образования.</p>
                <p>• Наличие полного пакета документов.</p>
                <p>• Грамотность, адекватность, умение коммуницировать с гражданами.</p>
                <p>• Наличие водительских прав категории B.</p>
                <p>• Отсутствие гражданина в общем черном списке государственных организаций.</p>
                <p>• Отсутствие гражданина в базе федерального розыска.</p>
                <p>• Отсутствие у гражданина государственных штрафов.</p>
              </div>
            </div>
          </div>

          {messages && (
            <div className="space-y-4">
              <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Объявление (за 30 минут до начала)</h3>
                </div>
                <div className="p-6">
                  <div className="font-mono text-sm text-blue-100/90 leading-relaxed space-y-2">
                    {messages.announcement.split("\\n").map((line, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 bg-black/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition">
                        <span className="flex-1">{line}</span>
                        <CopyButton text={line} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Начало собеседования</h3>
                </div>
                <div className="p-6">
                  <div className="font-mono text-sm text-blue-100/90 leading-relaxed space-y-2">
                    {messages.start.split("\\n").map((line, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 bg-black/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition">
                        <span className="flex-1">{line}</span>
                        <CopyButton text={line} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Продолжение собеседования</h3>
                </div>
                <div className="p-6">
                  <div className="font-mono text-sm text-blue-100/90 leading-relaxed space-y-2">
                    {messages.continue.split("\\n").map((line, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 bg-black/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition">
                        <span className="flex-1">{line}</span>
                        <CopyButton text={line} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Окончание собеседования</h3>
                </div>
                <div className="p-6">
                  <div className="font-mono text-sm text-blue-100/90 leading-relaxed space-y-2">
                    {messages.end.split("\\n").map((line, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 bg-black/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition">
                        <span className="flex-1">{line}</span>
                        <CopyButton text={line} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Временная схема</h2>
            </div>
            <div className="p-6">
              <div className="text-sm text-blue-100/90 space-y-2">
                <p><span className="font-bold text-white">Пример для времени 00:00-01:00:</span></p>
                <p>• 00:00, 00:10, 00:20 - объявления о предстоящем собеседовании</p>
                <p>• 00:30 - объявление о начале собеседования</p>
                <p>• 00:40, 00:50 - продолжение собеседования</p>
                <p>• 01:00 - окончание собеседования</p>
              </div>
            </div>
          </div>

          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-6 group hover:bg-white/12 hover:border-white/25 transition-all duration-300">
            <div className="flex flex-col items-center justify-center gap-2 text-sm text-blue-100/90">
              <p className="font-medium">Разработано для МВД Республики Провинция (РП)</p>
              <div className="flex items-center gap-2">
                <span>Разработчик:</span>
                <a
                  href="https://vk.com/id503251431"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 font-medium transition-colors"
                >
                  Poseidon_Wagner
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
