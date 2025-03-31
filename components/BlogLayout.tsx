import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Seo from "./Seo";

type BlogMetadata = {
  title: string;
  date: string;
  description: string;
  author: string;
  image?: string;
  coverImage?: string;
};

type BlogLayoutProps = {
  children: React.ReactNode;
  metadata: BlogMetadata;
};

export default function BlogLayout({ children, metadata }: BlogLayoutProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translate3d(0, ${
          scrolled * 0.5
        }px, 0) scale(1.4) translateY(-10%)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Seo
        title={metadata.title}
        description={metadata.description}
        openGraphImage={metadata.image}
      />
      <Navbar />
      {metadata.coverImage && (
        <div className="relative h-[50vh] w-full overflow-hidden">
          <div
            ref={parallaxRef}
            className="absolute inset-0 bg-center bg-cover bg-no-repeat scale-[1.4] -translate-y-[10%]"
            style={{
              backgroundImage: `url(${metadata.coverImage})`,
              willChange: "transform",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <article className="max-w-2xl mx-auto px-4 py-8 relative">
        <header
          className={`mb-8 ${
            metadata.coverImage
              ? "-mt-32 bg-white p-8 rounded-lg shadow-lg"
              : ""
          }`}
        >
          <h1 className="text-4xl font-bold mb-2">{metadata.title}</h1>
          <div className="text-gray-600 mb-2">
            <time>{metadata.date}</time> • {metadata.author}
          </div>
          <p className="text-xl text-gray-600">{metadata.description}</p>
        </header>
        <div className="prose lg:prose-xl">{children}</div>
      </article>
    </>
  );
}
