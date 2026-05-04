import React from 'react'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import ArticleListItem from '@/components/articles/ArticleListItem'

export default function LatestFeed() {
  const articles = getAllArticles().slice(0, 6)

  if (articles.length === 0) return null

  return (
    <section className="mb-32">
      <div className="mb-8 border-b border-[var(--color-divider)] pb-4 flex justify-between items-end">
        <h2 className="font-jetbrains text-[var(--color-text-muted)] tracking-widest uppercase text-sm">
          Latest
        </h2>
      </div>

      <div className="flex flex-col">
        {articles.map((article) => (
          <ArticleListItem key={article.slug} article={article} />
        ))}
      </div>

      <div className="mt-8 text-center md:text-right">
        <Link 
          href="/articles"
          className="inline-block font-jetbrains text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-amber)] transition-colors border-b border-transparent hover:border-[var(--color-accent-amber)] pb-1"
        >
          [Load more articles]
        </Link>
      </div>
    </section>
  )
}
