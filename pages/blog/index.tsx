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
  excerpt?: string;
  tags?: string[];
  category?: string;
  series?: string;
  featured?: boolean;
  timeToRead?: string;
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
        excerpt: data.excerpt,
        tags: data.tags || [],
        category: data.category,
        series: data.series,
        featured: data.featured || false,
        timeToRead: data.timeToRead,
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
  const allSeries = Array.from(
    new Set(
      posts
        .map((post) => post.series)
        .filter((series): series is string => typeof series === "string")
    )
  ).sort();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesTags =
      selectedTags.length === 0
        ? true
        : post.tags?.some((tag) => selectedTags.includes(tag));

    const matchesSeries =
      selectedSeries === null ? true : post.series === selectedSeries;

    const matchesFeatured = !showFeaturedOnly || post.featured;

    return matchesTags && matchesSeries && matchesFeatured;
  });

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSeriesChange = (series: string | null) => {
    setSelectedSeries(series === selectedSeries ? null : series);
  };

  const handleFeaturedToggle = () => {
    setShowFeaturedOnly((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

          <div className="space-y-6 mb-8">
            {/* Series and Featured Filters */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {/* Series Filter */}
              {allSeries.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Series
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allSeries.map((series) => (
                      <button
                        key={series}
                        onClick={() => handleSeriesChange(series)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedSeries === series
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {series}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Posts
                </label>
                <button
                  onClick={handleFeaturedToggle}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    showFeaturedOnly
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {showFeaturedOnly ? "Show Featured Only" : "Show All Posts"}
                </button>
              </div>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Tags
                </label>
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
          </div>

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
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    {post.featured && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm ml-2">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <time>{post.date}</time>
                    {post.timeToRead && (
                      <>
                        <span>•</span>
                        <span>{post.timeToRead} read</span>
                      </>
                    )}
                    {post.category && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600">{post.category}</span>
                      </>
                    )}
                  </div>
                  {post.series && (
                    <div className="text-sm text-gray-600 mb-2">
                      Series:{" "}
                      <span className="text-blue-600">{post.series}</span>
                    </div>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm inline-flex items-center leading-snug min-h-[1.75rem]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {post.excerpt ? (
                    <p className="text-gray-600">{post.excerpt}</p>
                  ) : (
                    post.description && (
                      <p className="text-gray-600">{post.description}</p>
                    )
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
