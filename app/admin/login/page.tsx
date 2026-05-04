"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center container mx-auto px-4">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="font-jetbrains text-[var(--color-text-primary)] text-xl flex items-center justify-center gap-2 mb-2">
             <span className="w-2 h-2 rounded-full bg-[var(--color-accent-amber)]" />
             aniket.app <span className="text-[var(--color-text-muted)]">/ admin</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-jetbrains text-sm text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle)] rounded-md px-4 py-3 text-[var(--color-text-primary)] font-mono focus:outline-none focus:border-[var(--color-accent-amber)] transition-colors"
              required
              autoFocus
            />
          </div>

          {error && <div className="text-red-500 font-jetbrains text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-accent-amber)] text-[#0A0A0A] font-jetbrains font-bold py-4 rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Enter"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
