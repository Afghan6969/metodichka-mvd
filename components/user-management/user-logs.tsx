"use client"

import { useState } from "react"
import { UserLog } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { RotateCcw, Info } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface UserLogsProps {
  logs: UserLog[]
  actionDisplayNames: Record<string, string>
  onRollback?: (log: UserLog) => void
  showRollback?: boolean
  currentUserRole?: string
  currentUserId?: string
  showDetails?: boolean
}

// Role display names
const roleDisplayNames: Record<string, string> = {
  root: "Владелец",
  "gs-gibdd": "ГС ГИБДД",
  "pgs-gibdd": "ПГС ГИБДД",
  "leader-gibdd": "Лидер ГИБДД",
  "gs-guvd": "ГС ГУВД",
  "pgs-guvd": "ПГС ГУВД",
  "leader-guvd": "Лидер ГУВД",
  "ss-gibdd": "СС ГИБДД",
  "ss-guvd": "СС ГУВД",
  gibdd: "ГИБДД",
  guvd: "ГУВД",
  none: "Без роли",
}

// Format log details for display
const formatLogDetails = (details: string): string => {
  if (!details) return "Нет деталей"
  if (typeof details !== "string") return String(details)

  const trimmed = details.trim()
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return details

  try {
    const parsed = JSON.parse(trimmed)

    // Обработка отката
    if (parsed.rollback_description) {
      return parsed.rollback_description
    }

    // Обработка обычных изменений
    if (parsed.changes && Array.isArray(parsed.changes) && parsed.changes.length > 0) {
      const russianChanges = parsed.changes.map((change: string) => {
        if (change.includes("nickname:")) {
          return change.replace("nickname:", "Никнейм:")
        }
        if (change.includes("username:")) {
          return change.replace("username:", "Логин:")
        }
        if (change.includes("role:")) {
          const parts = change.split("→")
          if (parts.length === 2) {
            const oldRole = parts[0].replace("role:", "").trim()
            const newRole = parts[1].trim()
            return `Роль: ${roleDisplayNames[oldRole] || oldRole} → ${roleDisplayNames[newRole] || newRole}`
          }
        }
        if (change.includes("password:")) {
          return change.replace("password: changed", "Пароль: изменён")
        }
        return change
      })
      return "Изменено: " + russianChanges.join(", ")
    }

    // Обработка JSON объектов пользователей
    if (parsed.nickname && parsed.username && parsed.role) {
      return `Пользователь: ${parsed.nickname} (${parsed.username}), Роль: ${roleDisplayNames[parsed.role] || parsed.role}`
    }

    // Обработка массива пользователей
    if (Array.isArray(parsed)) {
      if (parsed.length > 0 && parsed[0].nickname && parsed[0].username && parsed[0].role) {
        const users = parsed.map((user: any) =>
          `${user.nickname} (${user.username}) - ${roleDisplayNames[user.role] || user.role}`
        )
        return `Пользователи: ${users.join(", ")}`
      }
    }

    return details
  } catch {
    return details
  }
}

export function UserLogs({ logs, actionDisplayNames, onRollback, showRollback = false, currentUserRole, currentUserId, showDetails = true }: UserLogsProps) {
  const [selectedLog, setSelectedLog] = useState<UserLog | null>(null)
  const getActionIcon = (action: string) => {
    switch (action) {
      case "add_user":
        return "➕"
      case "remove_user":
      case "deactivate":
        return "🗑️"
      case "update_user":
        return "✏️"
      case "activate":
        return "✅"
      case "rollback":
        return "↩️"
      case "login":
        return "🔓"
      case "logout":
        return "🔒"
      default:
        return "📝"
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "add_user":
        return "text-green-400"
      case "remove_user":
      case "deactivate":
        return "text-red-400"
      case "update_user":
        return "text-blue-400"
      case "activate":
        return "text-emerald-400"
      case "rollback":
        return "text-orange-400"
      case "login":
        return "text-green-300"
      case "logout":
        return "text-gray-400"
      default:
        return "text-blue-300"
    }
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-12 text-blue-200/80">
        <p className="text-sm">Логи не найдены</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-6 group hover:bg-white/12 hover:border-white/25 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className={`text-2xl ${getActionColor(log.action)}`}>{getActionIcon(log.action)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge variant="outline" className="border-blue-400/40 text-blue-300 bg-blue-500/10 text-xs">
                    {actionDisplayNames[log.action] || log.action}
                  </Badge>
                  <span className="text-sm font-medium text-white">{log.target_user_nickname}</span>
                </div>
                <p className="text-sm text-blue-200/80 mb-3 break-words">{formatLogDetails(log.details)}</p>
                <div className="flex items-center gap-3 text-xs text-blue-200/80">
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Кто:</span>
                    <span className="text-white">{log.performed_by_nickname}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Когда:</span>
                    <span className="text-white">{format(new Date(log.created_at), "dd MMMM yyyy, HH:mm:ss", { locale: ru })}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {showDetails && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLog(log)}
                    className="border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300 h-8 px-3"
                    title="Подробная информация"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    <span className="text-xs">Подробнее</span>
                  </Button>
                )}
                {showRollback && onRollback && log.action !== "rollback" && log.action !== "login" && log.action !== "logout" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRollback(log)}
                    className="border-orange-400/30 bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-400/50 text-orange-300 h-8 px-3"
                    title="Откатить действие"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    <span className="text-xs">Откат</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Диалог с подробной информацией */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl bg-white/10 border border-white/20 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <span className={`text-2xl ${getActionColor(selectedLog?.action || "")}`}>
                {getActionIcon(selectedLog?.action || "")}
              </span>
              Подробная информация о записи
            </DialogTitle>
            <DialogDescription className="text-blue-200/80">
              Полная информация о действии в системе
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-200/80 mb-1">Действие</p>
                  <Badge variant="outline" className="border-blue-400/40 text-blue-300 bg-blue-500/10 text-xs">
                    {actionDisplayNames[selectedLog.action] || selectedLog.action}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200/80 mb-1">ID записи</p>
                  <p className="text-sm font-mono text-white">#{selectedLog.id}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-blue-200/80 mb-1">Цель действия</p>
                <p className="text-sm text-white">{selectedLog.target_user_nickname}</p>
                <p className="text-xs font-mono text-blue-200/80 mt-1">{selectedLog.target_user_id}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-blue-200/80 mb-1">Исполнитель</p>
                <p className="text-sm text-white">{selectedLog.performed_by_nickname}</p>
                <p className="text-xs font-mono text-blue-200/80 mt-1">{selectedLog.performed_by_id}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-blue-200/80 mb-1">Дата и время</p>
                <p className="text-sm text-white">
                  {format(new Date(selectedLog.created_at), "dd MMMM yyyy, HH:mm:ss", { locale: ru })}
                </p>
              </div>

              {selectedLog.ip_address && (currentUserRole === "super-admin" || currentUserRole === "root") && (
                <div>
                  <p className="text-sm font-medium text-blue-200/80 mb-1">IP адрес</p>
                  <p className="text-sm font-mono text-white">{selectedLog.ip_address}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-blue-200/80 mb-1">Детали</p>
                <div className="p-3 bg-white/8 border border-white/15 rounded-xl">
                  <p className="text-sm text-white break-words">{formatLogDetails(selectedLog.details)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
