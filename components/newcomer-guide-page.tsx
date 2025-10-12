"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, BookOpen, Users, Shield, CheckCircle, Star, ArrowRight, ExternalLink, Car, Radio, FileText, Terminal, Heart, UserPlus } from "lucide-react"
import { PageHeader } from "@/components/page-header"

interface NewcomerGuidePageProps {
  onPageChange?: (page:
    | "contents"
    | "newcomer-guide"
    | "medical-aid"
    | "lectures"
    | "training"
    | "reports"
    | "commands"
    | "ammunition"
    | "terms"
    | "resources"
    | "penalty-calculator"
    | "gibdd-positions"
    | "guvd-positions"
    | "guvd-vehicles"
    | "gibdd-vehicles"
    | "guvd-gov-wave"
    | "gibdd-gov-wave"
    | "gibdd-binds"
    | "guvd-binds"
    | "test"
    | "generator-page"
    | "user-management"
  ) => void
}

export function NewcomerGuidePage({ onPageChange }: NewcomerGuidePageProps) {
  const steps = [
    {
      title: "Ознакомьтесь с основными документами",
      description: "Ознакомьтесь с основными документами, регулирующими деятельность МВД. Разберитесь с уставами и правилами организации, чтобы понимать структуру и обязанности сотрудников.",
      icon: BookOpen,
      color: "bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border-blue-500/30 text-blue-700 dark:text-blue-300",
      bgGradient: "from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10",
      details: ["Законодательство (УК РП, КоАП РП)", "Правила организации (ПСГО, ОЧС)", "Специальные документы (ФЗоП, уставы подразделений)"],
      link: "resources" as const,
      linkText: "Перейти к ресурсам"
    },
    {
      title: "Изучите амуницию и транспорт",
      description: "Изучите, какая амуниция, экипировка и служебный транспорт доступны сотрудникам разных подразделений и званий. Узнайте, что и когда вы можете использовать при выполнении служебных задач.",
      icon: Users,
      color: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
      bgGradient: "from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10",
      details: [
        "Амуниция по рангу",
        "Дополнительное оснащение",
        "Служебный транспорт"
      ],
      links: [
        { text: "Амуниция", link: "ammunition" as const },
        { text: "Транспорт ГУВД", link: "guvd-vehicles" as const },
        { text: "Транспорт ГИБДД", link: "gibdd-vehicles" as const }
      ]
    },
    {
      title: "Настройте бинды",
      description: "Настройте бинды и горячие клавиши для удобной и быстрой работы. Это поможет действовать оперативно в служебных ситуациях.",
      icon: Shield,
      color: "bg-gradient-to-br from-purple-500/20 to-violet-600/20 border-purple-500/30 text-purple-700 dark:text-purple-300",
      bgGradient: "from-purple-50/50 to-violet-50/30 dark:from-purple-950/20 dark:to-violet-950/10",
      details: [
        "Горячие клавиши ГУВД и ГИБДД",
        "Полезные бинды для работы"
      ],
      links: [
        { text: "Бинды ГУВД", link: "guvd-binds" as const },
        { text: "Бинды ГИБДД", link: "gibdd-binds" as const }
      ]
    },
    {
      title: "Ознакомьтесь с примерами",
      description: "Изучите примеры служебных ситуаций и типовых действий. Это поможет понять, как правильно реагировать в разных обстоятельствах.",
      icon: CheckCircle,
      color: "bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500/30 text-amber-700 dark:text-amber-300",
      bgGradient: "from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10",
      details: [
        "Сценарии служебных ситуаций",
        "Примеры действий сотрудников"
      ],
      link: "test" as const,
      linkText: "Перейти к примерам ситуаций"
    }
  ]

  const quickTips = [
    "Всегда следуйте цепочке командования",
    "Соблюдайте дисциплину и профессионализм",
    "Задавайте вопросы старшим коллегам",
    "Следите за обновлениями в регламенте"
  ]

  const recommendedSections = [
    {
      title: "Генератор отчётов",
      description: "Создание рапортов и отчётов для МВД",
      link: "generator-page" as const,
      icon: FileText,
      gradient: "from-amber-500/20 to-orange-600/20",
      borderGradient: "border-amber-500/30",
      textColor: "text-amber-700 dark:text-amber-300",
      bgGradient: "from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10",
      badge: "Инструмент"
    },
    {
      title: "Калькулятор штрафов",
      description: "Расчёт штрафов по КоАП и УК РП",
      link: "penalty-calculator" as const,
      icon: CheckCircle,
      gradient: "from-cyan-500/20 to-sky-600/20",
      borderGradient: "border-cyan-500/30",
      textColor: "text-cyan-700 dark:text-cyan-300",
      bgGradient: "from-cyan-50/50 to-sky-50/30 dark:from-cyan-950/20 dark:to-sky-950/10",
      badge: "Инструмент"
    },
    {
      title: "Должности ГУВД",
      description: "Карьерный рост и структура ГУВД",
      link: "guvd-positions" as const,
      icon: Shield,
      gradient: "from-purple-500/20 to-violet-600/20",
      borderGradient: "border-purple-500/30",
      textColor: "text-purple-700 dark:text-purple-300",
      bgGradient: "from-purple-50/50 to-violet-50/30 dark:from-purple-950/20 dark:to-violet-950/10"
    },
    {
      title: "Должности ГИБДД",
      description: "Карьерный рост и структура ГИБДД",
      link: "gibdd-positions" as const,
      icon: Car,
      gradient: "from-blue-500/20 to-cyan-600/20",
      borderGradient: "border-blue-500/30",
      textColor: "text-blue-700 dark:text-blue-300",
      bgGradient: "from-blue-50/50 to-cyan-50/30 dark:from-blue-950/20 dark:to-cyan-950/10"
    },
    {
      title: "Оказание ПМП",
      description: "Первая медицинская помощь и отыгровки",
      link: "medical-aid" as const,
      icon: Heart,
      gradient: "from-red-500/20 to-rose-600/20",
      borderGradient: "border-red-500/30",
      textColor: "text-red-700 dark:text-red-300",
      bgGradient: "from-red-50/50 to-rose-50/30 dark:from-red-950/20 dark:to-rose-950/10",
      badge: "Важно"
    },
    {
      title: "Термины МВД",
      description: "Профессиональный сленг и аббревиатуры",
      link: "terms" as const,
      icon: BookOpen,
      gradient: "from-violet-500/20 to-purple-600/20",
      borderGradient: "border-violet-500/30",
      textColor: "text-violet-700 dark:text-violet-300",
      bgGradient: "from-violet-50/50 to-purple-50/30 dark:from-violet-950/20 dark:to-purple-950/10"
    },
    {
      title: "Команды",
      description: "Полезные игровые команды для работы",
      link: "commands",
      icon: Terminal,
      gradient: "from-lime-500/20 to-green-600/20",
      borderGradient: "border-lime-500/30",
      textColor: "text-lime-700 dark:text-lime-300",
      bgGradient: "from-lime-50/50 to-green-50/30 dark:from-lime-950/20 dark:to-green-950/10"
    }
  ]

  return (
    <div className="space-y-8 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={UserPlus}
        title="Руководство новичка"
        description="Пошаговое руководство для новых сотрудников МВД"
        badge="Обязательно к изучению"
      />

      {/* Important Notice */}
      <div className="relative bg-card border border-orange-500/30 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-amber-500/3 to-yellow-500/5 pointer-events-none"></div>
        
        <div className="p-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground mb-2">Важная информация</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Это руководство предназначено для новичков и содержит основную информацию. Для детального изучения обращайтесь к соответствующим разделам методички.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 rounded-2xl mb-2 mx-auto shadow-lg shadow-blue-500/10">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent select-text">
            Что делать в первую очередь
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto select-text">
            Следуйте этим шагам для успешного старта в МВД
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {steps.map((step, index) => (
            <div key={index} className="group relative bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 transition-all duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 p-7 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color.split('text-')[0]} shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <step.icon className="h-8 w-8 text-white" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-xl font-bold text-foreground mb-2 select-text leading-tight">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed select-text">{step.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2.5 group/item">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="text-sm text-foreground/70 select-text group-hover/item:text-foreground/90 transition-colors duration-200">{detail}</span>
                    </div>
                  ))}
                </div>

                {step.link && !step.links && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onPageChange?.(step.link!)}
                    className="w-full group/btn"
                  >
                    <span>{step.linkText}</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                  </Button>
                )}
                {step.links && (
                  <div className="grid grid-cols-1 gap-2">
                    {step.links.map((linkItem, linkIndex) => (
                      <Button
                        key={linkIndex}
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange?.(linkItem.link)}
                        className="group/btn justify-between"
                      >
                        <span>{linkItem.text}</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 via-green-500/15 to-teal-500/20 rounded-2xl mb-2 mx-auto shadow-lg shadow-emerald-500/10">
            <Star className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent select-text">
            Быстрые советы
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto select-text">
            Ключевые рекомендации для успешной работы во фракции МВД
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {quickTips.map((tip, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 dark:from-emerald-950/20 dark:via-green-950/15 dark:to-teal-950/20 border-2 border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl p-6 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/10 group-hover:to-green-500/5 transition-all duration-300 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-500/30 dark:from-emerald-500/40 dark:to-green-500/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium leading-relaxed text-foreground/90 group-hover:text-foreground transition-colors duration-200 select-text">
                    {tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-fuchsia-500/20 rounded-2xl mb-2 mx-auto shadow-lg shadow-violet-500/10">
            <ArrowRight className="h-8 w-8 text-violet-600 dark:text-violet-400" />
          </div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent select-text">
            Следующие шаги
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto select-text">
            После изучения этого руководства рекомендуется перейти к следующим разделам для глубокого погружения в работу фракции
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedSections.map((section, index) => (
            <div 
              key={index} 
              className={`group relative bg-gradient-to-br ${section.bgGradient} border-2 ${section.borderGradient} rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer`}
              onClick={() => onPageChange?.(section.link as any)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-foreground mb-1 select-text group-hover:text-primary transition-colors duration-300">{section.title}</h4>
                    {section.badge && (
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {section.badge}
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed select-text">
                  {section.description}
                </p>

                <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Перейти к разделу</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
