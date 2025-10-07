"use client"

import { Search, Menu, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { currentUser, logout } = useAuth()

  return (
    <>
      <header className="modern-nav px-4 py-3 border-b-2 border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-transparent opacity-30"></div>
        <div className="flex items-center justify-between max-w-7xl mx-auto relative z-10">
          {/* Левая часть: Меню + Лого */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden rounded-xl h-10 w-10 hover:bg-primary/20 border-2 border-primary/30">
              <Menu className="h-5 w-5 text-primary" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center border-2 border-primary/50 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 shadow-xl shadow-primary/20">
                <img src="/mvd-logo.jpg" alt="МВД Лого" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div>
                <h1 className="text-base font-black text-foreground uppercase tracking-widest">Методичка МВД</h1>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">Министерство</span>
                  <span className="text-xs text-accent font-bold uppercase tracking-wider">Внутренних Дел</span>
                </div>
              </div>
            </div>
          </div>

          {/* Центр: Поиск */}
          <div className="relative hidden lg:block flex-1 max-w-md mx-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              placeholder="Поиск по материалам..."
              className="pl-10 w-full h-10 rounded-xl border-2 border-primary/30 bg-background/50 font-semibold text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              onClick={onSearchClick}
            />
          </div>

          {/* Правая часть: Пользователь + Управление */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl border-2 border-primary/40 shadow-xl shadow-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-50"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center border-2 border-primary/60 shadow-lg animate-pulse-glow">
                  <User className="h-5 w-5 text-primary-foreground" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
                <div className="flex flex-col relative z-10">
                  <span className="text-sm font-black text-foreground uppercase tracking-wider">{currentUser.nickname}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{roleDisplayNames[currentUser.role] || currentUser.role}</span>
                  </div>
                </div>
              </div>
            )}

            <Button variant="ghost" size="icon" onClick={onSearchClick} className="lg:hidden rounded-xl h-11 w-11 hover:bg-primary/20 border-2 border-primary/30 shadow-lg">
              <Search className="h-5 w-5 text-primary" />
            </Button>

            {currentUser ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="rounded-xl h-11 px-5 border-2 border-primary/50 hover:bg-primary/10 bg-transparent font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <LogOut className="h-5 w-5 mr-2 text-primary" />
                <span className="hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Выйти</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsLoginModalOpen(true)}
                className="rounded-xl h-11 px-6 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 font-black uppercase tracking-widest shadow-xl shadow-primary/40 animate-pulse-glow transition-all hover:scale-105"
              >
                <LogIn className="h-5 w-5 mr-2" />
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