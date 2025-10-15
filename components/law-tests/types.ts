export interface TestQuestion {
  id: string
  article: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

export interface TestCategory {
  name: string
  description: string
  questions: TestQuestion[]
}

export interface TestResult {
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  percentage: number
  answeredQuestions: Record<string, number>
}
