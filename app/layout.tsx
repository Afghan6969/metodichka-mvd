import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { Merriweather } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const merriweather = Merriweather({
  subsets: ["latin", "cyrillic"],
  variable: "--font-merriweather",
  weight: ["400", "700", "900"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Методичка для МВД",
  description: "Методические материалы и инструкции для МВД",
  generator: "v0.app",
  icons: {
    icon: "/mvd-logo.jpg",
    shortcut: "/mvd-logo.jpg",
    apple: "/mvd-logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`font-sans ${inter.variable} ${merriweather.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeToggle />
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
