"use client";

import { motion } from "framer-motion";
import { Lock, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
  github?: string | null;
  privateRepo?: boolean;
  featured?: boolean;
}

export default function ProjectCard({
  name,
  description,
  tags,
  github,
  privateRepo,
  featured,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ translateY: -4, boxShadow: "0 0 40px rgba(245,166,35,0.05)" }}
      className={`relative flex flex-col p-6 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D0D0D] overflow-hidden ${
        featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-playfair font-bold text-[#F0EDE6] tracking-wide">
          {name}
        </h3>
        <div className="flex gap-2">
          {privateRepo ? (
            <span className="flex items-center gap-1 text-xs font-jetbrains text-[#A8DADC] bg-[rgba(168,218,220,0.1)] px-2 py-1 rounded">
              <Lock size={12} /> Private
            </span>
          ) : github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B0ADA6] hover:text-[#F5A623] transition-colors"
            >
              <FaGithub size={20} />
            </a>
          ) : null}
        </div>
      </div>
      
      <p className="text-[#B0ADA6] flex-grow text-sm leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-jetbrains text-[#A8DADC] border border-[rgba(168,218,220,0.2)] px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Decorative hover effect gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(245,166,35,0.03)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
