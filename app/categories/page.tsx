import React from 'react'
import { getAllCategories } from '@/lib/articles'
import Link from 'next/link'
import CategoryTag from '@/components/ui/CategoryTag'

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12 md:py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-dm-serif text-[var(--color-text-primary)] mb-6">
          Categories
        </h1>
        <div className="w-full max-w-2xl h-[1px] bg-[var(--color-divider)] mb-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {categories.map((cat) => {
          const slug = cat.toLowerCase().replace(/ /g, '-')
          return (
            <Link key={cat} href={`/categories/${slug}`} className="group block">
              <div className="p-8 border border-[var(--color-border-subtle)] rounded-xl bg-[var(--color-surface)] hover:bg-[rgba(255,255,255,0.02)] transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[4px] h-full bg-[var(--color-accent-amber)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <CategoryTag category={cat} dot className="mb-4" />
                <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-amber)] transition-colors">
                  {cat}
                </h2>
                <div className="font-jetbrains text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors mt-6 flex items-center">
                  Browse category <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
