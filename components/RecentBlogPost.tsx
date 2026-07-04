import Link from "next/link";
import { BlogPostSummary } from "../types/blog";
import { formatDate } from "../utils/formatDate";

export default function Writing({ posts }: { posts: BlogPostSummary[] }) {
  const [latest, ...rest] = posts;
  const recent = rest.slice(0, 4);

  return (
    <section id="writing" className="py-16 lg:py-24 scroll-mt-20">
      <div className="grid gap-8 lg:gap-16 md:grid-cols-[9rem_1fr] lg:grid-cols-[11rem_1fr]">
        <div data-reveal>
          <p className="kicker">Writing</p>
          <h2 className="section-title t-ink mt-3">Latest &amp; recent</h2>
          <span className="draw-rule mt-4 block h-px w-12 bg-[color:var(--accent)]" />
          <Link
            href="/blog"
            className="group mt-4 inline-block font-mono text-[0.8rem] ul-link t-muted"
          >
            All posts <span className="arrow-nudge">→</span>
          </Link>
        </div>

        <div>
          {/* featured latest */}
          {latest && (
            <Link
              href={`/blog/${latest.slug}`}
              data-reveal
              className="entry group block bg-surface border rule rounded-lg p-7 lg:p-9 card-hover"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-[0.72rem] tracking-wide t-faint">
                <span className="t-accent uppercase">Latest</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(latest.date)}</span>
                {latest.timeToRead && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{latest.timeToRead}</span>
                  </>
                )}
                {latest.category && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{latest.category}</span>
                  </>
                )}
              </div>
              <h3 className="mt-4 font-display text-[1.7rem] sm:text-[2rem] leading-tight font-medium t-ink">
                {latest.title}
              </h3>
              <p className="mt-4 font-body text-[1.05rem] leading-relaxed t-muted measure-wide">
                {latest.excerpt || latest.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.8rem] t-accent">
                Read{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          )}

          {/* recent listing */}
          {recent.length > 0 && (
            <ul className="mt-2" data-reveal-group>
              {recent.map((post, i) => (
                <li key={post.slug} className="stag" style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`entry group py-6 flex items-baseline justify-between gap-5 ${
                      i < recent.length - 1 ? "border-b rule" : ""
                    }`}
                  >
                    <span className="tick font-mono">→</span>
                    <span className="font-display text-[1.18rem] leading-snug t-ink">
                      {post.title}
                    </span>
                    <span className="font-mono text-[0.72rem] t-faint shrink-0 whitespace-nowrap">
                      {formatDate(post.date)}
                      {post.timeToRead ? ` · ${post.timeToRead}` : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
