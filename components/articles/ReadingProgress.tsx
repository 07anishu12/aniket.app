"use client"

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      // Calculate how far down the user has scrolled
      const scrolled = el.scrollTop
      // Calculate the total scrollable height
      const height = el.scrollHeight - el.clientHeight
      
      if (height <= 0) {
        setProgress(0)
      } else {
        setProgress((scrolled / height) * 100)
      }
    }

    // Call once to set initial state
    handler()

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none">
      <div 
        className="h-full bg-[var(--color-accent-amber)] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
