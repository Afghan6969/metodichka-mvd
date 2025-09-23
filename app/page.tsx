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
import { Shield } from "lucide-react"
import { PositionsPage } from "@/components/positions-page"
import { GuvdPositionsPage } from "@/components/guvd-positions-page"

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
    | "versions"
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
      case "versions":
        return <VersionsPage />
      default:
        return (
          <div className="flex-1">
            <div className="bg-gradient-to-br from-primary/90 via-primary to-primary/80 relative overflow-hidden">
              {/* Декоративные элементы */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.03%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

              <div className="max-w-7xl mx-auto px-6 py-20 relative">
                <div className="text-center">
                  <div className="inline-flex items-center gap-4 mb-8">
                    <div className="w-20 h-20 bg-primary-foreground/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary-foreground/20 shadow-2xl">
                      <Shield className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div className="text-left">
                      <h1 className="text-5xl font-bold text-primary-foreground mb-2">МВД РП</h1>
                      <p className="text-primary-foreground/80 text-xl font-medium">Методические материалы</p>
                    </div>
                  </div>

                  <div className="max-w-3xl mx-auto mb-10">
                    <h2 className="text-2xl text-primary-foreground/90 mb-4 font-medium">
                      Полная база знаний для сотрудников
                    </h2>
                    <p className="text-lg text-primary-foreground/80 leading-relaxed">
                      Министерства внутренних дел Республики Провинции
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      size="lg"
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      onClick={() => setCurrentPage("lectures")}
                    >
                      Начать изучение
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm bg-transparent"
                      onClick={() => setCurrentPage("penalty-calculator")}
                    >
                      Калькулятор штрафов
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-16 bg-secondary/30">
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
            <div className="px-6 py-8">
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
