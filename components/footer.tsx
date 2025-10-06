import { Star, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <div className="mt-16 pt-8 border-t border-border">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2 flex items-center justify-center gap-2">
          <Star className="h-3 w-3" />
          Разработано для МВД Республики Провинция (РП)
          <Star className="h-3 w-3" />
        </p>
        <a
          href="https://vk.com/id503251431"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium inline-flex items-center gap-2"
        >
          <ExternalLink className="h-3 w-3" />
          Разработчик: Poseidon_Wagner
        </a>
      </div>
    </div>
  )
}
