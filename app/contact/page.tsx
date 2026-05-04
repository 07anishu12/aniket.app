"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "General", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-6xl py-12 md:py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-dm-serif text-[var(--color-text-primary)] mb-6">
          Contact
        </h1>
        <div className="w-full max-w-2xl h-[1px] bg-[var(--color-divider)] mb-6" />
        <p className="text-xl md:text-2xl text-[var(--color-text-body)] font-source-serif leading-relaxed max-w-3xl">
          Let's build something meaningful.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Column: Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-jetbrains text-sm text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-md px-4 py-3 text-[var(--color-text-primary)] font-source-serif focus:outline-none focus:border-[var(--color-accent-amber)] transition-colors"
                placeholder="Ada Lovelace"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-jetbrains text-sm text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-md px-4 py-3 text-[var(--color-text-primary)] font-source-serif focus:outline-none focus:border-[var(--color-accent-amber)] transition-colors"
                placeholder="ada@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-jetbrains text-sm text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-md px-4 py-3 text-[var(--color-text-primary)] font-source-serif focus:outline-none focus:border-[var(--color-accent-amber)] transition-colors appearance-none"
              >
                <option value="Research Collaboration" className="bg-[var(--color-bg-dark)]">Research Collaboration</option>
                <option value="Job Opportunity" className="bg-[var(--color-bg-dark)]">Job Opportunity</option>
                <option value="Content Partnership" className="bg-[var(--color-bg-dark)]">Content Partnership</option>
                <option value="General" className="bg-[var(--color-bg-dark)]">General</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block font-jetbrains text-sm text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={20}
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-md px-4 py-3 text-[var(--color-text-primary)] font-source-serif focus:outline-none focus:border-[var(--color-accent-amber)] transition-colors resize-none"
                placeholder="How can we build something great together?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[var(--color-accent-amber)] text-[#0A0A0A] font-jetbrains font-bold py-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message →"}
            </button>

            {status === "success" && (
              <p className="text-[var(--color-accent-green)] font-jetbrains text-sm text-center">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-500 font-jetbrains text-sm text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col space-y-12">
          <div>
            <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-6">Contact Info</h2>
            <div className="space-y-4 font-jetbrains text-[var(--color-text-muted)] text-sm">
              <div className="flex items-center gap-4">
                <Mail size={18} className="text-[var(--color-text-primary)]" />
                <span>kumaraniketn@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-[var(--color-text-primary)]" />
                <span>+91-8448769791</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={18} className="text-[var(--color-text-primary)]" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-dm-serif text-[var(--color-text-primary)] mb-6">Links</h2>
            <div className="space-y-4 font-jetbrains text-[var(--color-text-muted)] text-sm">
              <a
                href="https://github.com/07anishu12"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--color-accent-blue)] transition-colors group"
              >
                github.com/07anishu12 <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://www.linkedin.com/in/aniket-thakur-a23a9b372/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--color-accent-blue)] transition-colors group"
              >
                linkedin.com/in/aniket-thakur <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] p-8 rounded-xl">
            <h2 className="text-xl font-dm-serif text-[var(--color-text-primary)] mb-6">Open to:</h2>
            <ul className="space-y-3 font-source-serif text-[var(--color-text-body)] text-sm">
              <li className="flex gap-3"><span className="text-[var(--color-accent-amber)]">✓</span> Research collaborations & PhD opportunities</li>
              <li className="flex gap-3"><span className="text-[var(--color-accent-amber)]">✓</span> AI product / PM consulting</li>
              <li className="flex gap-3"><span className="text-[var(--color-accent-amber)]">✓</span> LinkedIn ghostwriting & content strategy</li>
              <li className="flex gap-3"><span className="text-[var(--color-accent-amber)]">✓</span> Technical blog writing (AI/ML niche)</li>
              <li className="flex gap-3"><span className="text-[var(--color-accent-amber)]">✓</span> AI brand content partnerships</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
