import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-divider)] py-12 mt-24 relative z-10 bg-[var(--color-bg-dark)]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-12 font-jetbrains flex items-center gap-2 text-[var(--color-text-primary)] opacity-80">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-amber)]" />
          aniket.app
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="font-jetbrains text-[var(--color-text-muted)] text-sm mb-4 uppercase tracking-widest border-b border-[var(--color-divider)] pb-2 inline-block">Writing</h3>
            <ul className="space-y-3 font-source-serif">
              <li><Link href="/articles" className="text-[var(--color-text-body)] hover:text-[var(--color-accent-blue)] transition-colors">Articles</Link></li>
              <li><Link href="/categories" className="text-[var(--color-text-body)] hover:text-[var(--color-accent-blue)] transition-colors">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-jetbrains text-[var(--color-text-muted)] text-sm mb-4 uppercase tracking-widest border-b border-[var(--color-divider)] pb-2 inline-block">Portfolio</h3>
            <ul className="space-y-3 font-source-serif">
              <li><Link href="/portfolio" className="text-[var(--color-text-body)] hover:text-[var(--color-accent-blue)] transition-colors">Projects</Link></li>
              <li><Link href="/portfolio" className="text-[var(--color-text-body)] hover:text-[var(--color-accent-blue)] transition-colors">Research</Link></li>
              <li><Link href="/portfolio" className="text-[var(--color-text-body)] hover:text-[var(--color-accent-blue)] transition-colors">Experience</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h3 className="font-jetbrains text-[var(--color-text-muted)] text-sm mb-4 uppercase tracking-widest border-b border-[var(--color-divider)] pb-2 inline-block">Connect</h3>
            <ul className="space-y-3 font-source-serif">
              <li>
                <a href="https://github.com/07anishu12" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-body)] hover:text-[var(--color-accent-blue)] transition-colors flex items-center gap-1 group">
                  GitHub <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent-blue)]" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/aniket-thakur-a23a9b372/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-body)] hover:text-[var(--color-accent-blue)] transition-colors flex items-center gap-1 group">
                  LinkedIn <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent-blue)]" />
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--color-text-body)] hover:text-[var(--color-accent-blue)] transition-colors flex items-center gap-1 group">
                  Email <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent-blue)]" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--color-divider)] text-[var(--color-text-muted)] text-sm font-source-serif">
          <p>
            &copy; {currentYear} Aniket · New Delhi, India
          </p>
          <p className="mt-2 md:mt-0 font-jetbrains opacity-70">
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
