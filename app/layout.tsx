import type React from"react"
import type { Metadata } from"next"
import { Inter } from"next/font/google"
import { JetBrains_Mono } from"next/font/google"
import { Merriweather } from"next/font/google"
import { Suspense } from"react"
import { AuthProvider } from"@/lib/auth-context"
import { ThemeProvider } from"@/lib/theme-context"
import { ToastProvider } from"@/components/toast-provider"
import { AnalyticsProvider } from"@/components/analytics-provider"
import { PerformanceDebug } from"@/components/performance-debug"
import"./globals.css"

const inter = Inter({
 subsets: ["latin","cyrillic"],
 variable:"--font-inter",
 weight: ["400","500","600","700"],
})

const merriweather = Merriweather({
 subsets: ["latin","cyrillic"],
 variable:"--font-merriweather",
 weight: ["400","700","900"],
})

const jetbrainsMono = JetBrains_Mono({
 subsets: ["latin","cyrillic"],
 variable:"--font-jetbrains-mono",
})

export const metadata: Metadata = {
 title:"Методичка для МВД",
 description:"Методические материалы и инструкции для МВД",
 generator:"v0.app",
 icons: {
 icon:"/mvd-logo.jpg",
 shortcut:"/mvd-logo.jpg",
 apple:"/mvd-logo.jpg",
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
 <ThemeProvider>
 <AuthProvider>
 <Suspense fallback={null}>
 {children}
 <AnalyticsProvider />
 </Suspense>
 <ToastProvider />
 <PerformanceDebug />
 </AuthProvider>
 </ThemeProvider>
 </body>
 </html>
 )
}
