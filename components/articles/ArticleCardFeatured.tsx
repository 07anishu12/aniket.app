"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArticleMeta } from '@/lib/articles'
import CategoryTag from '@/components/ui/CategoryTag'
import GradientFallback from '@/components/ui/GradientFallback'
import { motion } from 'framer-motion'

export default function ArticleCardFeatured({ article }: { article: ArticleMeta }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link href={`/articles/${article.slug}`} className="block group">
      <motion.div 
        whileHover={{ y: -4 }}
        className="h-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] overflow-hidden flex flex-col relative transition-all duration-300"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--color-accent-amber)] opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative h-64 w-full shrink-0">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <GradientFallback category={article.category} />
          )}
        </div>

        <div className="p-8 flex flex-col flex-grow">
          <CategoryTag category={article.category} className="mb-4" />
          <div className="w-full h-[1px] bg-[var(--color-divider)] mb-6" />
          
          <h3 className="text-2xl lg:text-3xl font-dm-serif text-[var(--color-text-primary)] mb-auto leading-tight group-hover:text-[var(--color-accent-amber)] transition-colors">
            {article.title}
          </h3>

          <div className="flex items-center gap-2 mt-8">
            <span className="font-jetbrains text-xs text-[var(--color-text-muted)]">
              {article.readingTime} min read
            </span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span className="font-jetbrains text-xs text-[var(--color-text-muted)]">
              {formattedDate}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
