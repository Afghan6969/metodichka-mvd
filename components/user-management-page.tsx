"use client"

import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Trash2, Shield, AlertCircle, Edit2, X, Check, History, UserCog, Search, Loader2, RotateCw } from "lucide-react"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

// CSS to prevent scroll when dialogs are open
const noScrollStyles = `
  body:has(.dialog-open) {
    overflow: hidden;
    padding-right: var(--scrollbar-width);
  }
  .dialog-open {
    overflow: hidden;
  }
`

// Role display names and descriptions
const roleDisplayNames: Record<UserRole, string> = {
  root: "Владелец",
  "gs-gibdd": "ГС ГИБДД",
  "pgs-gibdd": "ПГС ГИБДД",
  "gs-guvd": "ГС ГУВД",
  "pgs-guvd": "ПГС ГУВД",
  "ss-gibdd": "СС ГИБДД",
  "ss-guvd": "СС ГУВД",
  gibdd: "ГИБДД",
  guvd: "ГУВД",
  none: "Без роли",
  "moderator-gibdd": "ГС ГИБДД (старая)",
  "moderator-guvd": "ГС ГУВД (старая)",
}

const roleDescriptions: Record<UserRole, string> = {
  root: "Полный доступ ко всем функциям системы",
  "gs-gibdd": "Главный сотрудник ГИБДД - полный доступ к управлению пользователями и всем функциям ГИБДД",
  "pgs-gibdd": "Помощник главного сотрудника ГИБДД - доступ к управлению пользователями (кроме ГС) и всем функциям ГИБДД",
  "gs-guvd": "Главный сотрудник ГУВД - полный доступ к управлению пользователями и всем функциям ГУВД",
  "pgs-guvd": "Помощник главного сотрудника ГУВД - доступ к управлению пользователями (кроме ГС) и всем функциям ГУВД",
  "ss-gibdd": "Старший состав ГИБДД - доступ к генератору и гос. волне ГИБДД",
  "ss-guvd": "Старший состав ГУВД - доступ к генератору и гос. волне ГУВД",
  gibdd: "Сотрудник ГИБДД - доступ к генератору отчётов",
  guvd: "Сотрудник ГУВД - доступ к генератору отчётов",
  none: "Нет доступа к защищённым страницам",
  "moderator-gibdd": "Устаревшая роль ГС ГИБДД",
  "moderator-guvd": "Устаревшая роль ГС ГУВД",
}

// Function to determine badge variant based on role
const getRoleBadgeVariant = (role: UserRole) => {
  if (role === "root") return "default"
  if (role.startsWith("gs") || role.startsWith("pgs") || role.startsWith("moderator")) return "default"
  if (role.startsWith("ss")) return "secondary"
  return "outline"
}

// Action display names for logs
const actionDisplayNames: Record<string, string> = {
  add_user: "Добавление",
  remove_user: "Удаление",
  update_user: "Изменение",
  rollback: "Откат действия",
}

// Format log details for display
const formatLogDetails = (details: string): string => {
  if (!details) return "Нет деталей"
  if (typeof details !== "string") return String(details)

  const trimmed = details.trim()
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return details

  try {
    const parsed = JSON.parse(details)
    if (typeof parsed !== "object" || parsed === null) return details

    const { nickname, username, role, previous } = parsed
    const parts: string[] = []
    if (nickname) parts.push(`Никнейм: ${nickname}`)
    if (username) parts.push(`Логин: ${username}`)
    if (role) parts.push(`Роль: ${roleDisplayNames[role as UserRole] || role}`)
    if (previous && typeof previous === "object") {
      parts.push(`Предыдущая роль: ${roleDisplayNames[previous.role as UserRole] || previous.role}`)
      if (previous.username) parts.push(`Предыдущий логин: ${previous.username}`)
    }
    return parts.length > 0 ? parts.join(", ") : "Детали не указаны"
  } catch {
    return details
  }
}

