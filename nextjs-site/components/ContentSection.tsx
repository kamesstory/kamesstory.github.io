"use client";

import { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

type ContentSectionProps = {
  title: string;
  sectionType: "projects" | "activities" | "thoughts";
  href?: string;
};

type ContentItem = {
  title: string;
  content: string;
};

export default function ContentSection({
  title,
  sectionType,
  href = "#",
}: ContentSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [content, setContent] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRandomContent = async () => {
    try {
      const response = await fetch(`/api/content/${sectionType}`);
      const data: ContentItem = await response.json();
      setContent(`${data.title}. ${data.content}`);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    fetchRandomContent();
  }, [sectionType]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchRandomContent();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const { ref } = useScramble({
    text: content,
    speed: 1.0,
    tick: 1,
    step: 5,
    scramble: 15,
    seed: 2,
    chance: 1.0,
    range: [65, 125],
    overdrive: false,
  });

  return (
    <div className="mb-8">
      <a
        href={href}
        className="group inline-flex items-center gap-2 mb-3 border-0"
        style={{ textDecoration: "none", borderBottom: "none" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => e.preventDefault()}
      >
        <h2 className="font-mono text-lg font-semibold text-accent m-0">
          {title}
        </h2>
        <span
          className={`flex items-center gap-2 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-accent">→</span>
          <span className="text-muted text-sm italic">(Coming Soon)</span>
        </span>
      </a>
      <div className="relative">
        <div
          ref={ref}
          className="text-foreground leading-relaxed font-mono [&_*]:no-underline [&_*]:!border-0 inline"
        />
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="ml-2 text-accent hover:text-foreground hover:translate-y-[-1px] active:translate-y-0 transition-all duration-200 cursor-pointer border-0 bg-transparent px-2 inline-flex items-center"
          style={{ textDecoration: "none", borderBottom: "none" }}
          title="Refresh content"
        >
          <span className={isRefreshing ? "animate-spin" : ""}>↻</span>
        </button>
      </div>
    </div>
  );
}
