import Navbar from "./Navbar";
import Seo from "./Seo";

type BlogMetadata = {
  title: string;
  date: string;
  description: string;
  author: string;
};

type BlogLayoutProps = {
  children: React.ReactNode;
  metadata: BlogMetadata;
};

export default function BlogLayout({ children, metadata }: BlogLayoutProps) {
  return (
    <>
      <Seo title={metadata.title} description={metadata.description} />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
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
