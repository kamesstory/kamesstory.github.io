import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentItem = {
  title: string;
  content: string;
  slug: string;
};

export type SectionType = "projects" | "specialities" | "thoughts";

export function getContentBySection(section: SectionType): ContentItem[] {
  const contentDirectory = path.join(process.cwd(), "content", section);

  // Check if directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(contentDirectory);

  const items = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        title: data.title || filename.replace(".md", ""),
        content: content.trim(),
        slug: filename.replace(".md", ""),
      };
    });

  return items;
}

// Fisher-Yates shuffle with deterministic seed
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentSeed = seed;

  // Simple seeded random number generator
  const seededRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Store shuffled decks and current positions per section
const deckState: Record<
  string,
  { deck: ContentItem[]; index: number; seed: number }
> = {};

export function getRandomContent(section: SectionType): ContentItem | null {
  const items = getContentBySection(section);

  if (items.length === 0) {
    return null;
  }

  // Initialize or reshuffle if needed
  if (
    !deckState[section] ||
    deckState[section].index >= deckState[section].deck.length
  ) {
    const seed = Date.now();
    deckState[section] = {
      deck: shuffleArray(items, seed),
      index: 0,
      seed: seed,
    };
  }

  const content = deckState[section].deck[deckState[section].index];
  deckState[section].index++;

  return content;
}
