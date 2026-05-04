"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Articles", path: "/articles" },
  { name: "Categories", path: "/categories" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Creator", path: "/creator" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.8)] backdrop-blur-[12px] border-b border-[var(--color-divider)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center max-w-7xl">
        <Link
          href="/"
          className="font-jetbrains text-lg text-[var(--color-text-primary)] hover:opacity-80 transition-opacity flex items-center gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-amber)]" />
          aniket.app
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative py-1 group"
              >
                <span
                  className={`text-sm tracking-wide transition-colors font-jetbrains ${
                    isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent-amber)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-accent-amber)] opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300 origin-left" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-[var(--color-text-primary)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-[var(--color-bg-dark)] border-b border-[var(--color-divider)] md:hidden py-6 px-4 flex flex-col space-y-6"
          >
            {navLinks.map((link) => {
               const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
               return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xl tracking-wide transition-colors font-dm-serif flex items-center ${
                    isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-body)]"
                  }`}
                >
                  {isActive && <span className="w-1.5 h-6 bg-[var(--color-accent-amber)] mr-3 rounded-full" />}
                  {!isActive && <span className="w-1.5 h-6 mr-3" />}
                  {link.name}
                </Link>
               )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
