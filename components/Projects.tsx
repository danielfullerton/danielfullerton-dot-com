import Image from "next/image";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-16 lg:py-24 border-b rule scroll-mt-20">
      <div className="grid gap-8 lg:gap-16 md:grid-cols-[9rem_1fr] lg:grid-cols-[11rem_1fr]">
        <div data-reveal>
          <p className="kicker">Projects</p>
          <h2 className="section-title t-ink mt-3">Built end to end</h2>
          <span className="draw-rule mt-4 block h-px w-12 bg-[color:var(--accent)]" />
          <p className="mt-4 font-mono text-[0.75rem] leading-relaxed t-faint measure">
            Designed, built, deployed, and run by me.
          </p>
        </div>

        <div>
          <ol data-reveal-group>
            {projects.map((project, i) => (
              <li
                key={project.title}
                className={`entry stag py-8 first:pt-0 ${
                  i < projects.length - 1 ? "border-b rule" : ""
                }`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="work-row group flex items-baseline gap-4">
                  <span className="work-num font-mono text-[0.72rem] t-faint shrink-0 pt-1 origin-left">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.35rem] sm:text-[1.5rem] leading-tight font-medium t-ink transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-mono text-[0.72rem] tracking-wide uppercase t-accent">
                      {project.context}
                    </p>

                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 block overflow-hidden rounded-lg border rule card-hover"
                    >
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={1440}
                        height={900}
                        className="block h-auto w-full"
                      />
                    </a>

                    <p className="mt-5 font-body text-[1.02rem] leading-relaxed t-muted measure-wide">
                      {project.summary}
                    </p>
                    <div className="techrun mt-5 text-[0.78rem] t-faint">
                      {project.metrics.map((m) => (
                        <span key={m} className="tech">
                          {m}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 font-mono text-[0.7rem] leading-relaxed t-faint">
                      {project.stack.join(" · ")}
                    </p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[0.8rem] ul-link"
                    >
                      Visit {project.linkLabel}
                      <span className="arrow-nudge" aria-hidden="true">
                        ↗
                      </span>
                    </a>
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
