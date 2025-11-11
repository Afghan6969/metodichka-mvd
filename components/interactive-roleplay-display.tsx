"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"

interface InteractiveRoleplayDisplayProps {
  steps: string[]
  onCopyCommand: (command: string, index: number) => void
  copiedIndex: number | null
}

interface Step {
  command: string
  index: number
  isQuestion: boolean
  isInstruction: boolean
  isVariant: boolean
  isStage: boolean
  isRadio: boolean
  isOOC: boolean
}

export function InteractiveRoleplayDisplay({ 
  steps, 
  onCopyCommand, 
  copiedIndex 
}: InteractiveRoleplayDisplayProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'yes' | 'no'>>({})

  // Парсим шаги и определяем их типы
  const parseSteps = (): Step[] => {
    const parsed: Step[] = []
    
    for (let i = 0; i < steps.length; i++) {
      const command = steps[i]
      const isStage = command.includes('ЭТАП')
      const isVariant = command.startsWith('—') || command.includes('Если') || command.includes('Для сотрудников') || command.includes('Для Капитанов')
      const isOOC = command.startsWith('/b')
      const isRadio = command.startsWith('/d')
      const isQuestion = command.startsWith('/do') && command.includes('?')
      const isInstruction = command.includes('Ответ в /do')
      
      parsed.push({
        command,
        index: i,
        isQuestion,
        isInstruction,
        isVariant,
        isStage,
        isRadio,
        isOOC
      })
    }
    
    return parsed
  }

  // Получаем активные шаги на основе выбранных ответов
  const getActiveSteps = (): Step[] => {
    const allSteps = parseSteps()
    const active: Step[] = []
    let currentQuestionIndex = -1
    let insideVariant = false
    let variantType: 'yes' | 'no' | null = null

    for (let i = 0; i < allSteps.length; i++) {
      const step = allSteps[i]

      // Всегда показываем этапы
      if (step.isStage) {
        active.push(step)
        insideVariant = false
        variantType = null
        continue
      }

      // Если это вариант (заголовок варианта)
      if (step.isVariant) {
        const isYesVariant = step.command.toLowerCase().includes('если') && 
          (step.command.toLowerCase().includes('есть') || 
           step.command.toLowerCase().includes('да') ||
           step.command.toLowerCase().includes('уменьшается') ||
           step.command.toLowerCase().includes('присутствует') ||
           step.command.toLowerCase().includes('в сознании'))
        
        const isNoVariant = step.command.toLowerCase().includes('если') && 
          (step.command.toLowerCase().includes('нет') || 
           step.command.toLowerCase().includes('без сознания') ||
           step.command.toLowerCase().includes('не уменьшается') ||
           step.command.toLowerCase().includes('отсутствует'))

        // Определяем тип варианта
        if (isYesVariant) {
          variantType = 'yes'
          const answer = selectedAnswers[currentQuestionIndex]
          insideVariant = true
          
          // Показываем заголовок варианта только если он выбран
          if (answer === 'yes') {
            active.push(step)
          }
        } else if (isNoVariant) {
          variantType = 'no'
          const answer = selectedAnswers[currentQuestionIndex]
          insideVariant = true
          
          // Показываем заголовок варианта только если он выбран
          if (answer === 'no') {
            active.push(step)
          }
        } else {
          // Обычные варианты (не заголовки) - показываем только если внутри выбранного варианта
          if (insideVariant && variantType === selectedAnswers[currentQuestionIndex]) {
            active.push(step)
          }
        }
        continue
      }

      // Если внутри варианта - показываем только если это выбранный вариант
      if (insideVariant) {
        const answer = selectedAnswers[currentQuestionIndex]
        if (variantType === answer) {
          // Обычные команды внутри выбранного варианта
          if (!step.isQuestion && !step.isInstruction) {
            active.push(step)
          }
        }
        
        // Если встретили следующий вопрос - выходим из режима варианта
        if (step.isQuestion) {
          insideVariant = false
          variantType = null
        }
      }

      // Вопрос - показываем всегда
      if (step.isQuestion) {
        active.push(step)
        continue
      }

      // Инструкция после вопроса
      if (step.isInstruction) {
        const prevStep = allSteps[i - 1]
        if (prevStep && prevStep.isQuestion) {
          currentQuestionIndex++
          active.push(step)
          
          // Проверяем, есть ли ответ
          const answer = selectedAnswers[currentQuestionIndex]
          if (!answer) {
            // Останавливаемся здесь - нужен выбор
            break
          }
        }
        continue
      }

      // Обычные команды (не внутри варианта)
      if (!step.isVariant && !step.isInstruction && !insideVariant) {
        active.push(step)
      }
    }

    return active
  }

  const activeStepsList = getActiveSteps()
  const currentQuestionIndex = Object.keys(selectedAnswers).length

  // Находим текущий вопрос для отображения кнопок
  const getCurrentQuestion = (): { question: string; instruction: string; index: number } | null => {
    const allSteps = parseSteps()
    let questionCount = 0
    
    for (let i = 0; i < allSteps.length; i++) {
      const step = allSteps[i]
      if (step.isQuestion) {
        if (questionCount === currentQuestionIndex) {
          const nextStep = allSteps[i + 1]
          return {
            question: step.command,
            instruction: nextStep && nextStep.isInstruction ? nextStep.command : '',
            index: questionCount
          }
        }
        questionCount++
      }
    }
    
    return null
  }

  const currentQuestion = getCurrentQuestion()
  const hasMoreSteps = currentQuestion !== null

  const handleAnswer = (answer: 'yes' | 'no') => {
    if (currentQuestion) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion.index]: answer
      }))
    }
  }

  const renderStep = (step: Step) => {
    const { command, index, isStage, isVariant, isOOC, isRadio } = step

    // Заголовки этапов (зелёные)
    if (isStage) {
      return (
        <div key={index} className="mt-6 first:mt-2">
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-400/30">
            <span className="font-bold text-green-300 text-base uppercase tracking-wide">
              {command}
            </span>
          </div>
        </div>
      )
    }

    // Варианты (синие)
    if (isVariant) {
      return (
        <div key={index} className="mt-3 first:mt-0">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-400/30">
            <span className="font-bold text-blue-300 text-sm tracking-wide">
              {command}
            </span>
          </div>
        </div>
      )
    }

    // OOC чат (серые)
    if (isOOC) {
      return (
        <div
          key={index}
          className="group flex items-center gap-2 p-3 rounded-lg bg-gray-500/10 border border-gray-400/30 hover:bg-gray-500/15 transition-colors"
        >
          <code className="flex-1 font-mono text-sm text-gray-300 italic">
            {command}
          </code>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onCopyCommand(command, index)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copiedIndex === index ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )
    }

    // Рация (жёлтые)
    if (isRadio) {
      return (
        <div
          key={index}
          className="group flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-400/30 hover:bg-yellow-500/15 transition-colors"
        >
          <code className="flex-1 font-mono text-sm text-yellow-200">
            {command}
          </code>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onCopyCommand(command, index)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copiedIndex === index ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )
    }

    // Обычные команды (белые)
    return (
      <div
        key={index}
        className="group flex items-center gap-2 p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
      >
        <code className="flex-1 font-mono text-sm text-white/90">
          {command}
        </code>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onCopyCommand(command, index)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copiedIndex === index ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Отображаем активные шаги */}
      <div className="space-y-2">
        {activeStepsList.map(step => renderStep(step))}
      </div>

      {/* Кнопки выбора ответа */}
      {hasMoreSteps && currentQuestion && (
        <Card className="border-2 border-purple-500/30 bg-purple-500/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-purple-200 mb-2">Выберите ответ:</p>
                <code className="text-base font-mono text-purple-100">
                  {currentQuestion.question}
                </code>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleAnswer('yes')}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  ✅ Да
                </Button>
                <Button
                  onClick={() => handleAnswer('no')}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  ❌ Нет
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Индикатор завершения */}
      {!hasMoreSteps && activeStepsList.length > 0 && (
        <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-400/30">
          <p className="text-green-300 font-semibold">
            ✅ Отыгровка завершена!
          </p>
        </div>
      )}
    </div>
  )
}