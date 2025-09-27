"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ExternalLink, AlertCircle, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const punishments = [
  {
    name: "Штраф",
    variants: [
      {
        label: "Нарушение общественного порядка (19.1 КоАП)",
        steps: 
          `1. Зафиксировать нарушение.\n` +
          `2. Остановка гражданина (см. Важное уточнение №3 ниже).\n` +
          `3. Представьтесь гражданину, назвав причину обращения.\n` +
          `4. Установка личности (см. Важное уточнение №2 ниже).\n` +
          `5. Составьте протокол о нарушении и кратко озвучьте причину.`
      },
      {
        label: "Проезд на красный свет (7.1 КоАП)",
        steps: 
          `1. Зафиксировать нарушение.\n` +
          `2. Остановка транспортного средства (см. Важное уточнение №3 ниже).\n` +
          `3. Ситуация с окном (см. Важное уточнение №1 ниже).\n` +
          `4. Представьтесь гражданину, назвав причину обращения.\n` +
          `5. Установка личности (см. Важное уточнение №2 ниже).\n` +
          `6. Составьте протокол о нарушении и кратко озвучьте причину.`
      },
    ]
  },
  {
    name: "Арест",
    variants: [
      {
        label: "Нахождение в федеральном розыске",
        steps: 
          `1. Представьтесь гражданину, назвав причину обращения.\n` +
          `2. Установка личности (см. Важное уточнение №2 ниже).\n` +
          `3. Проверка по базе данных причину розыска (/crimrec).\n` +
          `4. Задержать гражданина, назвав причину задержания.\n` +
          `5. Доставьте гражданина в ближайший полицейский участок.\n` +
          `6. Составьте протокол о задержании и передайте задержанного конвоиру.`
      },
      {
        label: "Явка с повинной (2.1 УК)",
        steps: 
          `1. Представьтесь гражданину.\n` +
          `2. Установка личности (см. Важное уточнение №2 ниже).\n` +
          `3. Проверка по базе данных причину розыска (/crimrec).\n` +
          `4. Сообщить гражданину о том, что он будет задержан.\n` +
          `5. Задержать гражданина, указав причину задержания: известную причину розыска или факт нахождения в федеральном розыске.\n` +
          `6. Перевыдача розыска по статье 2.1 УК с уменьшением количества звёзд розыска на 1 (или снятие розыска если не было).\n` +
          `7. Выдача штрафа задержанному в размере 20.000 рублей.\n` +
          `8. Составьте протокол о задержании и передайте задержанного конвоиру.`
      },
      {
        label: "Проникновение на охраняемый объект (6.8 УК)",
        steps: 
          `1. Зафиксировать нарушение.\n` +
          `2. Остановка гражданина (см. Важное уточнение №3 ниже).\n` +
          `3. Задержать гражданина.\n` +
          `4. Представьтесь гражданину, назвав причину задержания.\n` +
          `5. Установка личности (см. Важное уточнение №2 ниже).\n` +
          `6. Выдайте розыск.\n` +
          `7. Доставьте гражданина в ближайший полицейский участок.\n` +
          `8. Составьте протокол о задержании и передайте задержанного конвоиру.`
      },
    ]
  },
  {
    name: "Устное предупреждение",
    variants: [
      {
        label: "Попрошайничество (19.5 КоАП)",
        steps: 
          `1. Зафиксировать нарушение.\n` +
          `2. Подойти к гражданину (см. Важное уточнение №3 ниже).\n` +
          `3. Представьтесь гражданину, назвав причину обращения.\n` +
          `4. Объясните, какое правило нарушено.\n` +
          `5. Попросите гражданина прекратить нарушение.`
      },
    ]
  },
  {
    name: "Лишение прав",
    variants: [
      {
        label: "Гражданин остановился",
        steps: 
          `1. Зафиксировать нарушение.\n` +
          `2. Остановить транспортное средство (см. Важное уточнение №3 ниже).\n` +
          `3. Ситуация с окном (см. Важное уточнение №1 ниже).\n` +
          `4. Представьтесь гражданину, назвав причину обращения.\n` +
          `5. Установка личности (см. Важное уточнение №2 ниже).\n` +
          `6. Лишить прав гражданина, назвав краткую причину лишения прав.\n` +
          `7. (В случае дополнительных нарушений от гражданина - выдача розыска или штрафа. Штраф выписывается до лишения прав).`
      },
      {
        label: "Гражданин не останавливается",
        steps: 
          `1. Зафиксировать нарушение.\n` +
          `2. Желательно попробовать узнать личность гражданина (Например через гос. номер).\n` +
          `3. Остановить транспортное средство (см. Важное уточнение №3 ниже).\n` +
          `4. Осуществить остановку ТС любым возможным способом (см. Важное уточнение №4 ниже).\n` +
          `5. Подбежать к гражданину и лишить его прав, если гражданин в машине, то автомобиль должен быть на месте (Если личность установлена).\n` +
          `6. Вытащить гражданина из автомобиля, установить личность и лишить его прав (если личность не установлена).\n` +
          `7. Представьтесь гражданину, назвав причину лишения прав.\n` +
          `8. (В случае дополнительных нарушений от гражданина - выдача розыска или штрафа. Штраф выписывается до лишения прав).`
      },
    ]
  },
  {
    name: "Нападение на гражданского или полицейского",
    steps: 
      `1. Зафиксировать нарушение.\n` +
      `2. Открыть огонь по гражданину (Если гражданин не прекращает избиение) (см. Важное уточнение №4 ниже).\n` +
      `3. Задержать гражданина (Если гражданин прекратил избиение).\n` +
      `4. Представьтесь гражданину, назвав причину задержания.\n` +
      `5. Установка личности (см. Важное уточнение №2 ниже).\n` +
      `6. Выдайте розыск за совершённое преступление.\n` +
      `7. Доставьте гражданина в ближайший полицейский участок.\n` +
      `8. Составьте протокол о задержании и передайте задержанного конвоиру.`
  },
]

