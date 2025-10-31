"use client"

import { useState } from"react"
import { Copy, Check } from"lucide-react"
import { Button } from"@/components/ui/button"
import { cn } from"@/lib/utils"

interface CopyButtonProps {
 text: string
 className?: string
}

export function CopyButton({ text, className ="" }: CopyButtonProps) {
 const [copied, setCopied] = useState(false)

 const handleCopy = async () => {
 try {
 await navigator.clipboard.writeText(text)
 setCopied(true)
 setTimeout(() => setCopied(false), 1500)
 } catch (err) {
 console.error("Failed to copy text:", err)
 }
 }

 return (
 <Button
 variant={copied ?"default" :"outline"}
 size="sm"
 onClick={handleCopy}
 className={cn(
"inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out hover:shadow-md active:scale-[0.98] focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-ring/50",
 copied &&"bg-green-500 hover:bg-green-600 text-white shadow-lg",
 className
 )}
 title={copied ?"Скопировано!" :"Копировать"}
 >
 {copied ? (
 <>
 <Check className="h-3.5 w-3.5" />
 Скопировано!
 </>
 ) : (
 <>
 <Copy className="h-3.5 w-3.5" />
 Копировать
 </>
 )}
 </Button>
 )
}
