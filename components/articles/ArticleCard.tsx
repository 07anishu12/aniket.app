"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArticleMeta } from '@/lib/articles'
import CategoryTag from '@/components/ui/CategoryTag'
import GradientFallback from '@/components/ui/GradientFallback'
import { motion } from 'framer-motion'

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link href={`/articles/${article.slug}`} className="block group">
      <motion.div 
        whileHover={{ y: -4 }}
        className="h-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden flex flex-col relative transition-all duration-300"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-accent-amber)] opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative h-48 w-full shrink-0">
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

        <div className="p-6 flex flex-col flex-grow">
          <CategoryTag category={article.category} className="mb-3" dot />
          <h3 className="text-xl md:text-2xl font-dm-serif text-[var(--color-text-primary)] mb-3 leading-tight group-hover:text-[var(--color-accent-amber)] transition-colors line-clamp-3">
            {article.title}
          </h3>
          <p className="font-source-serif text-[var(--color-text-body)] text-sm mb-6 line-clamp-3 flex-grow">
            {article.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-divider)]">
            <span className="font-jetbrains text-xs text-[var(--color-text-muted)]">
              {article.readingTime} min read
            </span>
            <span className="font-jetbrains text-xs text-[var(--color-text-muted)]">
              {formattedDate}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
