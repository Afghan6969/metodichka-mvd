"use client"

import { Card, CardContent } from"@/components/ui/card"
import { Users, Shield, Building } from"lucide-react"

interface UserStatsProps {
 totalUsers: number
 gibddUsers: number
 guvdUsers: number
}

export function UserStats({ totalUsers, gibddUsers, guvdUsers }: UserStatsProps) {
 return (
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="bg-white/8 border border-white/15 rounded-3xl p-6 group hover:bg-white/12 hover:border-white/25 transition-colors duration-200">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
 <Users className="h-6 w-6 text-blue-300" />
 </div>
 <div>
 <p className="text-sm text-blue-200/80">Всего пользователей</p>
 <p className="text-2xl font-bold text-white">{totalUsers}</p>
 </div>
 </div>
 </div>
 <div className="bg-white/8 border border-white/15 rounded-3xl p-6 group hover:bg-white/12 hover:border-white/25 transition-colors duration-200">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
 <Shield className="h-6 w-6 text-blue-300" />
 </div>
 <div>
 <p className="text-sm text-blue-200/80">ГИБДД</p>
 <p className="text-2xl font-bold text-white">{gibddUsers}</p>
 </div>
 </div>
 </div>
 <div className="bg-white/8 border border-white/15 rounded-3xl p-6 group hover:bg-white/12 hover:border-white/25 transition-colors duration-200">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
 <Building className="h-6 w-6 text-green-300" />
 </div>
 <div>
 <p className="text-sm text-green-200/80">ГУВД</p>
 <p className="text-2xl font-bold text-white">{guvdUsers}</p>
 </div>
 </div>
 </div>
 </div>
 )
}
