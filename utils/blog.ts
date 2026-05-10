import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { BlogPostMetadata, BlogPostSummary } from "../types/blog";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts(): BlogPostSummary[] {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        description: data.description || "",
        excerpt: data.excerpt,
        tags: data.tags || [],
        category: data.category,
        series: data.series,
        featured: data.featured || false,
        timeToRead: data.timeToRead,
        image: data.image,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestPost(): BlogPostSummary | null {
  const posts = getAllPosts();
  return posts[0] || null;
}

export function getPostBySlug(slug: string): {
  content: string;
  metadata: BlogPostMetadata;
} {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const metadata: BlogPostMetadata = {
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    lastModified: data.lastModified || new Date().toISOString(),
    author: data.author || "Anonymous",
    language: data.language || "en",
    status: data.status || "published",

    description: data.description || "",
    excerpt: data.excerpt || data.description?.slice(0, 160) || "",
    keywords: data.keywords || [],
    canonicalUrl: data.canonicalUrl || `/blog/${slug}`,
    noindex: data.noindex || false,
    nofollow: data.nofollow || false,

    image: data.image,
    coverImage: data.coverImage,
    openGraphImage: data.openGraphImage || data.image || data.coverImage,

    category: data.category,
    tags: data.tags || [],
    series: data.series,
    featured: data.featured || false,
    timeToRead: data.timeToRead,

    tableOfContents: data.tableOfContents || false,
  };

  return { content, metadata };
}

export function getAllSlugs(): string[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(".md", ""));
}
