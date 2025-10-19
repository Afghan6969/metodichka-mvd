"use client"

import { useState } from "react"
import { Copy, Check, Terminal, Search, X, Info, ExternalLink, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/copy-button"
import { PageHeader } from "@/components/page-header"

export function GuvdBindsPage() {
  const [copiedBind, setCopiedBind] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSections(newExpanded)
  }

  const getBindsWord = (count: number) => {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'биндов'
    }
    if (lastDigit === 1) {
      return 'бинд'
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'бинда'
    }
    return 'биндов'
  }

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
    <div className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-red-500/5 to-red-500/10 border-2 border-red-500/20 hover:border-red-500/40 hover:shadow-lg transition-all">
      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
        <Terminal className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <code className="block font-mono text-sm bg-card/80 text-foreground px-4 py-2 rounded-lg border border-border break-all">{bind}</code>
        {description && <p className="text-xs text-muted-foreground mt-2 italic">{description}</p>}
      </div>
      <div className="flex-shrink-0">
        <CopyButton text={bind} />
      </div>
    </div>
  )

  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px bg-white/20 flex-1" />
      <Badge variant="outline" className="border-blue-400/40 text-blue-300 bg-blue-500/10 text-xs font-medium px-3 py-1">
        {title}
      </Badge>
      <div className="h-px bg-white/20 flex-1" />
    </div>
  )

  const bindSections = [
    {
      title: "Представление",
      binds: [{ bind: 'bind [клавиша] say Звание, ГУВД по городу "Город", "Фамилия Имя.' }],
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
        { bind: "bind [клавиша] do В руке сотрудника папка с протоколами и ручкой.", description: "" },
        { bind: "bind [клавиша] me вытащил из папки бланк с рулеткой и оформил протокол задержания", description: "" },
        { bind: "bind [клавиша] me протянул протокол и ручку задержанному", description: "" },
        { bind: "bind [клавиша] say подпись поставьте", description: "" },
        { bind: "bind [клавиша] n /me поставил подпись", description: "" },
        { bind: "bind [клавиша] me оторвал копию протокола и передал её гражданину", description: "" },
        { bind: "bind [клавиша] do Конвоир взял протокол задержания и увел задержанного в КПЗ.", description: "" },
        { bind: "bind [клавиша] chatbox arrest", description: "" },
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
      title: "Передача данных по нарушителю (выдача розыска)",
      binds: [
        { bind: "bind [клавиша] do Рация закреплена на нагрудном кармане." },
        { bind: "bind [клавиша] me сняв рацию с нагрудного кармана, сообщил диспетчеру информацию по правонарушителю" },
        { bind: "bind [клавиша] chatbox su" },
      ],
    },
    {
      title: "Снятие обвинений (снятие розыска)",
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
    {
      title: "Проверка личности через боди-камеру и флешку",
      binds: [
        { bind: "bind [клавиша] do Боди-камера с флешкой закреплена на груди.", description: "" },
        { bind: "bind [клавиша] do Тактический планшет закреплён на поясе.", description: "" },
        { bind: "bind [клавиша] up me сняв боди-камеру с груди и тактический планшет с пояса, извлёк флешку и вставил в тактический планшет", description: "" },
        { bind: "bind [клавиша] do Запасная флешка в кармане.", description: "" },
        { bind: "bind [клавиша] me достав запасную флешку из кармана, вставил в боди-камеру", description: "" },
        { bind: "bind [клавиша] up me включил видео снятое на боди-камеру", description: "" },
        { bind: "bind [клавиша] me перемотал видео до момента, где видно лицо гражданина и сделал скриншот", description: "" },
        { bind: "bind [клавиша] me открыв базу данных МВД, пробил лицо гражданина по базе данных", description: "" },
        { bind: "bind [клавиша] up do Личность гражданина установлена.", description: "" },
      ],
    },
  ];
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
        icon={Terminal}
        title="Бинды ГУВД"
        description="Готовые команды для сотрудников ГУВД"      />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                <Search className="h-4 w-4 text-blue-300" />
              </div>
            </div>
            <Input
              type="text"
              placeholder="Поиск по биндам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 border-blue-400/30 bg-black/5 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {searchQuery && (
          <div className="text-center text-sm text-blue-200/80 mt-2">Найдено разделов: {filteredSections.length}</div>
        )}

        <div className="rounded-2xl border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-6 shadow-lg mt-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <Info className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase text-orange-600 dark:text-orange-500">⚠ Важные примечания</h2>
            </div>
          </div>
          <div className="space-y-3 text-sm text-foreground/80">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20">
              <Badge className="border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 text-xs mt-0.5 font-bold">
                UP
              </Badge>
              <p>Клавиши где присутствуют "up", нужно зажимать на 1-2 секунды, после того как отпустите - сработает отыгровка "up".</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20">
              <Badge className="border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950 text-xs mt-0.5 font-bold">
                Интервал
              </Badge>
              <p>Интервал между биндами - не менее двух секунд.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20">
              <Badge className="border-green-500 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950 text-xs mt-0.5 font-bold">
                Лимит
              </Badge>
              <p>На одну клавишу не более трёх отыгровок.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 mt-6">
          {filteredSections.length > 0 ? (
            filteredSections.map((section, sectionIndex) => {
              const isExpanded = expandedSections.has(sectionIndex)
              return (
              <div key={sectionIndex} className="rounded-xl border-2 border-red-500/20 bg-card overflow-hidden hover:border-red-500/40 transition-all">
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-500/10 to-red-500/5 hover:from-red-500/15 hover:to-red-500/10 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                      <Terminal className="h-4 w-4 text-red-500" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground text-left">{section.title}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">{section.binds.length} {getBindsWord(section.binds.length)}</Badge>
                    <ChevronDown className={`h-5 w-5 text-red-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 border-t-2 border-red-500/10">
                  <div className="space-y-3">
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
                        {section.title === "Проверка личности через боди-камеру и флешку" && (index === 2 || index === 5) && (
                          <SectionDivider title={index === 2 ? "Часть 2" : "Часть 3"} />
                        )}
                        {section.title === "Оформление ДТП" && (index === 2 || index === 4) && (
                          <SectionDivider title={index === 2 ? "Часть 2" : "Часть 3"} />
                        )}
                        {section.title === "Проверка тонировки" && index === 1 && (
                          <div className="bg-white/10 p-3 rounded-lg border border-white/20 mt-3">
                            <p className="text-sm text-blue-100/90">Проверка уровня тонировки через "TAB"</p>
                          </div>
                        )}
                        {section.title === "Мегафон: требование остановиться" && index === 2 && (
                          <div className="bg-white/10 p-3 rounded-lg border border-white/20 mt-3">
                            <p className="text-sm text-blue-100/90">
                              Перед применением меры наказания сотрудник должен быть уверен, что выдвинутое требование было
                              верно воспринято именно тем лицом, к которому оно адресовывалось.
                            </p>
                          </div>
                        )}
                        {section.title === "Посадка задержанного в служебный автомобиль" && index === 0 && (
                          <div className="bg-white/10 p-3 rounded-lg border border-white/20 mt-3">
                            <p className="text-sm text-blue-100/90">
                              При активном конвоировании (/arr), либо же после отыгровки сесть в автомобиль и прописать
                              /putpl id
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
              )
            })
          ) : (
            <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <Search className="h-10 w-10 text-blue-300" />
                </div>
                <p className="text-xl font-bold text-white mb-2">Бинды не найдены</p>
                <p className="text-blue-200/80">Попробуйте изменить поисковый запрос</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-6 group hover:bg-white/12 hover:border-white/25 transition-all duration-300 mt-16">
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
  )
}
