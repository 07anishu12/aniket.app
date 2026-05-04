"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import CategoryTag from "@/components/ui/CategoryTag";

const categories = ["AI Research", "AI Systems", "Biking", "Papers"];

export default function HeroSection() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="mb-32 mt-12 md:mt-24 max-w-4xl">
      <motion.div variants={itemVariants}>
        <h1 className="mb-6 relative inline-block group cursor-default">
          <span className="block text-4xl md:text-6xl font-dm-serif text-[var(--color-text-primary)] leading-tight">
            AI, Systems, and
            <br />
            Stories from the Road.
          </span>
          <div className="absolute -bottom-2 left-0 w-0 h-[3px] bg-[var(--color-accent-amber)] group-hover:w-full transition-all duration-500 ease-out" />
        </h1>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-[var(--color-text-body)] font-source-serif max-w-2xl mb-10 leading-relaxed"
      >
        Writing about artificial intelligence, real-world systems, and
        motorcycle journeys across India. By Aniket — AI Researcher & Builder,
        New Delhi.
      </motion.p>

      <motion.div variants={itemVariants} className="flex gap-6 mb-16 font-jetbrains text-sm">
        <Link
          href="/articles"
          className="text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] hover:text-[var(--color-accent-amber)] hover:border-[var(--color-accent-amber)] transition-colors pb-1"
        >
          [Read Articles]
        </Link>
        <Link
          href="/portfolio"
          className="text-[var(--color-text-muted)] border-b border-transparent hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-colors pb-1"
        >
          [View Portfolio]
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-8 border-t border-[var(--color-divider)]">
        <div className="flex flex-wrap gap-4 items-center">
          {categories.map((cat) => (
            <Link key={cat} href={`/categories/${cat.toLowerCase().replace(/ /g, '-')}`}>
              <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--color-border-subtle)] px-4 py-2 rounded-full hover:border-[var(--color-text-muted)] transition-colors cursor-pointer group">
                <CategoryTag category={cat} dot className="group-hover:opacity-80 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
