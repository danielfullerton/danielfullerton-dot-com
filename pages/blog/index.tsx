import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import { BlogPostSummary } from "@/types/blog";
import { getAllPosts } from "@/utils/blog";
import { formatDate } from "@/utils/formatDate";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BlogIndexProps = {
  posts: BlogPostSummary[];
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const posts = getAllPosts();

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
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const tagsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tagsDropdownRef.current &&
        !tagsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTagsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <>
      <Seo
        title="Blog"
        description="Essays and how-tos on software engineering, AI tooling, and prompt engineering by Daniel Fullerton."
      />
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* header */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-10 border-b rule">
          <p className="kicker reveal d1">Writing</p>
          <h1
            className="font-display font-medium t-ink mt-4 reveal d2 leading-[0.95] tracking-[-0.018em]"
            style={{ fontSize: "clamp(2.6rem, 7vw, 4.5rem)" }}
          >
            Blog<span className="t-accent">.</span>
          </h1>
          <p className="mt-5 prose-body measure t-muted font-body reveal d3">
            Notes on software engineering, cloud data pipelines, and getting
            real work out of AI tools.
          </p>
        </section>

        {/* filters */}
        <section className="py-8 border-b rule" data-reveal>
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            {/* Series */}
            {allSeries.length > 0 && (
              <div>
                <label className="kicker block mb-2">Filter by series</label>
                <div className="relative">
                  <select
                    value={selectedSeries || ""}
                    onChange={(e) =>
                      handleSeriesChange(e.target.value || null)
                    }
                    className="appearance-none w-64 pl-3 pr-9 py-2 font-mono text-[0.82rem] t-ink bg-surface border rule rounded-md focus:outline-none focus:border-[color:var(--accent)] transition-colors"
                  >
                    <option value="">All series</option>
                    {allSeries.map((series) => (
                      <option key={series} value={series}>
                        {series}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 t-faint"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            )}

            {/* Featured toggle */}
            <div>
              <label className="kicker block mb-2">Featured</label>
              <button
                onClick={handleFeaturedToggle}
                aria-pressed={showFeaturedOnly}
                className={`px-4 py-2 rounded-md font-mono text-[0.82rem] border transition-colors ${
                  showFeaturedOnly
                    ? "bg-[color:var(--accent)] text-white border-[color:var(--accent)]"
                    : "bg-surface t-muted rule hover-ink"
                }`}
              >
                {showFeaturedOnly ? "Featured only" : "All posts"}
              </button>
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
              <div>
                <label className="kicker block mb-2">Filter by tags</label>
                <div className="relative" ref={tagsDropdownRef}>
                  <button
                    onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                    className="flex items-center justify-between w-64 pl-3 pr-3 py-2 font-mono text-[0.82rem] t-ink bg-surface border rule rounded-md hover:border-[color:var(--rule-strong)] transition-colors text-left"
                  >
                    <span className={selectedTags.length ? "t-ink" : "t-faint"}>
                      {selectedTags.length === 0
                        ? "Select tags"
                        : `${selectedTags.length} tag${
                            selectedTags.length === 1 ? "" : "s"
                          } selected`}
                    </span>
                    <svg
                      className="w-4 h-4 t-faint shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {isTagsDropdownOpen && (
                    <div className="absolute z-20 mt-2 w-64 bg-surface border rule rounded-md shadow-lg">
                      <div className="p-2 max-h-60 overflow-auto">
                        {allTags.map((tag) => (
                          <label
                            key={tag}
                            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[color:var(--accent-soft)] cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedTags.includes(tag)}
                              onChange={() => handleTagClick(tag)}
                              className="h-4 w-4 accent-[color:var(--accent)]"
                            />
                            <span className="font-mono text-[0.8rem] t-muted">
                              {tag}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* post list */}
        <section className="py-4">
          {filteredPosts.length === 0 ? (
            <p className="py-16 font-mono text-[0.85rem] t-faint">
              No posts match these filters.
            </p>
          ) : (
            <ol data-reveal-group>
              {filteredPosts.map((post, i) => (
                <li
                  key={post.slug}
                  className="stag"
                  style={{ "--i": Math.min(i, 8) } as React.CSSProperties}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="entry group block py-8 border-b rule"
                  >
                    <span className="tick font-mono">→</span>
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[0.72rem] tracking-wide t-faint">
                      <span>{formatDate(post.date)}</span>
                      {post.timeToRead && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{post.timeToRead}</span>
                        </>
                      )}
                      {post.category && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{post.category}</span>
                        </>
                      )}
                      {post.featured && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="t-accent uppercase">Featured</span>
                        </>
                      )}
                    </div>
                    <h2 className="mt-3 font-display text-[1.5rem] sm:text-[1.7rem] leading-snug font-medium t-ink group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    {(post.excerpt || post.description) && (
                      <p className="mt-3 font-body text-[1.05rem] leading-relaxed t-muted measure-wide">
                        {post.excerpt || post.description}
                      </p>
                    )}
                    {post.series && (
                      <p className="mt-3 font-mono text-[0.72rem] t-faint">
                        Series:{" "}
                        <span className="t-muted">{post.series}</span>
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="techrun mt-3 text-[0.74rem] t-faint">
                        {post.tags.map((tag) => (
                          <span key={tag} className="tech">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
    </>
  );
}
