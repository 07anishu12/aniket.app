import React from 'react'
import Link from 'next/link'

export default function AboutStrip() {
  return (
    <section className="mb-32">
      <div className="border-y border-[var(--color-divider)] py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-source-serif text-[var(--color-text-body)] text-center md:text-left leading-relaxed max-w-3xl">
          By Aniket — AI Research Intern at OIST Japan · APM at Drivio ·<br className="hidden md:block" />
          Writing about the intersection of AI systems and real-world building.
        </p>

        <Link 
          href="/portfolio"
          className="shrink-0 font-jetbrains text-sm text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-amber)] hover:text-[var(--color-accent-amber)] transition-colors px-6 py-3 rounded-full flex items-center gap-2"
        >
          [View Portfolio →]
        </Link>
      </div>
    </section>
  )
}
