"use client"

import { useState, useMemo, useEffect } from"react"
import { Button } from"@/components/ui/button"
import { Card } from"@/components/ui/card"
import { Badge } from"@/components/ui/badge"
import { Progress } from"@/components/ui/progress"
import { Separator } from"@/components/ui/separator"
import { BookOpen, CheckCircle2, XCircle, RotateCcw, Trophy, Target, Brain } from"lucide-react"
import { PageHeader } from"@/components/page-header"
import { koapTestQuestions } from"./koap-test-data"
import { ukTestQuestions } from"./uk-test-data"
import type { TestQuestion, TestResult } from"./types"
import { cn } from"@/lib/utils"
import { shuffleArray, shuffleQuestionOptions } from"./utils"

type TestMode ="all" |"koap" |"uk"

export const LawTests = () => {
 const [testMode, setTestMode] = useState<TestMode | null>(null)
 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
 const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
 const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, number>>({})
 const [showExplanation, setShowExplanation] = useState(false)
 const [testCompleted, setTestCompleted] = useState(false)
 const [allQuestions, setAllQuestions] = useState<TestQuestion[]>([])

 // Инициализация и перемешивание вопросов при выборе режима теста
 useEffect(() => {
 if (!testMode) return
 
 let questions: TestQuestion[] = []
 if (testMode ==="koap") questions = [...koapTestQuestions]
 else if (testMode ==="uk") questions = [...ukTestQuestions]
 else questions = [...koapTestQuestions, ...ukTestQuestions]
 
 // Перемешиваем вопросы
 const shuffledQuestions = shuffleArray(questions)
 
 // Перемешиваем варианты ответов в каждом вопросе
 const questionsWithShuffledOptions = shuffledQuestions.map(question => 
 shuffleQuestionOptions(question)
 )
 
 setAllQuestions(questionsWithShuffledOptions)
 }, [testMode])

 const currentQuestion = allQuestions[currentQuestionIndex]

 const testResult: TestResult = useMemo(() => {
 const totalQuestions = allQuestions.length
 const answeredCount = Object.keys(answeredQuestions).length
 const correctAnswers = allQuestions.filter(
 (q) => answeredQuestions[q.id] === q.correctAnswer
 ).length
 const wrongAnswers = answeredCount - correctAnswers
 const percentage = answeredCount > 0 ? Math.round((correctAnswers / answeredCount) * 100) : 0

 return {
 totalQuestions,
 correctAnswers,
 wrongAnswers,
 percentage,
 answeredQuestions,
 }
 }, [allQuestions, answeredQuestions])

 const handleStartTest = (mode: TestMode) => {
 setTestMode(mode)
 setCurrentQuestionIndex(0)
 setSelectedAnswer(null)
 setAnsweredQuestions({})
 setShowExplanation(false)
 setTestCompleted(false)
 }

 const handleAnswerSelect = (answerIndex: number) => {
 if (answeredQuestions[currentQuestion.id] !== undefined) return
 setSelectedAnswer(answerIndex)
 }

 const handleSubmitAnswer = () => {
 if (selectedAnswer === null) return

 setAnsweredQuestions((prev) => ({
 ...prev,
 [currentQuestion.id]: selectedAnswer,
 }))
 setShowExplanation(true)
 }

 const handleNextQuestion = () => {
 if (currentQuestionIndex < allQuestions.length - 1) {
 setCurrentQuestionIndex((prev) => prev + 1)
 setSelectedAnswer(null)
 setShowExplanation(false)
 } else {
 setTestCompleted(true)
 }
 }

 const handleRestart = () => {
 setTestMode(null)
 setCurrentQuestionIndex(0)
 setSelectedAnswer(null)
 setAnsweredQuestions({})
 setShowExplanation(false)
 setTestCompleted(false)
 }

 const getAnswerClassName = (index: number) => {
 const isSelected = selectedAnswer === index
 const isAnswered = answeredQuestions[currentQuestion.id] !== undefined
 const isCorrect = index === currentQuestion.correctAnswer
 const wasSelected = answeredQuestions[currentQuestion.id] === index

 if (!isAnswered) {
 return cn(
"p-4 border-2 rounded-xl cursor-pointer transition-all duration-200",
 isSelected
 ?"border-blue-500 bg-blue-500/10"
 :"border-white/20 hover:border-white/40 hover:bg-white/5"
 )
 }

 if (isCorrect) {
 return"p-4 border-2 border-green-500 bg-green-500/10 rounded-xl cursor-not-allowed"
 }

 if (wasSelected && !isCorrect) {
 return"p-4 border-2 border-red-500 bg-red-500/10 rounded-xl cursor-not-allowed"
 }

 return"p-4 border-2 border-white/20 bg-white/5 rounded-xl cursor-not-allowed opacity-50"
 }

 if (!testMode) {
 return (
 <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
 <PageHeader
 icon={BookOpen}
 title="Тесты по УК и КоАП"
 description="Проверьте свои знания законодательства"
 badge="Обучение"
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <Card className="p-8 bg-white/8 border border-white/15 hover:bg-white/12 hover:border-white/25 transition-colors duration-200 cursor-pointer group"
 onClick={() => handleStartTest("all")}
 >
 <div className="flex flex-col items-center text-center space-y-4">
 <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
 <Brain className="h-8 w-8 text-white" />
 </div>
 <h3 className="text-xl font-bold text-white">Все тесты</h3>
 <p className="text-sm text-white/70">
 {koapTestQuestions.length + ukTestQuestions.length} вопросов по КоАП и УК
 </p>
 <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
 Полный курс
 </Badge>
 </div>
 </Card>

 <Card className="p-8 bg-white/8 border border-white/15 hover:bg-white/12 hover:border-white/25 transition-colors duration-200 cursor-pointer group"
 onClick={() => handleStartTest("koap")}
 >
 <div className="flex flex-col items-center text-center space-y-4">
 <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
 <Target className="h-8 w-8 text-white" />
 </div>
 <h3 className="text-xl font-bold text-white">КоАП</h3>
 <p className="text-sm text-white/70">
 {koapTestQuestions.length} вопросов по административным правонарушениям
 </p>
 <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
 Административное право
 </Badge>
 </div>
 </Card>

 <Card className="p-8 bg-white/8 border border-white/15 hover:bg-white/12 hover:border-white/25 transition-colors duration-200 cursor-pointer group"
 onClick={() => handleStartTest("uk")}
 >
 <div className="flex flex-col items-center text-center space-y-4">
 <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
 <Trophy className="h-8 w-8 text-white" />
 </div>
 <h3 className="text-xl font-bold text-white">УК</h3>
 <p className="text-sm text-white/70">
 {ukTestQuestions.length} вопросов по уголовным преступлениям
 </p>
 <Badge variant="secondary" className="bg-red-500/20 text-red-300 border-red-400/30">
 Уголовное право
 </Badge>
 </div>
 </Card>
 </div>
 </div>
 )
 }

 if (testCompleted) {
 const isPassed = testResult.percentage >= 70
 return (
 <div className="space-y-6 px-6 py-8 max-w-4xl mx-auto">
 <PageHeader
 icon={Trophy}
 title="Тест завершён"
 description="Результаты тестирования"
 badge={isPassed ?"Успешно" :"Требуется повторение"}
 />

 <Card className="p-8 bg-white/8 border border-white/15">
 <div className="space-y-6">
 <div className="text-center space-y-4">
 <div className={cn(
"w-24 h-24 mx-auto rounded-full flex items-center justify-center",
 isPassed ?"bg-green-500/20" :"bg-red-500/20"
 )}>
 {isPassed ? (
 <CheckCircle2 className="h-12 w-12 text-green-400" />
 ) : (
 <XCircle className="h-12 w-12 text-red-400" />
 )}
 </div>
 <h2 className="text-3xl font-bold text-white">
 {testResult.percentage}%
 </h2>
 <p className="text-white/70">
 {isPassed ?"Отличный результат!" :"Продолжайте учиться!"}
 </p>
 </div>

 <Separator />

 <div className="grid grid-cols-3 gap-4">
 <div className="text-center p-4 bg-white/5 rounded-xl">
 <div className="text-2xl font-bold text-white">{testResult.totalQuestions}</div>
 <div className="text-sm text-white/70">Всего вопросов</div>
 </div>
 <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/30">
 <div className="text-2xl font-bold text-green-400">{testResult.correctAnswers}</div>
 <div className="text-sm text-green-300/70">Правильных</div>
 </div>
 <div className="text-center p-4 bg-red-500/10 rounded-xl border border-red-500/30">
 <div className="text-2xl font-bold text-red-400">{testResult.wrongAnswers}</div>
 <div className="text-sm text-red-300/70">Неправильных</div>
 </div>
 </div>

 <div className="flex gap-4">
 <Button
 onClick={handleRestart}
 className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
 >
 <RotateCcw className="h-4 w-4 mr-2" />
 Начать заново
 </Button>
 <Button
 onClick={() => handleStartTest(testMode)}
 variant="outline"
 className="flex-1 border-white/20 text-white hover:bg-white/10"
 >
 Пройти ещё раз
 </Button>
 </div>
 </div>
 </Card>
 </div>
 )
 }

 // Если вопросы ещё не загружены, показываем загрузку
 if (!currentQuestion || allQuestions.length === 0) {
 return null
 }

 const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100

 return (
 <div className="space-y-6 px-6 py-8 max-w-4xl mx-auto">
 <PageHeader
 icon={BookOpen}
 title={`Вопрос ${currentQuestionIndex + 1} из ${allQuestions.length}`}
 description={currentQuestion.category}
 badge={`${testResult.correctAnswers} правильных`}
 />

 <div className="space-y-2">
 <div className="flex justify-between text-sm text-white/70">
 <span>Прогресс</span>
 <span>{Math.round(progress)}%</span>
 </div>
 <Progress value={progress} className="h-2" />
 </div>

 <Card className="p-8 bg-white/8 border border-white/15">
 <div className="space-y-6">
 <div className="space-y-2">
 <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
 {currentQuestion.article}
 </Badge>
 <h3 className="text-xl font-bold text-white">
 {currentQuestion.question}
 </h3>
 </div>

 <div className="space-y-3">
 {currentQuestion.options.map((option, index) => (
 <div
 key={index}
 className={getAnswerClassName(index)}
 onClick={() => handleAnswerSelect(index)}
 >
 <div className="flex items-center gap-3">
 <div className={cn(
"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
 selectedAnswer === index && answeredQuestions[currentQuestion.id] === undefined
 ?"bg-blue-500 text-white"
 : index === currentQuestion.correctAnswer && answeredQuestions[currentQuestion.id] !== undefined
 ?"bg-green-500 text-white"
 : answeredQuestions[currentQuestion.id] === index && index !== currentQuestion.correctAnswer
 ?"bg-red-500 text-white"
 :"bg-white/10 text-white/70"
 )}>
 {String.fromCharCode(65 + index)}
 </div>
 <span className="text-white">{option}</span>
 {answeredQuestions[currentQuestion.id] !== undefined && index === currentQuestion.correctAnswer && (
 <CheckCircle2 className="h-5 w-5 text-green-400 ml-auto" />
 )}
 {answeredQuestions[currentQuestion.id] === index && index !== currentQuestion.correctAnswer && (
 <XCircle className="h-5 w-5 text-red-400 ml-auto" />
 )}
 </div>
 </div>
 ))}
 </div>

 {showExplanation && (
 <div className={cn(
"p-4 rounded-xl border-2",
 answeredQuestions[currentQuestion.id] === currentQuestion.correctAnswer
 ?"bg-green-500/10 border-green-500/30"
 :"bg-red-500/10 border-red-500/30"
 )}>
 <div className="flex items-start gap-3">
 {answeredQuestions[currentQuestion.id] === currentQuestion.correctAnswer ? (
 <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
 ) : (
 <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
 )}
 <div className="space-y-1">
 <div className={cn(
"font-semibold",
 answeredQuestions[currentQuestion.id] === currentQuestion.correctAnswer
 ?"text-green-300"
 :"text-red-300"
 )}>
 {answeredQuestions[currentQuestion.id] === currentQuestion.correctAnswer
 ?"Правильно!"
 :"Неправильно"}
 </div>
 <div className="text-sm text-white/80">
 {currentQuestion.explanation}
 </div>
 </div>
 </div>
 </div>
 )}

 <div className="flex gap-4">
 {!showExplanation ? (
 <Button
 onClick={handleSubmitAnswer}
 disabled={selectedAnswer === null}
 className="flex-1 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
 >
 Ответить
 </Button>
 ) : (
 <Button
 onClick={handleNextQuestion}
 className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
 >
 {currentQuestionIndex < allQuestions.length - 1 ?"Следующий вопрос" :"Завершить тест"}
 </Button>
 )}
 <Button
 onClick={handleRestart}
 variant="outline"
 className="border-white/20 text-white hover:bg-white/10"
 >
 <RotateCcw className="h-4 w-4" />
 </Button>
 </div>
 </div>
 </Card>
 </div>
 )
}
