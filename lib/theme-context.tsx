"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemeName = "light" | "dark" | "mvd"

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
      background: "#fafafa",
      foreground: "#0a0a0a",
      card: "#ffffff",
      "card-foreground": "#0a0a0a",
      popover: "#ffffff",
      "popover-foreground": "#0a0a0a",
      primary: "#0a0a0a",
      "primary-foreground": "#fafafa",
      secondary: "#f4f4f5",
      "secondary-foreground": "#0a0a0a",
      muted: "#f4f4f5",
      "muted-foreground": "#71717a",
      accent: "#e4e4e7",
      "accent-foreground": "#0a0a0a",
      destructive: "#ef4444",
      "destructive-foreground": "#fafafa",
      border: "#e4e4e7",
      input: "#ffffff",
      ring: "rgba(10, 10, 10, 0.1)",
      sidebar: "#ffffff",
      "sidebar-foreground": "#0a0a0a",
      "sidebar-primary": "#0a0a0a",
      "sidebar-primary-foreground": "#fafafa",
      "sidebar-accent": "#f4f4f5",
      "sidebar-accent-foreground": "#0a0a0a",
      "sidebar-border": "#e4e4e7",
    },
  },
  dark: {
    name: "dark",
    displayName: "Тёмная",
    colors: {
      background: "#0a0a0a",
      foreground: "#fafafa",
      card: "#111111",
      "card-foreground": "#fafafa",
      popover: "#111111",
      "popover-foreground": "#fafafa",
      primary: "#fafafa",
      "primary-foreground": "#0a0a0a",
      secondary: "#1a1a1a",
      "secondary-foreground": "#fafafa",
      muted: "#1a1a1a",
      "muted-foreground": "#a1a1aa",
      accent: "#262626",
      "accent-foreground": "#fafafa",
      destructive: "#ef4444",
      "destructive-foreground": "#fafafa",
      border: "#262626",
      input: "#111111",
      ring: "rgba(250, 250, 250, 0.1)",
      sidebar: "#111111",
      "sidebar-foreground": "#fafafa",
      "sidebar-primary": "#fafafa",
      "sidebar-primary-foreground": "#0a0a0a",
      "sidebar-accent": "#1a1a1a",
      "sidebar-accent-foreground": "#fafafa",
      "sidebar-border": "#262626",
    },
  },
  mvd: {
    name: "mvd",
    displayName: "МВД",
    colors: {
      background: "transparent",
      foreground: "#f1f5f9",
      card: "rgba(15, 23, 42, 0.7)",
      "card-foreground": "#f1f5f9",
      popover: "rgba(15, 23, 42, 0.95)",
      "popover-foreground": "#f1f5f9",
      primary: "#ef4444",
      "primary-foreground": "#ffffff",
      secondary: "rgba(30, 58, 138, 0.6)",
      "secondary-foreground": "#dbeafe",
      muted: "rgba(15, 23, 42, 0.5)",
      "muted-foreground": "#cbd5e1",
      accent: "rgba(220, 38, 38, 0.6)",
      "accent-foreground": "#fef2f2",
      destructive: "#b91c1c",
      "destructive-foreground": "#ffffff",
      border: "rgba(148, 163, 184, 0.3)",
      input: "rgba(15, 23, 42, 0.8)",
      ring: "#ef4444",
      sidebar: "rgba(15, 23, 42, 0.9)",
      "sidebar-foreground": "#f1f5f9",
      "sidebar-primary": "#ef4444",
      "sidebar-primary-foreground": "#ffffff",
      "sidebar-accent": "rgba(30, 58, 138, 0.3)",
      "sidebar-accent-foreground": "#dbeafe",
      "sidebar-border": "rgba(148, 163, 184, 0.2)",
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
  const [theme, setThemeState] = useState<ThemeName>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
    root.classList.remove("dark", "mvd")
    
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
