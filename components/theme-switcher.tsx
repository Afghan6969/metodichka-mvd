"use client"

import { Palette } from"lucide-react"
import { Button } from"@/components/ui/button"
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from"@/components/ui/dropdown-menu"
import { useTheme, themes, type ThemeName } from"@/lib/theme-context"

export function ThemeSwitcher() {
 const { theme, setTheme } = useTheme()

 return (
 <DropdownMenu>
 <DropdownMenuTrigger asChild>
 <Button
 variant="ghost"
 size="icon"
 className="rounded-xl h-10 w-10 hover:bg-primary/20 border border-primary/30 shadow-md relative overflow-hidden group"
 >
 <Palette className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
 <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
 </Button>
 </DropdownMenuTrigger>
 <DropdownMenuContent align="end" className="w-56 bg-card/95 border-2 border-primary/30">
 <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
 Выбор темы
 </div>
 {Object.values(themes).map((themeOption) => (
 <DropdownMenuItem
 key={themeOption.name}
 onClick={() => setTheme(themeOption.name as ThemeName)}
 className={`cursor-pointer rounded-lg my-1 ${
 theme === themeOption.name
 ?"bg-primary/20 text-primary font-semibold border border-primary/40"
 :"hover:bg-primary/10"
 }`}
 >
 <div className="flex items-center gap-3 w-full">
 <div className={`w-4 h-4 rounded-full border-2 ${
 theme === themeOption.name ?"border-primary bg-primary" :"border-muted-foreground"
 }`}>
 {theme === themeOption.name && (
 <div className="w-full h-full rounded-full bg-primary-foreground scale-50"></div>
 )}
 </div>
 <span className="flex-1">{themeOption.displayName}</span>
 </div>
 </DropdownMenuItem>
 ))}
 </DropdownMenuContent>
 </DropdownMenu>
 )
}
