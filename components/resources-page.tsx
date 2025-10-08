"use client"

import React from "react"
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
        <div key={category} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-black uppercase tracking-wide text-white group-hover:text-blue-200 transition-colors">{category}</h2>
            <p className="text-blue-200/80 text-sm mt-1">Документы категории "{category}"</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {resources
                .filter((resource) => resource.category === category)
                .map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-200 group/link"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30 mt-1 group-hover/link:bg-blue-500/30 group-hover/link:border-blue-400/50 transition-all duration-200">
                      <div className="text-blue-300 group-hover/link:text-blue-200 transition-colors">
                        {React.cloneElement(resource.icon, { className: "h-5 w-5" })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover/link:text-blue-200 transition-colors mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-blue-100/90 text-sm leading-relaxed mb-3">{resource.description}</p>
                      <div className="flex items-center gap-2 text-blue-300 text-sm hover:text-blue-200 transition-colors">
                        <span className="font-medium">Открыть на форуме</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}
