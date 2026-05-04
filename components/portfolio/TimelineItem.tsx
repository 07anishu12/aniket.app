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

  let colorClass = 'text-[var(--color-accent-amber)] border-[var(--color-accent-amber)] bg-[rgba(232,150,12,0.1)]'; // default amber
  if (type === 'industry') colorClass = 'text-[var(--color-accent-blue)] border-[var(--color-accent-blue)] bg-[rgba(126,184,201,0.1)]';
  if (type === 'education') colorClass = 'text-[var(--color-text-muted)] border-[var(--color-text-muted)] bg-[rgba(255,255,255,0.05)]';

  return (
    <div className="relative flex justify-between items-center w-full mb-12">
      {/* Mobile line */}
      <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-[var(--color-divider)] md:hidden z-0" />
      
      {/* Desktop left side */}
      <div className={`hidden md:block w-[45%] text-right ${isEven ? 'order-1' : 'order-3 text-left'}`}>
        {isEven ? (
          <div className="pr-8">
            <h3 className="text-xl font-dm-serif text-[var(--color-text-primary)] mb-1">{title}</h3>
            <h4 className="text-sm font-jetbrains text-[var(--color-text-muted)] mb-3">{organization}</h4>
            <p className="text-[var(--color-text-body)] font-source-serif whitespace-pre-wrap leading-relaxed text-sm">{description}</p>
          </div>
        ) : (
          <div className="pl-8 flex flex-col justify-center h-full">
            <span className={`inline-block px-2 py-1 border rounded-full text-xs font-jetbrains mb-3 self-start ${colorClass}`}>
              {tag}
            </span>
            <div className="font-jetbrains text-sm text-[var(--color-text-muted)]">{period}</div>
          </div>
        )}
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center justify-center w-[10%] order-2 relative">
        <div className="w-[2px] h-full bg-[var(--color-divider)] absolute z-0" />
        <div className={`w-3 h-3 rounded-full bg-[var(--color-bg-dark)] border-2 z-10 ${colorClass.split(' ')[1]}`} />
      </div>

      {/* Desktop right side */}
      <div className={`hidden md:block w-[45%] text-left ${isEven ? 'order-3' : 'order-1 text-right'}`}>
         {isEven ? (
          <div className="pl-8 flex flex-col justify-center h-full">
            <span className={`inline-block px-2 py-1 border rounded-full text-xs font-jetbrains mb-3 self-start ${colorClass}`}>
              {tag}
            </span>
            <div className="font-jetbrains text-sm text-[var(--color-text-muted)]">{period}</div>
          </div>
        ) : (
          <div className="pr-8">
            <h3 className="text-xl font-dm-serif text-[var(--color-text-primary)] mb-1">{title}</h3>
            <h4 className="text-sm font-jetbrains text-[var(--color-text-muted)] mb-3">{organization}</h4>
            <p className="text-[var(--color-text-body)] font-source-serif whitespace-pre-wrap leading-relaxed text-sm">{description}</p>
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex w-full relative z-10 pl-8">
        <div className={`absolute left-[11px] top-6 w-2 h-2 rounded-full ${colorClass.split(' ')[2]}`} />
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-6 w-full shadow-lg">
          <div className="flex justify-between items-start mb-4 gap-4">
            <span className={`text-[10px] font-jetbrains px-2 py-1 rounded border uppercase tracking-wider ${colorClass}`}>{tag}</span>
            <span className="text-[10px] font-jetbrains text-[var(--color-text-muted)] text-right">{period}</span>
          </div>
          <h3 className="text-lg font-dm-serif text-[var(--color-text-primary)] mb-1 leading-tight">{title}</h3>
          <h4 className="text-xs font-jetbrains text-[var(--color-text-muted)] mb-3">{organization}</h4>
          <p className="text-[var(--color-text-body)] font-source-serif text-sm whitespace-pre-wrap leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
