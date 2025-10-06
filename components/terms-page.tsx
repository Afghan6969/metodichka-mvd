"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { BookOpen } from "lucide-react"
import { Footer } from "@/components/footer"

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
    <div className="space-y-6 bg-background min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Термины и определения</h1>
          <p className="text-muted-foreground">Основные понятия и определения для сотрудников МВД</p>
        </div>
      </div>

      <div className="mb-6">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Поиск терминов..."
        />
      </div>

      <div className="space-y-4">
        {filteredTerms.map((item, index) => (
          <Card key={index} className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-xl">{item.term}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{item.definition}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Термины не найдены по запросу "{searchQuery}"</p>
        </div>
      )}

      <Footer />
    </div>
  )
}
