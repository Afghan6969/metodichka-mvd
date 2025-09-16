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
  Terminal,
  Book,
  ExternalLink,
  Calculator,
} from "lucide-react"

export function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-sans font-bold text-foreground">Содержание методички МВД</h1>
              <p className="text-muted-foreground mt-1">Полный справочник для сотрудников МВД Республики Провинция</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 dark:from-amber-950/20 dark:to-orange-950/20 dark:border-amber-800">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-500 rounded-lg">
                <span className="text-white text-lg">⚠️</span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-amber-900 dark:text-amber-100 mb-2">Важное уведомление</h3>
                <div className="space-y-2 text-amber-800 dark:text-amber-200">
                  <p>• Данная методичка может содержать неточности или устаревшую информацию</p>
                  <p>• Материалы служат основой для изучения, но не являются окончательным источником</p>
                  <p>• При возникновении спорных вопросов обращайтесь к актуальным регламентам</p>
                  <p>• Администрация не несет ответственности за возможные ошибки в содержании</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-sans font-bold text-foreground flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Основные разделы
              </h2>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-secondary bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Calculator className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-card-foreground">Калькулятор штрафов</h3>
                      <Badge variant="secondary" className="text-xs">
                        КоАП + УК
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Расчет штрафов, лишений прав и сроков ареста по всем статьям КоАП и УК
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Дорожные нарушения
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Уголовные дела
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Общественный порядок
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-primary bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-card-foreground">Лекции</h3>
                      <Badge variant="secondary" className="text-xs">
                        13 лекций
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Теоретические основы службы в МВД с возможностью копирования команд
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Задержание
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Применение силы
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Этика
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-accent bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-card-foreground">Тренировки</h3>
                      <Badge variant="secondary" className="text-xs">
                        8 упражнений
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Практические упражнения для отработки навыков</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Строевая
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Огневая
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Тактика
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-primary bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Radio className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-card-foreground">Доклады в рацию</h3>
                      <Badge variant="secondary" className="text-xs">
                        С примерами
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Стандартные фразы и команды для радиосвязи</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-sans font-bold text-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-secondary" />
                Структура МВД
              </h2>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-secondary bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Star className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-2">Звания и ранги</h3>
                    <p className="text-sm text-muted-foreground">Полная иерархия званий МВД с уровнями полномочий</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-primary bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-card-foreground">Должности ГИБДД</h3>
                      <Badge variant="default" className="text-xs">
                        Дорожная полиция
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Структура должностей дорожной полиции</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-accent bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-card-foreground">Должности ГУВД</h3>
                      <Badge variant="secondary" className="text-xs">
                        Внутренние дела
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Структура должностей внутренних дел, ОМОН, СОБР</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-secondary bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Terminal className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-2">Команды</h3>
                    <p className="text-sm text-muted-foreground">Игровые команды для всех подразделений МВД</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-sans font-bold text-foreground mb-4 flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              Справочные материалы
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-primary bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Book className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-2">Термины</h3>
                    <p className="text-sm text-muted-foreground">Глоссарий основных терминов и сокращений МВД</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-secondary bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <ExternalLink className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-2">Ресурсы</h3>
                    <p className="text-sm text-muted-foreground">Ссылки на официальные документы и ресурсы</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Card className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary rounded-lg">
                <span className="text-primary-foreground text-lg">💡</span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-card-foreground mb-2">Как пользоваться методичкой</h3>
                <div className="space-y-2 text-card-foreground">
                  <p>• Используйте поиск для быстрого нахождения нужной информации</p>
                  <p>• Навигация слева организована по принципу частоты использования</p>
                  <p>• Все материалы актуализированы для Республики Провинция</p>
                  <p>• Доклады в рацию теперь без функции копирования для упрощения интерфейса</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
