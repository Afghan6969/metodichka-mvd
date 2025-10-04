"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw, BookOpen, Scale, Gavel } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  article: string
}

const ukQuestions: Question[] = [
  {
    id: 1,
    question: "Какое наказание предусмотрено за умышленное причинение вреда здоровью человека без летального исхода?",
    options: [
      "Штраф 20.000 рублей",
      "Арест сроком на 1 год",
      "Арест сроком на 2 года",
      "Административный арест 10 суток",
    ],
    correct: 1,
    explanation:
      "Согласно статье 4.1 УК, умышленное причинение вреда здоровью человека без летального исхода наказывается арестом сроком на 1 год.",
    article: "Статья 4.1 УК",
  },
  {
    id: 2,
    question: "Что является терроризмом согласно УК?",
    options: [
      "Только взрывы",
      "Взрыв, поджог или иные действия, устрашающие население",
      "Только угрозы",
      "Хулиганство в общественных местах",
    ],
    correct: 1,
    explanation:
      "Статья 6.1 УК определяет терроризм как совершение взрыва, поджога или иных действий, устрашающих население и создающих опасность.",
    article: "Статья 6.1 УК",
  },
  {
    id: 3,
    question: "Какой срок давности привлечения к уголовной ответственности?",
    options: ["7 месяцев", "14 месяцев", "1 год", "2 года"],
    correct: 1,
    explanation:
      "Согласно статье 2.4 УК, срок давности привлечения к уголовной ответственности составляет 14 месяцев (1 месяц = 1 реальный день).",
    article: "Статья 2.4 УК",
  },
  {
    id: 4,
    question: "Какое наказание за получение взятки должностным лицом?",
    options: [
      "Только штраф",
      "Штраф в полуторакратном размере и арест на 3 года",
      "Арест на 1 год",
      "Административное наказание",
    ],
    correct: 1,
    explanation: "Статья 5.1 УК предусматривает штраф в полуторакратном размере от взятки и арест сроком на 3 года.",
    article: "Статья 5.1 УК",
  },
  {
    id: 5,
    question: "Что не является преступлением согласно УК?",
    options: ["Причинение вреда при необходимой обороне", "Кража", "Мошенничество", "Вандализм"],
    correct: 0,
    explanation:
      "Согласно статье 1.3 УК, не является преступлением причинение вреда посягающему лицу в состоянии необходимой обороны.",
    article: "Статья 1.3 УК",
  },
  {
    id: 6,
    question: "Какое наказание за незаконное хранение огнестрельного оружия?",
    options: ["Предупреждение", "Штраф 10.000 рублей", "Штраф 20.000 рублей и арест на 3 года", "Только конфискация"],
    correct: 2,
    explanation:
      "Статья 6.9 УК предусматривает штраф 20.000 рублей и арест сроком на 3 года за незаконное хранение огнестрельного оружия.",
    article: "Статья 6.9 УК",
  },
  {
    id: 7,
    question: "Что такое мошенничество по УК?",
    options: [
      "Открытое хищение",
      "Хищение путем обмана или злоупотребления доверием",
      "Угроза насилием",
      "Повреждение имущества",
    ],
    correct: 1,
    explanation:
      "Статья 7.1 УК определяет мошенничество как хищение чужого имущества путем обмана или злоупотребления доверием.",
    article: "Статья 7.1 УК",
  },
  {
    id: 8,
    question: "Какое наказание за похищение человека?",
    options: ["Арест на 2 года", "Арест от 4 до 6 лет", "Штраф 50.000 рублей", "Арест на 3 года"],
    correct: 1,
    explanation: "Согласно статье 4.4 УК, похищение гражданина наказывается арестом сроком от 4 до 6 лет.",
    article: "Статья 4.4 УК",
  },
  {
    id: 9,
    question: "Какое наказание за умышленное нанесение особо тяжких телесных повреждений?",
    options: ["Арест на 1 год", "Арест на 2 года", "Арест на 3 года", "Штраф 50.000 рублей"],
    correct: 1,
    explanation: "Статья 4.2 УК предусматривает арест сроком на 2 года за доведение до предсмертного состояния.",
    article: "Статья 4.2 УК",
  },
  {
    id: 10,
    question: "Что такое вандализм согласно УК?",
    options: [
      "Только граффити",
      "Осквернение зданий или порча имущества в общественных местах",
      "Кража из магазина",
      "Нарушение тишины",
    ],
    correct: 1,
    explanation: "Статья 6.6 УК определяет вандализм как осквернение зданий или порчу имущества в общественных местах.",
    article: "Статья 6.6 УК",
  },
  {
    id: 11,
    question: "Какое наказание за дачу взятки должностному лицу?",
    options: ["Штраф 20.000 рублей", "Арест на 3 года", "Штраф 50.000 рублей", "Предупреждение"],
    correct: 1,
    explanation: "Согласно статье 5.2 УК, дача взятки должностному лицу наказывается арестом сроком на 3 года.",
    article: "Статья 5.2 УК",
  },
  {
    id: 12,
    question: "Что такое грабеж по УК?",
    options: ["Скрытое хищение", "Открытое хищение чужого имущества", "Хищение путем обмана", "Повреждение имущества"],
    correct: 1,
    explanation: "Статья 7.2 УК определяет грабеж как открытое хищение чужого имущества.",
    article: "Статья 7.2 УК",
  },
  {
    id: 13,
    question: "Какое наказание за незаконное проникновение в жилище?",
    options: ["Штраф 10.000 рублей", "Арест на 2 года", "Арест на 1 год", "Предупреждение"],
    correct: 1,
    explanation: "Статья 6.7 УК предусматривает арест сроком на 2 года за незаконное проникновение в жилище.",
    article: "Статья 6.7 УК",
  },
  {
    id: 14,
    question: "Что такое вымогательство согласно УК?",
    options: [
      "Просьба о помощи",
      "Требование передачи имущества под угрозой насилия",
      "Открытое хищение",
      "Мошенничество",
    ],
    correct: 1,
    explanation:
      "Статья 7.3 УК определяет вымогательство как требование передачи имущества под угрозой применения насилия.",
    article: "Статья 7.3 УК",
  },
  {
    id: 15,
    question: "Какое наказание за захват заложника?",
    options: ["Арест на 2 года", "Арест до 3 лет", "Арест на 5 лет", "Штраф 100.000 рублей"],
    correct: 1,
    explanation: "Статья 6.3 УК предусматривает арест сроком до 3 лет за захват или удержание заложника.",
    article: "Статья 6.3 УК",
  },
  {
    id: 16,
    question: "Какое наказание за незаконные наркотические средства?",
    options: ["Штраф 10.000 рублей", "Штраф 20.000 рублей и арест на 3 года", "Только конфискация", "Предупреждение"],
    correct: 1,
    explanation: "Статья 6.10 УК предусматривает штраф 20.000 рублей и арест на 3 года за операции с наркотиками.",
    article: "Статья 6.10 УК",
  },
  {
    id: 17,
    question: "Что такое халатность должностного лица?",
    options: [
      "Опоздание на работу",
      "Ненадлежащее исполнение обязанностей, повлекшее ущерб",
      "Грубость с клиентами",
      "Нарушение дресс-кода",
    ],
    correct: 1,
    explanation:
      "Статья 5.13 УК определяет халатность как ненадлежащее исполнение обязанностей, повлекшее крупный ущерб.",
    article: "Статья 5.13 УК",
  },
  {
    id: 18,
    question: "Какое наказание за ложное сообщение о теракте?",
    options: ["Штраф 30.000 рублей", "Штраф 50.000 рублей и арест на 3 года", "Арест на 1 год", "Предупреждение"],
    correct: 1,
    explanation: "Статья 6.2 УК предусматривает штраф 50.000 рублей и арест на 3 года за ложное сообщение о теракте.",
    article: "Статья 6.2 УК",
  },
  {
    id: 19,
    question: "Что такое превышение должностных полномочий?",
    options: [
      "Работа сверхурочно",
      "Действия, выходящие за пределы полномочий",
      "Помощь коллегам",
      "Изучение новых навыков",
    ],
    correct: 1,
    explanation: "Статья 6.14 УК определяет превышение полномочий как действия, явно выходящие за пределы полномочий.",
    article: "Статья 6.14 УК",
  },
  {
    id: 20,
    question: "Какое наказание за организацию массовых беспорядков?",
    options: ["Штраф 50.000 рублей", "Штраф 100.000 рублей и арест до 6 лет", "Арест на 3 года", "Предупреждение"],
    correct: 1,
    explanation:
      "Статья 6.4 УК предусматривает штраф 100.000 рублей и арест до 6 лет за организацию массовых беспорядков.",
    article: "Статья 6.4 УК",
  },
]

