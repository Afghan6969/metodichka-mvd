"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar } from "lucide-react"

interface LogFiltersProps {
  logSearch: string
  onLogSearchChange: (value: string) => void
  actionFilter: string | "all"
  onActionFilterChange: (value: string) => void
  actionDisplayNames: Record<string, string>
}

export function LogFilters({
  logSearch,
  onLogSearchChange,
  actionFilter,
  onActionFilterChange,
  actionDisplayNames,
}: LogFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="log-search" className="text-sm font-medium mb-2 block text-white">
          Поиск в логах
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
          <Input
            id="log-search"
            placeholder="Поиск по действию, пользователю или дате (например: 15 октября 2024)..."
            value={logSearch}
            onChange={(e) => onLogSearchChange(e.target.value)}
            className="pl-10 bg-black/5 border-white/15 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="action-filter" className="text-sm font-medium mb-2 block text-white">
          Фильтр по действию
        </Label>
        <Select value={actionFilter} onValueChange={onActionFilterChange}>
          <SelectTrigger id="action-filter" className="bg-black/5 border-white/15 text-white">
            <SelectValue placeholder="Выберите действие" />
          </SelectTrigger>
          <SelectContent className="bg-white/10 border-white/20 backdrop-blur-xl">
            <SelectItem value="all">Все действия</SelectItem>
            {Object.keys(actionDisplayNames).map((action) => (
              <SelectItem key={action} value={action}>
                {actionDisplayNames[action]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
