import Link from "next/link";
import { BlogPostMetadata } from "../types/blog";
import { formatDate } from "../utils/formatDate";
import Navbar from "./Navbar";
import ReadingProgress from "./ReadingProgress";
import Seo from "./Seo";

type BlogLayoutProps = {
  children: React.ReactNode;
  metadata: BlogPostMetadata;
};

export default function BlogLayout({ children, metadata }: BlogLayoutProps) {
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
      <ReadingProgress />
      <Navbar />
      <article className="mx-auto max-w-2xl px-6 lg:px-8 pt-12 pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wide t-muted hover-accent transition-colors"
        >
          <span aria-hidden="true">←</span> Back to Blog
        </Link>

        <header className="mt-8 mb-10">
          {(metadata.category || metadata.series) && (
            <p className="kicker reveal d1">
              {metadata.category || metadata.series}
            </p>
          )}
          <h1
            className="font-display font-medium t-ink mt-4 reveal d2 leading-[1.02] tracking-[-0.015em]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            {metadata.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[0.72rem] tracking-wide t-faint reveal d3">
            <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{metadata.author}</span>
            {metadata.timeToRead && (
              <>
                <span aria-hidden="true">·</span>
                <span>{metadata.timeToRead}</span>
              </>
            )}
            {metadata.featured && (
              <>
                <span aria-hidden="true">·</span>
                <span className="t-accent uppercase">Featured</span>
              </>
            )}
          </div>

          {metadata.series && (
            <p className="mt-3 font-mono text-[0.72rem] t-faint">
              Series: <span className="t-muted">{metadata.series}</span>
            </p>
          )}

          {metadata.tags && metadata.tags.length > 0 && (
            <div className="techrun mt-3 text-[0.74rem] t-faint">
              {metadata.tags.map((tag) => (
                <span key={tag} className="tech">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {metadata.description && (
            <p className="mt-6 prose-body t-muted font-body">
              {metadata.description}
            </p>
          )}
        </header>

        {metadata.coverImage && (
          <div data-reveal className="mb-10 overflow-hidden rounded-lg border rule">
            <div
              className="aspect-[16/9] bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${metadata.coverImage})` }}
              role="img"
              aria-label={metadata.title}
            />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none font-body
            prose-headings:font-display prose-headings:font-medium prose-headings:tracking-[-0.01em]
            prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-code:font-mono prose-code:text-[0.9em]
            prose-img:rounded-lg"
        >
          {children}
        </div>
      </article>
    </>
  );
}
