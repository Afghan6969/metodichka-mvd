"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type FontName = "system" | "inter" | "roboto" | "open-sans" | "montserrat"

export interface FontOption {
  name: FontName
  displayName: string
  fontFamily: string
}

export const fonts: Record<FontName, FontOption> = {
  system: {
    name: "system",
    displayName: "Системный",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  inter: {
    name: "inter",
    displayName: "Inter",
    fontFamily: "'Inter', sans-serif",
  },
  roboto: {
    name: "roboto",
    displayName: "Roboto",
    fontFamily: "'Roboto', sans-serif",
  },
  "open-sans": {
    name: "open-sans",
    displayName: "Open Sans",
    fontFamily: "'Open Sans', sans-serif",
  },
  montserrat: {
    name: "montserrat",
    displayName: "Montserrat",
    fontFamily: "'Montserrat', sans-serif",
  },
}

interface FontContextType {
  font: FontName
  setFont: (font: FontName) => void
  currentFont: FontOption
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFontState] = useState<FontName>("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedFont = localStorage.getItem("font") as FontName
    if (savedFont && fonts[savedFont]) {
      setFontState(savedFont)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("font", font)
      document.documentElement.style.setProperty("--font-family", fonts[font].fontFamily)
    }
  }, [font, mounted])

  const setFont = (newFont: FontName) => {
    setFontState(newFont)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <FontContext.Provider value={{ font, setFont, currentFont: fonts[font] }}>
      {children}
    </FontContext.Provider>
  )
}

export function useFont() {
  const context = useContext(FontContext)
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider")
  }
  return context
}
