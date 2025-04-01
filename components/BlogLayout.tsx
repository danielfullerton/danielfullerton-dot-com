import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Seo from "./Seo";

type BlogMetadata = {
  // Core Metadata
  title: string;
  date: string;
  lastModified?: string;
  author: string;
  language?: string;
  status?: "draft" | "published";

  // SEO & Social
  description: string;
  excerpt?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;

  // Visual Assets
  image?: string;
  coverImage?: string;
  openGraphImage?: string;

  // Content Organization
  category?: string;
  tags?: string[];
  series?: string;
  featured?: boolean;
  timeToRead?: string;

  // Enhanced Navigation
  tableOfContents?: boolean;
};

type BlogLayoutProps = {
  children: React.ReactNode;
  metadata: BlogMetadata;
};

export default function BlogLayout({ children, metadata }: BlogLayoutProps) {
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
              ? "-mt-32 bg-white p-8 rounded-lg shadow-lg"
              : ""
          }`}
        >
          <h1 className="text-4xl font-bold mb-2">{metadata.title}</h1>
          <div className="text-gray-600 mb-2 flex items-center gap-2 flex-wrap">
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
                <span className="text-blue-600">{metadata.category}</span>
              </>
            )}
          </div>
          {metadata.series && (
            <div className="text-gray-600 mb-2">
              Series: <span className="text-blue-600">{metadata.series}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-3">
            {metadata.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
            {metadata.featured && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm">
                Featured
              </span>
            )}
          </div>
          <p className="text-xl text-gray-600">{metadata.description}</p>
          {metadata.excerpt && (
            <p className="text-gray-500 mt-2">{metadata.excerpt}</p>
          )}
        </header>
        <div className="prose lg:prose-xl">{children}</div>
      </article>
    </>
  );
}
