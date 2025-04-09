import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  excerpt?: string;
  image?: string;
  timeToRead?: string;
};

export async function getLatestBlogPost(): Promise<BlogPost | null> {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        excerpt: data.excerpt,
        image: data.image,
        timeToRead: data.timeToRead,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts[0] || null;
}
