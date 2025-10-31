"use client"

import { useEffect, useState } from "react"

export function PerformanceDebug() {
  const [fps, setFps] = useState(60)
  const [renderTime, setRenderTime] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Показываем дебаг только если в URL есть ?debug=true
    const params = new URLSearchParams(window.location.search)
    setIsVisible(params.get('debug') === 'true')

    if (!params.get('debug')) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    // Measure render time
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          setRenderTime(Math.round(entry.duration))
        }
      }
    })
    
    observer.observe({ entryTypes: ['measure'] })

    return () => {
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [])

  if (!isVisible) return null

  const fpsColor = fps >= 55 ? 'text-green-400' : fps >= 40 ? 'text-yellow-400' : 'text-red-400'
  const renderColor = renderTime < 16 ? 'text-green-400' : renderTime < 33 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 border-2 border-white/20 rounded-xl p-4 font-mono text-sm shadow-2xl backdrop-blur-md">
      <div className="space-y-2">
        <div className="text-white font-bold mb-3 border-b border-white/20 pb-2">
          🔍 Performance Debug
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/70">FPS:</span>
          <span className={`font-bold ${fpsColor}`}>{fps}</span>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/70">Frame Time:</span>
          <span className={renderColor}>{(1000 / fps).toFixed(1)}ms</span>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/70">Target:</span>
          <span className="text-blue-400">16.67ms (60fps)</span>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/50">
          <div>💡 Цель: FPS ≥ 55</div>
          <div>⚠️ Проблема: FPS &lt; 40</div>
        </div>

        <button
          onClick={() => {
            const url = new URL(window.location.href)
            url.searchParams.delete('debug')
            window.location.href = url.toString()
          }}
          className="mt-3 w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1.5 rounded-lg text-xs transition-colors"
        >
          Закрыть дебаг
        </button>
      </div>
    </div>
  )
}
