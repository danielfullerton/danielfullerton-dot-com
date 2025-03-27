import Head from "next/head";

type SeoProps = {
  title?: string;
  description?: string;
  openGraphImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
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

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      {openGraphImage && (
        <>
          <meta property="og:image" content={openGraphImage} />
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
      {openGraphImage && <meta name="twitter:image" content={openGraphImage} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

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
