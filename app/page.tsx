"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { ModernHeader } from "@/components/modern-header"
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
import { Shield, ArrowRight, BookOpen, Target, Keyboard, Car, Award, AlertCircle, Sparkles, TrendingUp, Users, Zap, GraduationCap, FileText, Radio, Briefcase, Heart, Scale, ClipboardCheck, PenTool, Package, ScrollText, Lightbulb, Database, Terminal } from "lucide-react"
import { PositionsPage } from "@/components/positions-page"
import { GuvdPositionsPage } from "@/components/guvd-positions-page"
import GuvdExamplesPage from "@/components/test"
import { GeneratorPage } from "@/components/generator-page"
import { NewcomerGuidePage } from "@/components/newcomer-guide-page"
import { MedicalAidPage } from "@/components/medical-aid-page"
import { UserManagementPage } from "@/components/user-management-page"
import { OrdersPage } from "@/components/orders-page"

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
    | "orders"
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
      case "orders":
        return <OrdersPage />
      default:
        return (
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Hero */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-6 py-2 mb-6">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider text-primary">МВД Республики Провинция</span>
              </div>
              <h1 className="text-5xl font-black uppercase mb-3 text-foreground">Методическое пособие</h1>
              <p className="text-lg text-muted-foreground">Справочно-информационный портал для сотрудников</p>
            </div>

            {/* Warning */}
            <div className="mb-10 rounded-2xl border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/10 p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black uppercase text-orange-600 dark:text-orange-500 mb-3">⚠ Важное уточнение</h3>
                  <ul className="space-y-1.5 text-sm text-foreground/70">
                    <li>• Данная методичка может содержать неточности или устаревшую информацию</li>
                    <li>• Материалы служат основой для изучения, но не являются окончательным источником</li>
                    <li>• При возникновении спорных вопросов обращайтесь к актуальным регламентам</li>
                    <li>• Администрация не несет ответственности за возможные ошибки в содержании</li>
                    <li>• При обнаружении неточности сообщите об этом разработчику</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mb-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-black uppercase mb-2">Быстрый старт</h2>
              <p className="text-muted-foreground mb-6">Начните с руководства для новичков</p>
              <button 
                onClick={() => setCurrentPage("newcomer-guide")}
                className="rounded-full bg-primary text-white px-8 py-3 font-bold uppercase hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                Перейти к обучению
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Departments */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* ГИБДД */}
              <div className="rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Car className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase text-primary">ГИБДД</h2>
                    <p className="text-sm text-muted-foreground">Госавтоинспекция</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-sm">
                  <button onClick={() => setCurrentPage("gibdd-positions")} className="w-full flex items-center gap-2 rounded-lg bg-white/50 dark:bg-white/5 p-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>Должности и иерархия</span>
                  </button>
                  <button onClick={() => setCurrentPage("gibdd-vehicles")} className="w-full flex items-center gap-2 rounded-lg bg-white/50 dark:bg-white/5 p-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    <Car className="h-4 w-4 text-primary" />
                    <span>Автопарк</span>
                  </button>
                  <button onClick={() => setCurrentPage("gibdd-gov-wave")} className="w-full flex items-center gap-2 rounded-lg bg-white/50 dark:bg-white/5 p-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    <Radio className="h-4 w-4 text-primary" />
                    <span>Государственная волна</span>
                  </button>
                  <button onClick={() => setCurrentPage("gibdd-binds")} className="w-full flex items-center gap-2 rounded-lg bg-white/50 dark:bg-white/5 p-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span>Команды и бинды</span>
                  </button>
                </div>
              </div>

              {/* ГУВД */}
              <div className="rounded-2xl border-2 border-red-500 bg-gradient-to-br from-red-500/5 to-red-500/10 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase text-red-500">ГУВД</h2>
                    <p className="text-sm text-muted-foreground">Главное управление</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-sm">
                  <button onClick={() => setCurrentPage("guvd-positions")} className="w-full flex items-center gap-2 rounded-lg bg-white/50 dark:bg-white/5 p-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    <Briefcase className="h-4 w-4 text-red-500" />
                    <span>Должности и иерархия</span>
                  </button>
                  <button onClick={() => setCurrentPage("guvd-vehicles")} className="w-full flex items-center gap-2 rounded-lg bg-white/50 dark:bg-white/5 p-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    <Car className="h-4 w-4 text-red-500" />
                    <span>Автопарк</span>
                  </button>
                  <button onClick={() => setCurrentPage("guvd-gov-wave")} className="w-full flex items-center gap-2 rounded-lg bg-white/50 dark:bg-white/5 p-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    <Radio className="h-4 w-4 text-red-500" />
                    <span>Государственная волна</span>
                  </button>
                  <button onClick={() => setCurrentPage("guvd-binds")} className="w-full flex items-center gap-2 rounded-lg bg-white/50 dark:bg-white/5 p-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    <Terminal className="h-4 w-4 text-red-500" />
                    <span>Команды и бинды</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="rounded-2xl border-2 border-border p-5 text-center bg-card hover:border-primary transition-colors">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-black text-primary mb-1">14</div>
                <div className="text-xs uppercase text-muted-foreground font-semibold">Информационных разделов</div>
              </div>
              <div className="rounded-2xl border-2 border-border p-5 text-center bg-card hover:border-primary transition-colors">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-black text-primary mb-1">25+</div>
                <div className="text-xs uppercase text-muted-foreground font-semibold">Обучающих материалов</div>
              </div>
              <div className="rounded-2xl border-2 border-border p-5 text-center bg-card hover:border-primary transition-colors">
                <Car className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-black text-primary mb-1">40+</div>
                <div className="text-xs uppercase text-muted-foreground font-semibold">Транспортных средств</div>
              </div>
              <div className="rounded-2xl border-2 border-border p-5 text-center bg-card hover:border-primary transition-colors">
                <Terminal className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-black text-primary mb-1">100+</div>
                <div className="text-xs uppercase text-muted-foreground font-semibold">Команд и биндов</div>
              </div>
            </div>

            {/* Sections */}
            <div className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-6">Разделы пособия</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button onClick={() => setCurrentPage("newcomer-guide")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Руководство новичка</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Для начинающих сотрудников</p>
                </button>

                <button onClick={() => setCurrentPage("medical-aid")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Оказание ПМП</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Первая медицинская помощь</p>
                </button>

                <button onClick={() => setCurrentPage("education")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Обучение персонала</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Образовательные программы</p>
                </button>

                <button onClick={() => setCurrentPage("penalty-calculator")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Калькулятор наказаний</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Расчёт штрафов по КоАП и УК</p>
                </button>

                <button onClick={() => setCurrentPage("tests")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Тесты по УК и КоАП</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Проверка знаний</p>
                </button>

                <button onClick={() => setCurrentPage("generator-page")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <PenTool className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Генератор отчётов</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Создание документов</p>
                </button>

                <button onClick={() => setCurrentPage("reports")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Radio className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Доклады в рацию</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Радиосвязь</p>
                </button>

                <button onClick={() => setCurrentPage("commands")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Команды</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Игровые команды</p>
                </button>

                <button onClick={() => setCurrentPage("ammunition")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Амуниция</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Снаряжение</p>
                </button>

                <button onClick={() => setCurrentPage("terms")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <ScrollText className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Термины</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Определения</p>
                </button>

                <button onClick={() => setCurrentPage("test")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Примеры ситуаций</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Практические примеры</p>
                </button>

                <button onClick={() => setCurrentPage("resources")} className="rounded-xl border-2 border-border bg-card p-5 hover:bg-accent hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="h-5 w-5 text-primary" />
                    <h3 className="font-bold uppercase text-sm">Ресурсы</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Полезные материалы</p>
                </button>
              </div>
            </div>

            {/* Footer */}
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
