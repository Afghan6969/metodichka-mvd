"use client"

import { useState } from "react"
import { Copy, Check, Keyboard, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export function GuvdBindsPage() {
  const [copiedBind, setCopiedBind] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedBind(text)
      setTimeout(() => setCopiedBind(null), 2000)
    } catch (err) {
      console.error("Ошибка копирования:", err)
    }
  }

  const BindItem = ({ bind, description }: { bind: string; description?: string }) => (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border animate-fade-in">
      <div className="flex-1">
        <code className="text-sm font-mono text-foreground">{bind}</code>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(bind)} className="ml-2 h-8 w-8 p-0 btn-hover">
        {copiedBind === bind ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )

  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px bg-border flex-1" />
      <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
        {title}
      </Badge>
      <div className="h-px bg-border flex-1" />
    </div>
  )

  const bindSections = [
    {
      title: "Приветствие коллег",
      binds: [{ bind: 'bind [клавиша] say Звание, ГУВД по городу "Город", "Фамилия Имя.' }],
    },
    {
      title: "Предъявление служебного удостоверения",
      binds: [{ bind: "bind [клавиша] say Гражданин, предоставьте документ удостоверяющий вашу личность." }],
    },
    {
      title: "Изучение документов",
      binds: [
        { bind: "bind [клавиша] me изучает документы" },
        { bind: "bind [клавиша] do Личность гражданина установлена." },
      ],
    },
    {
      title: "Проверка через фото и КПК",
      binds: [
        { bind: "bind [клавиша] do Мини-фотоаппарат и КПК в кармане." },
        { bind: "bind [клавиша] me достав фотоаппарат и КПК, сфотографировал человека" },
        { bind: "bind [клавиша] up me открыл базу граждан на КПК, сверил сделанную фотографию с данными базы" },
      ],
    },
    {
      title: "Задержание и наручники гражданина в машине с открытой дверью",
      binds: [
        { bind: "bind [клавиша] me отстегнув ремень безопасности, высадил задержанного и надел на него наручники" },
        { bind: "bind [клавиша] chatbox cuff" },
      ],
    },
    {
      title: "Протокол задержания",
      binds: [
        { bind: "bind [клавиша] do В руке сотрудника папка с протоколами и ручкой." },
        { bind: "bind [клавиша] me вытащил из папки бланк с ручкой и оформил протокол задержания" },
        { bind: "bind [клавиша] me протянул протокол и ручку задержанному" },
        { bind: "bind [клавиша] say подпись поставьте" },
        { bind: "bind [клавиша] n /me поставил подпись" },
        { bind: "bind [клавиша] me оторвал копию протокола и передал её гражданину" },
        { bind: "bind [клавиша] do Конвоир взял протокол задержания и увел задержанного в КПЗ." },
        { bind: "bind [клавиша] chatbox arrest" },
      ],
    },
    {
      title: "Запрос на пробитие номера",
      binds: [
        { bind: "bind [клавиша] do На поясе закреплён тактический планшет." },
        {
          bind: "bind [клавиша] me сняв тактический планшет с пояса, сделал фотографию номеров и передал данные ГИБДД",
        },
        {
          bind: 'bind [клавиша] ro [ГУВД-Город]-[ГИБДД] Прошу проверить по базе данных номер "номер и регион транспорта".',
        },
      ],
    },
    {
      title: "Мегафон: требование остановиться",
      binds: [
        { bind: "bind [клавиша] do Мегафон закреплён на поясе." },
        { bind: "bind [клавиша] me сняв мегафон с пояса, крикнул в него" },
        { bind: "bind [клавиша] m Останавливаемся! В противном случае будут применены силовые меры!" },
      ],
    },
    {
      title: "Передача данных по нарушителю",
      binds: [
        { bind: "bind [клавиша] do Рация закреплена на нагрудном кармане." },
        { bind: "bind [клавиша] me сняв рацию с нагрудного кармана, продиктовал диспетчеру приметы правонарушителя" },
        { bind: "bind [клавиша] chatbox su" },
      ],
    },
    {
      title: "Снятие обвинений (Розыска)",
      binds: [
        { bind: "bind [клавиша] do Рация закреплена на нагрудном кармане." },
        { bind: "bind [клавиша] me сняв рацию с нагрудного кармана, запросил у диспетчера снятие обвинений" },
        { bind: "bind [клавиша] chatbox clear" },
      ],
    },
    {
      title: "Причина остановки граждан",
      binds: [
        { bind: "bind [клавиша] say Остановлены за нарушение законодательства." },
        { bind: "bind [клавиша] say Остановлены по подозрению на нарушение законодательства." },
      ],
    },
    {
      title: "Посадка задержанного в служебный автомобиль",
      binds: [
        { bind: "bind [клавиша] me посадив задержанного в служебный автомобиль, пристегнул ремнём безопасности" },
      ],
    },
    {
      title: "Штраф",
      binds: [
        { bind: "bind [клавиша] do КПК находится в кармане." },
        { bind: "bind [клавиша] me достав КПК из кармана, включил его и открыл базу данных" },
        { bind: 'bind [клавиша] up me введя данные гражданина, нажал на кнопку "Выписать штраф"' },
        { bind: 'bind [клавиша] do На экране надпись "Штраф успешно выписан".' },
        { bind: "bind [клавиша] chatbox tsu" },
        { bind: "bind [клавиша] me выслал СМС на номер телефона гражданина, копию протокола с подробной информацией" },
      ],
    },
    {
      title: "Разбитие стекла и доставание гражданина",
      binds: [
        { bind: "bind [клавиша] do Дубинка на поясе." },
        { bind: "bind [клавиша] me сняв дубинку с пояса ударил ею по стеклу и разбил его" },
        { bind: "bind [клавиша] up do Окно разбито." },
        { bind: "bind [клавиша] me просунув руку в салон открыл центральный замок автомобиля" },
        {
          bind: "bind [клавиша] me отстегнул ремень безопасности и вытащил преступника из автомобиля надев на него наручники",
        },
        { bind: "bind [клавиша] chatbox cuff" },
      ],
    },
    {
      title: "Список граждан в розыске",
      binds: [
        { bind: "bind [клавиша] do На поясе закреплён тактический планшет." },
        { bind: "bind [клавиша] me сняв тактический планшет с пояса, открыл базу данных федерального розыска" },
        { bind: "bind [клавиша] wanted" },
      ],
    },
  ]

  const filteredSections = bindSections
    .filter((section) => {
      if (!searchQuery.trim()) return true

      const query = searchQuery.toLowerCase()
      const titleMatch = section.title.toLowerCase().includes(query)
      const bindMatch = section.binds.some(
        (item) =>
          item.bind.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)),
      )

      return titleMatch || bindMatch
    })
    .map((section) => ({
      ...section,
      binds: section.binds.filter((item) => {
        if (!searchQuery.trim()) return true

        const query = searchQuery.toLowerCase()
        return (
          item.bind.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          section.title.toLowerCase().includes(query)
        )
      }),
    }))
    .filter((section) => section.binds.length > 0)

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-secondary/10 rounded-lg">
            <Keyboard className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-secondary">Бинды ГУВД</h1>
            <p className="text-muted-foreground">Готовые команды для сотрудников ГУВД</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск по биндам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-10 border-border focus:border-secondary focus:ring-secondary"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {searchQuery && (
        <div className="text-center text-sm text-muted-foreground">Найдено разделов: {filteredSections.length}</div>
      )}

      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-800">Важные примечания</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs">
              UP
            </Badge>
            <p className="text-sm text-yellow-800">
              Клавиши где присутствуют "up", нужно зажимать на 1-2 секунды, после того как отпустите - сработает
              отыгровка "up".
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs">
              Интервал
            </Badge>
            <p className="text-sm text-yellow-800">Интервал между биндами - не менее двух секунд.</p>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs">
              Лимит
            </Badge>
            <p className="text-sm text-yellow-800">На одну клавишу не более трёх отыгровок.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="content-card">
              <CardHeader>
                <CardTitle className="text-lg text-secondary">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.binds.map((item, index) => (
                  <div key={index}>
                    <BindItem bind={item.bind} description={item.description} />
                    {section.title === "Протокол задержания" && (index === 2 || index === 5) && (
                      <SectionDivider title={index === 2 ? "Часть 2" : "Часть 3"} />
                    )}
                    {section.title === "Штраф" && index === 2 && <SectionDivider title="Часть 2" />}
                    {section.title === "Разбитие стекла и доставание гражданина" && index === 2 && (
                      <SectionDivider title="Часть 2" />
                    )}
                    {section.title === "Запрос на пробитие номера" && index === 2 && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">Пример:</p>
                        <p className="text-sm text-blue-800 font-mono">
                          Капитан Poseidon_Wagner[1]: [ГУВД-П]-[ГИБДД] Прошу проверить по базе данных автомобильный
                          номер X222XX77.
                        </p>
                      </div>
                    )}
                    {section.title === "Мегафон: требование остановиться" && index === 2 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          Перед применением меры наказания сотрудник должен быть уверен, что выдвинутое требование было
                          верно воспринято именно тем лицом, к которому оно адресовывалось.
                        </p>
                      </div>
                    )}
                    {section.title === "Посадка задержанного в служебный автомобиль" && index === 0 && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          При активном конвоировании (/arr), либо же после отыгровки сесть в автомобиль и прописать
                          /putpl id
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="content-card">
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Ничего не найдено по запросу "{searchQuery}"</p>
              <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить поисковый запрос</p>
            </CardContent>
          </Card>
        )}
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Разработано{" "}
            <a
              href="https://vk.com/id503251431"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              Poseidon_Wagner
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
