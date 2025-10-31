"use client"

import { Input } from"@/components/ui/input"
import { Label } from"@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select"
import { Search } from"lucide-react"

interface UserFiltersProps {
 userSearch: string
 onUserSearchChange: (value: string) => void
 roleFilter:"all" |"gibdd" |"guvd"
 onRoleFilterChange: (value:"all" |"gibdd" |"guvd") => void
}

export function UserFilters({
 userSearch,
 onUserSearchChange,
 roleFilter,
 onRoleFilterChange,
}: UserFiltersProps) {
 return (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <Label htmlFor="user-search" className="text-sm font-medium mb-2 block">
 Поиск пользователей
 </Label>
 <div className="relative">
 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
 <Input
 id="user-search"
 placeholder="Поиск по никнейму или логину..."
 value={userSearch}
 onChange={(e) => onUserSearchChange(e.target.value)}
 className="pl-10 bg-background border-border"
 />
 </div>
 </div>
 <div>
 <Label htmlFor="role-filter" className="text-sm font-medium mb-2 block">
 Фильтр по роли
 </Label>
 <Select value={roleFilter} onValueChange={onRoleFilterChange}>
 <SelectTrigger id="role-filter" className="bg-background border-border">
 <SelectValue placeholder="Выберите роль" />
 </SelectTrigger>
 <SelectContent className="bg-popover border-border">
 <SelectItem value="all">Все роли</SelectItem>
 <SelectItem value="gibdd">Роли ГИБДД</SelectItem>
 <SelectItem value="guvd">Роли ГУВД</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 )
}
