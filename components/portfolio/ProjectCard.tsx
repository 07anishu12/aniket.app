"use client";

import { motion } from "framer-motion";
import { Lock, ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
  github?: string | null;
  privateRepo?: boolean;
  featured?: boolean;
  articleSlug?: string | null;
}

export default function ProjectCard({
  name,
  description,
  tags,
  github,
  privateRepo,
  featured,
  articleSlug,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ translateY: -4 }}
      className={`relative flex flex-col p-8 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] overflow-hidden transition-all duration-300 group ${
        featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-accent-amber)] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-dm-serif text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-amber)] transition-colors leading-tight">
          {name}
        </h3>
        <div className="flex gap-2 shrink-0 ml-4">
          {privateRepo ? (
            <span className="flex items-center gap-1 text-xs font-jetbrains text-[var(--color-text-muted)] bg-[rgba(255,255,255,0.02)] border border-[var(--color-divider)] px-2 py-1 rounded">
              <Lock size={12} /> Private
            </span>
          ) : github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-amber)] transition-colors"
            >
              <FaGithub size={20} />
            </a>
          ) : null}
        </div>
      </div>
      
      <p className="text-[var(--color-text-body)] flex-grow font-source-serif leading-relaxed mb-8">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-jetbrains text-[var(--color-text-muted)] bg-[rgba(255,255,255,0.02)] border border-[var(--color-divider)] px-2 py-1 rounded-full uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {articleSlug && (
          <Link 
            href={`/articles/${articleSlug}`}
            className="flex items-center gap-1 font-jetbrains text-xs text-[var(--color-accent-amber)] hover:opacity-80 transition-opacity uppercase tracking-widest shrink-0"
          >
            Read Post <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
