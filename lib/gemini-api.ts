// Утилита для работы с Google Gemini API

export interface MedicalScenario {
  type: string
  severity?: string
  location?: string
  victimName?: string
  additionalDetails?: string
}

export interface GeneratedRoleplay {
  scenario: string
  steps: string[]
}

// Используем локальный прокси-сервер для обхода региональных ограничений
const PROXY_ENDPOINT = '/api/gemini-proxy'

/**
 * Генерирует отыгровку ПМП с помощью Gemini API через прокси
 */
export async function generateMedicalRoleplay(
  scenario: MedicalScenario,
  apiKey: string
): Promise<GeneratedRoleplay> {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('API ключ не указан')
  }

  const prompt = buildPrompt(scenario)

  try {
    // Отправляем запрос через наш прокси-сервер
    const response = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        apiKey: apiKey
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Ошибка API: ${response.status} - ${errorData.details || errorData.error || 'Неизвестная ошибка'}`)
    }

    const data = await response.json()
    
    if (!data.success || !data.text) {
      throw new Error('API не вернул результатов')
    }

    const generatedText = data.text
    return parseGeneratedText(generatedText, scenario)

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Ошибка генерации: ${error.message}`)
    }
    throw new Error('Неизвестная ошибка при генерации')
  }
}

/**
 * Строит промпт для Gemini на основе сценария
 */
function buildPrompt(scenario: MedicalScenario): string {
  const { type } = scenario

  return `Ты - опытный сотрудник МВД, который оказывает первую медицинскую помощь. Создай реалистичную отыгровку для ролевого сервера GTA SAMP.

СЦЕНАРИЙ:
- Тип травмы: ${type}

ТРЕБОВАНИЯ:
1. Используй команды: /me, /do, /b для отыгровки
2. Будь реалистичным и детальным
3. Следуй медицинским протоколам
4. Создай ДВА ВАРИАНТА подготовки аптечки:
   - "Вариант 1 — если есть автомобиль:"
   - "Вариант 2 — если машины нет:"
5. После вариантов продолжи общими действиями (осмотр, помощь)
6. Отыгровка должна быть КОРОТКОЙ - максимум 8-10 команд после вариантов
7. Каждое действие - отдельная строка

ФОРМАТ ОТВЕТА:
Напиши только команды для отыгровки, каждая с новой строки. Без дополнительных пояснений.

Пример формата:
Вариант 1 — если есть автомобиль:
/me открыл багажник и достал аптечку
/do Аптечка в руках.

Вариант 2 — если машины нет:
/do На поясе закреплена медицинская аптечка.
/me расстегнул застёжку на поясе и взял аптечку

/me подошёл к пострадавшему
/me осмотрел место травмы
...

Создай отыгровку:`
}

/**
 * Парсит сгенерированный текст в структурированный формат
 */
function parseGeneratedText(text: string, scenario: MedicalScenario): GeneratedRoleplay {
  // Убираем лишние пробелы и разбиваем на строки
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .filter(line => 
      line.startsWith('/me') || 
      line.startsWith('/do') || 
      line.startsWith('/b') ||
      line.includes('Вариант') ||
      line.startsWith('Если')
    )

  // Создаём описание сценария
  const scenarioDescription = buildScenarioDescription(scenario)

  return {
    scenario: scenarioDescription,
    steps: lines
  }
}

/**
 * Создаёт человекочитаемое описание сценария
 */
function buildScenarioDescription(scenario: MedicalScenario): string {
  return scenario.type
}

/**
 * Проверяет валидность API ключа
 */
export function validateApiKey(apiKey: string): boolean {
  // Gemini API ключи обычно начинаются с "AIza" и имеют длину около 39 символов
  return apiKey.startsWith('AIza') && apiKey.length >= 35
}

/**
 * Сохраняет API ключ в localStorage
 */
export function saveApiKey(apiKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gemini_api_key', apiKey)
  }
}

/**
 * Загружает API ключ из localStorage
 */
export function loadApiKey(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('gemini_api_key')
  }
  return null
}

/**
 * Удаляет API ключ из localStorage
 */
export function clearApiKey(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('gemini_api_key')
  }
}
