import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getCreatorData() {
  const filePath = path.join(process.cwd(), "data", "creator.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export default async function CreatorPage() {
  const data = await getCreatorData();

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12 md:py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-dm-serif text-[var(--color-text-primary)] mb-6">
          Content & Creator
        </h1>
        <div className="w-full max-w-2xl h-[1px] bg-[var(--color-divider)] mb-6" />
        <p className="text-xl md:text-2xl text-[var(--color-text-body)] font-source-serif leading-relaxed max-w-3xl">
          I make AI and tech understandable — for builders, founders, and the Indian tech community.
          <br /><span className="text-[var(--color-accent-amber)] mt-2 block font-jetbrains text-sm uppercase tracking-widest">Part-time. High signal. No fluff.</span>
        </p>
      </div>

      <section className="mb-24">
        <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-divider)] pb-4">
          Content Pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.pillars.map((pillar: any, index: number) => (
            <div key={index} className="p-8 border border-[var(--color-border-subtle)] rounded-xl bg-[var(--color-surface)]">
              <div className="flex gap-4 items-start">
                <div className="text-3xl mt-1">{pillar.icon}</div>
                <div>
                  <h4 className="text-[var(--color-text-primary)] font-dm-serif text-xl mb-2">{pillar.title}</h4>
                  <p className="text-[var(--color-text-body)] font-source-serif text-sm leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-divider)] pb-4">
          What I Create
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.services.map((service: any, index: number) => (
            <div key={index} className="p-8 border border-[var(--color-border-subtle)] rounded-xl bg-[rgba(255,255,255,0.02)] relative overflow-hidden group">
              <h3 className="text-xl font-dm-serif text-[var(--color-text-primary)] mb-3">{service.title}</h3>
              <p className="text-[var(--color-text-body)] font-source-serif text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-divider)] pb-4">
          Sample Work
        </h2>
        <div className="space-y-6">
          <Link href="/articles/delhi-rishikesh-solo-ride" className="block group">
            <div className="p-8 border border-[var(--color-divider)] border-l-4 border-l-[var(--color-accent-green)] rounded-r-xl bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
              <p className="text-[var(--color-text-primary)] font-source-serif italic text-lg mb-4">
                "Delhi to Rishikesh Solo: What the Hills Teach You About Risk"
              </p>
              <div className="text-[var(--color-text-muted)] font-jetbrains text-xs flex items-center justify-between">
                <span>[Read Article]</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
          <Link href="/articles/nl-to-sql-production-lessons" className="block group">
            <div className="p-8 border border-[var(--color-divider)] border-l-4 border-l-[var(--color-accent-blue)] rounded-r-xl bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
              <p className="text-[var(--color-text-primary)] font-source-serif italic text-lg mb-4">
                "Building a NL-to-SQL System That Doesn't Break in Production"
              </p>
              <div className="text-[var(--color-text-muted)] font-jetbrains text-xs flex items-center justify-between">
                <span>[Read Article]</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
          <Link href="/articles/multi-llm-pipeline-divergence" className="block group">
            <div className="p-8 border border-[var(--color-divider)] border-l-4 border-l-[var(--color-text-muted)] rounded-r-xl bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
              <p className="text-[var(--color-text-primary)] font-source-serif italic text-lg mb-4">
                "When Gemini, DeepSeek and Claude Disagree: Notes on Multi-LLM Pipelines"
              </p>
              <div className="text-[var(--color-text-muted)] font-jetbrains text-xs flex items-center justify-between">
                <span>[Read Article]</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Amber CTA Strip */}
      <section className="bg-[var(--color-accent-amber)] text-[#0A0A0A] rounded-xl p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 md:flex justify-between items-center">
          <div className="mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-dm-serif mb-4">Open to 1–2 content clients.</h2>
            <p className="font-source-serif mb-6 text-[#1A1A1A]">
              Currently available for: LinkedIn ghostwriting · Technical blog writing · AI brand strategy
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[var(--color-accent-amber)] px-8 py-4 rounded-md font-jetbrains font-bold hover:bg-[#1A1A1A] transition-colors"
            >
              [Let's Talk →]
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
