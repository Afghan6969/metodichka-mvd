"use client"

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
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ExternalLink className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Информационные ресурсы</h1>
        </div>

        <p className="text-gray-600 mb-8">Официальные документы и правила Республики Провинция для сотрудников МВД</p>

        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {resources
                .filter((resource) => resource.category === category)
                .map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-blue-600 group-hover:text-blue-700 transition-colors">{resource.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
                        <div className="flex items-center gap-1 mt-3 text-blue-600 text-sm">
                          <span>Открыть на форуме</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
