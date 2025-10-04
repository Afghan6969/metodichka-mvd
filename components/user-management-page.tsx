"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Trash2, Shield, AlertCircle, CheckCircle, Edit2, X, Check, History, UserCog } from "lucide-react"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

// Определение отображаемых имен ролей
const roleDisplayNames: Record<UserRole, string> = {
  root: "Владелец",
  "moderator-gibdd": "Модератор ГИБДД",
  "moderator-guvd": "Модератор ГУВД",
  "ss-gibdd": "СС ГИБДД",
  "ss-guvd": "СС ГУВД",
  gibdd: "ГИБДД",
  guvd: "ГУВД",
  none: "Без роли",
}

// Описания ролей
const roleDescriptions: Record<UserRole, string> = {
  root: "Полный доступ ко всем функциям системы",
  "moderator-gibdd": "Полный доступ к управлению пользователями и всем функциям ГИБДД",
  "moderator-guvd": "Полный доступ к управлению пользователями и всем функциям ГУВД",
  "ss-gibdd": "Старший состав ГИБДД - доступ к генератору и гос. волне ГИБДД",
  "ss-guvd": "Старший состав ГУВД - доступ к генератору и гос. волне ГУВД",
  gibdd: "Сотрудник ГИБДД - доступ к генератору отчётов",
  guvd: "Сотрудник ГУВД - доступ к генератору отчётов",
  none: "Нет доступа к защищённым страницам",
}

// Определение вариантов бейджей для ролей
const getRoleBadgeVariant = (role: UserRole) => {
  if (role === "root") return "default"
  if (role.startsWith("moderator")) return "default"
  if (role.startsWith("ss")) return "secondary"
  return "outline"
}

// Отображаемые имена действий
const actionDisplayNames: Record<string, string> = {
  add_user: "Добавление",
  remove_user: "Удаление",
  update_user: "Изменение",
}