const koapQuestions: Question[] = [
  {
    id: 1,
    question: "Какой штраф за управление ТС без документов?",
    options: ["10.000 рублей", "20.000 рублей", "30.000 рублей", "5.000 рублей"],
    correct: 1,
    explanation: "Согласно статье 5.1 КоАП, управление ТС без документов наказывается штрафом 20.000 рублей.",
    article: "Статья 5.1 КоАП",
  },
  {
    id: 2,
    question: "Какое наказание за проезд на красный свет?",
    options: ["Предупреждение", "Штраф 10.000 рублей", "Штраф 20.000 рублей", "Лишение прав"],
    correct: 2,
    explanation: "Статья 7.1 КоАП предусматривает штраф 20.000 рублей за проезд на красный сигнал светофора.",
    article: "Статья 7.1 КоАП",
  },
  {
    id: 3,
    question: "Какой срок давности для административной ответственности?",
    options: ["7 месяцев", "14 месяцев", "1 год", "6 месяцев"],
    correct: 1,
    explanation:
      "Согласно статье 4.5 КоАП, срок давности привлечения к административной ответственности составляет 14 месяцев.",
    article: "Статья 4.5 КоАП",
  },
  {
    id: 4,
    question: "Какое наказание за движение по встречной полосе?",
    options: [
      "Штраф 30.000 рублей",
      "Штраф 50.000 рублей с лишением прав до 2 лет",
      "Штраф 20.000 рублей",
      "Предупреждение",
    ],
    correct: 1,
    explanation: "Статья 9.1 КоАП предусматривает штраф 50.000 рублей с лишением права управления ТС сроком до 2 лет.",
    article: "Статья 9.1 КоАП",
  },
  {
    id: 5,
    question: "Что такое мелкое хулиганство по КоАП?",
    options: [
      "Только нецензурная лексика",
      "Нарушение порядка с нецензурной лексикой или приставанием",
      "Только повреждение имущества",
      "Появление в нижнем белье",
    ],
    correct: 1,
    explanation:
      "Статья 19.1 КоАП определяет мелкое хулиганство как нарушение порядка с нецензурной лексикой, приставанием или повреждением имущества.",
    article: "Статья 19.1 КоАП",
  },
  {
    id: 6,
    question: "Какое превышение скорости наказывается лишением прав?",
    options: ["60+ км/ч", "80+ км/ч", "40+ км/ч", "100+ км/ч"],
    correct: 1,
    explanation:
      "Согласно статье 18.5 КоАП, превышение скорости на 80+ км/ч наказывается штрафом и лишением прав на 1 год.",
    article: "Статья 18.5 КоАП",
  },
  {
    id: 7,
    question: "Какой штраф за управление ТС в состоянии опьянения?",
    options: ["20.000 рублей", "30.000 рублей с лишением прав до 1 года", "50.000 рублей", "10.000 рублей"],
    correct: 1,
    explanation:
      "Статья 17.1.4 КоАП предусматривает штраф 30.000 рублей с лишением права управления ТС сроком до 1 года.",
    article: "Статья 17.1.4 КоАП",
  },
  {
    id: 8,
    question: "Какое наказание за неповиновение сотруднику полиции?",
    options: [
      "Штраф 10.000 рублей",
      "Штраф 20.000 рублей или лишение прав, или арест до 20 суток",
      "Предупреждение",
      "Штраф 5.000 рублей",
    ],
    correct: 1,
    explanation:
      "Статья 19.9 КоАП предусматривает штраф 20.000 рублей или лишение прав на 1 год, или арест до 20 суток.",
    article: "Статья 19.9 КоАП",
  },
  {
    id: 9,
    question: "Какой штраф за управление ТС без регистрационных знаков?",
    options: ["5.000 рублей", "10.000 рублей", "20.000 рублей", "30.000 рублей"],
    correct: 1,
    explanation: "Статья 5.3 КоАП предусматривает штраф 10.000 рублей за управление ТС без госномеров.",
    article: "Статья 5.3 КоАП",
  },
  {
    id: 10,
    question: "Какое наказание за тонировку стекол менее 70%?",
    options: ["Предупреждение", "Штраф 20.000 рублей", "Штраф 10.000 рублей", "Снятие тонировки"],
    correct: 1,
    explanation: "Статья 5.4 КоАП предусматривает штраф 20.000 рублей за тонировку менее 70% светопропускания.",
    article: "Статья 5.4 КоАП",
  },
  {
    id: 11,
    question: "Какой штраф за остановку на пешеходном переходе?",
    options: ["5.000 рублей", "10.000 рублей", "15.000 рублей", "20.000 рублей"],
    correct: 1,
    explanation: "Статья 11.1 КоАП предусматривает штраф 10.000 рублей за остановку на пешеходном переходе.",
    article: "Статья 11.1 КоАП",
  },
  {
    id: 12,
    question: "Какое наказание за превышение скорости на 20-40 км/ч?",
    options: ["Предупреждение", "Штраф 2.000 рублей", "Штраф 5.000 рублей", "Штраф 10.000 рублей"],
    correct: 1,
    explanation: "Статья 18.2 КоАП предусматривает штраф 2.000 рублей за превышение скорости на 20-40 км/ч.",
    article: "Статья 18.2 КоАП",
  },
  {
    id: 13,
    question: "Какой штраф за появление в общественном месте в состоянии опьянения?",
    options: ["3.000 рублей", "5.000 рублей", "10.000 рублей", "15.000 рублей"],
    correct: 1,
    explanation:
      "Статья 19.4 КоАП предусматривает штраф 5.000 рублей за появление в общественном месте в состоянии опьянения.",
    article: "Статья 19.4 КоАП",
  },
  {
    id: 14,
    question: "Какое наказание за оставление места ДТП?",
    options: [
      "Штраф 20.000 рублей",
      "Штраф 30.000 рублей с лишением прав от 3 до 4 лет и арест на 20 суток",
      "Штраф 50.000 рублей",
      "Лишение прав на 1 год",
    ],
    correct: 1,
    explanation:
      "Статья 16.1 КоАП предусматривает штраф 30.000 рублей с лишением прав от 3 до 4 лет и арест на 20 суток.",
    article: "Статья 16.1 КоАП",
  },
  {
    id: 15,
    question: "Какое наказание за ложный вызов экстренных служб?",
    options: ["10.000 рублей", "20.000 рублей", "30.000 рублей", "5.000 рублей"],
    correct: 1,
    explanation: "Статья 19.7 КоАП предусматривает штраф 20.000 рублей за заведомо ложный вызов экстренных служб.",
    article: "Статья 19.7 КоАП",
  },
  {
    id: 16,
    question: "Какое наказание за нарушение правил обгона?",
    options: ["Штраф 10.000 рублей", "Штраф 20.000 рублей", "Штраф 30.000 рублей", "Предупреждение"],
    correct: 1,
    explanation: "Статья 10.3 КоАП предусматривает штраф 20.000 рублей за обгон в запрещенных случаях.",
    article: "Статья 10.3 КоАП",
  },
  {
    id: 17,
    question: "Какой штраф за движение по обочине?",
    options: ["10.000 рублей", "30.000 рублей", "20.000 рублей", "5.000 рублей"],
    correct: 1,
    explanation: "Статья 9.5 КоАП предусматривает штраф 30.000 рублей за движение по обочинам и тротуарам.",
    article: "Статья 9.5 КоАП",
  },
  {
    id: 18,
    question: "Какое наказание за предпринимательскую деятельность без лицензии?",
    options: ["Штраф 50.000 рублей", "Штраф 100.000 рублей", "Штраф 30.000 рублей", "Предупреждение"],
    correct: 1,
    explanation:
      "Статья 19.6 КоАП предусматривает штраф 100.000 рублей за предпринимательскую деятельность без лицензии.",
    article: "Статья 19.6 КоАП",
  },
  {
    id: 19,
    question: "Какой штраф за клевету?",
    options: ["10.000 рублей", "20.000 рублей", "30.000 рублей", "5.000 рублей"],
    correct: 1,
    explanation: "Статья 19.10 КоАП предусматривает штраф 20.000 рублей за распространение заведомо ложных сведений.",
    article: "Статья 19.10 КоАП",
  },
  {
    id: 20,
    question: "Какое наказание за нанесение побоев?",
    options: [
      "Штраф 10.000 рублей",
      "Штраф до 20.000 рублей или арест 10 суток",
      "Штраф 30.000 рублей",
      "Предупреждение",
    ],
    correct: 1,
    explanation:
      "Статья 19.3 КоАП предусматривает штраф до 20.000 рублей или административный арест 10 суток за побои.",
    article: "Статья 19.3 КоАП",
  },
]

