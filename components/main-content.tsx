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
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-muted rounded-2xl">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Содержание методички МВД</h1>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                Полный справочник для сотрудников МВД Республики Провинция
              </p>
            </div>
          </div>
        </div>
      </div>

<div className="p-6">
  <div className="max-w-5xl mx-auto">
    <Card className="mb-8 p-6 bg-orange-100 border-orange-300 dark:bg-orange-950/20 dark:border-orange-800/40">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-orange-200 dark:bg-orange-900/40 rounded-xl">
          <span className="text-orange-700 text-lg">⚠️</span>
        </div>
        <div>
          <h3 className="font-bold text-black-900 dark:text-black-200 mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Важное уточнение
          </h3>
          <div className="space-y-2 text-black-800 dark:text-black-300 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-black-700 mt-1">•</span>
              Данная методичка может содержать неточности или устаревшую информацию
            </p>
            <p className="flex items-start gap-2">
              <span className="text-black-700 mt-1">•</span>
              Материалы служат основой для изучения, но не являются окончательным источником
            </p>
            <p className="flex items-start gap-2">
              <span className="text-black-700 mt-1">•</span>
              При возникновении спорных вопросов обращайтесь к актуальным регламентам
            </p>
            <p className="flex items-start gap-2">
              <span className="text-black-700 mt-1">•</span>
              Администрация не несет ответственности за возможные ошибки в содержании
            </p>
            <p className="flex items-start gap-2">
              <span className="text-black-700 mt-1">•</span>
              При обнаружении неточности сообщите об этом разработчику
            </p>
          </div>
        </div>
      </div>
    </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <div className="p-2 bg-primary rounded-xl">
                  <Home className="h-5 w-5 text-primary-foreground" />
                </div>
                Основные разделы
              </h2>

              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Radio className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-card-foreground">Калькулятор наказаний</h3>
                      <Badge variant="secondary" className="text-xs">
                        КоАП + УК
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      Расчет штрафов, лишений прав и сроков ареста по всем статьям КоАП и УК
                    </p>
                    <div className="flex flex-wrap gap-2">
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

              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <GraduationCap className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-card-foreground">Лекции</h3>
                      <Badge variant="secondary" className="text-xs">
                        13 лекций
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      Теоретические основы службы в МВД с возможностью копирования команд
                    </p>
                    <div className="flex flex-wrap gap-2">
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

              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Target className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-card-foreground">Тренировки</h3>
                      <Badge variant="secondary" className="text-xs">
                        8 упражнений
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      Практические упражнения для отработки навыков
                    </p>
                    <div className="flex flex-wrap gap-2">
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

              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Radio className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-card-foreground">Доклады в рацию</h3>
                      <Badge variant="secondary" className="text-xs">
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
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <div className="p-2 bg-primary rounded-xl">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                Структура МВД
              </h2>

              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Users className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-card-foreground">Должности ГИБДД</h3>
                      <Badge variant="default" className="text-xs">
                        Дорожная полиция
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Структура должностей дорожной полиции
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Users className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-card-foreground">Должности ГУВД</h3>
                      <Badge variant="default" className="text-xs">
                        Внутренние дела
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Структура должностей внутренних дел, ОМОН, СОБР
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Radio className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-card-foreground mb-2">Команды</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Игровые команды для всех подразделений МВД
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl">
                <Book className="h-5 w-5 text-primary-foreground" />
              </div>
              Справочные материалы
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Book className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-card-foreground mb-2">Термины</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Глоссарий основных терминов и сокращений МВД
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="modern-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Book className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-card-foreground mb-2">Ресурсы</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ссылки на официальные документы и ресурсы
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-border">
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
        </div>
      </div>
    </div>
  )
}
