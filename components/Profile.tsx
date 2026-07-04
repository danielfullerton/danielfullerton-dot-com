import Image from "next/image";
import SocialLinks from "./SocialLinks";

// Low-res blur placeholder generated from public/profile.jpeg — avoids the
// gray-disc flash (§13.4) while the real headshot loads under images.unoptimized.
const HEADSHOT_BLUR =
  "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIxAAAgIBAwMFAAAAAAAAAAAAAQIDBBEABiEFMWESEzJBkf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAECAzH/2gAMAwEAAhEDEQA/AK9hpZ48CWVM8s6HDfuk7fs2GhlhnlklWNgEeT5EEZ51npdw01tpVhkLox9L2CuFB8A9xnHOkdN3JRqXmpWZD7atgWFGVJ+847DzopTTLNah8P/Z";

export default function Profile() {
  return (
    <section className="pt-16 sm:pt-24 lg:pt-28 pb-16 lg:pb-24 border-b rule">
      <p className="kicker reveal d1">
        Software Engineer &nbsp;—&nbsp; Microsoft · Commerce
      </p>

      <h1 className="masthead t-ink mt-5 reveal d2">
        Daniel
        <br /> Fullerton<span className="t-accent">.</span>
      </h1>

      <div className="mt-12 lg:mt-16 grid gap-12 lg:gap-16 lg:grid-cols-[1fr_15rem]">
        {/* bio column */}
        <div className="reveal d3">
          <div className="prose-body measure space-y-6 font-body">
            <p>
              Software engineer at{" "}
              <a
                href="https://www.linkedin.com/company/microsoft/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="ul-link t-ink font-medium"
              >
                Microsoft
              </a>{" "}
              specializing in data engineering and cloud architecture. On the
              Commerce team, I build scalable solutions for customer invoice
              aggregation using{" "}
              <span className="t-ink font-medium">Scala</span>,{" "}
              <span className="t-ink font-medium">Spark&nbsp;Streaming</span>,
              and <span className="t-ink font-medium">Azure</span> — pairing
              traditional software engineering with modern AI tooling for
              efficient, high-quality code.
            </p>
            <p className="t-muted">
              Previously I built retail operations apps at T-Mobile (Java Spring
              microservices, Angular) and talent-management platforms at Randstad
              (TypeScript, Node.js, Google Cloud). B.S. in Computer Science.
            </p>
          </div>

          {/* social row */}
          <div className="mt-9">
            <SocialLinks />
          </div>
        </div>

        {/* right rail: headshot + in-page index */}
        <aside className="reveal d4 lg:pt-1">
          <div className="flex lg:flex-col items-center lg:items-start gap-6">
            <div className="shrink-0">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-surface border rule-strong">
                <Image
                  src="/profile.jpeg"
                  alt="Daniel Fullerton"
                  width={128}
                  height={128}
                  priority
                  placeholder="blur"
                  blurDataURL={HEADSHOT_BLUR}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <nav className="w-full">
              <p className="kicker mb-3">Contents</p>
              <ul className="space-y-2 font-mono text-[0.82rem]">
                <li>
                  <a href="#skills" className="ul-link t-muted">
                    Stack
                  </a>
                </li>
                <li>
                  <a href="#writing" className="ul-link t-muted">
                    Writing
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </section>
  );
}
