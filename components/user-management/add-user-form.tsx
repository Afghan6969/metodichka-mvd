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
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded font-black uppercase tracking-widest shadow-lg shadow-primary/30 h-11 px-6 animate-pulse-glow">
          <UserPlus className="h-5 w-5 mr-2" />
          Добавить пользователя
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-2 border-primary/30 backdrop-blur-xl shadow-2xl shadow-primary/20 animate-slide-up">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/30">
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-black uppercase tracking-widest">Добавить пользователя</DialogTitle>
          </div>
          <DialogDescription className="font-semibold uppercase tracking-wide text-primary">Создание нового пользователя МВД</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-sm font-medium">
              Никнейм
            </Label>
            <Input
              id="nickname"
              placeholder="Введите никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={isLoading}
              className="bg-background/50 border-2 border-primary/30 rounded h-12 font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Логин
            </Label>
            <Input
              id="username"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="bg-background/50 border-2 border-primary/30 rounded h-12 font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div className="space-y-2">
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
              className="bg-background/50 border-2 border-primary/30 rounded h-12 font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Роль
            </Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)} disabled={isLoading}>
              <SelectTrigger id="role" className="bg-background/50 border-2 border-primary/30 rounded h-12 font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border backdrop-blur-xl">
                {availableRoles.filter(r => r !== "root").map((r) => (
                  <SelectItem key={r} value={r}>
                    {roleDisplayNames[r]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter className="mt-6 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            className="rounded border-2 border-primary/40 hover:bg-primary/10 font-bold uppercase tracking-wide h-12"
          >
            Отмена
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded font-black uppercase tracking-widest shadow-lg shadow-primary/30 h-12"
            disabled={isLoading || !nickname.trim() || !username.trim() || !password.trim() || role === "none"}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Добавление...
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Добавить
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
