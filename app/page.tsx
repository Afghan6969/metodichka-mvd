"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { ModernHeader } from "@/components/modern-header"
import { MainContent } from "@/components/main-content"
import { LecturesPage } from "@/components/lectures-page"
import { TrainingPage } from "@/components/training-page"
import { EducationPage } from "@/components/education-page"
import { ReportsPage } from "@/components/reports-page"
import { CommandsPage } from "@/components/commands-page"
import GuvdVehiclesPage from "@/components/guvd-vehicles-page"
import GibddVehiclesPage from "@/components/gibdd-vehicles-page"
import { GuvdGovWavePage } from "@/components/guvd-gov-wave-page"
import { GibddGovWavePage } from "@/components/gibdd-gov-wave-page"
import { GibddBindsPage } from "@/components/gibdd-binds-page"
import { GuvdBindsPage } from "@/components/guvd-binds-page"
import { AmmunitionPage } from "@/components/ammunition-page"
import { TermsPage } from "@/components/terms-page"
import { ResourcesPage } from "@/components/resources-page"
import { PenaltyCalculator } from "@/components/penalty-calculator"
import { LawTests } from "@/components/law-tests"
import { GlobalSearch } from "@/components/global-search"
import { Button } from "@/components/ui/button"
import { Shield, ArrowRight, BookOpen, Target, Keyboard, Car, Award, AlertCircle, Sparkles, TrendingUp, Users, Zap, GraduationCap, FileText, Radio, Briefcase } from "lucide-react"
import { PositionsPage } from "@/components/positions-page"
import { GuvdPositionsPage } from "@/components/guvd-positions-page"
import GuvdExamplesPage from "@/components/test"
import { GeneratorPage } from "@/components/generator-page"
import { NewcomerGuidePage } from "@/components/newcomer-guide-page"
import { MedicalAidPage } from "@/components/medical-aid-page"
import { UserManagementPage } from "@/components/user-management-page"

