import React from 'react'
import { getArticlesByCategory, getAllCategories } from '@/lib/articles'
import ArticleCard from '@/components/articles/ArticleCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((cat) => ({
    category: cat.toLowerCase().replace(/ /g, '-'),
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categories = getAllCategories()
  
  // Find the original category name based on the slug
  const categoryName = categories.find(
    (c) => c.toLowerCase().replace(/ /g, '-') === resolvedParams.category
  )

  if (!categoryName) {
    notFound()
  }

  const articles = getArticlesByCategory(categoryName)

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12 md:py-20">
      <Link 
        href="/categories"
        className="inline-flex items-center gap-2 font-jetbrains text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-amber)] transition-colors mb-12"
      >
        <ArrowLeft size={16} /> Back to Categories
      </Link>

      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-dm-serif text-[var(--color-text-primary)] mb-6">
          {categoryName}
        </h1>
        <div className="w-full max-w-2xl h-[1px] bg-[var(--color-divider)] mb-6" />
        <p className="text-xl md:text-2xl text-[var(--color-text-body)] font-source-serif leading-relaxed max-w-3xl mb-12">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this category.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
