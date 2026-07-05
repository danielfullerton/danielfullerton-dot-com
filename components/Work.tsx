import { work } from "../data/work";

export default function Work() {
  return (
    <section id="work" className="py-16 lg:py-24 border-b rule scroll-mt-20">
      <div className="grid gap-8 lg:gap-16 md:grid-cols-[9rem_1fr] lg:grid-cols-[11rem_1fr]">
        <div data-reveal>
          <p className="kicker">Work</p>
          <h2 className="section-title t-ink mt-3">Selected work</h2>
          <span className="draw-rule mt-4 block h-px w-12 bg-[color:var(--accent)]" />
          <p className="mt-4 font-mono text-[0.75rem] leading-relaxed t-faint measure">
            Figures generalized - no customer names or internal identifiers.
          </p>
        </div>

        <div>
          <ol data-reveal-group>
            {work.map((entry, i) => (
              <li
                key={entry.title}
                className={`entry stag py-8 first:pt-0 ${
                  i < work.length - 1 ? "border-b rule" : ""
                }`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="work-row group flex items-baseline gap-4">
                  <span className="work-num font-mono text-[0.72rem] t-faint shrink-0 pt-1 origin-left">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.35rem] sm:text-[1.5rem] leading-tight font-medium t-ink transition-colors group-hover:text-accent">
                      {entry.title}
                    </h3>
                    <p className="mt-1 font-mono text-[0.72rem] tracking-wide uppercase t-accent">
                      {entry.context}
                    </p>
                    <p className="mt-4 font-body text-[1.02rem] leading-relaxed t-muted measure-wide">
                      {entry.summary}
                    </p>
                    <div className="techrun mt-5 text-[0.78rem] t-faint">
                      {entry.metrics.map((m) => (
                        <span key={m} className="tech">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
