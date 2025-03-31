import Head from "next/head";

type SeoProps = {
  title?: string;
  description?: string;
  openGraphImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
};

const getAbsoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  return path.startsWith("http") ? path : `${baseUrl}${path}`;
};

export default function Seo({
  title,
  description,
  openGraphImage = "/profile.jpeg", // Default OG image
  canonicalUrl,
  noindex = false,
  nofollow = false,
}: SeoProps) {
  const siteTitle = "Daniel Fullerton";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = "Software Engineer and Woodworker";
  const finalDescription = description || defaultDescription;
  const absoluteOgImage = getAbsoluteUrl(openGraphImage);
  const absoluteCanonicalUrl = canonicalUrl
    ? getAbsoluteUrl(canonicalUrl)
    : undefined;

  console.log(absoluteOgImage);
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      {openGraphImage && (
        <>
          <meta property="og:image" content={absoluteOgImage} />
          <meta property="og:image:alt" content={fullTitle} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      <meta property="og:type" content="website" />

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
    </Head>
  );
}
