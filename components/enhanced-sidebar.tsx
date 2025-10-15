"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
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
  Home,
  ScrollText,
  Dumbbell,
  Radio,
  Terminal,
  Scale,
  PenTool,
  Package,
  Lightbulb,
  Database,
  Building2,
  Badge,
  Heart,
  UserPlus,
  ClipboardCheck,
} from "lucide-react"

interface ModernSidebarProps {
  currentPage: string
  onPageChange: (page: 
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
  ) => void
  onGlobalSearchOpen: () => void
  isOpen: boolean
  onClose: () => void
}

type SidebarItem = {
  id: string
  label: string
  icon: any
}

export function EnhancedSidebar({ currentPage, onPageChange, onGlobalSearchOpen, isOpen, onClose }: ModernSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    guvd: true,
    gibdd: true,
  })
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { currentUser, hasAccess, canManageUsers } = useAuth()

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    localStorage.setItem("sidebar-collapsed", JSON.stringify(!isCollapsed))
  }

  // Загружаем состояние collapsed из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved) {
      setIsCollapsed(JSON.parse(saved))
    }
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const renderMenuItem = (item: SidebarItem) => {
    const Icon = item.icon
    const isActive = currentPage === item.id
    const isHovered = hoveredItem === item.id

    // Проверка доступа к защищенным страницам
    const protectedPages = ["generator-page", "gibdd-gov-wave", "guvd-gov-wave"]

    if (protectedPages.includes(item.id)) {
      if (item.id === "generator-page") {
        if (!hasAccess("generator-page")) {
          return null
        }
      } else if (!hasAccess(item.id)) {
        return null
      }
    }

    return (
      <Button
        key={item.id}
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "transition-all duration-200 font-medium rounded-2xl group shadow-none",
          isCollapsed
            ? "w-8 h-8 p-0 justify-center"
            : "w-full justify-start gap-2 h-9 text-left",
          isActive && "bg-white/8 border border-white/20 text-white shadow-lg",
          !isActive && "hover:bg-transparent hover:text-foreground text-muted-foreground [&:hover]:bg-transparent [&:hover]:text-foreground [&:focus]:bg-transparent [&:focus]:outline-none [&:focus]:ring-0 [&:focus-visible]:bg-transparent [&:focus-visible]:outline-none [&:focus-visible]:ring-0 [&:active]:bg-transparent [&:active]:outline-none [&_*]:bg-transparent",
        )}
        onClick={() => {
          onPageChange(item.id as any)
          onClose()
        }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon
          className={cn(
            "transition-all duration-200",
            isCollapsed ? "h-4 w-4" : "h-3 w-3",
            isActive && "text-primary-foreground",
            !isActive && "text-muted-foreground group-hover:text-foreground",
          )}
        />
        {!isCollapsed && <span className="flex-1 text-xs">{item.label}</span>}
        {!isCollapsed && (isActive || isHovered) && <ChevronRight className="h-3 w-3 opacity-50" />}
      </Button>
    )
  }

  const menuItems = [
    { id: "contents", label: "Главная", icon: Home },
    { id: "newcomer-guide", label: "Руководство новичка", icon: Lightbulb },
    { id: "medical-aid", label: "Оказание ПМП", icon: Heart },
    { id: "education", label: "Обучение персонала МВД", icon: GraduationCap },
    { id: "reports", label: "Доклады в рацию", icon: Radio },
    { id: "commands", label: "Команды", icon: Terminal },
    { id: "penalty-calculator", label: "Калькулятор наказаний", icon: Scale },
    { id: "tests", label: "Тесты по УК и КоАП", icon: ClipboardCheck },
    { id: "generator-page", label: "Генератор отчётов", icon: PenTool },
    { id: "ammunition", label: "Амуниция", icon: Package },
    { id: "terms", label: "Термины", icon: ScrollText },
    { id: "test", label: "Примеры ситуаций", icon: Lightbulb },
    { id: "resources", label: "Ресурсы", icon: Database },
  ]

  const guvdItems = [
    { id: "guvd-positions", label: "Должности", icon: UserCog },
    { id: "guvd-vehicles", label: "Транспорт", icon: Car },
    { id: "guvd-gov-wave", label: "Гос волны", icon: Radio },
    { id: "guvd-binds", label: "Бинды", icon: Terminal },
  ]

  const gibddItems = [
    { id: "gibdd-positions", label: "Должности", icon: UserCog },
    { id: "gibdd-vehicles", label: "Транспорт", icon: Car },
    { id: "gibdd-gov-wave", label: "Гос волны", icon: Radio },
    { id: "gibdd-binds", label: "Бинды", icon: Terminal },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "modern-sidebar fixed left-0 top-0 h-screen z-50 transform transition-all duration-300 lg:sticky lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex flex-col h-full min-h-0">
          <div className={cn("border-b border-sidebar-border", isCollapsed ? "p-1" : "p-4")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn("bg-primary rounded-xl flex items-center justify-center", isCollapsed ? "w-8 h-8" : "w-8 h-8")}>
                  <span className="text-primary-foreground font-bold text-xs">МВД</span>
                </div>
                {!isCollapsed && (
                  <div>
                    <h2 className="font-bold text-base text-sidebar-foreground">Методичка</h2>
                    <p className="text-xs text-muted-foreground">МВД РП</p>
                  </div>
                )}
              </div>
              <div className={cn("flex items-center", isCollapsed ? "gap-0.5" : "gap-1")}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCollapse}
                  className={cn("rounded-lg transition-all duration-200", isCollapsed ? "h-6 w-6" : "h-7 w-7")}
                >
                  <ChevronRight className={cn("transition-transform duration-200", isCollapsed ? "rotate-180" : "", isCollapsed ? "h-3 w-3" : "h-3 w-3")} />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden rounded-lg h-7 w-7">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className={cn("border-b border-sidebar-border", isCollapsed ? "p-1" : "p-3")}>
            <Button
              variant="outline"
              className={cn(
                "border-dashed hover:bg-transparent rounded-lg bg-transparent",
                isCollapsed ? "w-7 h-7 p-0 justify-center" : "w-full justify-start gap-2 h-8 text-left"
              )}
              onClick={onGlobalSearchOpen}
              title={isCollapsed ? "Поиск материалов" : undefined}
            >
              <Search className="h-3 w-3 text-muted-foreground" />
              {!isCollapsed && <span className="text-muted-foreground text-xs">Поиск материалов...</span>}
            </Button>
          </div>

          <ScrollArea className="flex-1 min-h-0">
            <div className={cn(isCollapsed ? "px-1 py-1" : "px-3 py-3")}>
              <nav className="space-y-1">
                {menuItems.map(renderMenuItem)}

                <div className="py-2">
                  <div className="h-px bg-border" />
                </div>

                <div>
                  <Button
                    variant="ghost"
                    className={cn(
                      "font-medium text-foreground hover:bg-transparent rounded-lg",
                      isCollapsed
                        ? "w-7 h-7 p-0 justify-center"
                        : "w-full justify-start gap-2 h-8 text-left"
                    )}
                    onClick={() => toggleSection("guvd")}
                    title={isCollapsed ? "ГУВД" : undefined}
                  >
                    <Shield className={cn(isCollapsed ? "h-4 w-4" : "h-3 w-3")} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-xs">ГУВД</span>
                        {expandedSections.guvd ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                      </>
                    )}
                  </Button>
                  {expandedSections.guvd && (
                    <div
                      className={cn(
                        isCollapsed ? "ml-0 mt-1" : "ml-3 mt-1",
                        "space-y-1 overflow-hidden"
                      )}
                      style={{
                        transition: 'all 0.3s ease-in-out',
                        maxHeight: expandedSections.guvd ? '500px' : '0px',
                        opacity: expandedSections.guvd ? 1 : 0,
                      }}
                    >
                      {guvdItems.map(renderMenuItem)}
                    </div>
                  )}
                </div>

                <div>
                  <Button
                    variant="ghost"
                    className={cn(
                      "font-medium text-foreground hover:bg-transparent rounded-lg",
                      isCollapsed
                        ? "w-7 h-7 p-0 justify-center"
                        : "w-full justify-start gap-2 h-8 text-left"
                    )}
                    onClick={() => toggleSection("gibdd")}
                    title={isCollapsed ? "ГИБДД" : undefined}
                  >
                    <Car className={cn(isCollapsed ? "h-4 w-4" : "h-3 w-3")} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-xs">ГИБДД</span>
                        {expandedSections.gibdd ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                      </>
                    )}
                  </Button>
                  {expandedSections.gibdd && (
                    <div
                      className={cn(
                        isCollapsed ? "ml-0 mt-1" : "ml-3 mt-1",
                        "space-y-1 overflow-hidden"
                      )}
                      style={{
                        transition: 'all 0.3s ease-in-out',
                        maxHeight: expandedSections.gibdd ? '500px' : '0px',
                        opacity: expandedSections.gibdd ? 1 : 0,
                      }}
                    >
                      {gibddItems.map(renderMenuItem)}
                    </div>
                  )}
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
            </div>
          </ScrollArea>

        </div>
      </aside>
    </>
  )
}
