import type React from "react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronDown, 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  Search, 
  ScrollText,
  Dumbbell,
  Zap,
  Target,
  Clock,
  Calendar
} from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"
import { lectures } from "./lectures-page"
import { trainings } from "./training-page"

export function EducationPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("lectures")

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTrainings = trainings.filter(
    (training) =>
      training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.content.some((line) => line.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const categoryLabels = {
    basic: "Базовые",
    advanced: "Продвинутые",
    special: "Специальные"
  }

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader 
        icon={GraduationCap}
        title="Обучение персонала МВД"
        description="Лекции и тренировки для подготовки сотрудников"
        badge={`${lectures.length + trainings.length} материалов`}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-14 bg-card border border-border rounded-2xl p-1">
          <TabsTrigger value="lectures" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <ScrollText className="h-4 w-4 mr-2" />
            Лекции ({lectures.length})
          </TabsTrigger>
          <TabsTrigger value="trainings" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Dumbbell className="h-4 w-4 mr-2" />
            Тренировки ({trainings.length})
          </TabsTrigger>
        </TabsList>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={
              activeTab === "lectures" 
                ? "Поиск по лекциям..." 
                : "Поиск по тренировкам..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 rounded-xl border-border"
          />
        </div>

        <TabsContent value="lectures" className="space-y-4 mt-6">
          {filteredLectures.map((lecture) => (
            <div 
              key={lecture.id} 
              className="group relative bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <Collapsible open={openItems[lecture.id]} onOpenChange={() => toggleItem(lecture.id)}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-5 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-base font-bold text-foreground mb-1">{lecture.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {categoryLabels[lecture.category]}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {lecture.content.split("\n").length} строк
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {openItems[lecture.id] ? (
                          <ChevronDown className="h-4 w-4 text-primary" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-5 pb-5">
                    <div className="bg-muted/50 p-4 rounded-xl border border-border">
                      <div className="space-y-2">
                        {lecture.content.split("\n").map((line, index) => (
                          <div key={index} className="flex items-start gap-3 group/line hover:bg-accent/30 p-2 rounded-lg transition-colors">
                            <div className="flex-1 font-mono text-sm text-foreground/80 leading-relaxed">{line}</div>
                            {line.trim().startsWith("say ") && (
                              <div className="flex-shrink-0 opacity-60 group-hover/line:opacity-100 transition-opacity">
                                <CopyButton text={line.trim()} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="trainings" className="space-y-4 mt-6">
          {filteredTrainings.map((training) => (
            <div
              key={training.id}
              className="group relative bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <Collapsible open={openItems[training.id]} onOpenChange={() => toggleItem(training.id)}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-5 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        {training.icon === Dumbbell ? (
                          <Dumbbell className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        ) : training.icon === Target ? (
                          <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-base font-bold text-foreground mb-1">{training.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {categoryLabels[training.category]}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {training.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {training.content.length} команд
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {openItems[training.id] ? (
                          <ChevronDown className="h-4 w-4 text-primary" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-5 pb-5">
                    <div className="bg-muted/50 p-4 rounded-xl border border-border">
                      <div className="space-y-2">
                        {training.content.map((line, index) => (
                          <div key={index} className="flex items-start gap-3 group/line hover:bg-accent/30 p-2 rounded-lg transition-colors">
                            <div className="flex-1 font-mono text-sm text-foreground/80 leading-relaxed">{line}</div>
                            {line.trim().startsWith("say ") && (
                              <div className="flex-shrink-0 opacity-60 group-hover/line:opacity-100 transition-opacity">
                                <CopyButton text={line.trim()} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {training.note && (
                        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl">
                          <p className="text-sm">
                            <span className="font-bold text-primary">Уточнение:</span> {training.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
