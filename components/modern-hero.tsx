"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Award } from "lucide-react"

interface ModernHeroProps {
  onGetStarted: () => void
}

export function ModernHero({ onGetStarted }: ModernHeroProps) {
  return (
    <section className="px-6 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="mb-8">
            <span className="text-gradient">Методические</span>
            <br />
            <span className="text-foreground">материалы МВД</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Современная образовательная платформа для сотрудников МВД. Получите доступ к актуальным методическим
            материалам, обучающим программам и справочной информации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onGetStarted} className="modern-button" size="lg">
              Начать обучение
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-border hover:bg-secondary bg-transparent"
            >
              Обзор материалов
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="modern-card text-center">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Обучающие материалы</h3>
            <p className="text-muted-foreground">Структурированные лекции, практические задания и тестирование</p>
          </div>

          <div className="modern-card text-center">
            <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Справочники</h3>
            <p className="text-muted-foreground">Актуальная информация о званиях, командах и процедурах</p>
          </div>

          <div className="modern-card text-center">
            <div className="w-16 h-16 bg-destructive rounded-xl flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-destructive-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Сертификация</h3>
            <p className="text-muted-foreground">Система оценки знаний и получения сертификатов</p>
          </div>
        </div>
      </div>
    </section>
  )
}
