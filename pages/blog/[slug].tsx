import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";
import BlogLayout from "../../components/BlogLayout";

type BlogPostMetadata = {
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

type BlogPostProps = {
  content: string;
  metadata: BlogPostMetadata;
};

async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return result.toString();
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const slug = params?.slug;
  const fullPath = path.join(process.cwd(), "posts", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data: metadata, content: markdownContent } = matter(fileContents);
  const content = await markdownToHtml(markdownContent);

  const defaultMetadata: BlogPostMetadata = {
    // Core Metadata
    title: metadata.title || slug,
    date: metadata.date || new Date().toISOString(),
    lastModified: metadata.lastModified || new Date().toISOString(),
    author: metadata.author || "Anonymous",
    language: metadata.language || "en",
    status: metadata.status || "published",

    // SEO & Social
    description: metadata.description || "",
    excerpt: metadata.excerpt || metadata.description?.slice(0, 160) || "",
    keywords: metadata.keywords || [],
    canonicalUrl: metadata.canonicalUrl || `/blog/${slug}`,
    noindex: metadata.noindex || false,
    nofollow: metadata.nofollow || false,

    // Visual Assets
    image: metadata.image,
    coverImage: metadata.coverImage,
    openGraphImage:
      metadata.openGraphImage || metadata.image || metadata.coverImage,

    // Content Organization
    category: metadata.category,
    tags: metadata.tags || [],
    series: metadata.series,
    featured: metadata.featured || false,
    timeToRead: metadata.timeToRead,

    // Enhanced Navigation
    tableOfContents: metadata.tableOfContents || false,
  };

  return {
    props: {
      content,
      metadata: defaultMetadata,
    },
  };
};

export default function BlogPost({ content, metadata }: BlogPostProps) {
  return (
    <BlogLayout metadata={metadata}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </BlogLayout>
  );
}
