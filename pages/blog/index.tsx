import Navbar from "@/components/Navbar";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Link from "next/link";
import path from "path";
import { useState } from "react";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

type BlogIndexProps = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts: BlogPost[] = filenames
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
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = posts.filter((post) =>
    selectedTags.length === 0
      ? true
      : post.tags?.some((tag) => selectedTags.includes(tag))
  );

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

          {allTags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Filter by tags:</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="border-b pb-8 last:border-b-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block hover:text-blue-600 transition-colors"
                >
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <time className="text-gray-600 mb-2 block">{post.date}</time>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {post.description && (
                    <p className="text-gray-600">{post.description}</p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
