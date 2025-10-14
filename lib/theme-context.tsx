"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemeName = "police-sides" | "police-dual" | "police-corners" | "police-cross"

export interface Theme {
  name: ThemeName
  displayName: string
  colors: {
    background: string
    foreground: string
    card: string
    "card-foreground": string
    popover?: string
    "popover-foreground"?: string
    primary: string
    "primary-foreground": string
    secondary: string
    "secondary-foreground": string
    muted: string
    "muted-foreground": string
    accent: string
    "accent-foreground": string
    destructive: string
    "destructive-foreground": string
    border: string
    input: string
    ring: string
    sidebar?: string
    "sidebar-foreground"?: string
    "sidebar-primary"?: string
    "sidebar-primary-foreground"?: string
    "sidebar-accent"?: string
    "sidebar-accent-foreground"?: string
    "sidebar-border"?: string
  }
}

export const themes: Record<ThemeName, Theme> = {
  "police-sides": {
    name: "police-sides",
    displayName: "Боковые вспышки",
    colors: {
      background: "transparent",
      foreground: "#f8fafc",
      card: "rgba(10, 10, 10, 0.92)",
      "card-foreground": "#f8fafc",
      popover: "rgba(10, 10, 10, 0.98)",
      "popover-foreground": "#f8fafc",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "rgba(59, 130, 246, 0.8)",
      "secondary-foreground": "#dbeafe",
      muted: "rgba(30, 30, 30, 0.7)",
      "muted-foreground": "#a8a8a8",
      accent: "#3b82f6",
      "accent-foreground": "#ffffff",
      destructive: "#b91c1c",
      "destructive-foreground": "#ffffff",
      border: "rgba(220, 38, 38, 0.3)",
      input: "rgba(20, 20, 20, 0.95)",
      ring: "#dc2626",
      sidebar: "rgba(5, 5, 5, 0.98)",
      "sidebar-foreground": "#f8fafc",
      "sidebar-primary": "#dc2626",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "rgba(59, 130, 246, 0.6)",
      "sidebar-accent-foreground": "#dbeafe",
      "sidebar-border": "rgba(220, 38, 38, 0.4)",
    },
  },
  "police-dual": {
    name: "police-dual",
    displayName: "Двойной маячок",
    colors: {
      background: "transparent",
      foreground: "#f8fafc",
      card: "rgba(10, 10, 10, 0.92)",
      "card-foreground": "#f8fafc",
      popover: "rgba(10, 10, 10, 0.98)",
      "popover-foreground": "#f8fafc",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "rgba(59, 130, 246, 0.8)",
      "secondary-foreground": "#dbeafe",
      muted: "rgba(30, 30, 30, 0.7)",
      "muted-foreground": "#a8a8a8",
      accent: "#3b82f6",
      "accent-foreground": "#ffffff",
      destructive: "#b91c1c",
      "destructive-foreground": "#ffffff",
      border: "rgba(220, 38, 38, 0.3)",
      input: "rgba(20, 20, 20, 0.95)",
      ring: "#dc2626",
      sidebar: "rgba(5, 5, 5, 0.98)",
      "sidebar-foreground": "#f8fafc",
      "sidebar-primary": "#dc2626",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "rgba(59, 130, 246, 0.6)",
      "sidebar-accent-foreground": "#dbeafe",
      "sidebar-border": "rgba(220, 38, 38, 0.4)",
    },
  },
  "police-corners": {
    name: "police-corners",
    displayName: "Угловые вспышки",
    colors: {
      background: "transparent",
      foreground: "#f8fafc",
      card: "rgba(10, 10, 10, 0.92)",
      "card-foreground": "#f8fafc",
      popover: "rgba(10, 10, 10, 0.98)",
      "popover-foreground": "#f8fafc",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "rgba(59, 130, 246, 0.8)",
      "secondary-foreground": "#dbeafe",
      muted: "rgba(30, 30, 30, 0.7)",
      "muted-foreground": "#a8a8a8",
      accent: "#3b82f6",
      "accent-foreground": "#ffffff",
      destructive: "#b91c1c",
      "destructive-foreground": "#ffffff",
      border: "rgba(220, 38, 38, 0.3)",
      input: "rgba(20, 20, 20, 0.95)",
      ring: "#dc2626",
      sidebar: "rgba(5, 5, 5, 0.98)",
      "sidebar-foreground": "#f8fafc",
      "sidebar-primary": "#dc2626",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "rgba(59, 130, 246, 0.6)",
      "sidebar-accent-foreground": "#dbeafe",
      "sidebar-border": "rgba(220, 38, 38, 0.4)",
    },
  },
  "police-cross": {
    name: "police-cross",
    displayName: "Крестовые вспышки",
    colors: {
      background: "transparent",
      foreground: "#f8fafc",
      card: "rgba(10, 10, 10, 0.92)",
      "card-foreground": "#f8fafc",
      popover: "rgba(10, 10, 10, 0.98)",
      "popover-foreground": "#f8fafc",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "rgba(59, 130, 246, 0.8)",
      "secondary-foreground": "#dbeafe",
      muted: "rgba(30, 30, 30, 0.7)",
      "muted-foreground": "#a8a8a8",
      accent: "#3b82f6",
      "accent-foreground": "#ffffff",
      destructive: "#b91c1c",
      "destructive-foreground": "#ffffff",
      border: "rgba(220, 38, 38, 0.3)",
      input: "rgba(20, 20, 20, 0.95)",
      ring: "#dc2626",
      sidebar: "rgba(5, 5, 5, 0.98)",
      "sidebar-foreground": "#f8fafc",
      "sidebar-primary": "#dc2626",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "rgba(59, 130, 246, 0.6)",
      "sidebar-accent-foreground": "#dbeafe",
      "sidebar-border": "rgba(220, 38, 38, 0.4)",
    },
  },
}

interface ThemeContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  currentTheme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("police-sides")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Загружаем тему из localStorage или используем по умолчанию
    const savedTheme = localStorage.getItem("theme") as ThemeName
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const currentTheme = themes[theme]

    // Удаляем все классы тем
    root.classList.remove("police-sides", "police-dual", "police-corners", "police-cross")

    // Добавляем класс текущей темы
    root.classList.add(theme)

    // Применяем CSS переменные напрямую
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      if (value) {
        const cssVar = `--${key}`
        root.style.setProperty(cssVar, value)
      }
    })

    // Сохраняем в localStorage
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        currentTheme: themes[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
