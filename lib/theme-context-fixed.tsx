"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemeName = "light" | "dark" | "mvd" | "police-blue" | "police-red" | "police-rainbow"

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
  light: {
    name: "light",
    displayName: "Светлая",
    colors: {
      background: "#f5f5f5",
      foreground: "#1a1a1a",
      card: "#ffffff",
      "card-foreground": "#1a1a1a",
      popover: "#ffffff",
      "popover-foreground": "#1a1a1a",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "#e5e7eb",
      "secondary-foreground": "#1a1a1a",
      muted: "#f3f4f6",
      "muted-foreground": "#6b7280",
      accent: "#1e40af",
      "accent-foreground": "#ffffff",
      destructive: "#dc2626",
      "destructive-foreground": "#ffffff",
      border: "#d1d5db",
      input: "#ffffff",
      ring: "#dc2626",
      sidebar: "#1a1a1a",
      "sidebar-foreground": "#f5f5f5",
      "sidebar-primary": "#dc2626",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "#1e40af",
      "sidebar-accent-foreground": "#ffffff",
      "sidebar-border": "#404040",
    },
  },
  dark: {
    name: "dark",
    displayName: "Тёмная",
    colors: {
      background: "#0a0a0a",
      foreground: "#f5f5f5",
      card: "#1a1a1a",
      "card-foreground": "#f5f5f5",
      popover: "#1a1a1a",
      "popover-foreground": "#f5f5f5",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "#262626",
      "secondary-foreground": "#f5f5f5",
      muted: "#1f1f1f",
      "muted-foreground": "#a3a3a3",
      accent: "#2563eb",
      "accent-foreground": "#ffffff",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
      border: "#404040",
      input: "#1a1a1a",
      ring: "#dc2626",
      sidebar: "#0f0f0f",
      "sidebar-foreground": "#f5f5f5",
      "sidebar-primary": "#dc2626",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "#2563eb",
      "sidebar-accent-foreground": "#ffffff",
      "sidebar-border": "#333333",
    },
  },
  mvd: {
    name: "mvd",
    displayName: "МВД",
    colors: {
      background: "transparent",
      foreground: "#f8fafc",
      card: "rgba(10, 10, 10, 0.92)",
      "card-foreground": "#f8fafc",
      popover: "rgba(10, 10, 10, 0.98)",
      "popover-foreground": "#f8fafc",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "rgba(30, 58, 138, 0.8)",
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
  "police-blue": {
    name: "police-blue",
    displayName: "Полицейский синий",
    colors: {
      background: "transparent",
      foreground: "#f8fafc",
      card: "rgba(10, 10, 10, 0.92)",
      "card-foreground": "#f8fafc",
      popover: "rgba(10, 10, 10, 0.98)",
      "popover-foreground": "#f8fafc",
      primary: "#3b82f6",
      "primary-foreground": "#ffffff",
      secondary: "rgba(59, 130, 246, 0.8)",
      "secondary-foreground": "#dbeafe",
      muted: "rgba(30, 30, 30, 0.7)",
      "muted-foreground": "#a8a8a8",
      accent: "#60a5fa",
      "accent-foreground": "#ffffff",
      destructive: "#dc2626",
      "destructive-foreground": "#ffffff",
      border: "rgba(59, 130, 246, 0.3)",
      input: "rgba(20, 20, 20, 0.95)",
      ring: "#3b82f6",
      sidebar: "rgba(5, 5, 5, 0.98)",
      "sidebar-foreground": "#f8fafc",
      "sidebar-primary": "#3b82f6",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "rgba(59, 130, 246, 0.6)",
      "sidebar-accent-foreground": "#dbeafe",
      "sidebar-border": "rgba(59, 130, 246, 0.4)",
    },
  },
  "police-red": {
    name: "police-red",
    displayName: "Полицейский красный",
    colors: {
      background: "transparent",
      foreground: "#f8fafc",
      card: "rgba(10, 10, 10, 0.92)",
      "card-foreground": "#f8fafc",
      popover: "rgba(10, 10, 10, 0.98)",
      "popover-foreground": "#f8fafc",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "rgba(220, 38, 38, 0.8)",
      "secondary-foreground": "#fecaca",
      muted: "rgba(30, 30, 30, 0.7)",
      "muted-foreground": "#a8a8a8",
      accent: "#ef4444",
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
      "sidebar-accent": "rgba(220, 38, 38, 0.6)",
      "sidebar-accent-foreground": "#fecaca",
      "sidebar-border": "rgba(220, 38, 38, 0.4)",
    },
  },
  "police-rainbow": {
    name: "police-rainbow",
    displayName: "Радужный маячок",
    colors: {
      background: "transparent",
      foreground: "#f8fafc",
      card: "rgba(10, 10, 10, 0.92)",
      "card-foreground": "#f8fafc",
      popover: "rgba(10, 10, 10, 0.98)",
      "popover-foreground": "#f8fafc",
      primary: "#8b5cf6",
      "primary-foreground": "#ffffff",
      secondary: "rgba(139, 92, 246, 0.8)",
      "secondary-foreground": "#e9d5ff",
      muted: "rgba(30, 30, 30, 0.7)",
      "muted-foreground": "#a8a8a8",
      accent: "#a855f7",
      "accent-foreground": "#ffffff",
      destructive: "#dc2626",
      "destructive-foreground": "#ffffff",
      border: "rgba(139, 92, 246, 0.3)",
      input: "rgba(20, 20, 20, 0.95)",
      ring: "#8b5cf6",
      sidebar: "rgba(5, 5, 5, 0.98)",
      "sidebar-foreground": "#f8fafc",
      "sidebar-primary": "#8b5cf6",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "rgba(139, 92, 246, 0.6)",
      "sidebar-accent-foreground": "#e9d5ff",
      "sidebar-border": "rgba(139, 92, 246, 0.4)",
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
  const [theme, setThemeState] = useState<ThemeName>("mvd")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Всегда используем только МВД тему
    setThemeState("mvd")
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const currentTheme = themes[theme]

    // Удаляем все классы тем
    root.classList.remove("dark", "mvd", "police-blue", "police-red", "police-rainbow")

    // Добавляем класс текущей темы (кроме light - это по умолчанию)
    if (theme !== "light") {
      root.classList.add(theme)
    }

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
