import React from 'react'

interface CategoryTagProps {
  category: string
  className?: string
  dot?: boolean
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'AI Research':
    case 'AI Systems':
      return 'text-[var(--color-accent-blue)]'
    case 'Biking':
      return 'text-[var(--color-accent-green)]'
    case 'Papers':
    default:
      return 'text-[var(--color-accent-amber)]'
  }
}

export default function CategoryTag({ category, className = '', dot = false }: CategoryTagProps) {
  const colorClass = getCategoryColor(category)

  return (
    <span className={`font-mono text-xs tracking-widest uppercase flex items-center gap-2 ${colorClass} ${className}`}>
      {dot && <span className="w-2 h-2 rounded-full bg-current" />}
      {category}
    </span>
  )
}
