"use client"

import { useState } from "react"
import { UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserPlus, Loader2 } from "lucide-react"

interface AddUserFormProps {
  onAddUser: (nickname: string, username: string, password: string, role: UserRole) => Promise<void>
  availableRoles: UserRole[]
  roleDisplayNames: Record<string, string>
  isLoading: boolean
}

export function AddUserForm({ onAddUser, availableRoles, roleDisplayNames, isLoading }: AddUserFormProps) {
  const [nickname, setNickname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("none")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname.trim() || !username.trim() || !password.trim() || role === "none") return
    
    await onAddUser(nickname, username, password, role)
    
    // Очищаем форму и закрываем диалог
    setNickname("")
    setUsername("")
    setPassword("")
    setRole("none")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 rounded-lg">
          <UserPlus className="h-4 w-4 mr-2" />
          Добавить пользователя
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Добавить пользователя
          </DialogTitle>
          <DialogDescription>Создайте нового пользователя в системе</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nickname" className="text-sm font-medium">
              Никнейм
            </Label>
            <Input
              id="nickname"
              placeholder="Введите никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={isLoading}
              className="mt-1 bg-background border-border"
              required
            />
          </div>
          <div>
            <Label htmlFor="username" className="text-sm font-medium">
              Логин
            </Label>
            <Input
              id="username"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="mt-1 bg-background border-border"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium">
              Пароль
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="mt-1 bg-background border-border"
              required
            />
          </div>
          <div>
            <Label htmlFor="role" className="text-sm font-medium">
              Роль
            </Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)} disabled={isLoading}>
              <SelectTrigger id="role" className="mt-1 bg-background border-border">
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
        </form>
        <DialogFooter className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90"
            disabled={isLoading || !nickname.trim() || !username.trim() || !password.trim() || role === "none"}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Добавление...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Добавить
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
