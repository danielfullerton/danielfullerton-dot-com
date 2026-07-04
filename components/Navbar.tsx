import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (y < 80) setHidden(false);
      else if (y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`nav-shell sticky top-0 z-40 nav-bg backdrop-blur-sm border-b rule ${
        hidden ? "nav-hidden" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display text-xl font-medium t-ink tracking-tight"
          >
            Daniel&nbsp;Fullerton<span className="t-accent logo-dot">.</span>
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
