"use client";

import { motion, Variants } from "framer-motion";
import TerminalBlock from "@/components/ui/TerminalBlock";
import Link from "next/link";
import { ArrowRight, Download, ExternalLink } from "lucide-react";

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="min-h-[85vh] flex flex-col justify-center container mx-auto px-4 md:px-8 max-w-6xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-playfair font-bold text-[#F0EDE6] tracking-wider mb-2"
        >
          ANIKET
        </motion.h1>
        
        <motion.div variants={itemVariants} className="w-full max-w-2xl h-[1px] bg-[rgba(255,255,255,0.08)] mb-6" />

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-[#B0ADA6] font-lora mb-8 leading-relaxed max-w-2xl"
        >
          AI Developer <span className="text-[#F5A623]">·</span> Product Manager <span className="text-[#F5A623]">·</span> Content Creator
          <br className="hidden md:block" />
          <span className="text-base text-[#A8DADC] mt-2 block font-jetbrains">New Delhi, India</span>
        </motion.p>

        <motion.div variants={itemVariants} className="mb-12">
          <TerminalBlock />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 font-jetbrains text-sm">
          <Link
            href="/projects"
            className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[#F5A623] hover:text-[#F5A623] text-[#F0EDE6] px-6 py-3 rounded-full transition-all duration-300"
          >
            View Work <ExternalLink size={16} />
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 border border-[rgba(255,255,255,0.1)] hover:border-[#A8DADC] hover:text-[#A8DADC] text-[#B0ADA6] px-6 py-3 rounded-full transition-all duration-300"
          >
            Read My Writing <ArrowRight size={16} />
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-[rgba(255,255,255,0.1)] hover:border-[#F0EDE6] hover:text-[#F0EDE6] text-[#B0ADA6] px-6 py-3 rounded-full transition-all duration-300"
          >
            Download CV <Download size={16} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
