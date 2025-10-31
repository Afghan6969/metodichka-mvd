"use client"

import { Button } from"@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from"lucide-react"

interface PaginationProps {
 currentPage: number
 totalPages: number
 onPageChange: (page: number) => void
 itemsPerPage: number
 totalItems: number
}

export function Pagination({
 currentPage,
 totalPages,
 onPageChange,
 itemsPerPage,
 totalItems,
}: PaginationProps) {
 const startItem = (currentPage - 1) * itemsPerPage + 1
 const endItem = Math.min(currentPage * itemsPerPage, totalItems)

 if (totalPages <= 1) return null

 return (
 <div className="flex items-center justify-between pt-4 border-t border-white/10">
 <div className="text-sm text-blue-200/80">
 Показано {startItem}-{endItem} из {totalItems}
 </div>
 <div className="flex items-center gap-2">
 <Button
 variant="outline"
 size="sm"
 onClick={() => onPageChange(1)}
 disabled={currentPage === 1}
 className="h-8 px-3 border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300"
 >
 <ChevronsLeft className="h-4 w-4 mr-1" />
 Первая
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => onPageChange(currentPage - 1)}
 disabled={currentPage === 1}
 className="h-8 px-3 border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300"
 >
 <ChevronLeft className="h-4 w-4 mr-1" />
 Назад
 </Button>
 <div className="flex items-center gap-1">
 {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
 let pageNum: number
 if (totalPages <= 5) {
 pageNum = i + 1
 } else if (currentPage <= 3) {
 pageNum = i + 1
 } else if (currentPage >= totalPages - 2) {
 pageNum = totalPages - 4 + i
 } else {
 pageNum = currentPage - 2 + i
 }

 return (
 <Button
 key={pageNum}
 variant={currentPage === pageNum ?"default" :"outline"}
 size="sm"
 onClick={() => onPageChange(pageNum)}
 className={`h-8 w-8 p-0 ${currentPage === pageNum
 ?"bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-100"
 :"border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300"
 }`}
 >
 {pageNum}
 </Button>
 )
 })}
 </div>
 <Button
 variant="outline"
 size="sm"
 onClick={() => onPageChange(currentPage + 1)}
 disabled={currentPage === totalPages}
 className="h-8 px-3 border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300"
 >
 Вперёд
 <ChevronRight className="h-4 w-4 ml-1" />
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => onPageChange(totalPages)}
 disabled={currentPage === totalPages}
 className="h-8 px-3 border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300"
 >
 Последняя
 <ChevronsRight className="h-4 w-4 ml-1" />
 </Button>
 </div>
 </div>
 )
}
