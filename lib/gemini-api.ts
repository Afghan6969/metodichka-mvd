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

  return `Ты - опытный сотрудник МВД Провинции, который оказывает первую медицинскую помощь. Создай реалистичную отыгровку для ролевого сервера GTA SAMP строго по канонам Role Play.

СЦЕНАРИЙ:
- Тип травмы: ${type}

СТРОГИЕ ПРАВИЛА ОФОРМЛЕНИЯ:

1. КОМАНДА /me (действия от 3-го лица):
   - Пишется с МАЛЕНЬКОЙ буквы (перед ней стоит имя персонажа)
   - БЕЗ точки в конце
   - Описывает действие, которое нельзя показать в игре
   - Можно отыгрывать 2-4 связанных действия в одном /me
   - Пример: /me достал из кармана паспорт и протянул его сотруднику

2. КОМАНДА /do (описание окружения, предметов, состояния):
   - Пишется с БОЛЬШОЙ буквы
   - С точкой в конце (или "?" для вопросов)
   - Описывает то, чего не видно визуально
   - НЕ НУЖНО завершать каждый /me отыгровкой /do
   - ЗАПРЕЩЕНЫ отыгровки-паразиты: "/do Улыбка на лице.", "/do Рука в кармане.", "/do Передача паспорта."
   - Используй /do только когда нужно описать неочевидное
   - Пример: /do В аптечке лежат бинты, жгут и антисептик.

3. КОМАНДА /b (OOC чат):
   - Для внеигровых уточнений
   - Пример: /b Напишите в чат через /do, что с вами случилось

4. ЗАПРЕТЫ:
   - НЕ отыгрывай за другого персонажа
   - НЕ переводи RP в свою сторону
   - НЕ используй /try для определения состояния здоровья других
   - НЕ пиши отыгровки-паразиты типа "/do Улыбка на лице."
   - НЕ завершай каждый /me отыгровкой /do без необходимости

5. СТРУКТУРА ОТЫГРОВКИ:
   Создай ДВА ВАРИАНТА подготовки аптечки:
   - "Вариант 1 — если есть автомобиль:"
   - "Вариант 2 — если машины нет:"
   
   После вариантов продолжи общими действиями (осмотр, помощь)
   Максимум 8-10 команд после вариантов

6. РЕАЛИСТИЧНОСТЬ:
   - Следуй медицинским протоколам
   - Действия должны быть логичными и последовательными
   - Учитывай время выполнения действий
   - Используй вопросительные /do для уточнений: "/do Пульс обнаружен?"

ПРАВИЛЬНЫЕ ПРИМЕРЫ:

/me открыл багажник и достал аптечку
/do Аптечка в руках.
/me поставил аптечку на землю и открыл её
/me достал из аптечки бинты и антисептик
/me подошёл к пострадавшему
/do Что случилось с пострадавшим?
/b Напишите через /do, что с вами произошло
/me приложил руку к сонной артерии
/do Пульс обнаружен?

НЕПРАВИЛЬНЫЕ ПРИМЕРЫ (НЕ ДЕЛАЙ ТАК):

/me достал аптечку
/do Аптечка в руках. ← отыгровка-паразит, и так понятно
/do Передача аптечки. ← отыгровка-паразит
/me подошёл к пострадавшему
/do Улыбка на лице. ← отыгровка-паразит
/do Пострадавший без сознания. ← отыгровка за другого персонажа
/try проверил пульс и увидел, что пострадавший жив ← нельзя /try для состояния других

ФОРМАТ ОТВЕТА:
Напиши только команды для отыгровки, каждая с новой строки. Без дополнительных пояснений и комментариев.

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
