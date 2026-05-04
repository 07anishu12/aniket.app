import React from 'react'

interface GradientFallbackProps {
  category: string
  className?: string
}

export default function GradientFallback({ category, className = '' }: GradientFallbackProps) {
  let bgClass = ''
  
  switch (category) {
    case 'AI Research':
      bgClass = 'bg-gradient-to-br from-[#0D1117] to-[#1A2744]'
      break
    case 'AI Systems':
      bgClass = 'bg-gradient-to-br from-[#0D1117] to-[#1A1A3E]'
      break
    case 'Biking':
      bgClass = 'bg-gradient-to-br from-[#0D1117] to-[#1A2E1A]'
      break
    case 'Papers':
    default:
      bgClass = 'bg-gradient-to-br from-[#0D1117] to-[#2E1A0D]'
      break
  }

  return (
    <div className={`w-full h-full ${bgClass} ${className}`} />
  )
}
