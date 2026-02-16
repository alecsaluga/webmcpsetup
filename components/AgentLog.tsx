'use client'

import { useEffect, useState } from 'react'

export default function AgentLog() {
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleToolActivated = (e: Event) => {
      const customEvent = e as CustomEvent
      const toolName = customEvent.detail?.toolName || 'Unknown tool'
      setLastAction(`Tool activated: ${toolName}`)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }

    const handleToolCancel = (e: Event) => {
      const customEvent = e as CustomEvent
      const toolName = customEvent.detail?.toolName || 'Unknown tool'
      setLastAction(`Tool cancelled: ${toolName}`)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }

    window.addEventListener('toolactivated', handleToolActivated)
    window.addEventListener('toolcancel', handleToolCancel)

    return () => {
      window.removeEventListener('toolactivated', handleToolActivated)
      window.removeEventListener('toolcancel', handleToolCancel)
    }
  }, [])

  if (!isVisible || !lastAction) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-near-black text-white px-6 py-3 text-sm border-t border-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="font-mono">[Agent Log] {lastAction}</span>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
