import Image from "next/image";
import Link from "next/link";
import { BlogPostSummary } from "../types/blog";

export default function RecentBlogPost({ post }: { post: BlogPostSummary }) {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Latest Blog Post
      </h3>
      <Link
        href={`/blog/${post.slug}`}
        className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors p-4 -m-4"
      >
        <article className="flex items-start space-x-4">
          {post.image && (
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {post.title}
            </h4>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <time>{post.date}</time>
              {post.timeToRead && (
                <>
                  <span className="mx-1">•</span>
                  <span>{post.timeToRead} read</span>
                </>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {post.excerpt || post.description}
            </p>
            <span className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center group">
              Read more
              <svg
                className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </article>
      </Link>
    </div>
  );
}
