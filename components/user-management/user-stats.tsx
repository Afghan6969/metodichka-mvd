"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, Building } from "lucide-react"

interface UserStatsProps {
  totalUsers: number
  gibddUsers: number
  guvdUsers: number
}

export function UserStats({ totalUsers, gibddUsers, guvdUsers }: UserStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего пользователей</p>
              <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ГИБДД</p>
              <p className="text-2xl font-bold text-foreground">{gibddUsers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Building className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ГУВД</p>
              <p className="text-2xl font-bold text-foreground">{guvdUsers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