export function UserManagementPage() {
  const { currentUser, users, userLogs, addUser, removeUser, updateUser, canManageUsers } = useAuth()
  const [nickname, setNickname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("none")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editUsername, setEditUsername] = useState("")
  const [editPassword, setEditPassword] = useState("")
  const [editRole, setEditRole] = useState<UserRole>("none")

  const [activeTab, setActiveTab] = useState<"users" | "logs">("users")

  useEffect(() => {
    console.log("[UserManagement] Users updated:", users.length, users)
  }, [users])

  if (!currentUser || !canManageUsers()) {
    return (
      <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
        <div className="max-w-2xl mx-auto mt-16">
          <Card className="p-8 bg-card shadow-xl border-border rounded-2xl">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-10 w-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Доступ запрещен</h1>
              <p className="text-muted-foreground">Эта страница доступна только модераторам</p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

const handleAddUser = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setSuccess("")
  setIsLoading(true)

  // Проверка заполненности полей
  if (!nickname || !username || !password) {
    setError("Пожалуйста, заполните все поля")
    setIsLoading(false)
    return
  }

  // Валидация никнейма: должен быть формат Имя_Фамилия
  const nicknameRegex = /^[А-ЯA-Z][а-яa-z]+_[А-ЯA-Z][а-яa-z]+$/
  if (!nicknameRegex.test(nickname)) {
    setError("Никнейм должен быть в формате Имя_Фамилия (например: Иван_Петров)")
    setIsLoading(false)
    return
  }

  // Проверка минимальной длины имени и фамилии
  const [firstName, lastName] = nickname.split('_')
  if (firstName.length < 2 || lastName.length < 2) {
    setError("Имя и фамилия должны содержать минимум 2 символа каждое")
    setIsLoading(false)
    return
  }

  // Валидация логина: минимум 3 символа
  if (username.length < 3) {
    setError("Логин должен содержать минимум 3 символа")
    setIsLoading(false)
    return
  }

  // Валидация пароля: минимум 6 символов
  if (password.length < 6) {
    setError("Пароль должен содержать минимум 6 символов")
    setIsLoading(false)
    return
  }

  const result = await addUser(nickname, username, password, role)
  if (result) {
    setSuccess(`Пользователь ${nickname} успешно добавлен`)
    setNickname("")
    setUsername("")
    setPassword("")
    setRole("none")
  } else {
    setError("Пользователь с таким логином уже существует")
  }
  setIsLoading(false)
}

  const handleRemoveUser = async (userId: string, nickname: string) => {
    if (confirm(`Вы уверены, что хотите удалить пользователя ${nickname}?`)) {
      console.log("[UserManagement] Starting user removal...", { userId, nickname })
      setIsLoading(true)
      setError("")
      setSuccess("")

      const result = await removeUser(userId)

      console.log("[UserManagement] Removal result:", result)

      if (result) {
        setSuccess(`Пользователь ${nickname} успешно удален`)
        setError("")
      } else {
        setError("Невозможно удалить этого пользователя")
        setSuccess("")
      }
      setIsLoading(false)
    }
  }

  const startEditing = (userId: string, username: string, currentRole: UserRole) => {
    setEditingUserId(userId)
    setEditUsername(username)
    setEditPassword("")
    setEditRole(currentRole)
    setError("")
    setSuccess("")
  }

  const cancelEditing = () => {
    setEditingUserId(null)
    setEditUsername("")
    setEditPassword("")
    setEditRole("none")
  }

  const saveEdit = async (userId: string, nickname: string) => {
    if (!editUsername) {
      setError("Логин не может быть пустым")
      return
    }

    setIsLoading(true)
    const passwordToUse = editPassword || undefined
    const result = await updateUser(userId, editUsername, passwordToUse, editRole)
    if (result) {
      setSuccess(`Пользователь ${nickname} успешно обновлен`)
      setEditingUserId(null)
      setEditUsername("")
      setEditPassword("")
      setEditRole("none")
    } else {
      setError("Пользователь с таким логином уже существует")
    }
    setIsLoading(false)
  }

  const getAvailableRoles = (): UserRole[] => {
    if (!currentUser) return []

    if (currentUser.role === "root") {
      return ["moderator-gibdd", "moderator-guvd", "ss-gibdd", "ss-guvd", "gibdd", "guvd"]
    } else if (currentUser.role === "moderator-gibdd") {
      return ["moderator-gibdd", "ss-gibdd", "gibdd"]
    } else if (currentUser.role === "moderator-guvd") {
      return ["moderator-guvd", "ss-guvd", "guvd"]
    }

    return []
  }

  const availableRoles = getAvailableRoles()
  const isRoot = currentUser?.role === "root"

  return (
    <div className="flex-1 p-8 overflow-auto bg-background min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        {(error || success) && (
          <Alert variant={error ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || success}</AlertDescription>
          </Alert>
        )}

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-3 text-foreground">
              <UserPlus className="h-5 w-5" />
              Добавить пользователя
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
<form onSubmit={handleAddUser} className="space-y-4">
  <div>
    <Label htmlFor="nickname">Никнейм</Label>
    <Input
      id="nickname"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      disabled={isLoading}
      placeholder="Имя_Фамилия"
      className="bg-white text-white-900 border-2 border-gray-500 rounded-lg text-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    />
    <p className="text-xs text-muted-foreground mt-1">
      Формат: Имя_Фамилия (например: Ivan_Ivano)
    </p>
  </div>
  <div>
    <Label htmlFor="username">Логин</Label>
    <Input
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      disabled={isLoading}
      placeholder="login123"
      className="bg-white text-white-900 border-2 border-gray-500 rounded-lg text-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    />
    <p className="text-xs text-muted-foreground mt-1">
      Минимум 3 символа
    </p>
  </div>
  <div>
    <Label htmlFor="password">Пароль</Label>
    <Input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      disabled={isLoading}
      placeholder="••••••"
      className="bg-white text-white-900 border-2 border-gray-500 rounded-lg text-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    />
    <p className="text-xs text-muted-foreground mt-1">
      Минимум 6 символов
    </p>
  </div>
              <div>
                <Label htmlFor="role">Роль</Label>
                <Select value={role} onValueChange={setRole} disabled={isLoading}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((r) => (
                      <SelectItem key={r} value={r}>
                        {roleDisplayNames[r]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                <UserPlus className="h-4 w-4 mr-2" />
                Добавить
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="flex gap-4">
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => setActiveTab("users")}
              disabled={isLoading}
            >
              <Users className="h-4 w-4 mr-2" />
              Пользователи
            </Button>
            {isRoot && (
              <Button
                variant={activeTab === "logs" ? "default" : "outline"}
                onClick={() => setActiveTab("logs")}
                disabled={isLoading}
              >
                <History className="h-4 w-4 mr-2" />
                Журнал
              </Button>
            )}
          </div>

{activeTab === "users" && (
  <Card className="bg-card border-border shadow-lg">
    <CardHeader className="border-b border-border">
      <CardTitle className="flex items-center gap-3 text-foreground">
        <Users className="h-5 w-5" />
        Пользователи ({users.length})
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-6">
      <div className="space-y-4">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="p-4 border-2 border-border rounded-xl hover:border-primary/50 transition-all bg-card/50"
          >
            {editingUserId === user.id ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`edit-username-${user.id}`} className="text-sm font-medium">
                    Логин
                  </Label>
                  <Input
                    id={`edit-username-${user.id}`}
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    disabled={isLoading}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`edit-password-${user.id}`} className="text-sm font-medium">
                    Пароль (оставьте пустым, чтобы не менять)
                  </Label>
                  <Input
                    id={`edit-password-${user.id}`}
                    type="password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="Оставьте пустым для сохранения текущего"
                    disabled={isLoading}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`edit-role-${user.id}`} className="text-sm font-medium">
                    Роль
                  </Label>
                  <Select value={editRole} onValueChange={setEditRole} disabled={isLoading}>
                    <SelectTrigger id={`edit-role-${user.id}`} className="mt-1">
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {roleDisplayNames[r]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => saveEdit(user.id, user.nickname)}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Сохранить
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelEditing}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Отмена
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Никнейм и роль */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <UserCog className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-foreground">
                          {user.nickname}
                        </h3>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {roleDisplayNames[user.role]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Логин: <span className="font-mono">{user.username}</span>
                      </p>
                    </div>
                  </div>

                  {/* Дополнительная информация */}
                  <div className="pl-13 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Создан:</span>
                      <span>{format(new Date(user.created_at), "dd MMMM yyyy, HH:mm", { locale: ru })}</span>
                    </div>
                    {user.created_by_user && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Добавил:</span>
                        <span>{user.created_by_user.nickname}</span>
                        <Badge variant="outline" className="text-xs py-0 px-1.5">
                          {roleDisplayNames[user.created_by_user.role]}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Кнопки действий */}
                {user.role !== "root" && (
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => startEditing(user.id, user.username, user.role)}
                      className="h-9 w-9"
                      disabled={isLoading}
                      title="Редактировать"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveUser(user.id, user.nickname)}
                      className="h-9 w-9"
                      disabled={isLoading}
                      title="Удалить"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)}

          {activeTab === "logs" && isRoot && (
            <div className="space-y-6">
              <Card className="bg-card border-border shadow-lg">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center gap-3 text-foreground">
                    <History className="h-5 w-5" />
                    Журнал действий ({userLogs?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {userLogs && userLogs.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Журнал пуст</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {userLogs &&
                        userLogs.map((log) => (
                          <div
                            key={log.id}
                            className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-shrink-0 mt-1">
                              {log.action === "add_user" && (
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                  <UserPlus className="h-4 w-4 text-green-400" />
                                </div>
                              )}
                              {log.action === "remove_user" && (
                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                  <Trash2 className="h-4 w-4 text-red-400" />
                                </div>
                              )}
                              {log.action === "update_user" && (
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <Edit2 className="h-4 w-4 text-blue-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {actionDisplayNames[log.action] || log.action}
                                </Badge>
                                <span className="text-sm font-medium text-foreground">
                                  {log.target_user_nickname}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{log.details}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Выполнил: {log.performed_by_nickname}</span>
                                <span>•</span>
                                <span>{format(new Date(log.created_at), "dd MMM yyyy, HH:mm", { locale: ru })}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}