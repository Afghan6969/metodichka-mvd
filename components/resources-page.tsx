"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, FileText, Scale, Shield, Users, AlertTriangle, Book, Camera } from "lucide-react"

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
    <div className="space-y-6 bg-background min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <ExternalLink className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Информационные ресурсы</h1>
          <p className="text-muted-foreground">
            Официальные документы и правила Республики Провинция для сотрудников МВД
          </p>
        </div>
      </div>

      {categories.map((category) => (
        <Card key={category} className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-card-foreground text-xl">{category}</CardTitle>
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
                    className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="text-primary group-hover:text-primary/80 transition-colors mt-1">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{resource.description}</p>
                      <div className="flex items-center gap-1 text-primary text-sm">
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

      <footer className="mt-16 pt-8 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Разработано{" "}
            <a
              href="https://vk.com/id503251431"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Poseidon_Wagner
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
