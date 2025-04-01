import Head from "next/head";

type SeoProps = {
  title?: string;
  description?: string;
  excerpt?: string;
  keywords?: string[];
  openGraphImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  language?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  type?: "website" | "article";
};

const getAbsoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  return path.startsWith("http") ? path : `${baseUrl}${path}`;
};

export default function Seo({
  title,
  description,
  excerpt,
  keywords = [],
  openGraphImage = "/profile.jpeg",
  canonicalUrl,
  noindex = false,
  nofollow = false,
  language = "en",
  author = "Daniel Fullerton",
  datePublished,
  dateModified,
  type = "website",
}: SeoProps) {
  const siteTitle = "Daniel Fullerton";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = "Software Engineer and Woodworker";
  const finalDescription = description || defaultDescription;
  const absoluteOgImage = getAbsoluteUrl(openGraphImage);
  const absoluteCanonicalUrl = canonicalUrl
    ? getAbsoluteUrl(canonicalUrl)
    : undefined;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {excerpt && <meta name="excerpt" content={excerpt} />}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="language" content={language} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      {openGraphImage && (
        <>
          <meta property="og:image" content={absoluteOgImage} />
          <meta property="og:image:alt" content={fullTitle} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      {datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {openGraphImage && (
        <meta name="twitter:image" content={absoluteOgImage} />
      )}

      {/* Canonical URL */}
      {absoluteCanonicalUrl && (
        <link rel="canonical" href={absoluteCanonicalUrl} />
      )}

      {/* Robots */}
      {(noindex || nofollow) && (
        <meta
          name="robots"
          content={`${noindex ? "noindex" : "index"}, ${
            nofollow ? "nofollow" : "follow"
          }`}
        />
      )}

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "Article" : "WebPage",
          headline: title,
          description: finalDescription,
          image: absoluteOgImage,
          author: {
            "@type": "Person",
            name: author,
          },
          datePublished: datePublished,
          dateModified: dateModified || datePublished,
        })}
      </script>
    </Head>
  );
}
