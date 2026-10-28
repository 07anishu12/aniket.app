import React from 'react'
import { getAllArticles, getAllCategories } from '@/lib/articles'
import ArticleCard from '@/components/articles/ArticleCard'

const preferredCategories = ["AI Research", "AI Systems", "Automotive", "Biking", "Papers"]

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || "All";
  
  const allArticles = getAllArticles()
  const categories = ["All", ...preferredCategories.filter((category) => getAllCategories().includes(category)), ...getAllCategories().filter((category) => !preferredCategories.includes(category)).sort()]
  const articles = activeCategory === "All" 
    ? allArticles 
    : allArticles.filter(a => a.category === activeCategory)

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12 md:py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-dm-serif text-[var(--color-text-primary)] mb-6">
          All Writing
        </h1>
        <div className="w-full max-w-2xl h-[1px] bg-[var(--color-divider)] mb-6" />
        <p className="text-xl md:text-2xl text-[var(--color-text-body)] font-source-serif leading-relaxed max-w-3xl mb-12">
          {allArticles.length} articles across AI, systems, automotive, and the road.
        </p>

        {/* Client-side filter navigation is tricky without state, so we use links styled as buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => {
             const href = cat === "All" ? "/articles" : `/articles?category=${encodeURIComponent(cat)}`;
             const isActive = activeCategory === cat;
             return (
              <a
                key={cat}
                href={href}
                className={`px-4 py-2 rounded-full font-jetbrains text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--color-accent-amber)] text-[var(--color-bg-dark)] border border-[var(--color-accent-amber)]"
                    : "bg-transparent text-[var(--color-text-muted)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)]"
                }`}
              >
                {cat}
              </a>
             )
          })}
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-muted)] font-source-serif">
          No articles in this category yet. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
