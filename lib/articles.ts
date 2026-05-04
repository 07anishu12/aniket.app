import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const articlesDirectory = path.join(process.cwd(), 'content', 'articles')

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  coverImage: string | null
  readingTime: number
  featured: boolean
  draft: boolean
  author: string
}

export interface Article extends ArticleMeta {
  content: string
}

export function getArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) return []
  return fs.readdirSync(articlesDirectory).filter((file) => file.endsWith('.md'))
}

export function getArticleBySlug(slug: string): Article | null {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const time = data.readingTime || Math.ceil(readingTime(content).minutes)

  return {
    slug: realSlug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    coverImage: data.coverImage || null,
    readingTime: time,
    featured: data.featured || false,
    draft: data.draft || false,
    author: data.author || 'Aniket',
    content,
  }
}

export function getAllArticles(): ArticleMeta[] {
  const slugs = getArticleSlugs()
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null && !article.draft)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  // Return only metadata to avoid passing huge content strings
  return articles.map(({ content, ...meta }) => meta)
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter((article) => article.featured)
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((article) => article.category === category)
}

export function getRelatedArticles(currentSlug: string, category: string, limit = 3): ArticleMeta[] {
  const allInCategory = getArticlesByCategory(category)
  return allInCategory.filter((article) => article.slug !== currentSlug).slice(0, limit)
}

export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set(articles.map((article) => article.category))
  return Array.from(categories)
}
