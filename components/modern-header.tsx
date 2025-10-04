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
  "moderator-gibdd": "Модератор ГИБДД",
  "moderator-guvd": "Модератор ГУВД",
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

          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-xl border border-border">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{currentUser.nickname}</span>
                  <span className="text-xs text-muted-foreground">{roleDisplayNames[currentUser.role]}</span>
                </div>
              </div>
            )}

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по материалам..."
                className="pl-10 w-80 h-10 rounded-xl border bg-background font-medium text-sm"
                onClick={onSearchClick}
              />
            </div>
            <Button variant="ghost" size="icon" onClick={onSearchClick} className="md:hidden rounded-xl h-9 w-9">
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
