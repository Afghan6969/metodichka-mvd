import { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  icon: LucideIcon
  title: string
  description: string
  badge?: string
}

export function PageHeader({ icon: Icon, title, description, badge }: PageHeaderProps) {
  return (
    <div className="mb-8 animate-slide-up">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center border-2 border-primary/50 shadow-xl shadow-primary/30">
          <Icon className="h-8 w-8 text-primary-foreground" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{title}</h1>
          <p className="text-muted-foreground font-semibold text-lg">{description}</p>
        </div>
        {badge && (
          <div className="px-4 py-2 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl border-2 border-accent/30">
            <span className="text-sm font-bold uppercase tracking-widest text-accent">{badge}</span>
          </div>
        )}
      </div>
      {/* Проблесковый маячок - полицейская анимация */}
      <div className="police-divider"></div>
    </div>
  )
}
