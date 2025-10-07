"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { ModernSidebar } from "@/components/modern-sidebar"
import { ModernHeader } from "@/components/modern-header"
import { MainContent } from "@/components/main-content"
import { LecturesPage } from "@/components/lectures-page"
import { TrainingPage } from "@/components/training-page"
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
import { UserManagementPage } from "@/components/user-management-page"

export default function Home() {
  const { currentUser } = useAuth()
  const [currentPage, setCurrentPage] = useState<
    | "contents"
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
  >("contents")

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (currentPage) {
      case "lectures":
        return <LecturesPage />
      case "training":
        return <TrainingPage />
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
                  <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-primary/10 rounded-2xl border-2 border-primary/30">
                    <div className="police-beacon"></div>
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="text-sm font-black uppercase tracking-widest text-primary">МВД РЕСПУБЛИКИ ПРОВИНЦИЯ</span>
                  </div>
                  
                  <h1 className="mb-6 text-5xl lg:text-7xl font-black uppercase tracking-tight text-foreground">
                    Методическое пособие МВД
                  </h1>
                  
                  <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                    Полное руководство для сотрудников ГИБДД и ГУВД Республики Провинция.
                    <br/>
                    Лекции, тренировки, бинды, должности, транспорт и инструменты для работы.
                  </p>

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
                    <div key={i} className="military-card text-center p-6 hover:scale-105 transition-transform">
                      <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                      <div className="text-3xl font-black mb-1 text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="military-card text-center group hover:shadow-xl transition-all">
                    <div className="relative w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <BookOpen className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-foreground">ГИБДД</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Должности, автопарк, гос волна, бинды и материалы для ГИБДД
                    </p>
                  </div>

                  <div className="military-card text-center group hover:shadow-xl transition-all">
                    <div className="relative w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <Shield className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-foreground">ГУВД</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Должности, автопарк, гос волна, бинды и материалы для ГУВД
                    </p>
                  </div>

                  <div className="military-card text-center group hover:shadow-xl transition-all">
                    <div className="relative w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <Award className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-foreground">Инструменты</h3>
                    <p className="text-muted-foreground leading-relaxed">
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
      <ModernSidebar
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