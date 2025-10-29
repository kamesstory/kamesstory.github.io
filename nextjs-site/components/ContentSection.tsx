"use client";

import { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

type ContentSectionProps = {
  title: string;
  sectionType: "projects" | "specialities" | "thoughts";
};

type ContentItem = {
  title: string;
  content: string;
};

export default function ContentSection({
  title,
  sectionType,
}: ContentSectionProps) {
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
    speed: 1,
    tick: 1,
    step: 3,
    scramble: 8,
    seed: 2,
    chance: 0.8,
    range: [65, 125],
    overdrive: false,
  });

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-display font-semibold text-foreground tracking-tight">
          {title}
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-accent hover:text-secondary hover:scale-110 active:scale-100 transition-all duration-100 cursor-pointer border-0 bg-transparent p-1 inline-flex items-center group text-xl"
          style={{ textDecoration: "none", borderBottom: "none" }}
          title="Refresh content"
        >
          <span
            className={`${
              isRefreshing ? "animate-spin" : ""
            } group-hover:[text-shadow:0_0_4px_rgba(0,229,255,0.2),0_0_8px_rgba(0,229,255,0.1)]`}
          >
            ↻
          </span>
        </button>
      </div>
      <div className="relative border border-muted/20 rounded-lg p-4 bg-subtle/10">
        <div
          ref={ref}
          className="text-foreground leading-relaxed font-mono [&_*]:no-underline [&_*]:!border-0"
        />
      </div>
    </div>
  );
}
