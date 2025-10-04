"use client"

import { Search, Menu, Moon, Sun, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { LoginModal } from "@/components/login-modal"

interface ModernHeaderProps {
  onMenuClick: () => void
  onSearchClick: () => void
}

const roleDisplayNames: Record<string, string> = {
  root: "Владелец",
  "gs-gibdd": "ГС ГИБДД",
  "pgs-gibdd": "ПГС ГИБДД",
  "gs-guvd": "ГС ГУВД",
  "pgs-guvd": "ПГС ГУВД",
  "ss-gibdd": "СС ГИБДД",
  "ss-guvd": "СС ГУВД",
  gibdd: "ГИБДД",
  guvd: "ГУВД",
  none: "Без роли",
}

export function ModernHeader({ onMenuClick, onSearchClick }: ModernHeaderProps) {
  const [isDark, setIsDark] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { currentUser, logout } = useAuth()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark)
    setIsDark(shouldBeDark)

    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <>
      <header className="modern-nav px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Левая часть: Меню + Лого */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden rounded-xl h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
                <img src="/mvd-logo.jpg" alt="МВД Лого" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Методичка МВД</h1>
                <p className="text-xs text-muted-foreground">Вспомогательная платформа</p>
              </div>
            </div>
          </div>

          {/* Центр: Поиск */}
          <div className="relative hidden lg:block flex-1 max-w-md mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по материалам..."
              className="pl-10 w-full h-10 rounded-xl border bg-background font-medium text-sm"
              onClick={onSearchClick}
            />
          </div>

          {/* Правая часть: Пользователь + Управление */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{currentUser.nickname}</span>
                  <span className="text-xs font-medium text-primary/80">{roleDisplayNames[currentUser.role] || currentUser.role}</span>
                </div>
              </div>
            )}

            <Button variant="ghost" size="icon" onClick={onSearchClick} className="lg:hidden rounded-xl h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl h-9 w-9 hover:bg-muted"
              aria-label={isDark ? "Переключить на светлую тему" : "Переключить на темную тему"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {currentUser ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="rounded-xl h-9 px-3 border-border hover:bg-muted bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Выйти</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsLoginModalOpen(true)}
                className="rounded-xl h-9 px-3 bg-primary hover:bg-primary/90"
              >
                <LogIn className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Войти</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}