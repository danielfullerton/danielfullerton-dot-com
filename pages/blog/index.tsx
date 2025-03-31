import Navbar from "@/components/Navbar";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Link from "next/link";
import path from "path";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

type BlogIndexProps = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
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
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        description: data.description || "",
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
          <div className="space-y-8">
            {posts.map((post) => (
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
