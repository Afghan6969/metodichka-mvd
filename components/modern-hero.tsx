"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Shield, Award, Target, FileText, Users, Radio, Car, Keyboard } from "lucide-react"

interface ModernHeroProps {
  onGetStarted: () => void
}

export function ModernHero({ onGetStarted }: ModernHeroProps) {
  return (
    <section className="px-6 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-primary/10 rounded-2xl border-2 border-primary/30">
            <div className="police-beacon"></div>
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">МВД Республики Провинция</span>
          </div>
          
          <h1 className="mb-6 text-5xl lg:text-7xl font-black uppercase tracking-tight text-foreground">
            Методическое пособие МВД
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Полное руководство для сотрудников ГИБДД и ГУВД Республики Провинция.
            <br/>
            Лекции, тренировки, бинды, должности, транспорт и инструменты для работы.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted} 
              className="h-14 px-8 text-base bg-primary hover:bg-primary/90 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/40"
              size="lg"
            >
              Начать обучение
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: BookOpen, label: "Лекций", value: "15+" },
            { icon: Target, label: "Тренировок", value: "20+" },
            { icon: Keyboard, label: "Биндов", value: "50+" },
            { icon: Car, label: "Автомобилей", value: "30+" },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="military-card text-center p-6 hover:scale-105 transition-transform"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="military-card text-center group hover:shadow-xl transition-all">
            <div className="relative w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <BookOpen className="h-10 w-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-foreground">ГИБДД</h3>
            <p className="text-muted-foreground leading-relaxed">
              Должности, автопарк, гос волна, бинды и материалы для ГИБДД
            </p>
          </div>

          <div className="military-card text-center group hover:shadow-xl transition-all">
            <div className="relative w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <Shield className="h-10 w-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-foreground">ГУВД</h3>
            <p className="text-muted-foreground leading-relaxed">
              Должности, автопарк, гос волна, бинды и материалы для ГУВД
            </p>
          </div>

          <div className="military-card text-center group hover:shadow-xl transition-all">
            <div className="relative w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <Award className="h-10 w-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-wide text-foreground">Инструменты</h3>
            <p className="text-muted-foreground leading-relaxed">
              Калькулятор штрафов, генератор отчётов, термины и ресурсы
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
