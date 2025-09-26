"use client"

import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ModernHeaderProps {
  onMenuClick: () => void
  onSearchClick: () => void
}

export function ModernHeader({ onMenuClick, onSearchClick }: ModernHeaderProps) {
  return (
    <header className="modern-nav px-8 py-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden rounded-xl">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-xl">МВД</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Методичка МВД</h1>
              <p className="text-sm text-muted-foreground font-medium">Образовательная платформа</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Поиск по материалам..."
              className="pl-12 w-96 h-12 rounded-xl border-2 border-primary/20 focus:border-primary/40 bg-background/50 backdrop-blur-sm font-medium"
              onClick={onSearchClick}
            />
          </div>
          <Button variant="ghost" size="icon" onClick={onSearchClick} className="md:hidden rounded-xl">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
