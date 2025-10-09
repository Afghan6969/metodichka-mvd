"use client"

import { User, UserRole } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCog, Edit2, History, Trash2, RotateCcw, Check, X, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface UserCardProps {
  user: User
  isEditing: boolean
  isSelected: boolean
  showDeactivated: boolean
  editNickname: string
  editUsername: string
  editPassword: string
  editRole: UserRole
  onToggleSelect: () => void
  onStartEdit: () => void
  onCancelEdit: () => void
  onSaveEdit: () => void
  onViewHistory: () => void
  onDeactivate: () => void
  onRestore: () => void
  onEditNicknameChange: (value: string) => void
  onEditUsernameChange: (value: string) => void
  onEditPasswordChange: (value: string) => void
  onEditRoleChange: (value: UserRole) => void
  canEdit: boolean
  canDelete: boolean
  isLoading: boolean
  availableRoles: UserRole[]
  roleDisplayNames: Record<string, string>
  getRoleBadgeVariant: (role: UserRole) => "default" | "secondary" | "outline"
}

export function UserCard({
  user,
  isEditing,
  isSelected,
  showDeactivated,
  editNickname,
  editUsername,
  editPassword,
  editRole,
  onToggleSelect,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onViewHistory,
  onDeactivate,
  onRestore,
  onEditNicknameChange,
  onEditUsernameChange,
  onEditPasswordChange,
  onEditRoleChange,
  canEdit,
  canDelete,
  isLoading,
  availableRoles,
  roleDisplayNames,
  getRoleBadgeVariant,
}: UserCardProps) {
  return (
    <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
      {isEditing ? (
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor={`edit-nickname-${user.id}`} className="text-sm font-medium text-white">
              Никнейм
            </Label>
            <Input
              id={`edit-nickname-${user.id}`}
              value={editNickname}
              onChange={(e) => onEditNicknameChange(e.target.value)}
              disabled={isLoading}
              className="mt-1 bg-black/5 border-white/15 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
          </div>
          <div>
            <Label htmlFor={`edit-username-${user.id}`} className="text-sm font-medium text-white">
              Логин
            </Label>
            <Input
              id={`edit-username-${user.id}`}
              value={editUsername}
              onChange={(e) => onEditUsernameChange(e.target.value)}
              disabled={isLoading}
              className="mt-1 bg-black/5 border-white/15 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
          </div>
          <div>
            <Label htmlFor={`edit-password-${user.id}`} className="text-sm font-medium text-white">
              Новый пароль
            </Label>
            <Input
              id={`edit-password-${user.id}`}
              type="password"
              value={editPassword}
              onChange={(e) => onEditPasswordChange(e.target.value)}
              placeholder="Не трогайте, чтобы не сменить пароль"
              disabled={isLoading}
              className="mt-1 bg-black/5 border-white/15 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
            <p className="text-xs text-blue-200/80 mt-1">Оставьте пустым, если не хотите менять пароль</p>
          </div>
          <div>
            <Label htmlFor={`edit-role-${user.id}`} className="text-sm font-medium text-white">
              Роль
            </Label>
            <Select value={editRole} onValueChange={(value) => onEditRoleChange(value as UserRole)} disabled={isLoading}>
              <SelectTrigger id={`edit-role-${user.id}`} className="mt-1 bg-black/5 border-white/15 text-white">
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent className="bg-white/10 border-white/20 backdrop-blur-xl">
                {availableRoles.filter(r => r !== "root").map((r) => (
                  <SelectItem key={r} value={r}>
                    {roleDisplayNames[r]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              onClick={onSaveEdit}
              className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-100 hover:text-blue-50 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Сохранить
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onCancelEdit}
              className="flex-1 border-blue-400/40 text-blue-200 hover:bg-blue-500/10 hover:text-blue-100"
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="mt-2 h-4 w-4 text-blue-400 border-white/20 rounded focus:ring-blue-400"
              disabled={!canDelete || isLoading}
            />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                  <UserCog className="h-5 w-5 text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-white">{user.nickname}</h3>
                    <Badge variant={getRoleBadgeVariant(user.role)} className="border-blue-400/40 text-blue-300 bg-blue-500/10">
                      {roleDisplayNames[user.role] || user.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-200/80">
                    Логин: <span className="font-mono">{user.username}</span>
                  </p>
                </div>
              </div>
              <div className="text-xs text-blue-200/80 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Создан:</span>
                  <span>{format(new Date(user.created_at), "dd MMMM yyyy, HH:mm", { locale: ru })}</span>
                </div>
                {user.created_by_user && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Добавил:</span>
                    <span>{user.created_by_user.nickname}</span>
                    <Badge variant="outline" className="border-blue-400/40 text-blue-300 bg-blue-500/10 text-xs">
                      {roleDisplayNames[user.created_by_user.role]}
                    </Badge>
                  </div>
                )}
                {user.status === "deactivated" && user.deactivated_by_user && user.deactivated_at && (
                  <div className="flex items-center gap-2 text-red-300">
                    <span className="font-medium">Деактивирован:</span>
                    <span>{format(new Date(user.deactivated_at), "dd MMMM yyyy, HH:mm", { locale: ru })}</span>
                    <span>•</span>
                    <span>{user.deactivated_by_user.nickname}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {!showDeactivated ? (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onStartEdit}
                    className="h-10 w-10 border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300"
                    disabled={isLoading || !canEdit}
                    title="Редактировать"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onViewHistory}
                    className="h-10 w-10 border-purple-400/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/50 text-purple-300"
                    disabled={isLoading}
                    title="История изменений"
                  >
                    <History className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={onDeactivate}
                    className="h-10 w-10 bg-red-500/20 hover:bg-red-500/30 border-red-400/40 text-red-300 hover:text-red-200"
                    disabled={isLoading || !canDelete}
                    title="Деактивировать"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onViewHistory}
                    className="h-9 w-9 border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300"
                    disabled={isLoading}
                    title="История изменений"
                  >
                    <History className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onRestore}
                    className="h-9 w-9 border-green-400/30 bg-green-500/10 hover:bg-green-500/20 hover:border-green-400/50 text-green-300"
                    disabled={isLoading}
                    title="Восстановить"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
