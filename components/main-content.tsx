import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Users,
  Home,
  GraduationCap,
  Radio,
  Building2,
  Star,
  Book,
  ExternalLink,
  Sparkles,
  TrendingUp,
} from "lucide-react"

export function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-xl shadow-lg animate-pulse">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-sans font-bold text-foreground">Содержание методички МВД</h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Полный справочник для сотрудников МВД Республики Провинция
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 p-6 bg-gradient-to-r from-amber-50 via-orange-910 to-yellow-50 border-amber-200 dark:from-amber-950/20 dark:to-orange-950/20 dark:border-amber-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-1000 to-orange-100 rounded-xl shadow-md">
                <span className="text-white text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-amber-900 dark:text-amber-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Важное уведомление
                </h3>
                <div className="space-y-2 text-amber-800 dark:text-amber-200">
                  <p className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    Данная методичка может содержать неточности или устаревшую информацию
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    Материалы служат основой для изучения, но не являются окончательным источником
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    При возникновении спорных вопросов обращайтесь к актуальным регламентам
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    Администрация не несет ответственности за возможные ошибки в содержании
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-sans font-bold text-foreground flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                  <Home className="h-6 w-6 text-primary-foreground" />
                </div>
                Основные разделы
              </h2>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Radio className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-card-foreground text-lg">Калькулятор штрафов</h3>
                      <Badge variant="secondary" className="text-xs animate-pulse">
                        КоАП + УК
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Расчет штрафов, лишений прав и сроков ареста по всем статьям КоАП и УК
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                        Дорожные нарушения
                      </Badge>
                      <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                        Уголовные дела
                      </Badge>
                      <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                        Общественный порядок
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-card-foreground text-lg">Лекции</h3>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      >
                        13 лекций
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Теоретические основы службы в МВД с возможностью копирования команд
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                        Задержание
                      </Badge>
                      <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                        Применение силы
                      </Badge>
                      <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                        Этика
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-card-foreground text-lg">Тренировки</h3>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-green-500 to-teal-500 text-white"
                      >
                        8 упражнений
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Практические упражнения для отработки навыков
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs hover:bg-accent/10 transition-colors">
                        Строевая
                      </Badge>
                      <Badge variant="outline" className="text-xs hover:bg-accent/10 transition-colors">
                        Огневая
                      </Badge>
                      <Badge variant="outline" className="text-xs hover:bg-accent/10 transition-colors">
                        Тактика
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Radio className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-card-foreground text-lg">Доклады в рацию</h3>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      >
                        С примерами
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Стандартные фразы и команды для радиосвязи
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-sans font-bold text-foreground flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                </div>
                Структура МВД
              </h2>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-card-foreground text-lg">Должности ГИБДД</h3>
                      <Badge variant="default" className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500">
                        Дорожная полиция
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Структура должностей дорожной полиции
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-card-foreground text-lg">Должности ГУВД</h3>
                      <Badge variant="default" className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500">
                        Внутренние дела
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Структура должностей внутренних дел, ОМОН, СОБР
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Radio className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-card-foreground mb-3 text-lg">Команды</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Игровые команды для всех подразделений МВД
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-sans font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <Book className="h-6 w-6 text-primary-foreground" />
              </div>
              Справочные материалы
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-card-foreground mb-3 text-lg">Термины</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Глоссарий основных терминов и сокращений МВД
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-card-foreground mb-3 text-lg">Ресурсы</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ссылки на официальные документы и ресурсы
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-border/50">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3 flex items-center justify-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Разработано для МВД Республики Провинция (РП)
                <Star className="h-4 w-4 text-primary" />
              </p>
              <a
                href="https://vk.com/id503251431"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-semibold inline-flex items-center gap-2 hover:scale-105 transform duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                Разработчик: Poseidon_Wagner
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
