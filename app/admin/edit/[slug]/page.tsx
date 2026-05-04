"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import matter from "gray-matter";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    category: "AI Research",
    tags: "",
    coverImage: "",
    featured: false,
    draft: false,
  });
  
  const [content, setContent] = useState("");
  const [sha, setSha] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "fetching" | "success" | "error">("fetching");

  useEffect(() => {
    async function loadArticle() {
      const resolvedParams = await params;
      try {
        const res = await fetch(`/api/admin/article/${resolvedParams.slug}`);
        if (res.ok) {
          const data = await res.json();
          setSha(data.sha);
          
          // Parse the frontmatter locally
          const { data: frontmatter, content: mdContent } = matter(data.content);
          
          setFormData({
            title: frontmatter.title || "",
            description: frontmatter.description || "",
            slug: resolvedParams.slug,
            category: frontmatter.category || "AI Research",
            tags: (frontmatter.tags || []).join(", "),
            coverImage: frontmatter.coverImage || "",
            featured: frontmatter.featured || false,
            draft: frontmatter.draft || false,
          });
          setContent(mdContent);
          setStatus("idle");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    }
    loadArticle();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
          content,
          sha
        }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 1500);
      } else {
         setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "fetching") {
    return <div className="text-center py-20 text-[var(--color-text-muted)] font-jetbrains">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin" className="flex items-center gap-2 font-jetbrains text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>
        
        <div className="flex gap-4">
           <button
             type="button"
             onClick={() => { setFormData({...formData, draft: true}); handleSubmit(new Event('submit') as any) }}
             className="px-4 py-2 border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] rounded-md font-jetbrains text-sm hover:border-[var(--color-text-muted)] transition-colors"
           >
             Save Draft
           </button>
           <button
             type="submit"
             onClick={handleSubmit}
             disabled={status === "loading"}
             className="px-4 py-2 bg-[var(--color-accent-amber)] text-[#0A0A0A] font-bold rounded-md font-jetbrains text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
           >
             {status === "loading" ? "Updating..." : "Update →"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] p-6 rounded-xl">
             <h2 className="font-jetbrains text-[var(--color-text-muted)] text-sm mb-6 uppercase tracking-widest border-b border-[var(--color-divider)] pb-2">
               Metadata
             </h2>
             
             <div className="space-y-4">
                <div>
                  <label className="block text-xs font-jetbrains text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle)] rounded-md px-3 py-2 text-[var(--color-text-primary)] font-source-serif focus:outline-none focus:border-[var(--color-accent-amber)]" required />
                </div>
                
                <div>
                  <label className="block text-xs font-jetbrains text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Slug</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle)] rounded-md px-3 py-2 text-[var(--color-text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--color-accent-amber)]" required readOnly />
                </div>

                <div>
                  <label className="block text-xs font-jetbrains text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle)] rounded-md px-3 py-2 text-[var(--color-text-primary)] font-source-serif focus:outline-none focus:border-[var(--color-accent-amber)] resize-none" required />
                </div>

                <div>
                  <label className="block text-xs font-jetbrains text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle)] rounded-md px-3 py-2 text-[var(--color-text-primary)] font-source-serif focus:outline-none focus:border-[var(--color-accent-amber)]">
                    <option value="AI Research">AI Research</option>
                    <option value="AI Systems">AI Systems</option>
                    <option value="Biking">Biking</option>
                    <option value="Papers">Papers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-jetbrains text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Tags (comma separated)</label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle)] rounded-md px-3 py-2 text-[var(--color-text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--color-accent-amber)]" placeholder="GNN, PyTorch, LLM" />
                </div>

                <div>
                  <label className="block text-xs font-jetbrains text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Cover Image URL (optional)</label>
                  <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle)] rounded-md px-3 py-2 text-[var(--color-text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--color-accent-amber)]" placeholder="/images/cover.jpg" />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 accent-[var(--color-accent-amber)]" />
                  <label htmlFor="featured" className="text-sm font-source-serif text-[var(--color-text-primary)]">Featured on Homepage</label>
                </div>
             </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
           <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] p-6 rounded-xl h-[calc(100vh-200px)] flex flex-col">
              <h2 className="font-jetbrains text-[var(--color-text-muted)] text-sm mb-6 uppercase tracking-widest border-b border-[var(--color-divider)] pb-2 shrink-0">
                Content
              </h2>
              
              <div className="flex-grow" data-color-mode="dark">
                 <MDEditor
                   value={content}
                   onChange={(val) => setContent(val || "")}
                   preview="edit"
                   height="100%"
                   className="!border-0 !shadow-none !bg-[var(--color-bg-dark)]"
                 />
              </div>

              {status === "success" && (
                 <div className="mt-4 text-[var(--color-accent-green)] font-jetbrains text-sm text-center shrink-0">
                   Updated successfully! Redirecting...
                 </div>
              )}
              {status === "error" && (
                 <div className="mt-4 text-red-500 font-jetbrains text-sm text-center shrink-0">
                   Failed to update. Check console.
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
