import React from 'react'
import { getFeaturedArticles } from '@/lib/articles'
import ArticleCardFeatured from '@/components/articles/ArticleCardFeatured'

export default function FeaturedArticles() {
  const articles = getFeaturedArticles().slice(0, 3)

  if (articles.length === 0) return null

  return (
    <section className="mb-32">
      <div className="mb-8 border-b border-[var(--color-divider)] pb-4 flex justify-between items-end">
        <h2 className="font-jetbrains text-[var(--color-text-muted)] tracking-widest uppercase text-sm">
          Featured
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCardFeatured key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
