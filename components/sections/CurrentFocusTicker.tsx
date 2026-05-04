"use client";

import { motion } from "framer-motion";

const focusItems = [
  "GNN ecological modeling",
  "Multi-LLM pipelines",
  "AI content for Indian tech audience",
  "LLM robustness research",
  "Fintech AI products",
];

export default function CurrentFocusTicker() {
  return (
    <div className="w-full border-y border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.01)] overflow-hidden py-4 flex whitespace-nowrap mb-32">
      <div className="flex items-center">
        <span className="font-playfair text-[#B0ADA6] italic px-8">Currently:</span>
      </div>
      <div className="relative flex overflow-x-hidden w-full">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex items-center gap-12 font-jetbrains text-sm text-[#A8DADC]"
        >
          {/* Duplicate items for seamless loop */}
          {[...focusItems, ...focusItems, ...focusItems].map((item, index) => (
            <div key={index} className="flex items-center gap-12">
              <span>{item}</span>
              <span className="text-[#F5A623]">·</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
