"use client";

import { useState } from "react";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function FilterBar({ categories, activeCategory, onSelectCategory }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full font-jetbrains text-sm transition-all duration-300 ${
            activeCategory === category
              ? "bg-[#F5A623] text-[#0D0D0D] border border-[#F5A623]"
              : "bg-transparent text-[#B0ADA6] border border-[rgba(255,255,255,0.1)] hover:border-[#A8DADC] hover:text-[#A8DADC]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
