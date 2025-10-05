import { UserRole } from "@/lib/auth-context"

// Role display names
export const roleDisplayNames: Record<string, string> = {
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
  "moderator-gibdd": "Устаревшая роль ГС ГИБДД",
  "moderator-guvd": "Устаревшая роль ГС ГУВД",
}

// Action display names for logs
export const actionDisplayNames: Record<string, string> = {
  add_user: "Добавление",
  remove_user: "Удаление",
  update_user: "Изменение",
  deactivate: "Деактивация",
  activate: "Активация",
  rollback: "Откат действия",
  login: "Вход в систему",
  logout: "Выход из системы",
}

// Function to determine badge variant based on role
export const getRoleBadgeVariant = (role: UserRole): "default" | "secondary" | "outline" => {
  if (role === "root") return "default"
  if (role.startsWith("gs") || role.startsWith("pgs") || role.startsWith("moderator")) return "default"
  if (role.startsWith("ss")) return "secondary"
  return "outline"
}

// Format log details for display
export const formatLogDetails = (details: string): string => {
  if (!details) return "Нет деталей"
  if (typeof details !== "string") return String(details)

  const trimmed = details.trim()
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return details

  try {
    const parsed = JSON.parse(trimmed)
    if (parsed.changes && Array.isArray(parsed.changes) && parsed.changes.length > 0) {
      const russianChanges = parsed.changes.map((change: string) => {
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
    return details
  } catch {
    return details
  }
}
