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
  UserCog,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

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
  const { currentUser, hasAccess, canManageUsers } = useAuth()

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

  // Проверка доступа к защищенным страницам
  const protectedPages = ["generator-page", "gibdd-gov-wave", "guvd-gov-wave"]
  
  if (protectedPages.includes(item.id)) {
    // Для generator-page проверяем общий доступ
    if (item.id === "generator-page") {
      if (!hasAccess("generator-page")) {
        return null
      }
    }
    // Для gov-wave страниц проверяем конкретный доступ
    else if (!hasAccess(item.id)) {
      return null
    }
  }

  return (
    <Button
      key={item.id}
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-3 h-11 text-left transition-all duration-200 font-medium rounded-xl group",
        isActive && "bg-primary text-primary-foreground shadow-sm",
        !isActive && "hover:bg-muted text-muted-foreground hover:text-foreground",
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
          "h-4 w-4 transition-all duration-200",
          isActive && "text-primary-foreground",
          !isActive && "text-muted-foreground group-hover:text-foreground",
        )}
      />
      <span className="flex-1 text-sm">{item.label}</span>
      {(isActive || isHovered) && <ChevronRight className="h-3 w-3 opacity-50" />}
    </Button>
  )
}

  const menuItems = [
    { id: "contents", label: "Главная", icon: BookOpen },
    { id: "lectures", label: "Лекции", icon: GraduationCap },
    { id: "training", label: "Тренировки", icon: Book },
    { id: "reports", label: "Доклады в рацию", icon: FileText },
    { id: "commands", label: "Команды", icon: Users },
    { id: "penalty-calculator", label: "Калькулятор наказаний", icon: Calculator },
    { id: "generator-page", label: "Генератор отчётов", icon: FileText },
    { id: "ammunition", label: "Амуниция", icon: Shield },
    { id: "terms", label: "Термины", icon: Book },
    { id: "test", label: "Примеры ситуаций", icon: Book },
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
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "modern-sidebar fixed left-0 top-0 h-full w-80 z-50 transform transition-all duration-300 lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">МВД</span>
                </div>
                <div>
                  <h2 className="font-bold text-lg text-sidebar-foreground">Методичка</h2>
                  <p className="text-xs text-muted-foreground">МВД РП</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden rounded-xl h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 border-b border-sidebar-border">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-10 text-left border-dashed hover:bg-muted rounded-xl bg-transparent"
              onClick={onGlobalSearchOpen}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">Поиск материалов...</span>
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4 py-4">
            <nav className="space-y-1">
              {menuItems.map(renderMenuItem)}

              <div className="py-2">
                <div className="h-px bg-border" />
              </div>

              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-10 text-left font-medium text-foreground hover:bg-muted rounded-xl"
                  onClick={() => toggleSection("guvd")}
                >
                  <Shield className="h-4 w-4" />
                  <span className="flex-1 text-sm">ГУВД</span>
                  {expandedSections.guvd ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </Button>
                {expandedSections.guvd && <div className="ml-4 mt-1 space-y-1">{guvdItems.map(renderMenuItem)}</div>}
              </div>

              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-10 text-left font-medium text-foreground hover:bg-muted rounded-xl"
                  onClick={() => toggleSection("gibdd")}
                >
                  <Car className="h-4 w-4" />
                  <span className="flex-1 text-sm">ГИБДД</span>
                  {expandedSections.gibdd ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </Button>
                {expandedSections.gibdd && <div className="ml-4 mt-1 space-y-1">{gibddItems.map(renderMenuItem)}</div>}
              </div>

              {currentUser && canManageUsers() && (
                <>
                  <div className="py-2">
                    <div className="h-px bg-border" />
                  </div>
                  {renderMenuItem({ id: "user-management", label: "Управление пользователями", icon: UserCog })}
                </>
              )}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-sidebar-border">
            <div className="text-center">
              <p className="text-xs font-medium text-foreground">© 2025</p>
              <p className="text-xs text-muted-foreground">Версия 1.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
