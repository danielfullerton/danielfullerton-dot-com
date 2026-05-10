import { GetStaticPaths, GetStaticProps } from "next";
import { rehype } from "rehype";
import rehypeMermaid from "rehype-mermaid";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";
import BlogLayout from "../../components/BlogLayout";
import { BlogPostMetadata } from "../../types/blog";
import { getAllSlugs, getPostBySlug } from "../../utils/blog";

type BlogPostProps = {
  content: string;
  metadata: BlogPostMetadata;
};

async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .use(rehypeMermaid)
    .process(markdown);

  return (
    await rehype().use(rehypeMermaid, {}).process(result.toString())
  ).toString();
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const { content: markdownContent, metadata } = getPostBySlug(slug);
  const content = await markdownToHtml(markdownContent);

  return {
    props: {
      content,
      metadata,
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
