import { GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Seo from "../components/Seo";
import Skills from "../components/Skills";
import Work from "../components/Work";
import Writing from "../components/RecentBlogPost";
import { BlogPostSummary } from "../types/blog";
import { getAllPosts } from "../utils/blog";

type HomeProps = {
  posts: BlogPostSummary[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Seo
        title="Software Engineer"
        description="Daniel Fullerton is a software engineer at Microsoft Commerce, where he owns the near-real-time reconciliation and billing infrastructure behind a SOX-regulated platform that processes billions of billing events a month using Scala, Spark, and Azure."
        openGraphImage="/profile.jpeg"
      />
      <Navbar />
      <main id="top" className="mx-auto max-w-6xl px-6 lg:px-10">
        <Profile />
        <Work />
        <Skills />
        {posts.length > 0 && <Writing posts={posts} />}
      </main>
    </>
  );
}
