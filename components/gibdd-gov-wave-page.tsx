
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CopyButton } from "./copy-button"
import { AlertCircle, ExternalLink, Shield, User } from "lucide-react"

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
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")

  const handlePasswordSubmit = () => {
    if (password === "gibdd2024") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Пароль неверный, обратитесь к руководству для получения доступа")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
        <div className="max-w-md mx-auto mt-16">
          <Card className="p-8 bg-card shadow-xl border-border rounded-2xl">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">ГИБДД - Учебный Батальон</h1>
              <p className="text-muted-foreground">Авторизованный доступ к системе</p>
            </div>

            <div className="space-y-6">
              {error && (
                <Alert variant="destructive" className="border-red-800 bg-red-900/50">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300 text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                    placeholder="Введите пароль доступа"
                    onKeyPress={(e) => e.key === "Enter" && handlePasswordSubmit()}
                    className="pl-12 h-14 text-base border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-700/50 rounded-xl bg-muted text-foreground placeholder-muted-foreground"
                  />
                </div>

                <Button
                  onClick={handlePasswordSubmit}
                  className="w-full h-14 text-base bg-primary hover:bg-primary/90 rounded-xl font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Войти в систему
                </Button>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Доступ предоставляется только авторизованному персоналу ГИБДД</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const generateMessages = (time: string, city: string) => {
    const [startTime, endTime] = time.split("-")
    const [startHour, startMinute] = startTime.split(":")

    let interviewHour = Number.parseInt(startHour)
    if (startMinute === "30") {
      interviewHour = (interviewHour + 1) % 24
    }
    const interviewTime = `${interviewHour.toString().padStart(2, "0")}:00`

    const cityData = cities.find((c) => c.name === city)
    const tag = cityData ? `ГИБДД-${cityData.tag}` : "ГИБДД-Н"

    return {
      announcement: 
        `gov Уважаемые жители республики Провинция! Сегодня в ${interviewTime} пройдет собеседование в Учебный Батальон в ГИБДД г. ${city}.\\n` +
        `gov Требования к кандидатам: опрятный вид, юридическое образование, военный билет, мед. карта, полный пакет документов и прописка от 5 лет.\\n` +
        `gov Собеседование пройдет в здании Полицейского участка г. ${city}. Мы ждем именно Вас!`,

      start: 
        `gov Собеседование в Учебный Батальон ГИБДД г. ${city} начато!\\n` +
        `gov Требования к кандидатам: опрятный вид, юридическое образование, военный билет, мед. карта, полный пакет документов и прописка от 5 лет.\\n` +
        `gov Собеседование проходит в здании Полицейского участка г. ${city}. Мы ждем именно Вас!`,

      continue: 
        `gov Собеседование в Учебный Батальон ГИБДД г. ${city} продолжается!\\n` +
        `gov Требования к кандидатам: опрятный вид, юридическое образование, военный билет, мед. карта, полный пакет документов и прописка от 5 лет.\\n` +
        `gov Собеседование проходит в здании Полицейского участка г. ${city}. Мы ждем именно Вас!`,

      end: 
        `gov Собеседование в Учебный Батальон ГИБДД г. ${city} окончено.\\n` +
        `gov На государственном портале республики открыты электронные заявления на трудоустройство в звании «Рядовой» и «Старшина».\\n` +
        `gov Если у вас уже есть опыт в ГИБДД, вы можете оставить электронное заявление на восстановление в звании и должности.`
    }
  }

  const messages = selectedTime && selectedCity ? generateMessages(selectedTime, selectedCity) : null

  return (
    <div className="flex-1 p-8 overflow-auto bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Гос волна ГИБДД - УБ (Учебный батальон)</h1>
          <a
            href="https://province.status-journal.com/gov"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-4 text-base bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            Перейти на Гос Волну
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Настройки собеседования</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Время собеседования</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="h-12 border-border bg-muted text-foreground focus:ring-blue-700/50">
                    <SelectValue placeholder="Выберите время" />
                  </SelectTrigger>
                  <SelectContent className="bg-muted text-foreground border-border">
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Город</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-12 border-border bg-muted text-foreground focus:ring-blue-700/50">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent className="bg-muted text-foreground border-border">
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-600 bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Правила гос волны</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Сообщения государственной волны (/gov) видны всем игрокам на сервере.</p>
              <p>• Руководство по использованию государственной волны, а также расписание — закреплены в беседе VK — "Гос. волна".</p>
              <p>• Эфирное время расставляется на сайте.</p>
              <p>• В государственную волну запрещено писать что-либо, кроме новостей о предстоящих собеседованиях и мероприятиях организации.</p>
              <p>• Организация вправе занять государственную волну на час и не более с момента первых сообщений, заканчивая последними.</p>
              <p>• Интервал между подачей сообщений должен быть не менее 10-ти минут.</p>
              <p>• Интервал между строчками должен быть не менее 3-х секунд.</p>
              <p>• Максимальное количество строк — 4 (четыре).</p>
              <p>
                • Подача сообщений в государственную волну должна быть только от лица одного персонажа (за исключением
                непредвиденных обстоятельств).
              </p>
              <p>• Сообщения в государственную волну о мероприятиях должны сопровождаться тэгом — [МП].</p>
              <p>
                • При отмене запланированного собеседования/мероприятия лидер обязан отписать об отмене в беседу VK —
                "Гос. волна". Причина отмены должна быть обоснованной.
              </p>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-600 bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Правила проведения собеседования</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Собеседование проводится по следующему плану:</strong>
              </p>
              <p>
                • Получить информацию о предстоящем собеседовании можно через новостные источники, либо по факту
                приглашения кандидата через электронное заявление на государственном портале в разделе государственной
                организации.
              </p>
              <p>
                • Гражданин, заявивший, что он иностранец, не может служить/работать в государственной организации.
                Требуется гражданство Республики Провинция.
              </p>
              <p>• Знакомство с гражданином: уточнение Ф.И.О, возраста, образования, места проживания и т.д.</p>
              <p>• Изучение документов гражданина: предоставление паспорта, трудовой книжки, диплома и т.д.</p>
              <p>• Опрос знаний и проверка квалификации гражданина, если того требует будущая должность.</p>
              <p>
                • Дополнительные этапы, предусмотренные конкретной организацией. Например, более тщательное изучение
                биографии личности.
              </p>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-600 bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Требования к кандидатам</h2>
            <div className="text-sm text-muted-foreground space-y-2">
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
          </Card>

          {messages && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Объявление (за 30 минут до начала)</h3>
                  <CopyButton text={messages.announcement} />
                </div>
                <div className="bg-muted p-4 rounded font-mono text-sm text-foreground">
                  {messages.announcement.split("\\n").map((line, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2 last:mb-0">
                      <div className="flex-1">{line}</div>
                      <CopyButton text={line} className="flex-shrink-0 mt-0.5" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Начало собеседования</h3>
                  <CopyButton text={messages.start} />
                </div>
                <div className="bg-muted p-4 rounded font-mono text-sm text-foreground">
                  {messages.start.split("\\n").map((line, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2 last:mb-0">
                      <div className="flex-1">{line}</div>
                      <CopyButton text={line} className="flex-shrink-0 mt-0.5" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Продолжение собеседования</h3>
                  <CopyButton text={messages.continue} />
                </div>
                <div className="bg-muted p-4 rounded font-mono text-sm text-foreground">
                  {messages.continue.split("\\n").map((line, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2 last:mb-0">
                      <div className="flex-1">{line}</div>
                      <CopyButton text={line} className="flex-shrink-0 mt-0.5" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Окончание собеседования</h3>
                  <CopyButton text={messages.end} />
                </div>
                <div className="bg-muted p-4 rounded font-mono text-sm text-foreground">
                  {messages.end.split("\\n").map((line, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2 last:mb-0">
                      <div className="flex-1">{line}</div>
                      <CopyButton text={line} className="flex-shrink-0 mt-0.5" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          <Card className="p-6 border-l-4 border-l-blue-600 bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Временная схема</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Пример для времени 00:00-01:00:</strong>
              </p>
              <p>• 00:00, 00:10, 00:20 - объявления о предстоящем собеседовании</p>
              <p>• 00:30 - объявление о начале собеседования</p>
              <p>• 00:40, 00:50 - продолжение собеседования</p>
              <p>• 01:00 - окончание собеседования</p>
            </div>
          </Card>

          <Card className="p-4 bg-muted border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-foreground">
              <span>Разработчик:</span>
              <a
                href="https://vk.com/id503251431"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
              >
                Poseidon_Wagner
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}