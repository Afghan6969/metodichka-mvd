"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, FileText, Scale, Shield, Users, AlertTriangle, Book, Camera } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export function ResourcesPage() {
  const resources = [
    {
      title: "ПДД",
      description: "Правила дорожного движения Республики",
      url: "https://forum.gtaprovince.ru/topic/639262-pravila-dorozhnogo-dvizheniya-respubliki/",
      icon: <FileText className="h-6 w-6" />,
      category: "Законодательство",
    },
    {
      title: "КоАП РП",
      description: "Кодекс об административных правонарушениях Республики",
      url: "https://forum.gtaprovince.ru/topic/639260-kodeks-ob-administrativnyh-pravonarusheniyah-respubliki/",
      icon: <Scale className="h-6 w-6" />,
      category: "Законодательство",
    },
    {
      title: "УК РП",
      description: "Уголовный кодекс Республики",
      url: "https://forum.gtaprovince.ru/topic/639258-ugolovnyy-kodeks-respubliki/",
      icon: <Shield className="h-6 w-6" />,
      category: "Законодательство",
    },
    {
      title: "ПЛ",
      description: "Правила для лидеров государственных и преступных организаций",
      url: "https://forum.gtaprovince.ru/topic/678445-pravila-dlya-liderov-gosudarstvennyh-i-prestupnyh-organizaciy/",
      icon: <Users className="h-6 w-6" />,
      category: "Правила организаций",
    },
    {
      title: "ПСГО",
      description: "Правила для сотрудников государственных организаций",
      url: "https://forum.gtaprovince.ru/topic/203338-pravila-dlya-sotrudnikov-gos-organizaciy/",
      icon: <Users className="h-6 w-6" />,
      category: "Правила организаций",
    },
    {
      title: "ОЧС",
      description: "Общий чёрный список государственных организаций",
      url: "https://forum.gtaprovince.ru/topic/198851-obschiy-chernyy-spisok-gos-organizaciy/",
      icon: <AlertTriangle className="h-6 w-6" />,
      category: "Правила организаций",
    },
    {
      title: "ФЗоП",
      description: "Федеральный закон о полиции",
      url: "https://forum.gtaprovince.ru/topic/667273-federalnyy-zakon-o-policii/",
      icon: <Book className="h-6 w-6" />,
      category: "Специальные документы",
    },
    {
      title: "Устав Мотобата",
      description: "Устав подразделения Мотобата (ГИБДД)",
      url: "https://forum.gtaprovince.ru/topic/250027-podrazdelenie-motobat/",
      icon: <FileText className="h-6 w-6" />,
      category: "Специальные документы",
    },
    {
      title: "Устав ОМОН и СОБР",
      description: "Устав подразделений ОМОН и СОБР (ГУВД)",
      url: "https://forum.gtaprovince.ru/topic/234832-podrazdeleniya-omon-i-sobr/",
      icon: <Shield className="h-6 w-6" />,
      category: "Специальные документы",
    },
    {
      title: "Система обнаружения камерами",
      description: "Техническая документация по системе видеонаблюдения и обнаружения нарушений",
      url: "https://forum.gtaprovince.ru/topic/613563-sistema-obnaruzheniya-kamerami/",
      icon: <Camera className="h-6 w-6" />,
      category: "Специальные документы",
    },
  ]

  const categories = ["Законодательство", "Правила организаций", "Специальные документы"]

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={ExternalLink}
        title="Ресурсы МВД"
        description="Официальные документы и правила Республики Провинция"
        badge={`${resources.length} ресурсов`}
      />

      {categories.map((category) => (
        <Card key={category} className="military-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground text-2xl font-black uppercase tracking-wide">{category}</CardTitle>
            <CardDescription className="text-muted-foreground">Документы категории "{category}"</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources
                .filter((resource) => resource.category === category)
                .map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors mt-1">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{resource.description}</p>
                      <div className="flex items-center gap-1 text-blue-400 text-sm">
                        <span>Открыть на форуме</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}

    </div>
  )
}
