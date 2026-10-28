import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CategoryTag from '@/components/ui/CategoryTag'
import Image from 'next/image'
import GradientFallback from '@/components/ui/GradientFallback'
import ReadingProgress from '@/components/articles/ReadingProgress'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
// highlight.js theme CSS needs to be imported, we'll do this in layout or component
import 'highlight.js/styles/atom-one-dark.css'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug)
  if (!article) return {}

  const canonical = `https://aniket.app/articles/${resolvedParams.slug}`
  const pageTitle = article.seoTitle || `${article.title} — aniket.app`
  return {
    title: pageTitle,
    description: article.description,
    keywords: article.seoKeywords,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: article.description,
      url: canonical,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: article.coverImage ? [{ url: article.coverImage, alt: article.coverImageAlt || article.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.coverImage ? [article.coverImage] : [],
    }
  }
}

export function generateStaticParams() {
  return getAllArticles().map(({ slug }) => ({ slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug)
  
  if (!article) {
    notFound()
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    mainEntityOfPage: `https://aniket.app/articles/${article.slug}`,
    image: article.coverImage ? [`https://aniket.app${article.coverImage}`] : undefined,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Person', name: article.author }
  }
  const faqJsonLd = article.faqItems.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqItems.map(({ question, answer }) => ({
      '@type': 'Question', name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />}
      <ReadingProgress />

      <article className="container mx-auto px-4 md:px-8 max-w-4xl py-12 md:py-20">
        <Link 
          href="/articles"
          className="inline-flex items-center gap-2 font-jetbrains text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-amber)] transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Articles
        </Link>

        <header className="mb-12 text-center md:text-left">
          <CategoryTag category={article.category} className="mb-6 justify-center md:justify-start" />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-dm-serif text-[var(--color-text-primary)] mb-8 leading-tight max-w-3xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 font-jetbrains text-sm text-[var(--color-text-muted)]">
            <span className="text-[var(--color-text-primary)]">{article.author}</span>
            <span>·</span>
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </header>

        <div className="w-full h-[1px] bg-[var(--color-divider)] mb-12" />

        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-16 border border-[var(--color-border-subtle)]">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt || article.title}
              fill
              className="object-cover"
              priority
              unoptimized={article.coverImage.endsWith('.svg')}
            />
          ) : (
            <GradientFallback category={article.category} />
          )}
        </div>
        {article.coverImage && article.imageCaption && <p className="text-sm text-[var(--color-text-muted)] text-center -mt-12 mb-12">{article.imageCaption}</p>}

        <div className="prose-custom">
          <MDXRemote 
            source={article.content} 
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight, rehypeSlug],
              }
            }} 
          />
        </div>

        <div className="w-full h-[1px] bg-[var(--color-divider)] mt-20 mb-8" />

        <div className="flex flex-wrap gap-2 mb-12">
          {article.tags.map((tag) => (
            <span key={tag} className="font-jetbrains text-xs text-[var(--color-text-muted)] bg-[rgba(255,255,255,0.02)] border border-[var(--color-divider)] px-3 py-1.5 rounded-md uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </>
  )
}