type TestType = "uk" | "koap" | null

function TestsPage() {
  const [selectedTest, setSelectedTest] = useState<TestType>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [testQuestions, setTestQuestions] = useState<Question[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const startTest = (type: TestType) => {
    if (!type) return

    const questions = type === "uk" ? ukQuestions : koapQuestions
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 8)

    setSelectedTest(type)
    setTestQuestions(shuffled)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setShowExplanation(false)
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    const isCorrect = answerIndex === testQuestions[currentQuestion].correct
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const resetTest = () => {
    setSelectedTest(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setTestQuestions([])
    setShowExplanation(false)
  }

  const getScoreColor = () => {
    const percentage = (score / testQuestions.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    const percentage = (score / testQuestions.length) * 100
    if (percentage >= 80) return "Отлично! Вы хорошо знаете законодательство."
    if (percentage >= 60) return "Хорошо, но есть над чем поработать."
    return "Рекомендуется повторить материал."
  }

  if (!selectedTest) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Тесты на знание законодательства</h1>
          <p className="text-muted-foreground text-lg">
            Проверьте свои знания Уголовного кодекса и КоАП в формате экзамена
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startTest("uk")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
                <Gavel className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">Тест по Уголовному кодексу</CardTitle>
              <CardDescription>8 вопросов на знание уголовного законодательства</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Преступления против личности</p>
                <p>• Преступления против государственной власти</p>
                <p>• Преступления против общественного порядка</p>
                <p>• Экономические преступления</p>
              </div>
              <Button className="w-full mt-4" variant="default">
                Начать тест по УК
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startTest("koap")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Тест по КоАП</CardTitle>
              <CardDescription>8 вопросов на знание административного законодательства</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Нарушения ПДД</p>
                <p>• Административные правонарушения</p>
                <p>• Штрафы и наказания</p>
                <p>• Общественный порядок</p>
              </div>
              <Button className="w-full mt-4 bg-transparent" variant="outline">
                Начать тест по КоАП
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Как проходить тест:</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• В каждом тесте 8 случайных вопросов</li>
            <li>• Выберите один правильный ответ из четырех вариантов</li>
            <li>• После ответа вы увидите объяснение и ссылку на статью</li>
            <li>• Для успешного прохождения нужно набрать минимум 80%</li>
            <li>• Тесты можно проходить неограниченное количество раз</li>
          </ul>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>Разработано для изучения законодательства МВД</p>
          <p className="mt-1">
            Связь с разработчиком:{" "}
            <a
              href="https://vk.com/dev_contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              VK
            </a>
          </p>
        </footer>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              {score >= testQuestions.length * 0.8 ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <CardTitle className="text-2xl">Результат теста</CardTitle>
            <CardDescription>Тест по {selectedTest === "uk" ? "Уголовному кодексу" : "КоАП"} завершен</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor()}`}>
                {score}/{testQuestions.length}
              </div>
              <div className="text-lg text-muted-foreground mt-2">
                {Math.round((score / testQuestions.length) * 100)}% правильных ответов
              </div>
              <p className="mt-4 text-muted-foreground">{getScoreMessage()}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Прогресс</span>
                <span>
                  {score} из {testQuestions.length}
                </span>
              </div>
              <Progress value={(score / testQuestions.length) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {answers.map((correct, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-center text-sm font-medium ${
                    correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={resetTest} variant="outline" className="flex-1 bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Выбрать другой тест
              </Button>
              <Button onClick={() => startTest(selectedTest)} className="flex-1">
                Пройти еще раз
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>Разработано для изучения законодательства МВД</p>
          <p className="mt-1">
            Связь с разработчиком:{" "}
            <a
              href="https://vk.com/dev_contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              VK
            </a>
          </p>
        </footer>
      </div>
    )
  }

  const question = testQuestions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">{selectedTest === "uk" ? "Уголовный кодекс" : "КоАП"}</Badge>
          <span className="text-sm text-muted-foreground">
            Вопрос {currentQuestion + 1} из {testQuestions.length}
          </span>
        </div>
        <Progress value={((currentQuestion + 1) / testQuestions.length) * 100} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswer === null
                    ? "hover:bg-muted border-border"
                    : selectedAnswer === index
                      ? index === question.correct
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-red-100 border-red-500 text-red-800"
                      : index === question.correct
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-muted border-border text-muted-foreground"
                }`}
              >
                <div className="flex items-center">
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                  {selectedAnswer !== null && index === question.correct && (
                    <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                  )}
                  {selectedAnswer === index && index !== question.correct && (
                    <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 mb-2">{question.article}</p>
                  <p className="text-blue-800 text-sm leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button onClick={nextQuestion} className="w-full">
              {currentQuestion < testQuestions.length - 1 ? "Следующий вопрос" : "Завершить тест"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
        <p>Разработано для изучения законодательства МВД</p>
        <p className="mt-1">
          Связь с разработчиком:{" "}
          <a
            href="https://vk.com/dev_contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            VK
          </a>
        </p>
      </footer>
    </div>
  )
}

export { TestsPage }
