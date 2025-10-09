"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export function TermsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const terms = [
    {
      term: "ГИБДД",
      definition:
        "Государственная инспекция безопасности дорожного движения - подразделение МВД Республики Провинция (РП), осуществляющее контроль и надзор за соблюдением участниками дорожного движения требований в области обеспечения безопасности дорожного движения.",
    },
    {
      term: "ГУВД",
      definition:
        "Главное управление внутренних дел - территориальный орган МВД Республики Провинция (РП), осуществляющий руководство деятельностью органов внутренних дел на территории субъекта.",
    },
    {
      term: "ДПС",
      definition:
        "Дорожно-патрульная служба - подразделение ГИБДД, осуществляющее патрулирование автомобильных дорог и контроль за соблюдением правил дорожного движения.",
    },
    {
      term: "КоАП РП",
      definition:
        "Кодекс Республики Провинция об административных правонарушениях - основной нормативный акт, регулирующий применение мер административной ответственности.",
    },
    {
      term: "УК РП",
      definition:
        "Уголовный кодекс Республики Провинция - основной нормативный акт, определяющий преступность и наказуемость деяний на территории РП.",
    },
    {
      term: "Протокол",
      definition:
        "Процессуальный документ, составляемый уполномоченным должностным лицом о совершении административного правонарушения.",
    },
    {
      term: "Задержание",
      definition:
        "Кратковременное ограничение свободы физического лица, применяемое в случаях и порядке, установленных законом.",
    },
    {
      term: "Доставление",
      definition:
        "Принудительное препровождение физического лица в целях составления протокола об административном правонарушении при невозможности его составления на месте выявления административного правонарушения.",
    },
    {
      term: "Освидетельствование",
      definition:
        "Процедура определения состояния опьянения, проводимая с использованием технических средств измерений.",
    },
    {
      term: "Медицинское освидетельствование",
      definition:
        "Процедура, проводимая в медицинской организации для установления факта употребления вызывающих опьянение веществ и их вида.",
    },
    {
      term: "Спецсредства",
      definition:
        "Специальные средства - технические средства, разрешенные к применению сотрудниками органов внутренних дел для выполнения возложенных на них обязанностей.",
    },
    {
      term: "Огнестрельное оружие",
      definition:
        "Оружие, предназначенное для механического поражения цели на расстоянии снарядом, получающим направленное движение за счет энергии порохового или иного заряда.",
    },
    {
      term: "Субординация",
      definition: "Система служебного подчинения младших старшим, основанная на правилах служебной дисциплины.",
    },
    {
      term: "Рапорт",
      definition: "Письменное донесение подчиненного начальнику по вопросам службы.",
    },
    {
      term: "Патрулирование",
      definition:
        "Способ несения службы, заключающийся в движении по определенному маршруту с целью обеспечения общественного порядка и безопасности.",
    },
    {
      term: "Пост",
      definition:
        "Определенное место (участок местности, помещение), на котором размещается наряд для выполнения поставленных задач.",
    },
    {
      term: "Маршрут патрулирования",
      definition: "Определенный путь движения патрульного наряда на закрепленном участке.",
    },
  ]

  const filteredTerms = terms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={BookOpen}
        title="Термины МВД"
        description="Основные понятия и определения для сотрудников МВД"
        badge={`${filteredTerms.length} терминов`}
      />

      {/* Search */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
            <Search className="h-4 w-4 text-blue-300" />
          </div>
        </div>
        <Input
          type="text"
          placeholder="Поиск терминов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-base border-2 border-blue-400/30 rounded-xl bg-black/5 backdrop-blur-sm font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder:text-blue-200/60"
        />
      </div>

      <div className="space-y-4">
        {filteredTerms.map((item, index) => (
          <div key={index} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-black uppercase tracking-wide mb-3 text-white group-hover:text-blue-200 transition-colors">{item.term}</h3>
              <p className="text-blue-100/90 leading-relaxed">{item.definition}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && searchQuery && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Search className="h-10 w-10 text-blue-300" />
          </div>
          <p className="text-xl font-bold text-white mb-2">Термины не найдены</p>
          <p className="text-blue-200/80">Попробуйте изменить поисковый запрос</p>
        </div>
      )}
    </div>
  )
}
