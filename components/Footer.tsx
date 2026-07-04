import Link from "next/link";

const socials = [
  {
    href: "https://github.com/danielfullerton",
    label: "GitHub",
    path: (
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.21.09 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    ),
    fill: true,
  },
  {
    href: "https://www.linkedin.com/in/daniel-frank-fullerton",
    label: "LinkedIn",
    path: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    ),
    fill: true,
  },
  {
    href: "mailto:dan.frank.fullerton@gmail.com",
    label: "Email",
    path: (
      <>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m3 6 9 6 9-6" />
      </>
    ),
    fill: false,
  },
];

export default function Footer() {
  return (
    <footer className="border-t rule">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-12">
        <div className="grid gap-8 md:grid-cols-[11rem_1fr] items-start">
          <Link
            href="/"
            className="font-display text-xl font-medium t-ink tracking-tight"
          >
            Daniel&nbsp;Fullerton<span className="t-accent">.</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="font-mono text-[0.75rem] t-faint leading-relaxed">
              Set in Fraunces &amp; Newsreader.
              <br />
              Built with intention — no template.
            </p>
            <div className="flex items-center gap-5">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    s.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="t-muted hover-accent transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill={s.fill ? "currentColor" : "none"}
                    stroke={s.fill ? undefined : "currentColor"}
                    strokeWidth={s.fill ? undefined : 1.7}
                    aria-hidden="true"
                  >
                    {s.path}
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 font-mono text-[0.72rem] t-faint">
          © {new Date().getFullYear()} Daniel Fullerton. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
