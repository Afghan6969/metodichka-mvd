// Типы для модуля приказов

export interface Order {
  id: string
  title: string
  category: string
  content: string
}

export type Category = "all" | "Кадровые изменения" | "Дисциплинарные взыскания" | "Построения" | "Другое"