export default function Home() {
  const { currentUser } = useAuth()
  const [currentPage, setCurrentPage] = useState<
    | "contents"
    | "newcomer-guide"
    | "medical-aid"
    | "lectures"
    | "training"
    | "education"
    | "reports"
    | "commands"
    | "ammunition"
    | "terms"
    | "resources"
    | "penalty-calculator"
    | "tests"
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
  >("contents")

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleGlobalSearchOpen = () => {
    setIsGlobalSearchOpen(true)
  }

  const handleGlobalSearchClose = () => {
    setIsGlobalSearchOpen(false)
  }

  const handleGlobalSearchResult = (page: string) => {
    setCurrentPage(page as any)
  }

  const renderContent = () => {
    switch (currentPage) {
      case "newcomer-guide":
        return <NewcomerGuidePage onPageChange={setCurrentPage} />
      case "medical-aid":
        return <MedicalAidPage />
      case "lectures":
        return <LecturesPage />
      case "training":
        return <TrainingPage />
      case "education":
        return <EducationPage />
      case "reports":
        return <ReportsPage />
      case "commands":
        return <CommandsPage />
      case "ammunition":
        return <AmmunitionPage />
      case "terms":
        return <TermsPage />
      case "resources":
        return <ResourcesPage />
      case "penalty-calculator":
        return <PenaltyCalculator />
      case "tests":
        return <LawTests />
      case "gibdd-positions":
        return <PositionsPage />
      case "guvd-positions":
        return <GuvdPositionsPage />
      case "guvd-vehicles":
        return <GuvdVehiclesPage />
      case "gibdd-vehicles":
        return <GibddVehiclesPage />
      case "guvd-gov-wave":
        return <GuvdGovWavePage />
      case "gibdd-gov-wave":
        return <GibddGovWavePage />
      case "gibdd-binds":
        return <GibddBindsPage />
      case "guvd-binds":
        return <GuvdBindsPage />
      case "test":
        return <GuvdExamplesPage />
      case "generator-page":
        return <GeneratorPage />
      case "user-management":
        return <UserManagementPage />
      default:
        return (
          <div className="flex-1">
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=80 height=80 viewBox=0 0 80 80 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23000000 fillOpacity=0.02%3E%3Cpath d=M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="mb-12">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 rounded-full border border-primary/30">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm font-bold uppercase tracking-widest text-primary">МВД Республики Провинция</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                  </div>
                  
                  <h1 className="text-center text-5xl lg:text-7xl font-black uppercase mb-4">
                    <span className="block text-foreground">Методическое пособие</span>
                    <span className="block text-primary mt-2">МВД</span>
                  </h1>
                  
                {/* Important Notice - moved up */}
                <div className="max-w-4xl mx-auto mb-8">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/5 via-orange-500/10 to-orange-600/5 border-2 border-orange-500/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                    <div className="relative flex items-start gap-5 p-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/40">
                        <AlertCircle className="h-7 w-7 text-orange-600 dark:text-orange-500" />
                      </div>
                      <div className="text-left space-y-3 flex-1">
                        <h3 className="font-black text-xl text-orange-600 dark:text-orange-500 uppercase tracking-wide flex items-center gap-2">
                          Важное уточнение
                          <TrendingUp className="h-5 w-5" />
                        </h3>
                        <div className="grid gap-2 text-sm text-muted-foreground leading-relaxed">
                          <p className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold mt-0.5">•</span>
                            <span>Данная методичка может содержать неточности или устаревшую информацию</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold mt-0.5">•</span>
                            <span>Материалы служат основой для изучения, но не являются окончательным источником</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold mt-0.5">•</span>
                            <span>При возникновении спорных вопросов обращайтесь к актуальным регламентам</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold mt-0.5">•</span>
                            <span>Администрация не несет ответственности за возможные ошибки в содержании</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold mt-0.5">•</span>
                            <span>При обнаружении неточности сообщите об этом разработчику</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer border border-primary/30" onClick={() => setCurrentPage("newcomer-guide")}>
                    <GraduationCap className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-lg font-bold text-white uppercase tracking-wide">Начать обучение</span>
                    <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">Руководство новичка для быстрого старта в работе</p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  {/* ГИБДД Section */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 p-8 hover:border-primary/40 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
                          <Car className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-black uppercase text-primary">ГИБДД</h2>
                          <p className="text-sm text-muted-foreground">Госавтоинспекция</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span className="text-foreground/80">Полная информация о должностях и иерархии</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Car className="h-4 w-4 text-primary" />
                          <span className="text-foreground/80">Подробный автопарк с характеристиками</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Radio className="h-4 w-4 text-primary" />
                          <span className="text-foreground/80">Руководства по работе на гос. волне</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Keyboard className="h-4 w-4 text-primary" />
                          <span className="text-foreground/80">Полный набор биндов и команд</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ГУВД Section */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/5 via-red-500/10 to-red-500/5 border-2 border-red-500/20 p-8 hover:border-red-500/40 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                          <Shield className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-black uppercase text-red-500">ГУВД</h2>
                          <p className="text-sm text-muted-foreground">Главное управление</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Briefcase className="h-4 w-4 text-red-500" />
                          <span className="text-foreground/80">Полная информация о должностях и иерархии</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Car className="h-4 w-4 text-red-500" />
                          <span className="text-foreground/80">Подробный автопарк с характеристиками</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Radio className="h-4 w-4 text-red-500" />
                          <span className="text-foreground/80">Руководства по работе на гос. волне</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Keyboard className="h-4 w-4 text-red-500" />
                          <span className="text-foreground/80">Полный набор биндов и команд</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: GraduationCap, label: "Лекций", value: "15+", gradient: "from-blue-500 to-cyan-500" },
                    { icon: Target, label: "Тренировок", value: "20+", gradient: "from-green-500 to-emerald-500" },
                    { icon: Keyboard, label: "Биндов", value: "50+", gradient: "from-purple-500 to-pink-500" },
                    { icon: Car, label: "Автомобилей", value: "30+", gradient: "from-orange-500 to-red-500" },
                  ].map((stat, i) => (
                    <div key={i} className="relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border p-5 hover:border-primary/50 transition-all duration-300 group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      <div className="relative flex flex-col items-center text-center space-y-2">
                        <stat.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="text-2xl font-black text-foreground">{stat.value}</div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tools Section */}
                <div className="grid md:grid-cols-3 gap-5 mb-8">
                  <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border p-6 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold uppercase">Обучение</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Лекции, тренировки и образовательные материалы для подготовки сотрудников
                    </p>
                  </div>

                  <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border p-6 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold uppercase">Инструменты</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Калькулятор штрафов, генератор отчётов и справочные материалы
                    </p>
                  </div>

                  <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border p-6 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold uppercase">Справочник</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Термины, определения и полезные ресурсы для работы
                    </p>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="mt-16 pt-8 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Разработчик:{" "}
                      <a
                        href="https://vk.com/id503251431"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-bold transition-colors"
                      >
                        Poseidon_Wagner
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
  }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <EnhancedSidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onGlobalSearchOpen={handleGlobalSearchOpen}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:ml-0">
        <ModernHeader onMenuClick={() => setIsSidebarOpen(true)} onSearchClick={handleGlobalSearchOpen} />

        <main className="flex-1">
          {currentPage === "contents" ? (
            renderContent()
          ) : (
            <div className="px-6 py-12">
              <div className="max-w-7xl mx-auto">{renderContent()}</div>
            </div>
          )}
        </main>
      </div>

      <GlobalSearch
        isOpen={isGlobalSearchOpen}
        onClose={handleGlobalSearchClose}
        onResultClick={handleGlobalSearchResult}
      />
    </div>
  )
}
