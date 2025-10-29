import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentItem = {
  title: string;
  content: string;
  slug: string;
};

export type SectionType = "projects" | "activities" | "thoughts";

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

export function getRandomContent(section: SectionType): ContentItem | null {
  const items = getContentBySection(section);

  if (items.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
