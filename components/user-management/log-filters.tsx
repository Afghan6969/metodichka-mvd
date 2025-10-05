"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

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
        <Label htmlFor="log-search" className="text-sm font-medium mb-2 block">
          Поиск в логах
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="log-search"
            placeholder="Поиск по действию, пользователю или дате..."
            value={logSearch}
            onChange={(e) => onLogSearchChange(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="action-filter" className="text-sm font-medium mb-2 block">
          Фильтр по действию
        </Label>
        <Select value={actionFilter} onValueChange={onActionFilterChange}>
          <SelectTrigger id="action-filter" className="bg-background border-border">
            <SelectValue placeholder="Выберите действие" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border backdrop-blur-xl">
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
