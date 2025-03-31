import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";
import BlogLayout from "../../components/BlogLayout";

type BlogPostProps = {
  content: string;
  metadata: {
    title: string;
    date: string;
    description: string;
    author: string;
    image?: string;
  };
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

  return {
    props: {
      content,
      metadata: {
        title: metadata.title || slug,
        date: metadata.date || new Date().toISOString(),
        description: metadata.description || "",
        author: metadata.author || "Anonymous",
        image: metadata.image,
      },
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
