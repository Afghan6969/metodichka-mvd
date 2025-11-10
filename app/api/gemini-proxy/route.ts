import { NextRequest, NextResponse } from 'next/server'

/**
 * Прокси для Gemini API
 * Позволяет обходить региональные ограничения
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, apiKey } = body

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API ключ не указан' },
        { status: 400 }
      )
    }

    if (!prompt) {
      return NextResponse.json(
        { error: 'Промпт не указан' },
        { status: 400 }
      )
    }

    // Отправляем запрос к Gemini API с сервера
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { 
          error: `Ошибка API: ${response.status}`,
          details: errorData.error?.message || 'Неизвестная ошибка'
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json(
        { error: 'API не вернул результатов' },
        { status: 500 }
      )
    }

    const generatedText = data.candidates[0].content.parts[0].text

    return NextResponse.json({ 
      text: generatedText,
      success: true 
    })

  } catch (error) {
    console.error('Ошибка прокси:', error)
    return NextResponse.json(
      { 
        error: 'Ошибка сервера',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    )
  }
}

// Разрешаем CORS для локальной разработки
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
