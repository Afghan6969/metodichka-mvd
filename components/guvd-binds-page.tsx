"use client"

import { useState } from "react"
import { Copy, Check, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function GuvdBindsPage() {
  const [copiedBind, setCopiedBind] = useState<string | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedBind(text)
      setTimeout(() => setCopiedBind(null), 2000)
    } catch (err) {
      console.error("Ошибка копирования:", err)
    }
  }

  const BindItem = ({ bind, description }: { bind: string; description?: string }) => (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
      <div className="flex-1">
        <code className="text-sm font-mono text-foreground">{bind}</code>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(bind)} className="ml-2 h-8 w-8 p-0">
        {copiedBind === bind ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )

  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px bg-border flex-1" />
      <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
        {title}
      </Badge>
      <div className="h-px bg-border flex-1" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-secondary/10 rounded-lg">
            <Keyboard className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-secondary">Бинды ГУВД</h1>
            <p className="text-muted-foreground">Готовые команды для сотрудников ГУВД</p>
          </div>
        </div>
      </div>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-800">Важные примечания</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs">
              UP
            </Badge>
            <p className="text-sm text-yellow-800">
              Клавиши где присутствуют "up", нужно зажимать на 1-2 секунды, после того как отпустите - сработает
              отыгровка "up".
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs">
              Интервал
            </Badge>
            <p className="text-sm text-yellow-800">Интервал между биндами - не менее двух секунд.</p>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs">
              Лимит
            </Badge>
            <p className="text-sm text-yellow-800">На одну клавишу не более трёх отыгровок.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {/* Приветствие коллег */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Приветствие коллег</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind='bind [клавиша] say Звание, ГУВД по городу "Город", "Фамилия Имя.' />
          </CardContent>
        </Card>

        {/* Предъявление служебного удостоверения */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Предъявление служебного удостоверения</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] say Гражданин, предоставьте документ удостоверяющий вашу личность." />
          </CardContent>
        </Card>

        {/* Изучение документов */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Изучение документов</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] me изучает документы" />
            <BindItem bind="bind [клавиша] do Личность гражданина установлена." />
          </CardContent>
        </Card>

        {/* Проверка через фото и КПК */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Проверка через фото и КПК</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] do Мини-фотоаппарат и КПК в кармане." />
            <BindItem bind="bind [клавиша] me достав фотоаппарат и КПК, сфотографировал человека" />
            <BindItem bind="bind [клавиша] up me открыл базу граждан на КПК, сверил сделанную фотографию с данными базы" />
          </CardContent>
        </Card>

        {/* Задержание и наручники */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">
              Задержание и наручники гражданина в машине с открытой дверью
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] me отстегнув ремень безопасности, высадил задержанного и надел на него наручники" />
            <BindItem bind="bind [клавиша] chatbox cuff" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Протокол задержания</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <SectionDivider title="Часть 1" />
            <BindItem bind="bind [клавиша] do В руке сотрудника папка с протоколами и ручкой." />
            <BindItem bind="bind [клавиша] me вытащил из папки бланк с ручкой и оформил протокол задержания" />
            <BindItem bind="bind [клавиша] me протянул протокол и ручку задержанному" />

            <SectionDivider title="Часть 2" />
            <BindItem bind="bind [клавиша] say подпись поставьте" />
            <BindItem bind="bind [клавиша] n /me поставил подпись" />
            <BindItem bind="bind [клавиша] me оторвал копию протокола и передал её гражданину" />

            <SectionDivider title="Часть 3" />
            <BindItem bind="bind [клавиша] do Конвоир взял протокол задержания и увел задержанного в КПЗ." />
            <BindItem bind="bind [клавиша] chatbox arrest" />
          </CardContent>
        </Card>

        {/* Запрос на пробитие номера */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Запрос на пробитие номера</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] do На поясе закреплён тактический планшет." />
            <BindItem bind="bind [клавиша] me сняв тактический планшет с пояса, сделал фотографию номеров и передал данные ГИБДД" />
            <BindItem bind='bind [клавиша] ro [ГУВД-Город]-[ГИБДД] Прошу проверить по базе данных номер "номер и регион транспорта".' />
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Пример:</p>
              <p className="text-sm text-blue-800 font-mono">
                Капитан Poseidon_Wagner[1]: [ГУВД-П]-[ГИБДД] Прошу проверить по базе данных автомобильный номер
                X222XX77.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Мегафон */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Мегафон: требование остановиться</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] do Мегафон закреплён на поясе." />
            <BindItem bind="bind [клавиша] me сняв мегафон с пояса, крикнул в него" />
            <BindItem bind="bind [клавиша] m Останавливаемся! В противном случае будут применены силовые меры!" />
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Перед применением меры наказания сотрудник должен быть уверен, что выдвинутое требование было верно
                воспринято именно тем лицом, к которому оно адресовывалось.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Передача данных по нарушителю */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Передача данных по нарушителю</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] do Рация закреплена на нагрудном кармане." />
            <BindItem bind="bind [клавиша] me сняв рацию с нагрудного кармана, продиктовал диспетчеру приметы правонарушителя" />
            <BindItem bind="bind [клавиша] chatbox su" />
          </CardContent>
        </Card>

        {/* Снятие обвинений */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Снятие обвинений (Розыска)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] do Рация закреплена на нагрудном кармане." />
            <BindItem bind="bind [клавиша] me сняв рацию с нагрудного кармана, запросил у диспетчера снятие обвинений" />
            <BindItem bind="bind [клавиша] chatbox clear" />
          </CardContent>
        </Card>

        {/* Причина остановки граждан */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Причина остановки граждан</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] say Остановлены за нарушение законодательства." />
            <BindItem bind="bind [клавиша] say Остановлены по подозрению на нарушение законодательства." />
          </CardContent>
        </Card>

        {/* Посадка задержанного */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Посадка задержанного в служебный автомобиль</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] me посадив задержанного в служебный автомобиль, пристегнул ремнём безопасности" />
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                При активном конвоировании (/arr), либо же после отыгровки сесть в автомобиль и прописать /putpl id
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Штраф</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <SectionDivider title="Часть 1" />
            <BindItem bind="bind [клавиша] do КПК находится в кармане." />
            <BindItem bind="bind [клавиша] me достав КПК из кармана, включил его и открыл базу данных" />
            <BindItem bind='bind [клавиша] up me введя данные гражданина, нажал на кнопку "Выписать штраф"' />

            <SectionDivider title="Часть 2" />
            <BindItem bind='bind [клавиша] do На экране надпись "Штраф успешно выписан".' />
            <BindItem bind="bind [клавиша] chatbox tsu" />
            <BindItem bind="bind [клавиша] me выслал СМС на номер телефона гражданина, копию протокола с подробной информацией" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Разбитие стекла и доставание гражданина</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <SectionDivider title="Часть 1" />
            <BindItem bind="bind [клавиша] do Дубинка на поясе." />
            <BindItem bind="bind [клавиша] me сняв дубинку с пояса ударил ею по стеклу и разбил его" />
            <BindItem bind="bind [клавиша] up do Окно разбито." />

            <SectionDivider title="Часть 2" />
            <BindItem bind="bind [клавиша] me просунув руку в салон открыл центральный замок автомобиля" />
            <BindItem bind="bind [клавиша] me отстегнул ремень безопасности и вытащил преступника из автомобиля надев на него наручники" />
            <BindItem bind="bind [клавиша] chatbox cuff" />
          </CardContent>
        </Card>

        {/* Список граждан в розыске */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Список граждан в розыске</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BindItem bind="bind [клавиша] do На поясе закреплён тактический планшет." />
            <BindItem bind="bind [клавиша] me сняв тактический планшет с пояса, открыл базу данных федерального розыска" />
            <BindItem bind="bind [клавиша] wanted" />
          </CardContent>
        </Card>
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Разработано{" "}
            <a
              href="https://vk.com/id503251431"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              Poseidon_Wagner
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
