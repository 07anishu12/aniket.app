"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Edit, Trash2 } from "lucide-react";
import CategoryTag from "@/components/ui/CategoryTag";

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd fetch this from an API route. 
    // Since we're client side and the articles are static files, we'll need an API to list them.
    // I'll create a quick GET /api/admin/articles
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete ${slug}?`)) return;
    
    try {
      const res = await fetch(`/api/admin/article/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setArticles(articles.filter(a => a.slug !== slug));
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      alert("Error deleting article.");
    }
  };

  const published = articles.filter(a => !a.draft);
  const drafts = articles.filter(a => a.draft);

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-[var(--color-divider)] pb-6">
        <div className="font-jetbrains text-[var(--color-text-primary)] text-xl flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-[var(--color-accent-amber)]" />
           aniket.app <span className="text-[var(--color-text-muted)]">/ admin</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/admin/new"
            className="flex items-center gap-2 bg-[var(--color-text-primary)] text-[var(--color-bg-dark)] px-4 py-2 rounded-md font-jetbrains text-sm hover:bg-white transition-colors"
          >
            <Plus size={16} /> New Article
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-4 py-2 rounded-md font-jetbrains text-sm transition-colors"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </header>

      {loading ? (
        <div className="text-[var(--color-text-muted)] font-jetbrains">Loading articles...</div>
      ) : (
        <>
          <section className="mb-16">
            <h2 className="font-jetbrains text-[var(--color-text-muted)] text-sm mb-4 uppercase tracking-widest">
              Published Articles ({published.length})
            </h2>
            <div className="space-y-4">
              {published.length === 0 ? (
                <div className="text-[var(--color-text-muted)] font-source-serif italic border border-[var(--color-divider)] p-6 rounded-xl border-dashed">
                  No published articles.
                </div>
              ) : (
                published.map((article) => (
                  <div key={article.slug} className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                         <CategoryTag category={article.category} />
                         {article.featured && (
                           <span className="font-jetbrains text-[10px] uppercase tracking-widest text-[var(--color-bg-dark)] bg-[var(--color-accent-amber)] px-2 py-0.5 rounded">Featured</span>
                         )}
                       </div>
                       <h3 className="font-dm-serif text-xl text-[var(--color-text-primary)] mb-2">{article.title}</h3>
                       <div className="font-jetbrains text-xs text-[var(--color-text-muted)]">
                         {new Date(article.date).toLocaleDateString()} · {article.readingTime} min read
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/edit/${article.slug}`}
                        className="p-2 border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] rounded-md transition-colors"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.slug)}
                        className="p-2 border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-red-500 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="font-jetbrains text-[var(--color-text-muted)] text-sm mb-4 uppercase tracking-widest">
              Drafts ({drafts.length})
            </h2>
            <div className="space-y-4">
              {drafts.length === 0 ? (
                <div className="text-[var(--color-text-muted)] font-source-serif italic border border-[var(--color-divider)] p-6 rounded-xl border-dashed">
                  No drafts.
                </div>
              ) : (
                drafts.map((article) => (
                  <div key={article.slug} className="bg-[rgba(255,255,255,0.02)] border border-[var(--color-border-subtle)] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-70 hover:opacity-100 transition-opacity">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                         <CategoryTag category={article.category} />
                       </div>
                       <h3 className="font-dm-serif text-xl text-[var(--color-text-primary)] mb-2">{article.title}</h3>
                       <div className="font-jetbrains text-xs text-[var(--color-text-muted)]">
                         {new Date(article.date).toLocaleDateString()} · {article.readingTime} min read
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/edit/${article.slug}`}
                        className="p-2 border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] rounded-md transition-colors"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.slug)}
                        className="p-2 border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-red-500 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
