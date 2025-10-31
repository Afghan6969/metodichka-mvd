"use client"

import { useState } from"react"
import { UserRole } from"@/lib/auth-context"
import { Button } from"@/components/ui/button"
import { Input } from"@/components/ui/input"
import { Label } from"@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from"@/components/ui/dialog"
import { UserPlus, Loader2 } from"lucide-react"

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
 if (!nickname.trim() || !username.trim() || !password.trim() || role ==="none") return
 
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
 <Button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-100 hover:text-blue-50 transition-all h-11 px-6">
 <UserPlus className="h-5 w-5 mr-2" />
 Добавить пользователя
 </Button>
 </DialogTrigger>
 <DialogContent className="sm:max-w-[500px] bg-white/10 border border-white/20">
 <DialogHeader>
 <div className="flex items-center gap-3 mb-2">
 <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
 <UserPlus className="h-6 w-6 text-blue-300" />
 </div>
 <DialogTitle className="text-2xl font-bold text-white">Добавить пользователя</DialogTitle>
 </div>
 <DialogDescription className="text-blue-200/80">Создание нового пользователя МВД</DialogDescription>
 </DialogHeader>
 <form onSubmit={handleSubmit} className="space-y-4 mt-4">
 <div className="space-y-2">
 <Label htmlFor="nickname" className="text-sm font-medium text-white">
 Никнейм
 </Label>
 <Input
 id="nickname"
 placeholder="Введите никнейм"
 value={nickname}
 onChange={(e) => setNickname(e.target.value)}
 disabled={isLoading}
 className="bg-black/5 border-white/15 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
 required
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="username" className="text-sm font-medium text-white">
 Логин
 </Label>
 <Input
 id="username"
 placeholder="Введите логин"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 disabled={isLoading}
 className="bg-black/5 border-white/15 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
 required
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="password" className="text-sm font-medium text-white">
 Пароль
 </Label>
 <Input
 id="password"
 type="password"
 placeholder="Введите пароль"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 disabled={isLoading}
 className="bg-black/5 border-white/15 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
 required
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="role" className="text-sm font-medium text-white">
 Роль
 </Label>
 <Select value={role} onValueChange={(value) => setRole(value as UserRole)} disabled={isLoading}>
 <SelectTrigger id="role" className="bg-black/5 border-white/15 text-white">
 <SelectValue placeholder="Выберите роль" />
 </SelectTrigger>
 <SelectContent className="bg-white/10 border-white/20">
 {availableRoles.filter(r => r !=="root").map((r) => (
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
 className="border-blue-400/40 text-blue-200 hover:bg-blue-500/10 hover:text-blue-100"
 >
 Отмена
 </Button>
 <Button
 type="button"
 onClick={handleSubmit}
 className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-100 hover:text-blue-50"
 disabled={isLoading || !nickname.trim() || !username.trim() || !password.trim() || role ==="none"}
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
