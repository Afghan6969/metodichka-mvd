"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Zap } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export function MedicalAidPage() {
  const firstAidSteps = [
    {
      title: "Подготовка аптечки",
      icon: "🩹",
      commands: [
        "Вариант 1 — если есть автомобиль:",
        "/do Аптечка находится в багажнике.",
        "/me открыл багажник и достал аптечку",
        "/do Аптечка в руках.",
        "/me поставил аптечку на землю и открыл её",
        "",
        "Вариант 2 — если машины нет:",
        "/do За спиной висит медицинская сумка с аптечкой.",
        "/me снял сумку, перекинутую через плечо, и поставил её рядом с пострадавшим",
        "/do Медицинская сумка находится на земле.",
        "/me расстегнул сумку и открыл аптечку внутри",
        "/do Аптечка открыта и готова к использованию."
      ]
    },
    {
      title: "Осмотр пострадавшего",
      icon: "🧍",
      commands: [
        "/do Что случилось с пострадавшим?",
        "/b Напишите в чат через команду /do, что с вами случилось.",
        "/b Пример: /do Пострадавшего сбила машина.",
        "",
        "/me поднес руку к сонной артерии пострадавшего",
        "/do Пульс обнаружен?",
        "/b Ответьте в чат: /do Да. или /do Нет."
      ]
    },
    {
      title: "Проверка пульса и сознания",
      icon: "❤️",
      commands: [
        "Вариант 1 — если пульс отсутствует:",
        "/me приступил к непрямому массажу сердца, делая ритмичные надавливания на грудную клетку",
        "/do Сотрудник выполняет непрямой массаж сердца.",
        "/me проверил пульс на сонной артерии",
        "/do Пульс восстановлен?",
        "/b Ответьте: /do Да. или /do Нет.",
        "",
        "Вариант 2 — если пульс есть, но человек без сознания:",
        "/me похлопал пострадавшего по щекам",
        "/do Реакция есть?",
        "/b Ответьте: /do Да. или /do Нет.",
        "/me достал ватный диск, смоченный нашатырным спиртом",
        "/me поднес ватку к носу пострадавшего",
        "/do Пострадавший приходит в сознание?",
        "/b Ответьте: /do Да. или /do Нет."
      ]
    },
    {
      title: "Обработка раны (дезинфекция)",
      icon: "🧴",
      commands: [
        "/do В аптечке лежит спрей \"Хлоргексидин\".",
        "/me достал из аптечки спрей \"Хлоргексидин\"",
        "/do Спрей \"Хлоргексидин\" в руке.",
        "/me обработал место ранения антисептиком",
        "/do Место ранения продезинфицировано.",
        "/me убрал спрей обратно в аптечку"
      ]
    },
    {
      title: "Наложение повязки / бинтование",
      icon: "🩹",
      commands: [
        "/do В аптечке лежат бинты.",
        "/me достал бинты и открыл упаковку",
        "/me приложил валик бинта к ране",
        "/me начал аккуратно наматывать бинт, фиксируя место повреждения",
        "/do Давящая повязка наложена.",
        "/me убрал использованный материал в сторону"
      ]
    },
    {
      title: "Наложение жгута (при кровотечении)",
      icon: "🩸",
      commands: [
        "/do В аптечке лежат жгут, ватка, спирт и шприц с обезболивающим.",
        "/me достал из аптечки жгут",
        "/me наложил жгут выше ранения",
        "/me затянул жгут, чтобы остановить кровотечение",
        "/do Жгут затянут.",
        "/me отметил время наложения жгута",
        "/do Время наложения жгута зафиксировано."
      ]
    },
    {
      title: "Переломы",
      icon: "🦴",
      commands: [
        "/me аккуратно надавил на место предполагаемого перелома",
        "/do Сотрудник проводит пальпацию.",
        "/do Какая часть тела повреждена?",
        "",
        "/do В аптечке лежат жгут, шина, вата и раствор йода.",
        "/me достал жгут и наложил выше места перелома",
        "/me обработал рану ватой со спиртовым раствором йода",
        "/do Рана обработана.",
        "/do В багажнике лежит вакуумная шина.",
        "/me достал шину и насос",
        "/me наложил шину на место перелома",
        "/me накачал шину насосом, зафиксировав конечность",
        "/do Шина надёжно зафиксирована.",
        "/me убрал насос обратно в багажник"
      ]
    },
    {
      title: "Ушибы и лёгкие травмы",
      icon: "💥",
      commands: [
        "/do В аптечке лежит холодный компресс, гепариновая мазь и бинт.",
        "/me достал холодный компресс и приложил к месту ушиба",
        "/me достал гепариновую мазь и нанёс на повреждённый участок",
        "/me наложил фиксирующую повязку бинтом",
        "/do Повязка наложена. Ушиб обработан."
      ]
    },
    {
      title: "Завершение оказания помощи",
      icon: "🚑",
      commands: [
        "/me собрал использованные материалы и убрал аптечку",
        "/do Аптечка убрана.",
        "/me убедился, что состояние пострадавшего стабильное",
        "/do Пострадавший в стабильном состоянии."
      ]
    }
  ]

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={Heart}
        title="🩹 Отыгровки первой медицинской помощи"
        description="Подробные инструкции по ролевой игре при оказании ПМП"
        badge={`${firstAidSteps.length} этапов`}
      />

      {/* Важное примечание */}
      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-6 hover:bg-white/12 hover:border-white/25 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500/80 to-amber-600/60 rounded-xl flex items-center justify-center border border-amber-400/30 shadow-lg flex-shrink-0">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4 text-white">Вызов скорой помощи</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Для сотрудников ниже Капитана:</h4>
                <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                  <code className="font-mono text-sm text-white/90 block">/me достал телефон и вызвал скорую помощь</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Для Капитанов и выше:</h4>
                <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                  <code className="font-mono text-sm text-white/90 block">/d [Фракция] - [Фракция] - Запрашиваю АСМП к "Место где находитесь", причина: причина вызова</code>
                </div>
                <div className="mt-2 text-sm text-white/70">
                  <strong>Пример:</strong> /d [ГУВД-П][ЦГБ-П] Запрашиваю АСМП к "Зданию полиции г. Приволжск", причина: гражданин без сознания
                </div>
              </div>

              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-amber-300">Важно:</strong> Вызов скорой помощи необходим перед началом оказания ПМП.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Таблица примеров */}
      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-8 hover:bg-white/12 hover:border-white/25 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500/80 to-blue-600/60 rounded-xl flex items-center justify-center border border-blue-400/30 shadow-lg">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wide text-white mb-2">Краткие примеры сочетаний</h2>
            <p className="text-white/80 text-sm">Шпаргалка по типам травм для быстрого выбора этапов ПМП</p>
          </div>
        </div>

        <div className="text-sm text-white/80 mb-6 italic bg-white/5 p-3 rounded-lg border border-white/10">
          💡 Это основные примеры, но не исчерпывающий список. Действуйте по ситуации и состоянию пострадавшего.
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-400/30 rounded-xl">
            <Zap className="h-5 w-5 text-red-300 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-red-300 mb-1">Огнестрельное ранение</div>
              <div className="text-sm text-red-200/80">Этапы: 1 → 2 → 3 → 6 → 4 → 5 → 9</div>
            </div>
            <div className="text-xs text-red-200/70 font-mono">Подготовка → Осмотр → Пульс → Жгут → Дезинфекция → Повязка → Завершение</div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-400/30 rounded-xl">
            <span className="text-2xl flex-shrink-0">🦴</span>
            <div className="flex-1">
              <div className="font-semibold text-red-300 mb-1">Перелом (падение с высоты)</div>
              <div className="text-sm text-red-200/80">Этапы: 1 → 2 → 3 → 6 → 4 → 5 → 7 → 9</div>
            </div>
            <div className="text-xs text-red-200/70 font-mono">Подготовка → Осмотр → Пульс → Жгут → Дезинфекция → Повязка → Шина → Завершение</div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-400/30 rounded-xl">
            <span className="text-2xl flex-shrink-0">🥊</span>
            <div className="flex-1">
              <div className="font-semibold text-red-300 mb-1">Ушибы после драки</div>
              <div className="text-sm text-red-200/80">Этапы: 1 → 2 → 8 → 9</div>
            </div>
            <div className="text-xs text-red-200/70 font-mono">Подготовка → Осмотр → Ушибы → Завершение</div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-400/30 rounded-xl">
            <span className="text-2xl flex-shrink-0">💀</span>
            <div className="flex-1">
              <div className="font-semibold text-red-300 mb-1">Потеря сознания</div>
              <div className="text-sm text-red-200/80">Этапы: 1 → 2 → 3 → 9</div>
            </div>
            <div className="text-xs text-red-200/70 font-mono">Подготовка → Осмотр → Пульс → Завершение</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {firstAidSteps.map((step: any, index: number) => (
          <div key={index} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500/80 to-red-600/60 rounded-xl flex items-center justify-center border border-red-400/30 shadow-lg">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-wide text-white group-hover:text-red-200 transition-colors">
                  {index + 1}. {step.title}
                </h3>
              </div>

              <div className="space-y-2">
                {step.commands.map((command: string, commandIndex: number) => {
                  const isSubpoint = (command.startsWith('Если') && command.endsWith(':')) || (command.startsWith('Вариант') && command.includes('—'));
                  const isEmptyLine = command === '';

                  if (isEmptyLine) {
                    return <div key={commandIndex} className="h-2"></div>;
                  }

                  if (isSubpoint) {
                    return (
                      <div key={commandIndex} className="mt-4 first:mt-0">
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/30">
                          <span className="font-bold text-red-300 text-sm uppercase tracking-wide">{command}</span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={commandIndex}>
                      <code className="font-mono text-sm px-4 py-3 rounded-xl border font-semibold block bg-white/10 text-white/90 border-white/20">
                        {command}
                      </code>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
