import React from 'react'
import Link from 'next/link'
import CategoryTag from '@/components/ui/CategoryTag'
import { getArticlesByCategory } from '@/lib/articles'

const categories = [
  {
    name: 'AI Research',
    description: 'GNNs, LLMs, alignment, robustness',
  },
  {
    name: 'AI Systems',
    description: 'Products, pipelines, fintech AI',
  },
  {
    name: 'Biking',
    description: 'Trips, gear, roads, stories from India',
  },
  {
    name: 'Papers',
    description: 'Research breakdowns, summaries',
  }
]

export default function CategoriesStrip() {
  return (
    <section className="mb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[var(--color-divider)] rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-divider)]">
        {categories.map((cat) => {
          const articleCount = getArticlesByCategory(cat.name).length
          const slug = cat.name.toLowerCase().replace(/ /g, '-')

          return (
            <Link key={cat.name} href={`/categories/${slug}`} className="group block">
              <div className="p-8 h-full bg-[var(--color-surface)] hover:bg-[rgba(255,255,255,0.02)] transition-colors flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent-amber)] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CategoryTag category={cat.name} dot className="mb-6" />
                
                <p className="font-source-serif text-[var(--color-text-body)] text-sm mb-10 leading-relaxed flex-grow">
                  {cat.description}
                </p>

                <div className="font-jetbrains text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors flex items-center justify-between mt-auto">
                  {articleCount} articles
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
