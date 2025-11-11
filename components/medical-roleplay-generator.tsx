"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, Copy, Settings, Eye, EyeOff, Loader2, Check, AlertCircle } from "lucide-react"
import { generateMedicalRoleplay, validateApiKey, saveApiKey, loadApiKey, clearApiKey, type MedicalScenario } from "@/lib/gemini-api"
import { useToast } from "@/hooks/use-toast"

const SCENARIO_TYPES = [
  { value: "gunshot", label: "🔫 Огнестрельное ранение" },
  { value: "knife", label: "🔪 Ножевое ранение" },
  { value: "fracture", label: "🦴 Перелом конечности" },
  { value: "car_accident", label: "🚗 ДТП" },
  { value: "fall", label: "⬇️ Падение с высоты" },
  { value: "unconscious", label: "💤 Потеря сознания" },
  { value: "heart_attack", label: "❤️ Сердечный приступ" },
  { value: "bleeding", label: "🩸 Кровотечение" },
  { value: "burn", label: "🔥 Ожог" },
  { value: "bruise", label: "💥 Ушибы" },
  { value: "poisoning", label: "☠️ Отравление" },
  { value: "custom", label: "✏️ Своя ситуация" }
]


export function MedicalRoleplayGenerator() {
  const { toast } = useToast()
  
  // API ключ
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isApiKeyValid, setIsApiKeyValid] = useState(false)
  const [showApiSettings, setShowApiSettings] = useState(false) // Показывать ли настройки API
  
  // Параметры сценария
  const [scenarioType, setScenarioType] = useState("")
  const [customScenario, setCustomScenario] = useState("")
  const [hasCar, setHasCar] = useState<boolean | null>(null)
  const [shortVersion, setShortVersion] = useState(false)
  
  // Состояние генерации
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState("") // НОВОЕ: статус генерации
  const [generatedRoleplay, setGeneratedRoleplay] = useState<string[]>([])
  const [scenarioDescription, setScenarioDescription] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  
  // Загрузка API ключа при монтировании
  useEffect(() => {
    const savedKey = loadApiKey()
    if (savedKey) {
      setApiKey(savedKey)
      setIsApiKeyValid(validateApiKey(savedKey))
      setShowApiSettings(true) // Показываем настройки если ключ уже сохранён
    }
  }, [])
  
  // Валидация API ключа
  useEffect(() => {
    setIsApiKeyValid(validateApiKey(apiKey))
  }, [apiKey])
  
  const handleSaveApiKey = () => {
    if (isApiKeyValid) {
      saveApiKey(apiKey)
      toast({
        title: "✅ API ключ сохранён",
        description: "Ключ сохранён в браузере"
      })
    } else {
      toast({
        title: "❌ Неверный формат",
        description: "Проверьте правильность API ключа",
        variant: "destructive"
      })
    }
  }
  
  const handleClearApiKey = () => {
    clearApiKey()
    setApiKey("")
    setShowApiSettings(false) // Скрываем настройки после очистки
    toast({
      title: "🗑️ API ключ удалён",
      description: "Ключ удалён из браузера"
    })
  }
  
  const handleGenerate = async () => {
    if (!scenarioType) {
      toast({
        title: "❌ Ошибка",
        description: "Выберите тип ситуации",
        variant: "destructive"
      })
      return
    }
    
    setIsGenerating(true)
    setGeneratedRoleplay([])
    setGenerationStatus("🚀 Начинаем генерацию...")
    
    try {
      const scenario: MedicalScenario = {
        type: scenarioType === "custom" ? customScenario : SCENARIO_TYPES.find(t => t.value === scenarioType)?.label || scenarioType,
        hasCar: hasCar ?? undefined,
        shortVersion: shortVersion
      }
      
      // Передаём callback для обновления статуса на сайте
      const result = await generateMedicalRoleplay(
        scenario, 
        apiKey,
        (status: string) => {
          console.log("Статус генерации:", status)
          setGenerationStatus(status) // Обновляем статус на сайте
        }
      )
      
      setScenarioDescription(result.scenario)
      setGeneratedRoleplay(result.steps)
      setGenerationStatus("✅ Генерация завершена!") // Показываем успех
      
      // Очищаем статус через 2 секунды
      setTimeout(() => setGenerationStatus(""), 2000)
      
      toast({
        title: "✨ Отыгровка сгенерирована!",
        description: `Создано ${result.steps.length} команд`
      })
      
    } catch (error) {
      console.error("Ошибка генерации:", error)
      
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка"
      
      // Проверяем, является ли это ошибкой лимита (429)
      const isRateLimitError = errorMessage.includes("429") || 
                               errorMessage.includes("Resource exhausted") ||
                               errorMessage.includes("quota")
      
      if (isRateLimitError) {
        setGenerationStatus("❌ Все ключи заняты. Попробуйте через 1-3 минуты...")
        
        toast({
          title: "⏱️ Все ключи временно заняты",
          description: "Система автоматически переключала между 2 ключами, но все достигли лимита (15 запросов/мин каждый).\n\n" +
                      "💡 Рекомендация:\n" +
                      "• ⏰ Попробуйте через 1-3 минуты\n" +
                      "• 🔑 Или вставьте свой бесплатный API ключ (кнопка выше)",
          variant: "destructive",
          duration: 10000
        })
      } else {
        setGenerationStatus(`❌ Ошибка: ${errorMessage}`)
        
        toast({
          title: "❌ Ошибка генерации",
          description: `${errorMessage}\n\n⏰ Попробуйте ещё раз через 1-3 минуты.`,
          variant: "destructive",
          duration: 5000
        })
      }
      
      // НЕ очищаем статус ошибки автоматически - пусть пользователь видит
      // setTimeout(() => setGenerationStatus(""), 5000)
    } finally {
      setIsGenerating(false)
    }
  }
  
  const copyCommand = (command: string, index: number) => {
    navigator.clipboard.writeText(command)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
    
    toast({
      title: "📋 Скопировано",
      description: "Команда скопирована в буфер обмена"
    })
  }
  
  const copyAll = () => {
    const allCommands = generatedRoleplay.join('\n')
    navigator.clipboard.writeText(allCommands)
    
    toast({
      title: "📋 Всё скопировано",
      description: `Скопировано ${generatedRoleplay.length} команд`
    })
  }
  
  return (
    <div className="space-y-6">
      {/* Кнопка для показа/скрытия настроек API */}
      {!showApiSettings && (
        <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Используются общие API ключи</h3>
                <p className="text-sm text-muted-foreground">
                  Лимит: 30 запросов/минуту для всех пользователей. Если не работает - попробуйте через 1-3 минуты.
                </p>
              </div>
              <Button 
                onClick={() => setShowApiSettings(true)}
                variant="outline"
                className="ml-4"
              >
                <Settings className="mr-2 h-4 w-4" />
                Вставить свой API
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Настройки API ключа (показываются по кнопке) */}
      {showApiSettings && (
        <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Настройки API (необязательно)</CardTitle>
                  <CardDescription>Используется общий ключ. Можете указать свой для приоритета.</CardDescription>
                </div>
              </div>
              <Button 
                onClick={() => setShowApiSettings(false)}
                variant="ghost"
                size="sm"
              >
                Скрыть
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Ключ Gemini</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="apiKey"
                  name="gemini-api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className={isApiKeyValid ? "border-green-500" : ""}
                  autoComplete="off"
                  data-form-type="other"
                  data-lpignore="true"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button onClick={handleSaveApiKey} disabled={!isApiKeyValid}>
                Сохранить
              </Button>
              <Button onClick={handleClearApiKey} variant="outline">
                Очистить
              </Button>
            </div>
            {isApiKeyValid && (
              <p className="text-sm text-green-500 flex items-center gap-1">
                <Check className="h-4 w-4" /> API ключ валиден
              </p>
            )}
          </div>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Получите свой бесплатный ключ:</strong>
              <br />
              1. Перейдите на{" "}
              <a 
                href="https://ai.google.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                ai.google.dev
              </a>
              <br />
              2. Нажмите "Get API key" → "Create API key"
              <br />
              3. Скопируйте ключ и вставьте выше
              <br />
              <span className="text-xs opacity-80">Бесплатно, без карты, 15 запросов/минуту</span>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      )}
      
      {/* Параметры сценария */}
      <Card className="border-2 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Генератор отыгровок ПМП</CardTitle>
              <CardDescription>Создайте уникальную отыгровку с помощью AI</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scenarioType">Тип ситуации *</Label>
            <Select value={scenarioType} onValueChange={setScenarioType}>
              <SelectTrigger id="scenarioType">
                <SelectValue placeholder="Выберите тип травмы" />
              </SelectTrigger>
              <SelectContent>
                {SCENARIO_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {scenarioType === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="customScenario">Описание своей ситуации *</Label>
              <Input
                id="customScenario"
                value={customScenario}
                onChange={(e) => setCustomScenario(e.target.value)}
                placeholder="Например: Удар электрическим током"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Наличие служебного автомобиля *</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={hasCar === true ? "default" : "outline"}
                onClick={() => setHasCar(true)}
                className="w-full"
              >
                🚗 Есть машина
              </Button>
              <Button
                type="button"
                variant={hasCar === false ? "default" : "outline"}
                onClick={() => setHasCar(false)}
                className="w-full"
              >
                🚶 Нет машины
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Версия отыгровки *</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={!shortVersion ? "default" : "outline"}
                onClick={() => setShortVersion(false)}
                className="w-full"
              >
                📋 Полная
                <span className="block text-xs opacity-70 mt-1">С вопросами и вариациями</span>
              </Button>
              <Button
                type="button"
                variant={shortVersion ? "default" : "outline"}
                onClick={() => setShortVersion(true)}
                className="w-full"
              >
                ⚡ Короткая
                <span className="block text-xs opacity-70 mt-1">Без вопросов пострадавшему</span>
              </Button>
            </div>
          </div>
          
          {/* Статус генерации - показываем всегда когда есть */}
          {generationStatus && (
            <Alert className={
              generationStatus.includes('❌') 
                ? "bg-red-500/10 border-red-500/30" 
                : generationStatus.includes('✅')
                ? "bg-green-500/10 border-green-500/30"
                : "bg-blue-500/10 border-blue-500/30"
            }>
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
              ) : generationStatus.includes('❌') ? (
                <AlertCircle className="h-4 w-4 text-red-400" />
              ) : generationStatus.includes('✅') ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : null}
              <AlertDescription className={
                generationStatus.includes('❌')
                  ? "text-sm text-red-200"
                  : generationStatus.includes('✅')
                  ? "text-sm text-green-200"
                  : "text-sm text-blue-200"
              }>
                {generationStatus}
              </AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={handleGenerate} 
            disabled={!scenarioType || hasCar === null || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Генерация...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Сгенерировать отыгровку
              </>
            )}
          </Button>

            <Alert className="mt-4 bg-blue-500/10 border-blue-500/30">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-sm text-blue-200">
                <strong>ℹ️ Как использовать отыгровку:</strong>
                <br />
                • В полной версии вы увидите вопросы в /do с двумя вариантами ответа
                <br />
                • Пострадавший отвечает через /do, а вы действуете согласно выбранному варианту
                <br />
                • Копируйте команды по одной или все сразу кнопкой "Копировать всё"
              </AlertDescription>
            </Alert>

            <Alert className="mt-4 bg-yellow-500/10 border-yellow-500/30">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-sm text-yellow-200">
                <strong>⚠️ Важно:</strong> Сгенерированные отыгровки могут содержать неточности. 
                Всегда проверяйте их перед использованием в игре.
                <br /><br />
                <strong>🔄 Система с 2 API ключами:</strong> Автоматическое переключение при достижении лимита (30 запросов/мин суммарно).
                <br />
                <strong>⏱️ Если не работает:</strong> Подождите 1-3 минуты - возможно достигнут общий лимит. Или используйте свой API ключ.
              </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
      
      {/* Результат генерации */}
      {generatedRoleplay.length > 0 && (
        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>✨ Сгенерированная отыгровка</CardTitle>
                <CardDescription>{scenarioDescription}</CardDescription>
              </div>
              <Button onClick={copyAll} variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Копировать всё
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Обычное отображение */}
            <div className="space-y-2">
                {generatedRoleplay.map((command, index) => {
                const isStage = command.includes('ЭТАП')
                const isVariant = command.includes('Вариант') || command.startsWith('—') || command.startsWith('Если') || command.includes('Для сотрудников') || command.includes('Для Капитанов')
                const isOOC = command.startsWith('/b')
                const isRadio = command.startsWith('/d')
                
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
                        onClick={() => copyCommand(command, index)}
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
                        onClick={() => copyCommand(command, index)}
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
                      onClick={() => copyCommand(command, index)}
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
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}