import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Seo from "../components/Seo";
import Skills from "../components/Skills";
import SocialLinks from "../components/SocialLinks";

export default function Home() {
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
            <SocialLinks />
          </div>
        </main>
      </div>
    </div>
  );
}
