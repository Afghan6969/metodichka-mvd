"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { LecturesPage } from "@/components/lectures-page"
import { TrainingPage } from "@/components/training-page"
import { ReportsPage } from "@/components/reports-page"
import { RanksPage } from "@/components/ranks-page"
import { CommandsPage } from "@/components/commands-page"
import { GuvdPositionsPage } from "@/components/guvd-positions-page"
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
import { PositionsPage } from "@/components/positions-page" // Import PositionsPage
import { TestsPage } from "@/components/tests-page" // Import TestsPage

export default function Home() {
  const [currentPage, setCurrentPage] = useState<
    | "contents"
    | "lectures"
    | "training"
    | "tests" // Added type for tests
    | "reports"
    | "ranks"
    | "commands"
    | "gibdd-positions"
    | "guvd-positions"
    | "guvd-vehicles"
    | "gibdd-vehicles"
    | "guvd-gov-wave"
    | "gibdd-gov-wave"
    | "gibdd-binds"
    | "guvd-binds"
    | "ammunition"
    | "terms"
    | "resources"
    | "penalty-calculator"
    | "versions"
  >("contents")

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false)

  const renderContent = () => {
    switch (currentPage) {
      case "lectures":
        return <LecturesPage />
      case "training":
        return <TrainingPage />
      case "tests": // Added case for tests
        return <TestsPage />
      case "reports":
        return <ReportsPage />
      case "ranks":
        return <RanksPage />
      case "commands":
        return <CommandsPage />
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
      case "ammunition":
        return <AmmunitionPage />
      case "terms":
        return <TermsPage />
      case "resources":
        return <ResourcesPage />
      case "penalty-calculator":
        return <PenaltyCalculator />
      case "versions":
        return <VersionsPage />
      default:
        return <MainContent />
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
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} onGlobalSearchOpen={handleGlobalSearchOpen} />
      {renderContent()}
      <GlobalSearch
        isOpen={isGlobalSearchOpen}
        onClose={handleGlobalSearchClose}
        onResultClick={handleGlobalSearchResult}
      />
    </div>
  )
}
