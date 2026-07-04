import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 nav-bg backdrop-blur-sm border-b rule">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display text-xl font-medium t-ink tracking-tight"
          >
            Daniel&nbsp;Fullerton<span className="t-accent">.</span>
          </Link>
          <nav className="flex items-center gap-5 sm:gap-7">
            <Link
              href="/"
              className="font-mono text-[0.8rem] tracking-wide ul-link"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="font-mono text-[0.8rem] tracking-wide ul-link"
            >
              Blog
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
