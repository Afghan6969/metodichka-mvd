
"use client"

import { useState } from "react"
import { ModernSidebar } from "@/components/modern-sidebar"
import { ModernHeader } from "@/components/modern-header"
import { MainContent } from "@/components/main-content"
import { LecturesPage } from "@/components/lectures-page"
import { TrainingPage } from "@/components/training-page"
import { ReportsPage } from "@/components/reports-page"
import { CommandsPage } from "@/components/commands-page"
import { GuvdVehiclesPage } from "@/components/guvd-vehicles-page"
import { GibddVehiclesPage } from "@/components/gibdd-vehicles-page"
import { GuvdGovWavePage } from "@/components/guvd-gov-wave-page"
import { GibddGovWavePage } from "@/components/gibdd-gov-wave-page"
import { GibddBindsPage } from "@/components/gibdd-binds-page"
import { GuvdBindsPage } from "@/components/guvd-binds-page"
import { AmmunitionPage } from "@/components/ammunition-page"
import { TermsPage } from "@/components/terms-page"
import { ResourcesPage } from "@/components/resources-page"
import { PenaltyCalculator } from "@/components/penalty-calculator"
import { GlobalSearch } from "@/components/global-search"
import { VersionsPage } from "@/components/versions-page"
import { Button } from "@/components/ui/button"
import { Shield, ArrowRight } from "lucide-react"
import { PositionsPage } from "@/components/positions-page"
import { GuvdPositionsPage } from "@/components/guvd-positions-page"
import GuvdExamplesPage from "@/components/test" // Изменено на дефолтный импорт

export default function Home() {
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
      default:
        return (
          <div className="flex-1">
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=80 height=80 viewBox=0 0 80 80 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23000000 fillOpacity=0.02%3E%3Cpath d=M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

              <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <div className="mb-12">
                  <div className="inline-flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl">
                      <Shield className="h-12 w-12 text-primary-foreground" />
                    </div>
                    <div className="text-left">
                      <h1 className="text-6xl font-bold text-foreground mb-2 text-balance">МВД РП</h1>
                      <p className="text-muted-foreground text-2xl font-medium">Методические материалы</p>
                    </div>
                  </div>
                </div>

                <div className="max-w-4xl mx-auto mb-16">
                  <h2 className="text-3xl text-foreground mb-6 font-medium text-balance">
                    Полная база знаний для сотрудников
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                    Министерства внутренних дел Республики Провинции
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    size="lg"
                    className="modern-button group px-10 py-5 text-lg font-medium"
                    onClick={() => setCurrentPage("lectures")}
                  >
                    Начать изучение
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-border text-foreground hover:bg-muted font-medium px-10 py-5 text-lg rounded-2xl transition-all duration-300 hover:border-primary bg-transparent"
                    onClick={() => setCurrentPage("penalty-calculator")}
                  >
                    Калькулятор штрафов
                  </Button>
                </div>
              </div>
            </div>

            <div className="px-6 py-24 bg-muted/30">
              <div className="max-w-7xl mx-auto">
                <MainContent />
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
