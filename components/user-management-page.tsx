"use client"

import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Trash2, AlertCircle, History, Loader2, RefreshCw, UserCog } from "lucide-react"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { PageHeader } from "@/components/page-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AddUserForm,
  UserCard,
  UserStats,
  UserFilters,
  LogFilters,
  UserLogs,
  Pagination,
  ConfirmationDialogs,
  roleDisplayNames,
  actionDisplayNames,
  getRoleBadgeVariant,
} from "@/components/user-management"

export function UserManagementPage() {
  const { currentUser, users, userLogs, addUser, removeUser, restoreUser, updateUser, canManageUsers, rollbackAction, refreshUsers, refreshUserLogs } = useAuth()
  
  // States
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  // User management states
  const [showDeactivated, setShowDeactivated] = useState(false)
  const [userSearch, setUserSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "gibdd" | "guvd">("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [batchRole, setBatchRole] = useState<UserRole>("none")
  
  // Editing states
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editNickname, setEditNickname] = useState("")
  const [editUsername, setEditUsername] = useState("")
  const [editPassword, setEditPassword] = useState("")
  const [editRole, setEditRole] = useState<UserRole>("none")
  
  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<{ id: string; nickname: string } | null>(null)
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false)
  const [userToRestore, setUserToRestore] = useState<{ id: string; nickname: string } | null>(null)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [historyUserId, setHistoryUserId] = useState<string | null>(null)
  
  // Log states
  const [logSearch, setLogSearch] = useState("")
  const [actionFilter, setActionFilter] = useState<string | "all">("all")
  const [currentPageUsers, setCurrentPageUsers] = useState(1)
  const [currentPageLogs, setCurrentPageLogs] = useState(1)
  const itemsPerPage = 10

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("")
        setSuccess("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPageUsers(1)
  }, [userSearch, roleFilter, showDeactivated])

  useEffect(() => {
    setCurrentPageLogs(1)
  }, [logSearch, actionFilter])

  // Access control
  if (!currentUser || !canManageUsers()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-500/10 border border-red-400/40 rounded-3xl p-8 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-400/30">
              <AlertCircle className="h-6 w-6 text-red-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-300">Доступ запрещён</h3>
              <p className="text-sm text-red-200/80">У вас нет прав доступа к этой странице</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Helper functions
  const getAvailableRoles = (): UserRole[] => {
    if (!currentUser) return []
    const role = currentUser.role
    if (role === "root") return ["root", "gs-gibdd", "pgs-gibdd", "leader-gibdd", "gs-guvd", "pgs-guvd", "leader-guvd", "ss-gibdd", "ss-guvd", "gibdd", "guvd", "none"]
    if (role === "gs-gibdd") return ["pgs-gibdd", "leader-gibdd", "ss-gibdd", "gibdd", "none"]
    if (role === "pgs-gibdd") return ["leader-gibdd", "ss-gibdd", "gibdd", "none"]
    if (role === "leader-gibdd") return ["ss-gibdd", "gibdd", "none"]
    if (role === "gs-guvd") return ["pgs-guvd", "leader-guvd", "ss-guvd", "guvd", "none"]
    if (role === "pgs-guvd") return ["leader-guvd", "ss-guvd", "guvd", "none"]
    if (role === "leader-guvd") return ["ss-guvd", "guvd", "none"]
    return []
  }

  const canEditUser = (targetRole: UserRole): boolean => {
    if (!currentUser) return false
    const role = currentUser.role
    if (role === "root") return true
    if (role === "gs-gibdd") return !["root", "gs-gibdd", "gs-guvd", "pgs-guvd", "leader-guvd", "ss-guvd", "guvd"].includes(targetRole)
    if (role === "pgs-gibdd") return !["root", "gs-gibdd", "pgs-gibdd", "gs-guvd", "pgs-guvd", "leader-guvd", "ss-guvd", "guvd"].includes(targetRole)
    if (role === "leader-gibdd") return !["root", "gs-gibdd", "pgs-gibdd", "leader-gibdd", "gs-guvd", "pgs-guvd", "leader-guvd", "ss-guvd", "guvd"].includes(targetRole)
    if (role === "gs-guvd") return !["root", "gs-guvd", "gs-gibdd", "pgs-gibdd", "leader-gibdd", "ss-gibdd", "gibdd"].includes(targetRole)
    if (role === "pgs-guvd") return !["root", "gs-guvd", "pgs-guvd", "gs-gibdd", "pgs-gibdd", "leader-gibdd", "ss-gibdd", "gibdd"].includes(targetRole)
    if (role === "leader-guvd") return !["root", "gs-guvd", "pgs-guvd", "leader-guvd", "gs-gibdd", "pgs-gibdd", "leader-gibdd", "ss-gibdd", "gibdd"].includes(targetRole)
    return false
  }

  const canDeleteUser = (targetRole: UserRole): boolean => canEditUser(targetRole)

  // Handlers
  const handleAddUser = async (nickname: string, username: string, password: string, role: UserRole) => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      const result = await addUser(nickname, username, password, role)
      if (result) {
        setSuccess(`Пользователь ${nickname} успешно добавлен`)
      } else {
        setError("Не удалось добавить пользователя")
      }
    } catch (err) {
      setError("Ошибка при добавлении пользователя")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveUser = (userId: string, nickname: string) => {
    setUserToDelete({ id: userId, nickname })
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      const result = await removeUser(userToDelete.id)
      if (result.success) {
        setSuccess(`Пользователь ${userToDelete.nickname} деактивирован`)
        setSelectedUsers(selectedUsers.filter((id) => id !== userToDelete.id))
      } else {
        setError(result.error || "Не удалось деактивировать пользователя")
      }
    } catch (err) {
      setError("Ошибка при деактивации пользователя")
    } finally {
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleRestoreUser = (userId: string, nickname: string) => {
    setUserToRestore({ id: userId, nickname })
    setIsRestoreDialogOpen(true)
  }

  const confirmRestore = async () => {
    if (!userToRestore) return
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      const result = await restoreUser(userToRestore.id)
      if (result.success) {
        setSuccess(`Пользователь ${userToRestore.nickname} восстановлен`)
      } else {
        setError(result.error || "Не удалось восстановить пользователя")
      }
    } catch (err) {
      setError("Ошибка при восстановлении пользователя")
    } finally {
      setIsLoading(false)
      setIsRestoreDialogOpen(false)
      setUserToRestore(null)
    }
  }

  const handleRollback = async (log: any) => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      const result = await rollbackAction(log.id)
      if (result.success) {
        setSuccess(result.message || "Действие успешно откачено")
      } else {
        setError(result.error || "Не удалось откатить действие")
      }
    } catch (err) {
      setError("Ошибка при откате действия")
    } finally {
      setIsLoading(false)
    }
  }

  const startEditing = (userId: string, nickname: string, username: string, role: UserRole) => {
    setEditingUserId(userId)
    setEditNickname(nickname)
    setEditUsername(username)
    setEditPassword("")
    setEditRole(role)
  }

  const cancelEditing = () => {
    setEditingUserId(null)
    setEditNickname("")
    setEditUsername("")
    setEditPassword("")
    setEditRole("none")
  }

  const saveEditing = async () => {
    if (!editingUserId || !editUsername.trim()) return
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      const result = await updateUser(editingUserId, editNickname, editUsername, editPassword || undefined, editRole)
      if (result) {
        setSuccess("Пользователь успешно обновлён")
        cancelEditing()
      } else {
        setError("Не удалось обновить пользователя")
      }
    } catch (err) {
      setError("Ошибка при обновлении пользователя")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBatchRoleChange = async () => {
    if (selectedUsers.length === 0 || batchRole === "none") return
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    let successCount = 0
    let errorCount = 0

    for (const userId of selectedUsers) {
      const user = users.find((u) => u.id === userId)
      if (!user) continue

      const result = await updateUser(userId, user.nickname, user.username, undefined, batchRole)
      if (result) successCount++
      else errorCount++
    }

    if (successCount > 0) {
      setSuccess(`Обновлено ролей: ${successCount}`)
      setSelectedUsers([])
      setBatchRole("none")
    }
    if (errorCount > 0) {
      setError(`Ошибок при обновлении: ${errorCount}`)
    }
    setIsLoading(false)
  }

  const handleBatchDeactivate = async () => {
    if (selectedUsers.length === 0) return
    setIsLoading(true)
    setError("")
    setSuccess("")

    let successCount = 0
    let errorCount = 0

    for (const userId of selectedUsers) {
      const user = users.find((u) => u.id === userId)
      if (!user || !canDeleteUser(user.role)) continue

      const result = await removeUser(userId)
      if (result.success) successCount++
      else errorCount++
    }

    if (successCount > 0) {
      setSuccess(`Деактивировано пользователей: ${successCount}`)
      setSelectedUsers([])
    }
    if (errorCount > 0) {
      setError(`Ошибок при деактивации: ${errorCount}`)
    }
    setIsLoading(false)
  }

  const openUserHistory = (userId: string) => {
    setHistoryUserId(userId)
    setIsHistoryDialogOpen(true)
  }

  const toggleUserSelection = (userId: string, userRole: UserRole) => {
    if (!canDeleteUser(userRole)) return
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await refreshUsers()
    setIsLoading(false)
  }

  const handleRefreshLogs = async () => {
    setIsLoading(true)
    await refreshUserLogs()
    setIsLoading(false)
  }

  // Filter and paginate users
  const filteredUsers = users.filter(
    (user) =>
      (showDeactivated ? user.status === "deactivated" : user.status === "active") &&
      (roleFilter === "all" ||
        (roleFilter === "gibdd" && ["gs-gibdd", "pgs-gibdd", "leader-gibdd", "ss-gibdd", "gibdd"].includes(user.role)) ||
        (roleFilter === "guvd" && ["gs-guvd", "pgs-guvd", "leader-guvd", "ss-guvd", "guvd"].includes(user.role))) &&
      (user.nickname.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.username.toLowerCase().includes(userSearch.toLowerCase()))
  )

  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const currentUsers = filteredUsers.slice(
    (currentPageUsers - 1) * itemsPerPage,
    currentPageUsers * itemsPerPage
  )

  // Filter and paginate logs
  const filteredLogs =
    userLogs
      ?.filter(
        (log) => {
          // Фильтр по действию
          if (actionFilter !== "all" && log.action !== actionFilter) {
            return false
          }

          // Поиск по тексту (действие, пользователь, дата)
          if (logSearch.trim()) {
            const searchLower = logSearch.toLowerCase()
            const actionName = actionDisplayNames[log.action]?.toLowerCase() || log.action.toLowerCase()
            const targetUser = log.target_user_nickname.toLowerCase()
            const performedBy = log.performed_by_nickname.toLowerCase()
            const logDate = format(new Date(log.created_at), "dd MMMM yyyy", { locale: ru }).toLowerCase()

            return (
              actionName.includes(searchLower) ||
              targetUser.includes(searchLower) ||
              performedBy.includes(searchLower) ||
              logDate.includes(searchLower)
            )
          }

          return true
        }
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || []

  const totalLogPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const currentLogs = filteredLogs.slice((currentPageLogs - 1) * itemsPerPage, currentPageLogs * itemsPerPage)

  // User history logs
  const userHistoryLogs = historyUserId
    ? userLogs
        ?.filter((log) => log.target_user_id === historyUserId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || []
    : []

  // Statistics
  const totalUsers = users.filter((u) => u.status === "active").length
  const gibddUsers = users.filter(
    (user) => user.status === "active" && ["gs-gibdd", "pgs-gibdd", "leader-gibdd", "ss-gibdd", "gibdd"].includes(user.role)
  ).length
  const guvdUsers = users.filter(
    (user) => user.status === "active" && ["gs-guvd", "pgs-guvd", "leader-guvd", "ss-guvd", "guvd"].includes(user.role)
  ).length

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={UserCog}
        title="Управление пользователями"
        description="Добавление, редактирование и управление пользователями системы"
        badge={`${users.filter(u => u.status === 'active').length} активных`}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-end">
          <AddUserForm
            onAddUser={handleAddUser}
            availableRoles={getAvailableRoles()}
            roleDisplayNames={roleDisplayNames}
            isLoading={isLoading}
          />
        </div>

        {(error || success) && (
          <div className={`p-4 rounded-xl border ${error ? 'bg-red-500/10 border-red-400/40 text-red-300' : 'bg-green-500/10 border-green-400/40 text-green-300'}`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error || success}</span>
            </div>
          </div>
        )}

        <UserStats totalUsers={totalUsers} gibddUsers={gibddUsers} guvdUsers={guvdUsers} />

        <div className="space-y-6">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/8 border border-white/15 h-12">
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-100 data-[state=active]:border-blue-400/40 text-blue-200 hover:bg-blue-500/10 hover:text-blue-100 transition-all duration-200 font-medium"
                >
                  Пользователи
                </TabsTrigger>
                <TabsTrigger
                  value="logs"
                  className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-100 data-[state=active]:border-purple-400/40 text-purple-200 hover:bg-purple-500/10 hover:text-purple-100 transition-all duration-200 font-medium"
                >
                  Журнал изменений
                </TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4 mt-6">
                <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-300" />
                        Список пользователей
                      </h2>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={handleRefresh}
                          className="border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300"
                          size="sm"
                          disabled={isLoading}
                          title="Обновить список"
                        >
                          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button
                          variant={!showDeactivated ? "default" : "outline"}
                          onClick={() => setShowDeactivated(false)}
                          className={!showDeactivated ? "bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-100 hover:text-blue-50" : "border-blue-400/40 text-blue-200 hover:bg-blue-500/10 hover:text-blue-100"}
                          size="sm"
                        >
                          Активные
                        </Button>
                        <Button
                          variant={showDeactivated ? "default" : "outline"}
                          onClick={() => setShowDeactivated(true)}
                          className={showDeactivated ? "bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-100 hover:text-blue-50" : "border-blue-400/40 text-blue-200 hover:bg-blue-500/10 hover:text-blue-100"}
                          size="sm"
                        >
                          Деактивированные
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <UserFilters
                      userSearch={userSearch}
                      onUserSearchChange={setUserSearch}
                      roleFilter={roleFilter}
                      onRoleFilterChange={setRoleFilter}
                    />

                    {selectedUsers.length > 0 && (
                      <div className="p-4 bg-white/8 border border-white/15 rounded-xl flex flex-wrap gap-4 items-center">
                        <span className="text-sm text-blue-200">Выбрано: {selectedUsers.length}</span>
                        <Select value={batchRole} onValueChange={(value) => setBatchRole(value as UserRole)}>
                          <SelectTrigger className="w-[200px] bg-black/5 border-white/15 text-white">
                            <SelectValue placeholder="Изменить роль" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/10 border-white/20 backdrop-blur-xl">
                            {getAvailableRoles().map((r) => (
                              <SelectItem key={r} value={r}>
                                {roleDisplayNames[r]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={handleBatchRoleChange}
                          className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-100 hover:text-blue-50"
                          disabled={isLoading || !batchRole || batchRole === "none"}
                          size="sm"
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                          Применить
                        </Button>
                        <Button
                          onClick={handleBatchDeactivate}
                          variant="destructive"
                          className="bg-red-500/20 hover:bg-red-500/30 border-red-400/40 text-red-300 hover:text-red-200"
                          disabled={isLoading}
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Деактивировать
                        </Button>
                      </div>
                    )}

                    <div className="space-y-4">
                      {currentUsers.length === 0 ? (
                        <div className="text-center py-12 text-blue-200/80">
                          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-sm">Пользователи не найдены</p>
                        </div>
                      ) : (
                        currentUsers.map((user) => (
                          <UserCard
                            key={user.id}
                            user={user}
                            isEditing={editingUserId === user.id}
                            isSelected={selectedUsers.includes(user.id)}
                            showDeactivated={showDeactivated}
                            editNickname={editNickname}
                            editUsername={editUsername}
                            editPassword={editPassword}
                            editRole={editRole}
                            onToggleSelect={() => toggleUserSelection(user.id, user.role)}
                            onStartEdit={() => startEditing(user.id, user.nickname, user.username, user.role)}
                            onCancelEdit={cancelEditing}
                            onSaveEdit={saveEditing}
                            onViewHistory={() => openUserHistory(user.id)}
                            onDeactivate={() => handleRemoveUser(user.id, user.nickname)}
                            onRestore={() => handleRestoreUser(user.id, user.nickname)}
                            onEditNicknameChange={setEditNickname}
                            onEditUsernameChange={setEditUsername}
                            onEditPasswordChange={setEditPassword}
                            onEditRoleChange={setEditRole}
                            canEdit={canEditUser(user.role)}
                            canDelete={canDeleteUser(user.role)}
                            isLoading={isLoading}
                            availableRoles={getAvailableRoles()}
                            roleDisplayNames={roleDisplayNames}
                            getRoleBadgeVariant={getRoleBadgeVariant}
                          />
                        ))
                      )}
                    </div>

                    <Pagination
                      currentPage={currentPageUsers}
                      totalPages={totalUserPages}
                      onPageChange={setCurrentPageUsers}
                      itemsPerPage={itemsPerPage}
                      totalItems={filteredUsers.length}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logs" className="space-y-4 mt-6">
                <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <History className="h-5 w-5 text-purple-300" />
                        Журнал изменений
                      </h2>
                      <Button
                        variant="outline"
                        onClick={handleRefreshLogs}
                        className="border-purple-400/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/50 text-purple-300"
                        size="sm"
                        disabled={isLoading}
                        title="Обновить журнал"
                      >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <LogFilters
                      logSearch={logSearch}
                      onLogSearchChange={setLogSearch}
                      actionFilter={actionFilter}
                      onActionFilterChange={setActionFilter}
                      actionDisplayNames={actionDisplayNames}
                    />

                    {userLogs === null ? (
                      <div className="text-center py-12 text-blue-200/80">
                        <Loader2 className="h-12 w-12 mx-auto mb-4 opacity-50 animate-spin" />
                        <p className="text-sm">Загрузка логов...</p>
                      </div>
                    ) : (
                      <>
                        <UserLogs 
                          logs={currentLogs} 
                          actionDisplayNames={actionDisplayNames} 
                          currentUserRole={currentUser?.role}
                          currentUserId={currentUser?.id}
                          onRollback={handleRollback}
                          showRollback={true}
                        />
                        <Pagination
                          currentPage={currentPageLogs}
                          totalPages={totalLogPages}
                          onPageChange={setCurrentPageLogs}
                          itemsPerPage={itemsPerPage}
                          totalItems={filteredLogs.length}
                        />
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
        </div>

        {/* History Dialog */}
        <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
          <DialogContent className="max-w-3xl bg-white/10 border border-white/20 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                История изменений: {users.find((u) => u.id === historyUserId)?.nickname || "Пользователь"}
              </DialogTitle>
              <DialogDescription className="text-blue-200/80">Логи действий, связанных с этим пользователем</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {userHistoryLogs.length === 0 ? (
                <div className="text-center py-12 text-blue-200/80">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Записи не найдены</p>
                </div>
              ) : (
                <UserLogs logs={userHistoryLogs} actionDisplayNames={actionDisplayNames} currentUserRole={currentUser?.role} currentUserId={currentUser?.id} showDetails={false} />
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsHistoryDialogOpen(false)} className="border-blue-400/40 text-blue-200 hover:bg-blue-500/10 hover:text-blue-100">
                Закрыть
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialogs */}
        <ConfirmationDialogs
          isDeleteDialogOpen={isDeleteDialogOpen}
          isRestoreDialogOpen={isRestoreDialogOpen}
          userToDelete={userToDelete}
          userToRestore={userToRestore}
          onDeleteConfirm={confirmDelete}
          onDeleteCancel={() => setIsDeleteDialogOpen(false)}
          onRestoreConfirm={confirmRestore}
          onRestoreCancel={() => setIsRestoreDialogOpen(false)}
        />
      </div>
    </div>
  )
}
