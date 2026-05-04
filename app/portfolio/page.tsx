"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import fs from "fs";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/github-repos");
        const data = await response.json();
        setProjects(data.repos || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12 md:py-20">
      {/* Hero Section */}
      <div className="mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-dm-serif text-[var(--color-text-primary)] leading-tight mb-8 max-w-3xl">
          Building AI Systems<br />
          That Work in Production.
        </h1>
        <p className="text-xl text-[var(--color-text-body)] font-source-serif mb-10">
          AI Researcher <span className="text-[var(--color-accent-amber)]">·</span> Product Manager <span className="text-[var(--color-accent-amber)]">·</span> Builder<br />
          <span className="font-jetbrains text-sm mt-2 block">New Delhi, India</span>
        </p>

        <div className="flex flex-wrap gap-4 font-jetbrains text-sm">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] text-[var(--color-text-primary)] px-6 py-3 rounded-full transition-colors"
          >
            [Download CV ↓]
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 border border-transparent hover:border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-6 py-3 rounded-full transition-colors"
          >
            [Contact Me →]
          </a>
          <a
            href="https://github.com/07anishu12"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-transparent hover:border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-6 py-3 rounded-full transition-colors"
          >
            [GitHub ↗]
          </a>
        </div>
      </div>

      {/* Currently Section */}
      <section className="mb-24">
        <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-6 border-b border-[var(--color-divider)] pb-4">
          Currently
        </h2>
        <ul className="space-y-4 font-source-serif text-[var(--color-text-body)]">
          <li className="flex gap-4">
            <span className="text-[var(--color-accent-amber)]">→</span>
            AI Research Intern · OIST, Japan (Jun 2024 – Present)
          </li>
          <li className="flex gap-4">
            <span className="text-[var(--color-accent-amber)]">→</span>
            Pursuing MSc Financial Engineering · WorldQuant University
          </li>
          <li className="flex gap-4">
            <span className="text-[var(--color-accent-amber)]">→</span>
            Writing about AI systems at aniket.app
          </li>
        </ul>
      </section>

      {/* Featured Projects Section */}
      <section className="mb-24">
        <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-divider)] pb-4">
          Featured Projects
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3].map(i => <div key={i} className="h-64 bg-[rgba(255,255,255,0.02)] rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </section>

      {/* Research Section */}
      <section className="mb-24">
        <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-6 border-b border-[var(--color-divider)] pb-4">
          Research
        </h2>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] p-8 rounded-xl mb-8">
          <h3 className="text-xl font-dm-serif text-[var(--color-text-primary)] mb-2">
            AI Research Intern · OIST, Japan
          </h3>
          <p className="font-jetbrains text-xs text-[var(--color-text-muted)] mb-6">
            Jun 2024 – Present
          </p>
          <ul className="space-y-4 font-source-serif text-[var(--color-text-body)]">
            <li className="flex gap-4">
              <span className="text-[var(--color-accent-amber)]">→</span>
              <p>GAT-based GNN architectures for ecological food web modeling</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[var(--color-accent-amber)]">→</span>
              <p>Multi-LLM ensemble pipeline (Gemini · DeepSeek · Claude · OpenAI) for synthetic ecological descriptor generation</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[var(--color-accent-amber)]">→</span>
              <p>Ablation studies on message-passing depth and edge-feature augmentation under sparse, heterophilic conditions</p>
            </li>
          </ul>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--color-divider)] border-dashed p-6 rounded-xl">
           <h4 className="font-jetbrains text-sm text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Research Interests</h4>
           <p className="font-source-serif text-[var(--color-text-body)]">
            Graph-based learning · LLM robustness · Distribution shift · Multi-agent systems · Alignment-relevant failure modes
           </p>
        </div>
      </section>

      {/* Experience & Education & Achievements - compact layout */}
      <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
           <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-divider)] pb-4">
             Experience
           </h2>
           <div className="space-y-8">
              <div className="relative pl-6 border-l-2 border-[var(--color-divider)]">
                 <div className="absolute w-3 h-3 bg-[var(--color-accent-amber)] rounded-full -left-[7px] top-1" />
                 <h3 className="font-dm-serif text-lg text-[var(--color-text-primary)]">AI Research Intern</h3>
                 <p className="font-jetbrains text-xs text-[var(--color-text-muted)] mb-2">OIST, Japan · 2024 – Present</p>
                 <p className="font-source-serif text-sm text-[var(--color-text-body)]">GNN ecological modeling · multi-LLM pipelines</p>
              </div>
              <div className="relative pl-6 border-l-2 border-[var(--color-divider)]">
                 <div className="absolute w-3 h-3 bg-[var(--color-accent-blue)] rounded-full -left-[7px] top-1" />
                 <h3 className="font-dm-serif text-lg text-[var(--color-text-primary)]">APM — AI Systems</h3>
                 <p className="font-jetbrains text-xs text-[var(--color-text-muted)] mb-2">Drivio Technologies · 2024 – 2025</p>
                 <p className="font-source-serif text-sm text-[var(--color-text-body)]">LLM-driven loan underwriting · NL-to-SQL BI system</p>
              </div>
              <div className="relative pl-6 border-l-2 border-transparent">
                 <div className="absolute w-3 h-3 bg-[var(--color-text-muted)] rounded-full -left-[7px] top-1" />
                 <h3 className="font-dm-serif text-lg text-[var(--color-text-primary)]">Business Consultant & Analyst</h3>
                 <p className="font-jetbrains text-xs text-[var(--color-text-muted)] mb-2">Analy Assist · 2023</p>
                 <p className="font-source-serif text-sm text-[var(--color-text-body)]">4 startup launches · cost analysis</p>
              </div>
           </div>
        </div>

        <div>
           <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-divider)] pb-4">
             Education
           </h2>
           <div className="space-y-6 mb-12">
              <div>
                 <h3 className="font-dm-serif text-lg text-[var(--color-text-primary)]">M.Sc. Financial Engineering</h3>
                 <p className="font-jetbrains text-xs text-[var(--color-text-muted)]">WorldQuant University · 2025 – 2027</p>
              </div>
              <div>
                 <h3 className="font-dm-serif text-lg text-[var(--color-text-primary)]">B.Sc. Data Analytics</h3>
                 <p className="font-jetbrains text-xs text-[var(--color-text-muted)]">DSEU · GPA 3.82/4.0 · Rank 2 · 2022 – 2025</p>
              </div>
           </div>

           <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-6 border-b border-[var(--color-divider)] pb-4">
             Achievements
           </h2>
           <ul className="space-y-4 font-source-serif text-sm text-[var(--color-text-body)]">
             <li className="flex gap-4">
               <span className="font-jetbrains text-[var(--color-text-muted)] opacity-50">01</span>
               State Merit Scholar ×3 — Government of Delhi
             </li>
             <li className="flex gap-4">
               <span className="font-jetbrains text-[var(--color-text-muted)] opacity-50">02</span>
               39+ competition finals (AI hackathons, consulting)
             </li>
             <li className="flex gap-4">
               <span className="font-jetbrains text-[var(--color-text-muted)] opacity-50">03</span>
               Top 14 / 500+ — OIST Business & AI Traineeship
             </li>
             <li className="flex gap-4">
               <span className="font-jetbrains text-[var(--color-text-muted)] opacity-50">04</span>
               Organized Deep Learning Workshop w/ NSYSU Taiwan
             </li>
             <li className="flex gap-4">
               <span className="font-jetbrains text-[var(--color-text-muted)] opacity-50">05</span>
               National Debater — "Speak for India"
             </li>
           </ul>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent-blue)]" />
         <div>
            <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-4">
              Let's build something meaningful.
            </h2>
            <p className="font-source-serif text-[var(--color-text-body)] max-w-xl">
              Open to research collaborations, AI product consulting, and content partnerships.
            </p>
         </div>
         <div className="flex gap-4 font-jetbrains text-sm shrink-0">
            <a href="/contact" className="bg-[var(--color-text-primary)] text-[var(--color-bg-dark)] px-6 py-3 rounded-md hover:bg-white transition-colors">
              [Send a Message →]
            </a>
            <a href="/articles" className="border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] px-6 py-3 rounded-md hover:border-[var(--color-accent-amber)] transition-colors">
              [View Articles →]
            </a>
         </div>
      </section>
    </div>
  );
}
