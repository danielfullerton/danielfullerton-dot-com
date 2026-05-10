import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { BlogPostMetadata } from "../types/blog";
import Navbar from "./Navbar";
import Seo from "./Seo";

type BlogLayoutProps = {
  children: React.ReactNode;
  metadata: BlogPostMetadata;
};

export default function BlogLayout({ children, metadata }: BlogLayoutProps) {
  const router = useRouter();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translate3d(0, ${
          scrolled * 0.5
        }px, 0) scale(1.4) translateY(-10%)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Seo
        title={metadata.title}
        description={metadata.description}
        excerpt={metadata.excerpt}
        keywords={metadata.keywords}
        openGraphImage={metadata.openGraphImage || metadata.image}
        canonicalUrl={metadata.canonicalUrl}
        noindex={metadata.noindex}
        nofollow={metadata.nofollow}
        language={metadata.language}
        author={metadata.author}
        datePublished={metadata.date}
        dateModified={metadata.lastModified}
        type="article"
      />
      <Navbar />
      {metadata.coverImage && (
        <div className="relative h-[50vh] w-full overflow-hidden">
          <div
            ref={parallaxRef}
            className="absolute inset-0 bg-center bg-cover bg-no-repeat scale-[1.4] -translate-y-[10%]"
            style={{
              backgroundImage: `url(${metadata.coverImage})`,
              willChange: "transform",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <article className="max-w-2xl mx-auto px-4 py-8 relative">
        <header
          className={`mb-8 ${
            metadata.coverImage
              ? "-mt-32 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
              : ""
          }`}
        >
          <button
            onClick={() => router.push("/blog")}
            className="mb-4 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </button>
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            {metadata.title}
          </h1>
          <div className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2 flex-wrap">
            <time>{metadata.date}</time>
            <span>•</span>
            <span>{metadata.author}</span>
            {metadata.timeToRead && (
              <>
                <span>•</span>
                <span>{metadata.timeToRead} to read</span>
              </>
            )}
            {metadata.category && (
              <>
                <span>•</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {metadata.category}
                </span>
              </>
            )}
          </div>
          {metadata.series && (
            <div className="text-gray-600 dark:text-gray-400 mb-2">
              Series:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {metadata.series}
              </span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-3">
            {metadata.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
            {metadata.featured && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                Featured
              </span>
            )}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {metadata.description}
          </p>
        </header>
        <div className="prose lg:prose-xl dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400">
          {children}
        </div>
      </article>
    </>
  );
}
