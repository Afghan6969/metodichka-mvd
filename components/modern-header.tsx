"use client"

import { Search, Menu, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { roleDisplayNames } from "@/components/user-management/constants"
import { LoginModal } from "@/components/user-management"
import { ThemeSwitcher } from "@/components/theme-switcher"

interface ModernHeaderProps {
  onMenuClick: () => void
  onSearchClick: () => void
}

export function ModernHeader({ onMenuClick, onSearchClick }: ModernHeaderProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { currentUser, logout } = useAuth()

  return (
    <>
      <header className="modern-nav px-4 py-3 border-b-2 border-primary/30 relative overflow-hidden">
        <div className="flex items-center justify-between max-w-7xl mx-auto relative z-10">
          {/* Левая часть: Меню + Лого */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden rounded-xl h-10 w-10 hover:bg-primary/20 border-2 border-primary/30">
              <Menu className="h-5 w-5 text-primary" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center border-2 border-primary/50 overflow-hidden">
                <img src="/mvd-logo.jpg" alt="МВД Лого" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div>
                <h1 className="text-base font-black text-foreground uppercase tracking-widest">Методичка МВД</h1>
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
            <ThemeSwitcher />

            {currentUser && (
              <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-xl border border-primary/30 relative">
                <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center border border-primary/50">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">{currentUser.nickname}</span>
                  <span className="text-xs text-primary/80 font-medium">{roleDisplayNames[currentUser.role] || currentUser.role}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    console.log('Logout clicked');
                    logout();
                  }}
                  className="ml-2 p-1 h-8 w-8 rounded-md hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" onClick={onSearchClick} className="lg:hidden rounded-xl h-10 w-10 hover:bg-primary/20 border border-primary/30 shadow-md">
              <Search className="h-4 w-4 text-primary" />
            </Button>

            {!currentUser && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsLoginModalOpen(true)}
                className="rounded-xl h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
