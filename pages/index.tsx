import { GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import RecentBlogPost from "../components/RecentBlogPost";
import Seo from "../components/Seo";
import Skills from "../components/Skills";
import SocialLinks from "../components/SocialLinks";
import { BlogPostSummary } from "../types/blog";
import { getLatestPost } from "../utils/blog";

type HomeProps = {
  latestPost: BlogPostSummary | null;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const latestPost = getLatestPost();
  return {
    props: {
      latestPost,
    },
  };
};

export default function Home({ latestPost }: HomeProps) {
  return (
    <div className="min-h-screen parallax-gradient">
      <div className="parallax-content">
        <Seo
          title="Software Engineer"
          description="Software Engineer specializing in data engineering and cloud architecture. Currently working at Microsoft on scalable solutions using Scala, Spark Streaming, and Azure technologies."
          openGraphImage="/profile.jpeg"
        />
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <Profile />
            <Skills />
            {latestPost && <RecentBlogPost post={latestPost} />}
            <SocialLinks />
          </div>
        </main>
      </div>
    </div>
  );
}
