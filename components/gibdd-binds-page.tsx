"use client"

import { useState } from "react"
import { Copy, Check, Keyboard, Search, X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/copy-button"
import { PageHeader } from "@/components/page-header"

export function GibddBindsPage() {
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
    <div className="flex items-start gap-4 p-3 rounded-lg border border-border bg-muted shadow-sm hover:bg-gray-700/50 transition-all duration-200">
      <div className="text-blue-400 mt-1">
        <Keyboard className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <code className="font-mono text-sm text-foreground">{bind}</code>
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      <CopyButton text={bind} className="flex-shrink-0 mt-3" />
    </div>
  )

  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px bg-border flex-1" />
      <Badge variant="secondary" className="text-xs font-medium px-3 py-1 bg-muted text-foreground">
        {title}
      </Badge>
      <div className="h-px bg-border flex-1" />
    </div>
  )

  const bindSections = [
    {
      title: "Представление",
      binds: [{ bind: 'bind [клавиша] say Звание, ГИБДД по городу "Город", "Фамилия Имя.' }],
    },
    {
      title: "Требование предоставить документы",
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
      title: "Проверка личности через фото и КПК",
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
        { bind: "bind [клавиша] me вытащил из папки бланк с рулеткой и оформил протокол задержания" },
        { bind: "bind [клавиша] me протянул протокол и ручку задержанному" },
        { bind: "bind [клавиша] say подпись поставьте" },
        { bind: "bind [клавиша] n /me поставил подпись" },
        { bind: "bind [клавиша] me оторвал копию протокола и передал её гражданину" },
        { bind: "bind [клавиша] do Конвоир взял протокол задержания и увел задержанного в КПЗ." },
        { bind: "bind [клавиша] chatbox arrest" },
      ],
    },
    {
      title: "Лишение водительского удостоверения",
      binds: [
        { bind: "bind [клавиша] do На поясе закреплён тактический планшет." },
        { bind: "bind [клавиша] me сняв тактический планшет с пояса, аннулировал водительское удостоверение" },
        { bind: "bind [клавиша] chatbox takecarlic" },
      ],
    },
    {
      title: "Проверка транспортных номеров",
      binds: [
        { bind: "bind [клавиша] do На поясе закреплён тактический планшет." },
        { bind: "bind [клавиша] me сняв тактический планшет с пояса, проверил номера по базе данных" },
        { bind: "bind [клавиша] chatbox findcar" },
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
    {
      title: "Список автомобилей в розыске",
      binds: [
        { bind: "bind [клавиша] do На поясе закреплён тактический планшет." },
        { bind: "bind [клавиша] me сняв тактический планшет с пояса, открыл базу данных автомобилей в розыске" },
        { bind: "bind [клавиша] wcar" },
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
      title: "Проверка тонировки",
      binds: [
        { bind: "bind [клавиша] do Тауметр в кармане." },
        { bind: "bind [клавиша] me достав тауметр из кармана, сделал замер светопропускаемости стекла" },
        {
          bind: "bind [клавиша] do Прибор показал, что уровень тонировки выше допустимого по ГОСТу.",
          description: "Если тонировка более 31%",
        },
        { bind: "bind [клавиша] do Прибор показал, что светопропускаемость в норме." },
      ],
    },
    {
      title: "Передача данных по нарушителю (выдача розыска)",
      binds: [
        { bind: "bind [клавиша] do Рация закреплена на нагрудном кармане." },
        { bind: "bind [клавиша] me сняв рацию с нагрудного кармана, сообщил диспетчеру информацию по правонарушителю" },
        { bind: "bind [клавиша] chatbox su" },
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
      title: "Оформление ДТП",
      binds: [
        { bind: "bind [клавиша] do На торпеде находится бланк с рулеткой." },
        { bind: "bind [клавиша] me взяв бланк осмотра места ДТП и зарисовал схему ДТП" },
        { bind: "bind [клавиша] up do Бланк осмотра места ДТП с зафиксированной схемой ДТП в руках." },
        { bind: "bind [клавиша] me сделал на схеме пометки и положил бланк на торпеду" },
        { bind: "bind [клавиша] me взяв на торпеде рулетку и сделал замеры" },
        { bind: "bind [клавиша] me нанес на схему значения, измеренные рулеткой, сделал выводы" },
        { bind: "bind [клавиша] me закончив заполнять схему ДТП, положил её на торпеду" },
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
        const bindMatch = item.bind.toLowerCase().includes(query)
        const descMatch = item.description && item.description.toLowerCase().includes(query)
        const titleMatch = section.title.toLowerCase().includes(query)

        return bindMatch || descMatch || titleMatch
      }),
    }))
    .filter((section) => section.binds.length > 0)

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={Keyboard}
        title="Бинды ГИБДД"
        description="Готовые команды для сотрудников ГИБДД"
        badge={`${bindSections.reduce((sum, s) => sum + s.binds.length, 0)} биндов`}
      />

      <div className="max-w-4xl mx-auto">

      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск по биндам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-10 border-border bg-muted text-foreground focus:border-blue-500 focus:ring-blue-700/50 placeholder-muted-foreground"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>

      {searchQuery && (
        <div className="text-center text-sm text-muted-foreground">Найдено разделов: {filteredSections.length}</div>
      )}

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-400" />
            Важные примечания
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground text-sm">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs border-border text-foreground">
              UP
            </Badge>
            <p>
              Клавиши где присутствуют "up", нужно зажимать на 1-2 секунды, после того как отпустите - сработает
              отыгровка "up".
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs border-border text-foreground">
              Интервал
            </Badge>
            <p>Интервал между биндами - не менее двух секунд.</p>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs border-border text-foreground">
              Лимит
            </Badge>
            <p>На одну клавишу не более трёх отыгровок.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">{section.title}</CardTitle>
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
                    {section.title === "Оформление ДТП" && (index === 2 || index === 4) && (
                      <SectionDivider title={index === 2 ? "Часть 2" : "Часть 3"} />
                    )}
                    {section.title === "Проверка тонировки" && index === 1 && (
                      <div className="p-1 bg-muted border border-border rounded-lg">
                        <p className="text-sm text-foreground">Проверка уровня тонировки через "TAB"</p>
                      </div>
                    )}
                    {section.title === "Мегафон: требование остановиться" && index === 2 && (
                      <div className="p-1 bg-muted border border-border rounded-lg">
                        <p className="text-sm text-foreground">
                          Перед применением меры наказания сотрудник должен быть уверен, что выдвинутое требование было
                          верно воспринято именно тем лицом, к которому оно адресовывалось.
                        </p>
                      </div>
                    )}
                    {section.title === "Посадка задержанного в служебный автомобиль" && index === 0 && (
                      <div className="p-1 bg-muted border border-border rounded-lg">
                        <p className="text-sm text-foreground">
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
          <Card className="border-border bg-card">
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Ничего не найдено по запросу "{searchQuery}"</p>
              <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить поисковый запрос</p>
            </CardContent>
          </Card>
        )}
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Разработано для МВД Республики Провинция (РП)
          </p>
          <p className="text-sm text-muted-foreground">
            Разработчик:{" "}
            <a
              href="https://vk.com/id503251431"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Poseidon_Wagner
            </a>
          </p>
        </div>
      </footer>
      </div>
    </div>
  )
}
