"use client"

import {
  BookOpen,
  GraduationCap,
  Target,
  Radio,
  Star,
  Users,
  Terminal,
  Building2,
  Home,
  Book,
  ExternalLink,
  Calculator,
  Shield,
  Search,
  Car,
  Megaphone,
  Keyboard,
  GitBranch,
  ClipboardCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { useState } from "react"

interface SidebarProps {
  currentPage:
    | "contents"
    | "lectures"
    | "training"
    | "tests"
    | "reports"
    | "ranks"
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
  onPageChange: (page: SidebarProps["currentPage"]) => void
  onGlobalSearchOpen: () => void
}

export function Sidebar({ currentPage, onPageChange, onGlobalSearchOpen }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const commonItems = [
    { id: "contents" as const, icon: BookOpen, label: "Содержание", priority: 1 },
    { id: "lectures" as const, icon: GraduationCap, label: "Лекции", priority: 3 },
    { id: "training" as const, icon: Target, label: "Тренировки", priority: 4 },
    { id: "tests" as const, icon: ClipboardCheck, label: "Тесты", priority: 5 },
    { id: "reports" as const, icon: Radio, label: "Доклады в рацию", priority: 6 },
    { id: "ranks" as const, icon: Star, label: "Звания и ранги", priority: 7 },
    { id: "commands" as const, icon: Terminal, label: "Команды", priority: 8 },
    { id: "penalty-calculator" as const, icon: Calculator, label: "Калькулятор штрафов", priority: 9 },
    { id: "ammunition" as const, icon: Shield, label: "Аммуниция", priority: 10 },
    { id: "terms" as const, icon: Book, label: "Термины", priority: 11 },
    { id: "resources" as const, icon: ExternalLink, label: "Ресурсы", priority: 12 },
  ]

  const gibddItems = [
    { id: "gibdd-positions" as const, icon: Users, label: "Должности ГИБДД" },
    { id: "gibdd-vehicles" as const, icon: Car, label: "Автопарк ГИБДД" },
    { id: "gibdd-gov-wave" as const, icon: Megaphone, label: "Гос волна" },
    { id: "gibdd-binds" as const, icon: Keyboard, label: "Бинды ГИБДД" },
  ]

  const guvdItems = [
    { id: "guvd-positions" as const, icon: Users, label: "Должности ГУВД" },
    { id: "guvd-vehicles" as const, icon: Car, label: "Автопарк ГУВД" },
    { id: "guvd-gov-wave" as const, icon: Megaphone, label: "Гос волна" },
    { id: "guvd-binds" as const, icon: Keyboard, label: "Бинды ГУВД" },
  ]

  const versionItems = [{ id: "versions" as const, icon: GitBranch, label: "Версии", priority: 1 }]

  const filteredCommonItems = commonItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredGibddItems = gibddItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredGuvdItems = guvdItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredVersionItems = versionItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border bg-primary">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-foreground/10 rounded-lg">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">МВД Республики Провинция (РП)</h1>
            <p className="text-sm text-primary-foreground/90">Методическое пособие</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-sidebar-border bg-muted/30 space-y-3">
        <Button
          onClick={onGlobalSearchOpen}
          variant="outline"
          className="w-full justify-start gap-3 h-11 text-left border-primary/20 hover:bg-primary/10 hover:border-primary/40 bg-transparent"
        >
          <Search className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Глобальный поиск</span>
        </Button>
        <SearchBar onSearch={handleSearch} placeholder="Поиск по разделам..." />
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {(filteredCommonItems.length > 0 || !searchQuery) && (
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Home className="h-3 w-3" />
                Общие разделы
              </h3>
              <div className="space-y-1">
                {filteredCommonItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 h-11 text-left ${
                      currentPage === item.id
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => onPageChange(item.id)}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {(filteredGibddItems.length > 0 || !searchQuery) && (
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                <Building2 className="h-3 w-3" />
                ГИБДД
              </h3>
              <div className="space-y-1">
                {filteredGibddItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 h-11 text-left ${
                      currentPage === item.id
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                        : "text-sidebar-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                    onClick={() => onPageChange(item.id)}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {(filteredGuvdItems.length > 0 || !searchQuery) && (
            <div>
              <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                <Building2 className="h-3 w-3" />
                ГУВД
              </h3>
              <div className="space-y-1">
                {filteredGuvdItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 h-11 text-left ${
                      currentPage === item.id
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm"
                        : "text-sidebar-foreground hover:bg-secondary/10 hover:text-secondary"
                    }`}
                    onClick={() => onPageChange(item.id)}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {(filteredVersionItems.length > 0 || !searchQuery) && (
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <GitBranch className="h-3 w-3" />
                Информация
              </h3>
              <div className="space-y-1">
                {filteredVersionItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 h-11 text-left ${
                      currentPage === item.id
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => onPageChange(item.id)}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {searchQuery &&
            filteredCommonItems.length === 0 &&
            filteredGibddItems.length === 0 &&
            filteredGuvdItems.length === 0 &&
            filteredVersionItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">Разделы не найдены по запросу "{searchQuery}"</p>
              </div>
            )}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border bg-muted/30">
        <div className="text-xs text-muted-foreground text-center">
          <p>Версия 2.1</p>
          <p>Обновлено: 16 сентября 2025</p>
        </div>
      </div>
    </div>
  )
}
