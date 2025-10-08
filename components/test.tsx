"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, BookOpen } from "lucide-react"
import { PageHeader } from "@/components/page-header"

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

  const selectedPunishmentData = punishments.find((p) => p.name === selectedPunishment)
  const selectedData = selectedPunishmentData?.variants
    ? selectedPunishmentData.variants.find((v) => v.label === selectedVariant)
    : selectedPunishmentData

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={BookOpen}
        title="Примеры ситуаций"
        description="Типичные ситуации и порядок действий для новичков МВД"
        badge={`${punishments.length} ситуаций`}
      />

      <div className="max-w-4xl mx-auto">

        <div className="space-y-6">
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-black uppercase tracking-wide text-white">Выбор ситуации</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-3 text-blue-200/90">Выберите наказание</label>
                  <Select value={selectedPunishment} onValueChange={(value) => {
                    setSelectedPunishment(value)
                    setSelectedVariant("")
                  }}>
                    <SelectTrigger className="h-12 border-blue-400/30 bg-white/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                      <SelectValue placeholder="Выберите наказание" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/10 backdrop-blur-sm border-white/20">
                      {punishments.map((punishment) => (
                        <SelectItem key={punishment.name} value={punishment.name} className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">
                          {punishment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {selectedPunishment && selectedPunishmentData?.variants && (
            <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-black uppercase tracking-wide text-white">Выбор примера</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-blue-200/90">Выберите пример</label>
                    <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                      <SelectTrigger className="h-12 border-blue-400/30 bg-white/5 text-white hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                        <SelectValue placeholder="Выберите пример" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/10 backdrop-blur-sm border-white/20">
                        {selectedPunishmentData.variants.map((variant) => (
                          <SelectItem key={variant.label} value={variant.label} className="hover:bg-white/10 text-white focus:bg-blue-500/20 focus:text-blue-100">
                            {variant.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedData && (
            <div className="space-y-4">
              <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-black uppercase tracking-wide text-white">Порядок действий</h3>
                </div>
                <div className="p-6">
                  <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                    <div className="font-mono text-sm text-blue-100/90 leading-relaxed">
                      {selectedData.steps.split("\n").map((line, index) => {
                        const parts = line.split(' (см. ');
                        if (parts.length > 1) {
                          const main = parts[0];
                          const ref = ' (см. ' + parts[1];
                          return (
                            <div key={index} className="mb-2 last:mb-0">
                              {main}<span className="text-blue-200/60 text-xs">{ref}</span>
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
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-wide text-white">Важные уточнения</h2>
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
              <div
                key={index}
                className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                      <AlertCircle className="h-5 w-5 text-blue-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Важное уточнение №{index + 1}. {section.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-100/90 space-y-2">
                    {section.content.map((item, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
