import type { TestQuestion } from"./types"

// Функция для перемешивания массива (алгоритм Фишера-Йейтса)
export const shuffleArray = <T,>(array: T[]): T[] => {
 const shuffled = [...array]
 for (let i = shuffled.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
 }
 return shuffled
}

// Функция для перемешивания вариантов ответов в вопросе
export const shuffleQuestionOptions = (question: TestQuestion): TestQuestion => {
 const optionsWithIndex = question.options.map((option, index) => ({
 option,
 originalIndex: index,
 }))
 
 const shuffled = shuffleArray(optionsWithIndex)
 
 // Находим новый индекс правильного ответа
 const newCorrectAnswerIndex = shuffled.findIndex(
 item => item.originalIndex === question.correctAnswer
 )
 
 return {
 ...question,
 options: shuffled.map(item => item.option),
 correctAnswer: newCorrectAnswerIndex,
 }
}