export default function GuvdExamplesPage() {
  const [selectedPunishment, setSelectedPunishment] = useState("")
  const [selectedVariant, setSelectedVariant] = useState("")
  const [openPunishment, setOpenPunishment] = useState(false)
  const [openVariant, setOpenVariant] = useState(false)

  const selectedPunishmentData = punishments.find((p) => p.name === selectedPunishment)
  const selectedData = selectedPunishmentData?.variants
    ? selectedPunishmentData.variants.find((v) => v.label === selectedVariant)
    : selectedPunishmentData

  return (
    <div className="flex-1 p-8 overflow-auto bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Примеры ситуаций и наказаний</h1>
          <p className="text-muted-foreground text-lg">
            Эта страница предназначена для новичков, чтобы ознакомиться с типичными ситуациями, с которыми могут столкнуться сотрудники МВД. Здесь представлены примеры действий в различных сценариях для лучшего понимания процессов.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Выбор ситуации/наказания</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Выберите наказание</label>
                <div className="relative w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPunishment}
                    className="w-full justify-between bg-transparent text-foreground border-border"
                    onClick={() => setOpenPunishment(!openPunishment)}
                  >
                    {selectedPunishment || "Выберите наказание..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                  {openPunishment && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-muted border border-border rounded-md shadow-lg">
                      <Command>
                        <CommandInput placeholder="Поиск наказания..." />
                        <CommandEmpty>Наказания не найдены.</CommandEmpty>
                        <CommandList className="max-h-[200px] overflow-y-auto">
                          <CommandGroup>
                            {punishments.map((punishment) => (
                              <CommandItem
                                key={punishment.name}
                                value={punishment.name}
                                onSelect={() => {
                                  setSelectedPunishment(punishment.name)
                                  setSelectedVariant("")
                                  setOpenPunishment(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedPunishment === punishment.name ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {punishment.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {selectedPunishment && selectedPunishmentData?.variants && (
            <Card className="p-6 border border-border bg-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">Выбор примера</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Выберите пример</label>
                  <div className="relative w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openVariant}
                      className="w-full justify-between bg-transparent text-foreground border-border"
                      onClick={() => setOpenVariant(!openVariant)}
                    >
                      {selectedVariant || "Выберите пример..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    {openVariant && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-muted border border-border rounded-md shadow-lg">
                        <Command>
                          <CommandInput placeholder="Поиск примера..." />
                          <CommandEmpty>Примеры не найдены.</CommandEmpty>
                          <CommandList className="max-h-[200px] overflow-y-auto">
                            <CommandGroup>
                              {selectedPunishmentData.variants.map((variant) => (
                                <CommandItem
                                  key={variant.label}
                                  value={variant.label}
                                  onSelect={() => {
                                    setSelectedVariant(variant.label)
                                    setOpenVariant(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedVariant === variant.label ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {variant.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {selectedData && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Правильный порядок действий</h3>
                <div className="bg-muted p-4 rounded font-mono text-sm text-foreground">
                  {selectedData.steps.split("\n").map((line, index) => {
                    const parts = line.split(' (см. ');
                    if (parts.length > 1) {
                      const main = parts[0];
                      const ref = ' (см. ' + parts[1];
                      return (
                        <div key={index} className="mb-2 last:mb-0">
                          {main}<span className="text-muted-foreground text-xs">{ref}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="mb-2 last:mb-0">
                          {line}
                        </div>
                      );
                    }
                  })}
                </div>
              </Card>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Важные уточнения</h2>
            {[
              {
                title: "Окно у ТС",
                content: [
                  `После остановки автомобиля используйте отыгровку <code className="bg-background px-1 rounded">/do Окно открыто?</code> и дождитесь ответа гражданина.`,
                  `Если автомобиль открыт, откройте дверь и продолжайте взаимодействие.`,
                  `Если гражданин разговаривает с сотрудником, но не отыграл открытие окна, окно считается открытым.`,
                ],
              },
              {
                title: "Установка личности",
                content: [
                  `Запросите у гражданина паспорт или другие документы, удостоверяющие личность (водительские права и т.д.).`,
                  `Если документов нет, используйте фотоаппарат и тактический планшет для установки личности.`,
                  `Важно - При установлении личности, сотрудник обязан снять с лица гражданина все аксессуары, закрывающие части его лица (подразумеваются только видимые аксессуары, любые другие, в т.ч. воображаемые, не являются предметами, влияющими на Role Play процесс).`,
                  `Установка личности через номера. В случае сотрудников ГУВД - произвести запрос сотрудникам ГИБДД.`,
                ],
              },
              {
                title: "Остановка граждан и ТС",
                content: [
                  `Перед применением меры наказания сотрудник должен быть уверен, что выдвинутое требование было верно воспринято именно тем лицом, к которому оно адресовывалось.`,
                  `Требования об остановке могут быть как в мегафон (/m), так и просто криком (/s).`,
                  `Перед применением специальных средств сотрудник полиции обязан предупредить лиц о своем намерении и предоставить им возможность для выполнения его законных требований.`,
                  `Сотрудник полиции имеет право не предупреждать о намерении применить специальные средства, если есть непосредственная угроза жизни и здоровья гражданина или сотрудника.`,
                ],
              },
              {
                title: "Применение силы и задержание",
                content: [
                  `Основные положения о применении огнестрельного оружия — пункты 5.10 и 5.12 ФЗоП.`,
                  `Сотрудник полиции может применять физическую силу, спецсредства и оружие в случаях, предусмотренных законом, минимизируя ущерб.`,
                  `При отсутствии спецсредств допустимо использовать подручные средства в состоянии обороны или при задержании.`,
                  `Перед применением спецсредств предупредите гражданина, кроме случаев угрозы жизни или здоровью.`,
                  `Огнестрельное оружие применяется при угрозе жизни, попытке завладения оружием, тяжком преступлении (2+ звезды розыска) с угрозой обществу, вооруженном сопротивлении или для остановки ТС после 3 минут погони.`,
                  `Запрещено применять оружие при скоплении граждан, если есть риск для посторонних.`,
                  `Допустимые маневры для остановки ТС: коробочка, слэм-маневр, пит-маневр, параллелинг.`,
                  `Проблесковые маячки и СГУ используются при погонях.`,
                ],
              },
            ].map((section, index) => (
              <Card
                key={index}
                className="relative p-6 bg-card border-2 border-l-4 border-l-blue-600 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.01] group"
              >
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-foreground">Важное уточнение №{index + 1}. {section.title}</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  {section.content.map((item, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </div>
              </Card>
            ))}
          </div>

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