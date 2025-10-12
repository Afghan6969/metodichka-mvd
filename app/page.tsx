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
import { GlobalSearch } from "@/components/global-search"
import { Button } from "@/components/ui/button"
import { Shield, ArrowRight, BookOpen, Target, Keyboard, Car, Award, AlertCircle } from "lucide-react"
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

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                {/* Hero */}
                <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-3 mb-10 px-7 py-4 bg-gradient-to-r from-primary/12 via-primary/8 to-primary/12 rounded-3xl border-2 border-primary/35 backdrop-blur-sm shadow-xl hover:shadow-primary/25 transition-all duration-300 group">
                    <div className="police-beacon group-hover:scale-110 transition-transform duration-300"></div>
                    <Shield className="h-7 w-7 text-primary group-hover:rotate-3 transition-transform duration-300" />
                    <span className="text-base font-black uppercase tracking-[0.12em] text-primary bg-gradient-to-r from-primary to-primary/85 bg-clip-text">МВД РЕСПУБЛИКИ ПРОВИНЦИЯ</span>
                  </div>

                  <h1 className="mb-8 text-5xl lg:text-7xl font-black uppercase tracking-tight leading-tight">
                    <span className="text-transparent bg-gradient-to-br from-foreground via-foreground/95 to-muted-foreground/90 bg-clip-text drop-shadow-lg">
                      Методическое
                    </span>
                    <span className="block text-primary drop-shadow-lg mt-1 hover:scale-105 transition-transform duration-300">пособие МВД</span>
                  </h1>

                  <div className="max-w-4xl mx-auto mb-14">
                    <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
                      Полное руководство для сотрудников
                      <span className="text-primary font-bold mx-1 hover:scale-105 transition-transform duration-200 inline-block">ГИБДД</span> и
                      <span className="text-red-500 font-bold mx-1 hover:scale-105 transition-transform duration-200 inline-block">ГУВД</span>
                      Республики Провинция.
                    </p>
                    <p className="text-lg text-muted-foreground/90 mt-5 leading-relaxed font-light">
                      Лекции, тренировки, бинды, должности, транспорт и инструменты для работы.
                    </p>
                  </div>

                  {/* Important Notice */}
                  <div className="max-w-3xl mx-auto mb-8">
                    <div className="military-card bg-orange-500/10 border-orange-500/30">
                      <div className="flex items-start gap-4 p-5">
                        <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-1" />
                        <div className="text-left space-y-3">
                          <h3 className="font-black text-lg text-orange-600 dark:text-orange-500 uppercase">Важное уточнение</h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• Данная методичка может содержать неточности или устаревшую информацию</p>
                            <p>• Материалы служат основой для изучения, но не являются окончательным источником</p>
                            <p>• При возникновении спорных вопросов обращайтесь к актуальным регламентам</p>
                            <p>• Администрация не несет ответственности за возможные ошибки в содержании</p>
                            <p>• При обнаружении неточности сообщите об этом разработчику</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                  {[
                    { icon: BookOpen, label: "Лекций", value: "15+" },
                    { icon: Target, label: "Тренировок", value: "20+" },
                    { icon: Keyboard, label: "Биндов", value: "50+" },
                    { icon: Car, label: "Автомобилей", value: "30+" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-300" />
                      <div className="text-3xl font-black mb-1 text-white">{stat.value}</div>
                      <div className="text-sm text-blue-200/80 font-semibold uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/5 backdrop-blur-sm border border-white/10 rounded-3xl text-center group hover:shadow-2xl transition-all duration-300 p-8 hover:scale-105">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500/80 to-blue-600/60 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-white">ГИБДД</h3>
                    <p className="text-blue-100/80 leading-relaxed">
                      Должности, автопарк, гос волна, бинды и материалы для ГИБДД
                    </p>
                  </div>

                  <div className="bg-black/5 backdrop-blur-sm border border-white/10 rounded-3xl text-center group hover:shadow-2xl transition-all duration-300 p-8 hover:scale-105">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-red-500/80 to-red-600/60 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-white">ГУВД</h3>
                    <p className="text-red-100/80 leading-relaxed">
                      Должности, автопарк, гос волна, бинды и материалы для ГУВД
                    </p>
                  </div>

                  <div className="bg-black/5 backdrop-blur-sm border border-white/10 rounded-3xl text-center group hover:shadow-2xl transition-all duration-300 p-8 hover:scale-105">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500/80 to-purple-600/60 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-white">Инструменты</h3>
                    <p className="text-purple-100/80 leading-relaxed">
                      Калькулятор штрафов, генератор отчётов, термины и ресурсы
                    </p>
                  </div>
                </div>

                {/* Developer Contact */}
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
        )
    }
  }

  const handleGlobalSearchOpen = () => {
    setIsGlobalSearchOpen(true)
  }

  const handleGlobalSearchClose = () => {
    setIsGlobalSearchOpen(false)
  }

  const handleGlobalSearchResult = (page: string) => {
    setCurrentPage(page as any)
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
