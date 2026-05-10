export type BlogPostMetadata = {
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

export type BlogPostSummary = {
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
  image?: string;
};
