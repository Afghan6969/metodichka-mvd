"use client"

import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Trash2, AlertCircle, History, Loader2 } from "lucide-react"
import { useAuth, type UserRole } from "@/lib/auth-context"
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
  const { currentUser, users, userLogs, addUser, removeUser, restoreUser, updateUser, canManageUsers } = useAuth()
  
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
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>У вас нет доступа к этой странице</AlertDescription>
        </Alert>
      </div>
    )
  }

  // Helper functions
  const getAvailableRoles = (): UserRole[] => {
    if (!currentUser) return []
    const role = currentUser.role
    if (role === "root") return ["root", "gs-gibdd", "pgs-gibdd", "gs-guvd", "pgs-guvd", "ss-gibdd", "ss-guvd", "gibdd", "guvd", "none"]
    if (role === "gs-gibdd") return ["pgs-gibdd", "ss-gibdd", "gibdd", "none"]
    if (role === "pgs-gibdd") return ["ss-gibdd", "gibdd", "none"]
    if (role === "gs-guvd") return ["pgs-guvd", "ss-guvd", "guvd", "none"]
    if (role === "pgs-guvd") return ["ss-guvd", "guvd", "none"]
    return []
  }

  const canEditUser = (targetRole: UserRole): boolean => {
    if (!currentUser) return false
    const role = currentUser.role
    if (role === "root") return true
    if (role === "gs-gibdd") return !["root", "gs-gibdd", "gs-guvd", "pgs-guvd", "ss-guvd", "guvd"].includes(targetRole)
    if (role === "pgs-gibdd") return !["root", "gs-gibdd", "pgs-gibdd", "gs-guvd", "pgs-guvd", "ss-guvd", "guvd"].includes(targetRole)
    if (role === "gs-guvd") return !["root", "gs-guvd", "gs-gibdd", "pgs-gibdd", "ss-gibdd", "gibdd"].includes(targetRole)
    if (role === "pgs-guvd") return !["root", "gs-guvd", "pgs-guvd", "gs-gibdd", "pgs-gibdd", "ss-gibdd", "gibdd"].includes(targetRole)
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
      setIsLoading(false)
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

      const result = await updateUser(userId, user.username, undefined, batchRole)
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

  // Filter and paginate users
  const filteredUsers = users.filter(
    (user) =>
      (showDeactivated ? user.status === "deactivated" : user.status === "active") &&
      (roleFilter === "all" ||
        (roleFilter === "gibdd" && ["gs-gibdd", "pgs-gibdd", "ss-gibdd", "gibdd"].includes(user.role)) ||
        (roleFilter === "guvd" && ["gs-guvd", "pgs-guvd", "ss-guvd", "guvd"].includes(user.role))) &&
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
        (log) =>
          (actionFilter === "all" || log.action === actionFilter) &&
          (log.target_user_nickname.toLowerCase().includes(logSearch.toLowerCase()) ||
            log.performed_by_nickname.toLowerCase().includes(logSearch.toLowerCase()))
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
    (user) => user.status === "active" && ["gs-gibdd", "pgs-gibdd", "ss-gibdd", "gibdd"].includes(user.role)
  ).length
  const guvdUsers = users.filter(
    (user) => user.status === "active" && ["gs-guvd", "pgs-guvd", "ss-guvd", "guvd"].includes(user.role)
  ).length

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Управление пользователями</h1>
            <p className="text-muted-foreground mt-1">Добавление, редактирование и управление пользователями системы</p>
          </div>
          <AddUserForm
            onAddUser={handleAddUser}
            availableRoles={getAvailableRoles()}
            roleDisplayNames={roleDisplayNames}
            isLoading={isLoading}
          />
        </div>

        {(error || success) && (
          <Alert variant={error ? "destructive" : "default"} className="animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || success}</AlertDescription>
          </Alert>
        )}

        <UserStats totalUsers={totalUsers} gibddUsers={gibddUsers} guvdUsers={guvdUsers} />

        <div className="space-y-6">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">Пользователи</TabsTrigger>
                <TabsTrigger value="logs">Журнал изменений</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4 mt-6">
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Список пользователей
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant={!showDeactivated ? "default" : "outline"}
                          onClick={() => setShowDeactivated(false)}
                          className="rounded-lg px-4 py-2"
                          size="sm"
                        >
                          Активные
                        </Button>
                        <Button
                          variant={showDeactivated ? "default" : "outline"}
                          onClick={() => setShowDeactivated(true)}
                          className="rounded-lg px-4 py-2"
                          size="sm"
                        >
                          Деактивированные
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <UserFilters
                      userSearch={userSearch}
                      onUserSearchChange={setUserSearch}
                      roleFilter={roleFilter}
                      onRoleFilterChange={setRoleFilter}
                    />

                    {selectedUsers.length > 0 && (
                      <div className="p-4 bg-muted/30 rounded-lg flex flex-wrap gap-4 items-center">
                        <span className="text-sm text-foreground">Выбрано: {selectedUsers.length}</span>
                        <Select value={batchRole} onValueChange={(value) => setBatchRole(value as UserRole)}>
                          <SelectTrigger className="w-[200px] bg-background border-border">
                            <SelectValue placeholder="Изменить роль" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border backdrop-blur-xl">
                            {getAvailableRoles().map((r) => (
                              <SelectItem key={r} value={r}>
                                {roleDisplayNames[r]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={handleBatchRoleChange}
                          className="bg-primary hover:bg-primary/90 rounded-lg"
                          disabled={isLoading || !batchRole || batchRole === "none"}
                          size="sm"
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                          Применить
                        </Button>
                        <Button
                          onClick={handleBatchDeactivate}
                          variant="destructive"
                          className="rounded-lg"
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
                        <div className="text-center py-12 text-muted-foreground">
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs" className="space-y-4 mt-6">
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Журнал изменений
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <LogFilters
                      logSearch={logSearch}
                      onLogSearchChange={setLogSearch}
                      actionFilter={actionFilter}
                      onActionFilterChange={setActionFilter}
                      actionDisplayNames={actionDisplayNames}
                    />

                    {userLogs === null ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Loader2 className="h-12 w-12 mx-auto mb-4 opacity-50 animate-spin" />
                        <p className="text-sm">Загрузка логов...</p>
                      </div>
                    ) : (
                      <>
                        <UserLogs logs={currentLogs} actionDisplayNames={actionDisplayNames} currentUserRole={currentUser?.role} />
                        <Pagination
                          currentPage={currentPageLogs}
                          totalPages={totalLogPages}
                          onPageChange={setCurrentPageLogs}
                          itemsPerPage={itemsPerPage}
                          totalItems={filteredLogs.length}
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        </div>

        {/* History Dialog */}
        <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
          <DialogContent className="max-w-3xl bg-card">
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
                <UserLogs logs={userHistoryLogs} actionDisplayNames={actionDisplayNames} currentUserRole={currentUser?.role} showDetails={false} />
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsHistoryDialogOpen(false)}>
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
