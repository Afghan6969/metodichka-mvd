"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  GraduationCap,
  FileText,
  Users,
  Car,
  Shield,
  Book,
  Folder,
  Calculator,
  Search,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ModernSidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  onGlobalSearchOpen: () => void
  isOpen: boolean
  onClose: () => void
}

export function ModernSidebar({ currentPage, onPageChange, onGlobalSearchOpen, isOpen, onClose }: ModernSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    guvd: true,
    gibdd: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const renderMenuItem = (item: any) => {
    const Icon = item.icon
    const isActive = currentPage === item.id
    const isHovered = hoveredItem === item.id

    return (
      <Button
        key={item.id}
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-4 h-12 text-left transition-all duration-300 font-medium rounded-xl",
          isActive &&
            "bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold shadow-sm border border-primary/20",
          !isActive &&
            "hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-primary hover:shadow-sm",
        )}
        onClick={() => {
          onPageChange(item.id)
          onClose()
        }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <Icon
          className={cn(
            "h-5 w-5 transition-all duration-300",
            isActive && "text-primary scale-110",
            !isActive && "text-muted-foreground group-hover:text-primary",
          )}
        />
        <span className="flex-1 text-sm">{item.label}</span>
        {(isActive || isHovered) && <ChevronRight className="h-4 w-4 opacity-60 transition-transform duration-200" />}
      </Button>
    )
  }

  const menuItems = [
    { id: "contents", label: "Главная", icon: BookOpen },
    { id: "lectures", label: "Лекции", icon: GraduationCap },
    { id: "training", label: "Тренировки", icon: Book },
    { id: "reports", label: "Доклады в рацию", icon: FileText },
    { id: "commands", label: "Команды", icon: Users },
    { id: "penalty-calculator", label: "Калькулятор штрафов", icon: Calculator },
    { id: "ammunition", label: "Аммуниция", icon: Shield },
    { id: "terms", label: "Термины", icon: Book },
    { id: "resources", label: "Ресурсы", icon: Folder },
  ]

  const guvdItems = [
    { id: "guvd-positions", label: "Должности", icon: Shield },
    { id: "guvd-vehicles", label: "Транспорт", icon: Car },
    { id: "guvd-gov-wave", label: "Гос волны", icon: Shield },
    { id: "guvd-binds", label: "Бинды", icon: Users },
  ]

  const gibddItems = [
    { id: "gibdd-positions", label: "Должности", icon: Shield },
    { id: "gibdd-vehicles", label: "Транспорт", icon: Car },
    { id: "gibdd-gov-wave", label: "Гос волны", icon: Shield },
    { id: "gibdd-binds", label: "Бинды", icon: Users },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "modern-sidebar fixed left-0 top-0 h-full w-84 z-50 transform transition-all duration-300 lg:relative lg:translate-x-0 shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-sidebar-border bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-lg">МВД</span>
                </div>
                <div>
                  <h2 className="font-bold text-xl text-sidebar-foreground">Методичка</h2>
                  <p className="text-sm text-muted-foreground font-medium">МВД РП</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden rounded-xl">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-sidebar-border">
            <Button
              variant="outline"
              className="w-full justify-start gap-4 h-14 text-left bg-gradient-to-r from-background to-secondary/50 border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-xl transition-all duration-300"
              onClick={onGlobalSearchOpen}
            >
              <Search className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground font-medium">Поиск материалов...</span>
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-3">
              {/* Main items */}
              {menuItems.map(renderMenuItem)}

              <div className="py-3">
                <div className="h-px bg-gradient-to-r from-transparent via-sidebar-border to-transparent" />
              </div>

              {/* ГУВД Section */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-4 h-12 text-left font-bold text-sidebar-foreground hover:bg-primary/5 rounded-xl transition-all duration-300"
                  onClick={() => toggleSection("guvd")}
                >
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-base">ГУВД</span>
                  {expandedSections.guvd ? (
                    <ChevronDown className="h-4 w-4 text-primary" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-primary" />
                  )}
                </Button>
                {expandedSections.guvd && <div className="ml-6 mt-2 space-y-2">{guvdItems.map(renderMenuItem)}</div>}
              </div>

              {/* ГИБДД Section */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-4 h-12 text-left font-bold text-sidebar-foreground hover:bg-primary/5 rounded-xl transition-all duration-300"
                  onClick={() => toggleSection("gibdd")}
                >
                  <Car className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-base">ГИБДД</span>
                  {expandedSections.gibdd ? (
                    <ChevronDown className="h-4 w-4 text-primary" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-primary" />
                  )}
                </Button>
                {expandedSections.gibdd && <div className="ml-6 mt-2 space-y-2">{gibddItems.map(renderMenuItem)}</div>}
              </div>
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-6 border-t border-sidebar-border bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">© 2025</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Версия 1.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
