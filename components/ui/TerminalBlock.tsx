"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "AI Research Intern @ OIST, Japan",
  "APM — AI Systems @ Drivio Technologies",
  "Writing about AI, research & building for 10K+ readers",
];

export default function TerminalBlock() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === role) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev: number) => (prev + 1) % roles.length);
    } else {
      const nextText = isDeleting
        ? role.substring(0, displayText.length - 1)
        : role.substring(0, displayText.length + 1);

      timeout = setTimeout(
        () => setDisplayText(nextText),
        isDeleting ? 30 : 70
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentRoleIndex, isDeleting]);

  return (
    <div className="font-jetbrains text-[#A8DADC] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] p-4 rounded-md inline-block max-w-2xl w-full">
      <span className="text-[#F5A623]">&gt;</span>{" "}
      <span className="text-sm md:text-base whitespace-pre-wrap">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-2 h-4 bg-[#F5A623] align-middle ml-1"
      />
    </div>
  );
}