export function UserManagementPage() {
  const { currentUser, users, userLogs, addUser, removeUser, updateUser, canManageUsers } = useAuth()
  const [nickname, setNickname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("none")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [addError, setAddError] = useState("")
  const [addSuccess, setAddSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editUsername, setEditUsername] = useState("")
  const [editPassword, setEditPassword] = useState("")
  const [editRole, setEditRole] = useState<UserRole>("none")
  const [activeTab, setActiveTab] = useState<"users" | "logs">("users")
  const [userSearch, setUserSearch] = useState("")
  const [logSearch, setLogSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "gibdd" | "guvd">("all")
  const [actionFilter, setActionFilter] = useState<string | "all">("all")
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<{ id: string; nickname: string } | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [batchRole, setBatchRole] = useState<UserRole | "">("")
  const [isBatchDeleteDialogOpen, setIsBatchDeleteDialogOpen] = useState(false)
  const [currentPageUsers, setCurrentPageUsers] = useState(1)
  const [currentPageLogs, setCurrentPageLogs] = useState(1)
  const [selectAll, setSelectAll] = useState(false)
  const [isRollbackDialogOpen, setIsRollbackDialogOpen] = useState(false)
  const [rollbackLog, setRollbackLog] = useState<any>(null)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [historyUserId, setHistoryUserId] = useState<string | null>(null)
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false)
  const [editUserData, setEditUserData] = useState<{ id: string; nickname: string } | null>(null)
  const itemsPerPage = 10

  // Clear error/success messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => setError(""), 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  useEffect(() => {
    if (addError || addSuccess) {
      const timer = setTimeout(() => {
        setAddError("")
        setAddSuccess("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [addError, addSuccess])

  // Prevent scroll when dialogs are open
  useEffect(() => {
    const styleSheet = document.createElement("style")
    styleSheet.textContent = noScrollStyles
    document.head.appendChild(styleSheet)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`)
    return () => document.head.removeChild(styleSheet)
  }, [])

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPageUsers(1)
    setSelectedUsers([])
    setSelectAll(false)
  }, [userSearch, roleFilter])

  useEffect(() => {
    setCurrentPageLogs(1)
  }, [logSearch, actionFilter, dateRange])

  // Access control: restrict page to authorized roles
  if (!currentUser || !canManageUsers()) {
    return (
      <div className="flex-1 p-6 md:p-8 overflow-auto bg-background min-h-screen">
        <div className="max-w-7xl mx-auto mt-12 md:mt-16">
          <Card className="p-6 md:p-8 bg-card shadow-xl border-border rounded-2xl">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-10 w-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Доступ запрещен</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Эта страница доступна только для ролей ГС и ПГС
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Determine available roles based on current user's role
  const getAvailableRoles = (): UserRole[] => {
    if (!currentUser) return []
    switch (currentUser.role) {
      case "root":
        return ["gs-gibdd", "pgs-gibdd", "gs-guvd", "pgs-guvd", "ss-gibdd", "ss-guvd", "gibdd", "guvd", "none"]
      case "gs-gibdd":
        return ["pgs-gibdd", "ss-gibdd", "gibdd", "none"]
      case "pgs-gibdd":
        return ["ss-gibdd", "gibdd", "none"]
      case "gs-guvd":
        return ["pgs-guvd", "ss-guvd", "guvd", "none"]
      case "pgs-guvd":
        return ["ss-guvd", "guvd", "none"]
      default:
        return []
    }
  }

  // Check if user can be deleted
  const canDeleteUser = (userRole: UserRole): boolean => {
    if (currentUser.role === "root") return true
    if (currentUser.role === "gs-gibdd" || currentUser.role === "gs-guvd") return true
    if (currentUser.role === "pgs-gibdd" && userRole !== "gs-gibdd" && userRole !== "root") return true
    if (currentUser.role === "pgs-guvd" && userRole !== "gs-guvd" && userRole !== "root") return true
    return false
  }

  // Check if user can be edited
  const canEditUser = (userRole: UserRole): boolean => {
    if (currentUser.role === "root") return true
    if (currentUser.role === "gs-gibdd" || currentUser.role === "gs-guvd") return true
    if (currentUser.role === "pgs-gibdd" && userRole !== "gs-gibdd" && userRole !== "root") return true
    if (currentUser.role === "pgs-guvd" && userRole !== "gs-guvd" && userRole !== "root") return true
    return false
  }

  // Handle adding a new user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddError("")
    setAddSuccess("")
    setIsLoading(true)

    if (!nickname || !username || !password) {
      setAddError("Пожалуйста, заполните все поля")
      setIsLoading(false)
      return
    }

    if (users.some((u) => u.nickname === nickname)) {
      setAddError("Пользователь с таким никнеймом уже существует")
      setIsLoading(false)
      return
    }

    const nicknameRegex = /^[А-ЯA-Z][а-яa-z]+_[А-ЯA-Z][а-яa-z]+$/
    if (!nicknameRegex.test(nickname)) {
      setAddError("Никнейм должен быть в формате Имя_Фамилия (например: Иван_Петров)")
      setIsLoading(false)
      return
    }

    const [firstName, lastName] = nickname.split("_")
    if (firstName.length < 2 || lastName.length < 2) {
      setAddError("Имя и фамилия должны содержать минимум 2 символа каждое")
      setIsLoading(false)
      return
    }

    if (username.length < 3) {
      setAddError("Логин должен содержать минимум 3 символа")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setAddError("Пароль должен содержать минимум 6 символов")
      setIsLoading(false)
      return
    }

    if (!getAvailableRoles().includes(role)) {
      setAddError("Выбранная роль недоступна для вашего уровня доступа")
      setIsLoading(false)
      return
    }

    const result = await addUser(nickname, username, password, role)
    if (result) {
      setAddSuccess(`Пользователь ${nickname} успешно добавлен`)
      setNickname("")
      setUsername("")
      setPassword("")
      setRole("none")
      setCurrentPageUsers(1)
      setIsAddDialogOpen(false)
    } else {
      setAddError("Пользователь с таким логином уже существует")
    }
    setIsLoading(false)
  }

  // Start editing a user
  const startEditing = (userId: string, username: string, currentRole: UserRole, nickname: string) => {
    if (!canEditUser(currentRole)) {
      setError("У вас нет прав для редактирования этого пользователя")
      return
    }
    setEditingUserId(userId)
    setEditUsername(username)
    setEditPassword("")
    setEditRole(currentRole)
    setEditUserData({ id: userId, nickname })
    setError("")
    setSuccess("")
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingUserId(null)
    setEditUsername("")
    setEditPassword("")
    setEditRole("none")
    setEditUserData(null)
  }

  // Confirm role change
  const confirmRoleChange = async () => {
    if (!editUserData) return
    const user = users.find((u) => u.id === editUserData.id)
    if (!user || !canEditUser(user.role)) {
      setError("У вас нет прав для редактирования этого пользователя")
      setIsEditRoleDialogOpen(false)
      return
    }

    if (!getAvailableRoles().includes(editRole)) {
      setError("Выбранная роль недоступна для вашего уровня доступа")
      setIsEditRoleDialogOpen(false)
      return
    }

    if (!editUsername) {
      setError("Логин не может быть пустым")
      setIsEditRoleDialogOpen(false)
      return
    }

    const currentUserData = users.find((u) => u.id === editUserData.id)
    if (!currentUserData) {
      setError("Пользователь не найден")
      setIsEditRoleDialogOpen(false)
      return
    }

    const noChanges =
      editUsername === currentUserData.username &&
      editRole === currentUserData.role &&
      !editPassword

    if (noChanges) {
      setSuccess("Изменения отсутствуют")
      cancelEditing()
      setIsEditRoleDialogOpen(false)
      return
    }

    setIsLoading(true)
    const passwordToUse = editPassword || undefined
    const result = await updateUser(editUserData.id, editUsername, passwordToUse, editRole)
    if (result) {
      setSuccess(`Пользователь ${editUserData.nickname} успешно обновлен`)
      setCurrentPageUsers(1)
      setSelectedUsers(selectedUsers.filter((id) => id !== editUserData.id))
      cancelEditing()
    } else {
      setError("Ошибка: Пользователь с таким логином уже существует или роль недоступна")
    }
    setIsLoading(false)
    setIsEditRoleDialogOpen(false)
  }

  // Handle user deletion
  const handleRemoveUser = (userId: string, nickname: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) {
      setError("Пользователь не найден")
      return
    }
    if (!canDeleteUser(user.role)) {
      setError("У вас нет прав для удаления этого пользователя")
      return
    }
    setUserToDelete({ id: userId, nickname })
    setIsDeleteDialogOpen(true)
  }

  // Confirm single user deletion
  const confirmDelete = async () => {
    if (!userToDelete) return
    setIsLoading(true)
    setError("")
    setSuccess("")

    const user = users.find((u) => u.id === userToDelete.id)
    if (!user || !canDeleteUser(user.role)) {
      setError("У вас нет прав для удаления этого пользователя")
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
      return
    }

    const result = await removeUser(userToDelete.id)
    if (result.success) {
      setSuccess(`Пользователь ${userToDelete.nickname} успешно удален`)
      setCurrentPageUsers(1)
      setSelectedUsers(selectedUsers.filter((id) => id !== userToDelete.id))
    } else {
      setError(result.error || "Невозможно удалить этого пользователя")
    }
    setIsLoading(false)
    setIsDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  // Handle batch deletion
  const handleBatchDelete = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    const deletableUsers = selectedUsers.filter((userId) => {
      const user = users.find((u) => u.id === userId)
      return user && canDeleteUser(user.role)
    })

    let successCount = 0
    for (const userId of deletableUsers) {
      const result = await removeUser(userId)
      if (result.success) successCount++
    }

    if (successCount > 0) {
      setSuccess(`Удалено пользователей: ${successCount}`)
      setSelectedUsers([])
      setCurrentPageUsers(1)
      setSelectAll(false)
    } else {
      setError("Нет пользователей, которых можно удалить")
    }
    setIsLoading(false)
    setIsBatchDeleteDialogOpen(false)
  }

  // Handle batch role change
  const handleBatchRoleChange = async () => {
    if (!batchRole || batchRole === "") {
      setError("Выберите роль для массового изменения")
      return
    }

    if (!getAvailableRoles().includes(batchRole)) {
      setError("Выбранная роль недоступна для вашего уровня доступа")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    const editableUsers = selectedUsers.filter((userId) => {
      const user = users.find((u) => u.id === userId)
      return user && canEditUser(user.role)
    })

    let successCount = 0
    for (const userId of editableUsers) {
      const user = users.find((u) => u.id === userId)
      if (!user) continue
      const result = await updateUser(userId, user.username, undefined, batchRole)
      if (result) successCount++
    }

    if (successCount > 0) {
      setSuccess(`Роли обновлены для ${successCount} пользователей`)
      setSelectedUsers([])
      setCurrentPageUsers(1)
      setBatchRole("")
      setSelectAll(false)
    } else {
      setError("Нет пользователей, которых можно редактировать")
    }
    setIsLoading(false)
  }

  // Handle rollback of actions
  const handleRollback = async () => {
    if (!rollbackLog) return
    setIsLoading(true)
    setError("")
    setSuccess("")

    const user = users.find((u) => u.id === rollbackLog.target_user_id)
    if (user && !canEditUser(user.role)) {
      setError("У вас нет прав для отката этого действия")
      setIsLoading(false)
      setIsRollbackDialogOpen(false)
      setRollbackLog(null)
      return
    }

    let result: { success: boolean; error?: string } | boolean = false
    try {
      let details: any = {}
      try {
        details = JSON.parse(rollbackLog.details || "{}")
      } catch {
        setError("Ошибка при обработке данных для отката")
        setIsLoading(false)
        setIsRollbackDialogOpen(false)
        setRollbackLog(null)
        return
      }

      if (rollbackLog.action === "add_user") {
        result = await removeUser(rollbackLog.target_user_id)
      } else if (rollbackLog.action === "remove_user") {
        result = await addUser(
          rollbackLog.target_user_nickname,
          details.username || `restored_${rollbackLog.target_user_nickname}`,
          "restored_default_password",
          details.role || "none"
        )
      } else if (rollbackLog.action === "update_user") {
        const prevData = details.previous || {}
        result = await updateUser(
          rollbackLog.target_user_id,
          prevData.username || rollbackLog.target_user_nickname,
          prevData.password || undefined,
          prevData.role || "none"
        )
      }
    } catch {
      setError("Неожиданная ошибка при откате действия")
      setIsLoading(false)
      setIsRollbackDialogOpen(false)
      setRollbackLog(null)
      return
    }

    if (typeof result === "boolean") {
      if (result) {
        setSuccess(`Действие успешно отменено для ${rollbackLog.target_user_nickname}`)
      } else {
        setError("Не удалось отменить действие")
      }
    } else if (result.success) {
      setSuccess(`Действие успешно отменено для ${rollbackLog.target_user_nickname}`)
    } else {
      setError(result.error || "Не удалось отменить действие")
    }
    setIsLoading(false)
    setIsRollbackDialogOpen(false)
    setRollbackLog(null)
  }

  // Open user history dialog
  const openUserHistory = (userId: string) => {
    setHistoryUserId(userId)
    setIsHistoryDialogOpen(true)
  }

  // Filter and paginate users
  const filteredUsers = users.filter(
    (user) =>
      (roleFilter === "all" ||
        (roleFilter === "gibdd" && ["gs-gibdd", "pgs-gibdd", "ss-gibdd", "gibdd"].includes(user.role)) ||
        (roleFilter === "guvd" && ["gs-guvd", "pgs-guvd", "ss-guvd", "guvd"].includes(user.role))) &&
      (user.nickname.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.username.toLowerCase().includes(userSearch.toLowerCase()) ||
        format(new Date(user.created_at), "dd MMMM yyyy", { locale: ru })
          .toLowerCase()
          .includes(userSearch.toLowerCase()))
  )

  const indexOfLastUser = currentPageUsers * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Filter and paginate logs
  const filteredLogs =
    userLogs
      ?.filter(
        (log) =>
          (actionFilter === "all" || log.action === actionFilter) &&
          (dateRange[0] && dateRange[1]
            ? new Date(log.created_at) >= dateRange[0] && new Date(log.created_at) <= dateRange[1]
            : true) &&
          (log.target_user_nickname.toLowerCase().includes(logSearch.toLowerCase()) ||
            log.performed_by_nickname.toLowerCase().includes(logSearch.toLowerCase()) ||
            format(new Date(log.created_at), "dd MMM yyyy", { locale: ru })
              .toLowerCase()
              .includes(logSearch.toLowerCase()) ||
            (actionDisplayNames[log.action] || log.action).toLowerCase().includes(logSearch.toLowerCase()))
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || []

  const indexOfLastLog = currentPageLogs * itemsPerPage
  const indexOfFirstLog = indexOfLastLog - itemsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalLogPages = Math.ceil(filteredLogs.length / itemsPerPage)

  // User history logs
  const userHistoryLogs = historyUserId
    ? userLogs
        ?.filter((log) => log.target_user_id === historyUserId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || []
    : []

  const isRoot = currentUser?.role === "root"

  // Statistics
  const totalUsers = users.length
  const gibddUsers = users.filter((user) =>
    ["gs-gibdd", "pgs-gibdd", "ss-gibdd", "gibdd"].includes(user.role)
  ).length
  const guvdUsers = users.filter((user) =>
    ["gs-guvd", "pgs-guvd", "ss-guvd", "guvd"].includes(user.role)
  ).length

  // Pagination component
  const Pagination = ({
    totalPages,
    currentPage,
    onPageChange,
  }: {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
  }) => (
    <div className="flex justify-between items-center mt-4">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg px-4 py-2 text-base"
      >
        Предыдущая
      </Button>
      <span className="text-sm text-muted-foreground">
        Страница {currentPage} из {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg px-4 py-2 text-base"
      >
        Следующая
      </Button>
    </div>
  )

  // Reset user filters
  const resetUserFilters = () => {
    setUserSearch("")
    setRoleFilter("all")
    setCurrentPageUsers(1)
    setSelectedUsers([])
    setSelectAll(false)
  }

  // Reset log filters
  const resetLogFilters = () => {
    setLogSearch("")
    setActionFilter("all")
    setDateRange([null, null])
    setCurrentPageLogs(1)
  }

  // Toggle user selection for batch operations
  const toggleUserSelection = (userId: string, userRole: UserRole) => {
    if (!canDeleteUser(userRole)) return
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  // Select/deselect all users
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([])
      setSelectAll(false)
    } else {
      const selectableIds = currentUsers.filter((user) => canDeleteUser(user.role)).map((user) => user.id)
      setSelectedUsers(selectableIds)
      setSelectAll(true)
    }
  }

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto bg-background min-h-screen">
      <style>{noScrollStyles}</style>
      <div className="max-w-7xl mx-auto">
        {(error || success) && (
          <Alert variant={error ? "destructive" : "default"} className="animate-in fade-in slide-in-from-top-2 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error || success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card border-border shadow-lg rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Всего пользователей</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-lg rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Пользователи ГИБДД</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{gibddUsers}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-lg rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Пользователи ГУВД</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{guvdUsers}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => setActiveTab("users")}
              disabled={isLoading}
              className="rounded-lg px-4 py-2 text-base"
            >
              <Users className="h-5 w-5 mr-2" />
              Пользователи
            </Button>
            {isRoot && (
              <Button
                variant={activeTab === "logs" ? "default" : "outline"}
                onClick={() => setActiveTab("logs")}
                disabled={isLoading}
                className="rounded-lg px-4 py-2 text-base"
              >
                <History className="h-5 w-5 mr-2" />
                Журнал действий
              </Button>
            )}
          </div>

          {activeTab === "users" && (
            <Card className="bg-card border-border shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border bg-muted/30">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <CardTitle className="flex items-center gap-3 text-foreground text-xl md:text-2xl">
                    <Users className="h-6 w-6 text-primary" />
                    Пользователи ({filteredUsers.length})
                  </CardTitle>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={resetUserFilters}
                      className="rounded-lg px-4 py-2 text-base"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Сбросить фильтры
                    </Button>
                    <Button
                      onClick={() => setIsAddDialogOpen(true)}
                      className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-base"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Добавить пользователя
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="user-search" className="text-sm font-medium">
                      Поиск пользователей
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="user-search"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        placeholder="Поиск по никнейму, логину или дате..."
                        className="pl-10 bg-background border-border rounded-lg text-base py-2.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="role-filter" className="text-sm font-medium">
                      Фильтр по роли
                    </Label>
                    <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as typeof roleFilter)}>
                      <SelectTrigger id="role-filter" className="mt-1 bg-background border-border">
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все роли</SelectItem>
                        <SelectItem value="gibdd">Роли ГИБДД</SelectItem>
                        <SelectItem value="guvd">Роли ГУВД</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-8">
                {selectedUsers.length > 0 && (
                  <div className="mb-4 p-4 bg-muted/30 rounded-lg flex flex-wrap gap-4 items-center">
                    <span className="text-sm text-foreground">Выбрано: {selectedUsers.length} пользователей</span>
                    <Select value={batchRole} onValueChange={setBatchRole}>
                      <SelectTrigger className="w-[200px] bg-background border-border">
                        <SelectValue placeholder="Изменить роль" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableRoles().map((r) => (
                          <SelectItem key={r} value={r}>
                            {roleDisplayNames[r]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleBatchRoleChange}
                      className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-base"
                      disabled={isLoading || !batchRole}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      Применить роль
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setIsBatchDeleteDialogOpen(true)}
                      className="rounded-lg px-4 py-2 text-base"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить выбранных
                    </Button>
                  </div>
                )}
                <div className="space-y-4">
                  {currentUsers.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Пользователи не найдены</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                          disabled={isLoading}
                        />
                        <span className="text-sm font-medium text-foreground">Выбрать все</span>
                      </div>
                      {currentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="p-4 border border-border rounded-xl hover:border-primary/50 hover:bg-muted/30 transition-all bg-card"
                        >
                          {editingUserId === user.id ? (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor={`edit-username-${user.id}`} className="text-sm font-medium">
                                  Логин
                                </Label>
                                <Input
                                  id={`edit-username-${user.id}`}
                                  value={editUsername}
                                  onChange={(e) => setEditUsername(e.target.value)}
                                  disabled={isLoading}
                                  className="mt-1 bg-background border-border rounded-lg text-base py-2.5"
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
                                  className="mt-1 bg-background border-border rounded-lg text-base py-2.5"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`edit-role-${user.id}`} className="text-sm font-medium">
                                  Роль
                                </Label>
                                <Select value={editRole} onValueChange={setEditRole} disabled={isLoading}>
                                  <SelectTrigger id={`edit-role-${user.id}`} className="mt-1 bg-background border-border">
                                    <SelectValue placeholder="Выберите роль" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getAvailableRoles().map((r) => (
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
                                  onClick={() => setIsEditRoleDialogOpen(true)}
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
                                  onClick={cancelEditing}
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
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => toggleUserSelection(user.id, user.role)}
                                className="mt-2 h-4 w-4 text-primary border-border rounded focus:ring-primary"
                                disabled={!canDeleteUser(user.role) || isLoading}
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
                                      <Badge
                                        variant={user.isOnline ? "default" : "outline"}
                                        className={`text-xs font-medium px-0 py-0 ${user.isOnline ? "bg-green-500/20 text-green-400" : ""}`}
                                      >
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
                                </div>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => startEditing(user.id, user.username, user.role, user.nickname)}
                                  className="h-9 w-9 border-border rounded-lg hover:bg-muted"
                                  disabled={isLoading || !canEditUser(user.role)}
                                  title="Редактировать"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => openUserHistory(user.id)}
                                  className="h-9 w-9 border-border rounded-lg hover:bg-muted"
                                  disabled={isLoading}
                                  title="История изменений"
                                >
                                  <History className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleRemoveUser(user.id, user.nickname)}
                                  className="h-9 w-9 rounded-lg"
                                  disabled={isLoading || !canDeleteUser(user.role)}
                                  title="Удалить"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Pagination totalPages={totalUserPages} currentPage={currentPageUsers} onPageChange={setCurrentPageUsers} />
              </CardContent>
            </Card>
          )}

          {activeTab === "logs" && isRoot && (
            <Card className="bg-card border-border shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border bg-muted/30">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-3 text-foreground text-xl md:text-2xl">
                    <History className="h-6 w-6 text-primary" />
                    Журнал действий ({filteredLogs.length})
                  </CardTitle>
                  <Button variant="outline" onClick={resetLogFilters} className="rounded-lg px-4 py-2 text-base">
                    <X className="h-4 w-4 mr-2" />
                    Сбросить фильтры
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="log-search" className="text-sm font-medium">
                      Поиск в журнале
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="log-search"
                        value={logSearch}
                        onChange={(e) => setLogSearch(e.target.value)}
                        placeholder="Поиск по никнейму, действию или дате..."
                        className="pl-10 bg-background border-border rounded-lg text-base py-2.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="action-filter" className="text-sm font-medium">
                      Фильтр по действию
                    </Label>
                    <Select value={actionFilter} onValueChange={(value) => setActionFilter(value)}>
                      <SelectTrigger id="action-filter" className="mt-1 bg-background border-border">
                        <SelectValue placeholder="Выберите действие" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все действия</SelectItem>
                        {Object.keys(actionDisplayNames).map((action) => (
                          <SelectItem key={action} value={action}>
                            {actionDisplayNames[action]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Диапазон дат</Label>
                    <div className="flex gap-2">
                      <Input
                        type="date"
                        value={dateRange[0] ? format(dateRange[0], "yyyy-MM-dd") : ""}
                        onChange={(e) => setDateRange([e.target.value ? new Date(e.target.value) : null, dateRange[1]])}
                        className="mt-1 bg-background border-border rounded-lg text-base py-2.5"
                      />
                      <Input
                        type="date"
                        value={dateRange[1] ? format(dateRange[1], "yyyy-MM-dd") : ""}
                        onChange={(e) => setDateRange([dateRange[0], e.target.value ? new Date(e.target.value) : null])}
                        className="mt-1 bg-background border-border rounded-lg text-base py-2.5"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-8">
                {currentLogs.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Записи не найдены</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors"
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
                          {log.action === "rollback" && (
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <RotateCw className="h-4 w-4 text-purple-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <Badge variant="outline" className="text-xs font-medium px-2 py-1">
                              {actionDisplayNames[log.action] || log.action}
                            </Badge>
                            <span className="text-sm font-medium text-foreground">{log.target_user_nickname}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1.5">{formatLogDetails(log.details)}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Выполнил: {log.performed_by_nickname}</span>
                            <span>•</span>
                            <span>{format(new Date(log.created_at), "dd MMM yyyy, HH:mm", { locale: ru })}</span>
                          </div>
                        </div>
                        {isRoot && log.action !== "rollback" && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setRollbackLog(log)
                              setIsRollbackDialogOpen(true)
                            }}
                            className="h-9 w-9 border-border rounded-lg hover:bg-muted"
                            disabled={isLoading}
                            title="Откатить действие"
                          >
                            <RotateCw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <Pagination totalPages={totalLogPages} currentPage={currentPageLogs} onPageChange={setCurrentPageLogs} />
              </CardContent>
            </Card>
          )}

          {/* Add User Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="dialog-open">
              <DialogHeader>
                <DialogTitle>Добавить пользователя</DialogTitle>
                <DialogDescription>Заполните данные для нового пользователя</DialogDescription>
              </DialogHeader>
              {(addError || addSuccess) && (
                <Alert variant={addError ? "destructive" : "default"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{addError || addSuccess}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleAddUser} className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nickname" className="text-sm font-medium">
                      Никнейм
                    </Label>
                    <Input
                      id="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      disabled={isLoading}
                      placeholder="Имя_Фамилия"
                      className="mt-1 bg-background border-border rounded-lg text-base py-2.5 px-4"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Формат: Имя_Фамилия (например: Иван_Петров)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium">
                      Логин
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      placeholder="login123"
                      className="mt-1 bg-background border-border rounded-lg text-base py-2.5 px-4"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">Минимум 3 символа</p>
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium">
                      Пароль
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      placeholder="••••••"
                      className="mt-1 bg-background border-border rounded-lg text-base py-2.5 px-4"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">Минимум 6 символов</p>
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-sm font-medium">
                      Роль
                    </Label>
                    <Select value={role} onValueChange={setRole} disabled={isLoading}>
                      <SelectTrigger id="role" className="mt-1 bg-background border-border">
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableRoles().map((r) => (
                          <SelectItem key={r} value={r}>
                            {roleDisplayNames[r]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
                    Отмена
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <UserPlus className="h-4 w-4 mr-2" />
                    )}
                    Добавить
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete User Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
                <AlertDialogDescription>
                  Вы уверены, что хотите удалить пользователя {userToDelete?.nickname}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Удалить"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Batch Delete Dialog */}
          <AlertDialog open={isBatchDeleteDialogOpen} onOpenChange={setIsBatchDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Подтверждение массового удаления</AlertDialogTitle>
                <AlertDialogDescription>
                  Вы уверены, что хотите удалить {selectedUsers.length} пользователей?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleBatchDelete} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Удалить"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Rollback Dialog */}
          <AlertDialog open={isRollbackDialogOpen} onOpenChange={setIsRollbackDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Подтверждение отката</AlertDialogTitle>
                <AlertDialogDescription>
                  Вы уверены, что хотите отменить действие "{actionDisplayNames[rollbackLog?.action] || rollbackLog?.action}" для
                  пользователя {rollbackLog?.target_user_nickname}?
                </AlertDialogDescription>
                {rollbackLog?.action === "remove_user" && (
                  <div className="text-yellow-600 mt-2 text-sm">
                    Внимание: пользователь будет восстановлен с временным паролем. Свяжитесь с ним для сброса пароля.
                  </div>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleRollback} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RotateCw className="h-4 w-4 mr-2" />
                  )}
                  Откатить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Edit Role Confirmation Dialog */}
          <AlertDialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Подтверждение изменения роли</AlertDialogTitle>
                <AlertDialogDescription>
                  Вы уверены, что хотите изменить роль пользователя {editUserData?.nickname} на {roleDisplayNames[editRole]}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={confirmRoleChange} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Подтвердить"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* User History Dialog */}
          <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
            <DialogContent className="dialog-open max-w-3xl">
              <DialogHeader>
                <DialogTitle>
                  История изменений: {users.find((u) => u.id === historyUserId)?.nickname || "Пользователь"}
                </DialogTitle>
                <DialogDescription>Логи действий, связанных с этим пользователем</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {userHistoryLogs.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Записи не найдены</p>
                  </div>
                ) : (
                  userHistoryLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors"
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
                        {log.action === "rollback" && (
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <RotateCw className="h-4 w-4 text-purple-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <Badge variant="outline" className="text-xs font-medium px-2 py-1">
                            {actionDisplayNames[log.action] || log.action}
                          </Badge>
                          <span className="text-sm font-medium text-foreground">{log.target_user_nickname}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1.5">{formatLogDetails(log.details)}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Выполнил: {log.performed_by_nickname}</span>
                          <span>•</span>
                          <span>{format(new Date(log.created_at), "dd MMM yyyy, HH:mm", { locale: ru })}</span>
                        </div>
                      </div>
                      {isRoot && log.action !== "rollback" && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setRollbackLog(log)
                            setIsRollbackDialogOpen(true)
                          }}
                          className="h-9 w-9 border-border rounded-lg hover:bg-muted"
                          disabled={isLoading}
                          title="Откатить действие"
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsHistoryDialogOpen(false)}>
                  Закрыть
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}