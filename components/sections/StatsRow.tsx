"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "GPA", value: "3.82 / 4.0 · Rank 2" },
  { label: "Competitions", value: "39+ Finals" },
  { label: "Research", value: "OIST · Japan" },
  { label: "Scholarships", value: "State Merit × 3" },
  { label: "Content", value: "AI & Tech Creator" },
];

export default function StatsRow() {
  return (
    <section className="container mx-auto px-4 md:px-8 max-w-6xl mb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 border-y border-[rgba(255,255,255,0.08)] py-12"
      >
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center md:items-start">
            <span className="font-jetbrains text-xs text-[#A8DADC] mb-2 uppercase tracking-widest">
              {stat.label}
            </span>
            <span className="font-playfair text-lg md:text-xl text-[#F0EDE6] text-center md:text-left">
              {stat.value}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
