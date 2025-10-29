"use client";

import { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

type ContentSectionProps = {
  title: string;
  sectionType: "projects" | "specialities" | "thoughts";
};

// Preset animation timings that feel random but are consistent
const animationPresets: Record<
  string,
  { breathe: number; glow: number; delay: number }
> = {
  projects: { breathe: 6.2, glow: 8.5, delay: -3.7 },
  specialities: { breathe: 7.8, glow: 9.3, delay: -6.1 },
  thoughts: { breathe: 5.4, glow: 10.7, delay: -2.3 },
};

type ContentItem = {
  title: string;
  content: string;
};

// Strip markdown links to plain text for scrambling
function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

// Convert markdown-style links [text](url) to HTML
function markdownToHTML(text: string): string {
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-secondary transition-colors duration-150">$1</a>'
  );
}

export default function ContentSection({
  title,
  sectionType,
}: ContentSectionProps) {
  const [content, setContent] = useState<string>("");
  const [strippedContent, setStrippedContent] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isScrambling, setIsScrambling] = useState(true);

  // Get preset timing based on section type (deterministic for SSR)
  const timing = animationPresets[sectionType];

  const fetchRandomContent = async () => {
    try {
      const response = await fetch(`/api/content/${sectionType}`);
      const data: ContentItem = await response.json();
      const fullContent = `${data.title}. ${data.content}`;
      setContent(fullContent);
      setStrippedContent(stripMarkdownLinks(fullContent));
      setIsScrambling(true);
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
    text: strippedContent,
    speed: 1,
    tick: 1,
    step: 3,
    scramble: 8,
    seed: 2,
    chance: 0.8,
    range: [65, 125],
    overdrive: false,
    onAnimationEnd: () => setIsScrambling(false),
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
            } group-hover:[text-shadow:0_0_4px_rgba(0,212,255,0.2),0_0_8px_rgba(0,212,255,0.1)]`}
          >
            ↻
          </span>
        </button>
      </div>
      <div className="relative">
        {/* Second box underneath - implies more content */}
        <div className="absolute inset-0 translate-x-2 translate-y-2 border border-muted/15 bg-accent/3"></div>

        {/* Main box */}
        <div
          className="relative border border-muted/20 p-4 bg-background transition-shadow duration-300 hover:shadow-[0_0_18px_3px_rgba(0,136,255,0.15)]"
          style={{
            animation: `breathe ${timing.breathe}s ease-in-out infinite, subtle-glow ${timing.glow}s ease-in-out infinite`,
            animationDelay: `${timing.delay}s, ${timing.delay * 0.8}s`,
          }}
        >
          {isScrambling ? (
            <div
              ref={ref}
              className="text-foreground leading-relaxed font-mono"
            />
          ) : (
            <div
              className="text-foreground leading-relaxed font-mono [&_a]:border-b [&_a]:border-accent"
              dangerouslySetInnerHTML={{ __html: markdownToHTML(content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
