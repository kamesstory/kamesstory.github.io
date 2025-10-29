"use client";

import { useState } from "react";
import { useScramble } from "use-scramble";

type ContentSectionProps = {
  title: string;
  content: string;
  href?: string;
};

export default function ContentSection({
  title,
  content,
  href = "#",
}: ContentSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { ref } = useScramble({
    text: content,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  return (
    <div className="mb-8">
      <a
        href={href}
        className="group inline-flex items-center gap-2 mb-3 no-underline"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => e.preventDefault()}
      >
        <h2 className="font-mono text-lg font-semibold text-accent m-0">
          {title}
        </h2>
        <span
          className={`text-accent transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          →
        </span>
      </a>
      <div ref={ref} className="text-foreground leading-relaxed" />
    </div>
  );
}
