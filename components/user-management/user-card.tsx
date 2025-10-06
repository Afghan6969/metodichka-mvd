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
    <div className="p-4 border border-border rounded-xl hover:border-primary/50 hover:bg-muted/30 transition-all bg-card">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`edit-nickname-${user.id}`} className="text-sm font-medium">
              Никнейм
            </Label>
            <Input
              id={`edit-nickname-${user.id}`}
              value={editNickname}
              onChange={(e) => onEditNicknameChange(e.target.value)}
              disabled={isLoading}
              className="mt-1 bg-background border-border rounded-lg text-base py-2.5"
            />
          </div>
          <div>
            <Label htmlFor={`edit-username-${user.id}`} className="text-sm font-medium">
              Логин
            </Label>
            <Input
              id={`edit-username-${user.id}`}
              value={editUsername}
              onChange={(e) => onEditUsernameChange(e.target.value)}
              disabled={isLoading}
              className="mt-1 bg-background border-border rounded-lg text-base py-2.5"
            />
          </div>
          <div>
            <Label htmlFor={`edit-password-${user.id}`} className="text-sm font-medium">
              Новый пароль
            </Label>
            <Input
              id={`edit-password-${user.id}`}
              type="password"
              value={editPassword}
              onChange={(e) => onEditPasswordChange(e.target.value)}
              placeholder="Не трогайте, чтобы не сменить пароль"
              disabled={isLoading}
              className="mt-1 bg-background border-border rounded-lg text-base py-2.5"
            />
            <p className="text-xs text-muted-foreground mt-1">Оставьте пустым, если не хотите менять пароль</p>
          </div>
          <div>
            <Label htmlFor={`edit-role-${user.id}`} className="text-sm font-medium">
              Роль
            </Label>
            <Select value={editRole} onValueChange={(value) => onEditRoleChange(value as UserRole)} disabled={isLoading}>
              <SelectTrigger id={`edit-role-${user.id}`} className="mt-1 bg-background border-border">
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border backdrop-blur-xl">
                {availableRoles.map((r) => (
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
              className="flex-1 bg-primary hover:bg-primary/90 rounded-lg py-2.5"
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
              className="flex-1 border-border rounded-lg py-2.5 hover:bg-muted"
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="mt-2 h-4 w-4 text-primary border-border rounded focus:ring-primary"
            disabled={!canDelete || isLoading}
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UserCog className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-foreground">{user.nickname}</h3>
                  <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs font-medium px-2 py-1">
                    {roleDisplayNames[user.role] || user.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Логин: <span className="font-mono">{user.username}</span>
                </p>
              </div>
            </div>
            <div className="pl-12 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium">Создан:</span>
                <span>{format(new Date(user.created_at), "dd MMMM yyyy, HH:mm", { locale: ru })}</span>
              </div>
              {user.created_by_user && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Добавил:</span>
                  <span>{user.created_by_user.nickname}</span>
                  <Badge variant="outline" className="text-xs py-0.5 px-2">
                    {roleDisplayNames[user.created_by_user.role]}
                  </Badge>
                </div>
              )}
              {user.status === "deactivated" && user.deactivated_by_user && user.deactivated_at && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
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
                  className="h-9 w-9 border-border rounded-lg hover:bg-muted"
                  disabled={isLoading || !canEdit}
                  title="Редактировать"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onViewHistory}
                  className="h-9 w-9 border-border rounded-lg hover:bg-muted"
                  disabled={isLoading}
                  title="История изменений"
                >
                  <History className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={onDeactivate}
                  className="h-9 w-9 rounded-lg"
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
                  className="h-9 w-9 border-border rounded-lg hover:bg-muted"
                  disabled={isLoading}
                  title="История изменений"
                >
                  <History className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onRestore}
                  className="h-9 w-9 border-border rounded-lg hover:bg-muted text-green-600 hover:text-green-700"
                  disabled={isLoading}
                  title="Восстановить"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
