"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  period: string;
  title: string;
  organization: string;
  description: string;
  tag: string;
  type: "research" | "industry" | "education";
  index: number;
}

export default function TimelineItem({
  period,
  title,
  organization,
  description,
  tag,
  type,
  index,
}: TimelineItemProps) {
  const isEven = index % 2 === 0;

  const typeColors = {
    research: "text-[#F5A623] bg-[rgba(245,166,35,0.1)] border-[#F5A623]",
    industry: "text-[#A8DADC] bg-[rgba(168,218,220,0.1)] border-[#A8DADC]",
    education: "text-[#B0ADA6] bg-[rgba(176,173,166,0.1)] border-[rgba(176,173,166,0.3)]",
  };

  const tagColor = typeColors[type] || typeColors.education;

  return (
    <div className="relative flex justify-between items-center w-full mb-12">
      {/* Mobile line (hidden on md+) */}
      <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.08)] md:hidden z-0" />
      
      {/* Desktop alternating layout */}
      <div className={`hidden md:block w-[45%] text-right ${isEven ? 'order-1' : 'order-3 text-left'}`}>
        {isEven ? (
          <div className="pr-8">
            <h3 className="text-2xl font-playfair text-[#F0EDE6] tracking-wide mb-1">{title}</h3>
            <h4 className="text-lg font-jetbrains text-[#A8DADC] mb-3">{organization}</h4>
            <p className="text-[#B0ADA6] font-lora whitespace-pre-wrap">{description}</p>
          </div>
        ) : (
          <div className="pl-8">
            <span className="inline-block px-3 py-1 border rounded-full text-xs font-jetbrains mb-4 mt-1 bg-[#0D0D0D] z-10 relative shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <span className={`px-2 py-1 rounded ${tagColor} border-none`}>{tag}</span>
            </span>
            <div className="font-jetbrains text-[#B0ADA6]">{period}</div>
          </div>
        )}
      </div>

      <div className="hidden md:flex flex-col items-center justify-center w-[10%] order-2 relative">
        <div className="w-[2px] h-full bg-[rgba(255,255,255,0.08)] absolute z-0" />
        <div className="w-4 h-4 rounded-full bg-[#0D0D0D] border-2 border-[#F5A623] z-10 shadow-[0_0_10px_rgba(245,166,35,0.3)]" />
      </div>

      <div className={`hidden md:block w-[45%] text-left ${isEven ? 'order-3' : 'order-1 text-right'}`}>
         {isEven ? (
          <div className="pl-8">
            <span className="inline-block px-3 py-1 border rounded-full text-xs font-jetbrains mb-4 mt-1 bg-[#0D0D0D] z-10 relative shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <span className={`px-2 py-1 rounded ${tagColor} border-none`}>{tag}</span>
            </span>
            <div className="font-jetbrains text-[#B0ADA6]">{period}</div>
          </div>
        ) : (
          <div className="pr-8">
            <h3 className="text-2xl font-playfair text-[#F0EDE6] tracking-wide mb-1">{title}</h3>
            <h4 className="text-lg font-jetbrains text-[#A8DADC] mb-3">{organization}</h4>
            <p className="text-[#B0ADA6] font-lora whitespace-pre-wrap">{description}</p>
          </div>
        )}
      </div>


      {/* Mobile Layout */}
      <div className="md:hidden flex w-full relative z-10 pl-8">
        <div className="absolute left-[11px] top-6 w-2 h-2 rounded-full bg-[#F5A623] shadow-[0_0_8px_rgba(245,166,35,0.5)]" />
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg p-6 w-full shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <span className={`text-xs font-jetbrains px-2 py-1 rounded ${tagColor}`}>{tag}</span>
            <span className="text-xs font-jetbrains text-[#B0ADA6]">{period}</span>
          </div>
          <h3 className="text-xl font-playfair text-[#F0EDE6] tracking-wide mb-1">{title}</h3>
          <h4 className="text-base font-jetbrains text-[#A8DADC] mb-3">{organization}</h4>
          <p className="text-[#B0ADA6] font-lora text-sm whitespace-pre-wrap leading-relaxed">{description}</p>
        </div>
      </div>

    </div>
  );
}
