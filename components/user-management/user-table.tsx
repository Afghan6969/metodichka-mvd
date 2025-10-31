"use client"

import { useState } from"react"
import { User, UserRole } from"@/lib/auth-context"
import { Button } from"@/components/ui/button"
import { Badge } from"@/components/ui/badge"
import { Checkbox } from"@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select"
import { Pencil, Trash2, RotateCcw, History } from"lucide-react"
import { format } from"date-fns"
import { ru } from"date-fns/locale"

interface UserTableProps {
 users: User[]
 selectedUsers: string[]
 onSelectUser: (userId: string) => void
 onSelectAll: () => void
 onEdit: (user: User) => void
 onDeactivate: (userId: string, nickname: string) => void
 onRestore: (userId: string, nickname: string) => void
 onViewHistory: (userId: string) => void
 roleDisplayNames: Record<string, string>
 getRoleBadgeVariant: (role: UserRole) =>"default" |"secondary" |"outline"
}

export function UserTable({
 users,
 selectedUsers,
 onSelectUser,
 onSelectAll,
 onEdit,
 onDeactivate,
 onRestore,
 onViewHistory,
 roleDisplayNames,
 getRoleBadgeVariant,
}: UserTableProps) {
 return (
 <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="bg-muted/30 border-b border-border">
 <th className="text-left p-4 font-semibold text-sm text-muted-foreground w-12">
 <Checkbox
 checked={users.length > 0 && selectedUsers.length === users.length}
 onCheckedChange={onSelectAll}
 aria-label="Выбрать всех"
 />
 </th>
 <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Никнейм</th>
 <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Логин</th>
 <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Роль</th>
 <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Статус</th>
 <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Дата создания</th>
 <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Создал</th>
 <th className="text-right p-4 font-semibold text-sm text-muted-foreground">Действия</th>
 </tr>
 </thead>
 <tbody>
 {users.map((user) => (
 <tr
 key={user.id}
 className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
 >
 <td className="p-4">
 <Checkbox
 checked={selectedUsers.includes(user.id)}
 onCheckedChange={() => onSelectUser(user.id)}
 aria-label={`Выбрать ${user.nickname}`}
 />
 </td>
 <td className="p-4">
 <span className="font-medium text-foreground">{user.nickname}</span>
 </td>
 <td className="p-4">
 <span className="text-sm text-muted-foreground">{user.username}</span>
 </td>
 <td className="p-4">
 <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
 {roleDisplayNames[user.role] || user.role}
 </Badge>
 </td>
 <td className="p-4">
 <Badge variant={user.status ==="active" ?"default" :"secondary"} className="text-xs">
 {user.status ==="active" ?"Активен" :"Деактивирован"}
 </Badge>
 </td>
 <td className="p-4">
 <span className="text-sm text-muted-foreground">
 {format(new Date(user.created_at),"dd MMM yyyy, HH:mm", { locale: ru })}
 </span>
 </td>
 <td className="p-4">
 {user.created_by_user ? (
 <div className="flex flex-col">
 <span className="text-sm text-foreground">{user.created_by_user.nickname}</span>
 <span className="text-xs text-muted-foreground">
 {roleDisplayNames[user.created_by_user.role] || user.created_by_user.role}
 </span>
 </div>
 ) : (
 <span className="text-sm text-muted-foreground">—</span>
 )}
 </td>
 <td className="p-4">
 <div className="flex items-center justify-end gap-2">
 <Button
 variant="ghost"
 size="icon"
 onClick={() => onViewHistory(user.id)}
 className="h-8 w-8 rounded-lg"
 title="История"
 >
 <History className="h-4 w-4" />
 </Button>
 <Button
 variant="ghost"
 size="icon"
 onClick={() => onEdit(user)}
 className="h-8 w-8 rounded-lg"
 title="Редактировать"
 >
 <Pencil className="h-4 w-4" />
 </Button>
 {user.status ==="active" ? (
 <Button
 variant="ghost"
 size="icon"
 onClick={() => onDeactivate(user.id, user.nickname)}
 className="h-8 w-8 rounded-lg text-destructive hover:text-destructive"
 title="Деактивировать"
 >
 <Trash2 className="h-4 w-4" />
 </Button>
 ) : (
 <Button
 variant="ghost"
 size="icon"
 onClick={() => onRestore(user.id, user.nickname)}
 className="h-8 w-8 rounded-lg text-green-600 hover:text-green-700"
 title="Восстановить"
 >
 <RotateCcw className="h-4 w-4" />
 </Button>
 )}
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 {users.length === 0 && (
 <div className="p-8 text-center text-muted-foreground">
 <p>Пользователи не найдены</p>
 </div>
 )}
 </div>
 )
}
