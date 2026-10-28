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
  coverImageAlt: string | null
  imageCaption: string | null
  seoTitle: string | null
  seoKeywords: string[]
  faqItems: FaqItem[]
  publishOrder: number | null
  publishWave: number | null
  readingTime: number
  featured: boolean
  draft: boolean
  author: string
}

export interface FaqItem {
  question: string
  answer: string
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
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(realSlug)) return null
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const time = data.readingTime || Math.ceil(readingTime(content).minutes)
  const seoKeywords = Array.isArray(data.seoKeywords)
    ? data.seoKeywords.filter((keyword: unknown): keyword is string => typeof keyword === 'string' && keyword.trim().length > 0)
    : typeof data.seoKeywords === 'string'
      ? data.seoKeywords.split(',').map((keyword: string) => keyword.trim()).filter(Boolean)
      : []
  const faqItems = Array.isArray(data.faqItems)
    ? data.faqItems.filter((item: unknown): item is FaqItem => Boolean(
        item && typeof item === 'object' &&
        typeof (item as FaqItem).question === 'string' && (item as FaqItem).question.trim() &&
        typeof (item as FaqItem).answer === 'string' && (item as FaqItem).answer.trim(),
      ))
    : []

  return {
    slug: realSlug,
    title: typeof data.title === 'string' ? data.title : '',
    description: typeof data.description === 'string' ? data.description : '',
    date: typeof data.date === 'string' ? data.date : '',
    category: typeof data.category === 'string' ? data.category : '',
    tags: Array.isArray(data.tags) ? data.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [],
    coverImage: data.coverImage || null,
    coverImageAlt: typeof data.coverImageAlt === 'string' ? data.coverImageAlt : null,
    imageCaption: typeof data.imageCaption === 'string' ? data.imageCaption : null,
    seoTitle: typeof data.seoTitle === 'string' ? data.seoTitle : null,
    seoKeywords,
    faqItems,
    publishOrder: Number.isInteger(data.publishOrder) ? data.publishOrder : null,
    publishWave: Number.isInteger(data.publishWave) ? data.publishWave : null,
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
    .sort((post1, post2) => {
      const byDate = post2.date.localeCompare(post1.date)
      if (byDate !== 0) return byDate
      const firstOrder = post1.publishOrder ?? Number.MAX_SAFE_INTEGER
      const secondOrder = post2.publishOrder ?? Number.MAX_SAFE_INTEGER
      return firstOrder - secondOrder || post1.slug.localeCompare(post2.slug)
    })

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
