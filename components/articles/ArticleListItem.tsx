import React from 'react'
import Link from 'next/link'
import { ArticleMeta } from '@/lib/articles'
import { ArrowRight } from 'lucide-react'
import { getCategoryColor } from '@/components/ui/CategoryTag'

export default function ArticleListItem({ article }: { article: ArticleMeta }) {
  const colorClass = getCategoryColor(article.category)

  return (
    <Link href={`/articles/${article.slug}`} className="block group">
      <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-[var(--color-divider)] transition-colors group-hover:bg-[rgba(255,255,255,0.02)] px-2 -mx-2 rounded-lg relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-accent-amber)] opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="w-40 shrink-0 mb-2 md:mb-0">
          <span className={`font-jetbrains text-xs tracking-widest uppercase ${colorClass}`}>
            [{article.category}]
          </span>
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-source-serif text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-amber)] transition-colors pr-4">
            {article.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 mt-2 md:mt-0 shrink-0 justify-between md:justify-end w-full md:w-auto">
          <span className="font-jetbrains text-sm text-[var(--color-text-muted)]">
            {article.readingTime} min
          </span>
          <ArrowRight size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-amber)] transform group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}
