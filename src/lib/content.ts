import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content/output");

export interface CaseStudyMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  thumbnail: string;
}

export interface CaseStudyCard extends CaseStudyMeta {
  preview: string;
}

export interface CaseStudy extends CaseStudyMeta {
  contentHtml: string;
}

export interface AdjacentStudies {
  prev: CaseStudyMeta | null;
  next: CaseStudyMeta | null;
}

function parseMeta(slug: string, data: Record<string, unknown>): CaseStudyMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    author: (data.author as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    thumbnail: (data.thumbnail as string) ?? "",
  };
}

function extractPreview(rawMarkdown: string, maxLength = 120): string {
  // Find the ## Problem section and extract its body text
  const problemMatch = rawMarkdown.match(/##\s*Problem\s*\n([\s\S]*?)(?=\n##\s|\n#\s|$)/i);
  const source = problemMatch ? problemMatch[1] : rawMarkdown;
  // Strip markdown formatting, collapse whitespace
  const plain = source
    .replace(/^#+\s.*$/gm, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  const fileNames = fs.readdirSync(contentDirectory).filter((f) => f.endsWith(".md"));

  const studies = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return parseMeta(slug, data);
  });

  return studies.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllCaseStudiesWithPreview(): CaseStudyCard[] {
  const fileNames = fs.readdirSync(contentDirectory).filter((f) => f.endsWith(".md"));

  const studies = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      ...parseMeta(slug, data),
      preview: extractPreview(content),
    };
  });

  return studies.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const fullPath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    ...parseMeta(slug, data),
    contentHtml,
  };
}

export function getAdjacentCaseStudies(slug: string): AdjacentStudies {
  const all = getAllCaseStudies();
  const index = all.findIndex((s) => s.slug === slug);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
