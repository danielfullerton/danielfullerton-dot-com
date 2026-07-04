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
      <p className="kicker reveal d1 mt-2 t-muted">Atlanta, GA</p>

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
              on the Commerce team. I own the near-real-time reconciliation and
              billing infrastructure behind a mission-critical, SOX-regulated
              commerce platform that processes{" "}
              <span className="t-ink font-medium">
                billions of billing events
              </span>{" "}
              a month and has to close each month at 100% accuracy. Day to day
              that means <span className="t-ink font-medium">Scala</span> and{" "}
              <span className="t-ink font-medium">Spark</span> on{" "}
              <span className="t-ink font-medium">Azure</span>, reconciliation
              pipelines, livesite on-call, and the security and cost work that
              keeps a financial system trustworthy.
            </p>
            <p className="t-muted">
              Before Commerce I spent two years in big-data platform
              engineering — GraphQL data APIs, data governance and lineage, and
              Spark-based data-quality libraries. Earlier I built retail
              operations apps at T-Mobile (Java/Spring, Angular) and
              talent-management platforms at Randstad (TypeScript, Node.js,
              Google Cloud). B.S. in Computer Science. I lean heavily on modern
              AI tooling to move fast without giving up rigor.
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
                  <a href="#work" className="ul-link t-muted">
                    Work
                  </a>
                </li>
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
