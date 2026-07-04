import { technologies } from "../data/technologies";

type Tier = {
  label: string;
  items: string[];
  labelColor: string;
  runColor: string;
  runSize: string;
};

const tiers: Tier[] = [
  {
    label: "Daily",
    items: technologies.currentFocus,
    labelColor: "t-accent",
    runColor: "t-ink",
    runSize: "text-[1.05rem]",
  },
  {
    label: "Shipped to production",
    items: technologies.productionExperience,
    labelColor: "t-muted",
    runColor: "t-muted",
    runSize: "text-[0.95rem]",
  },
  {
    label: "Hands-on",
    items: technologies.familiarWith,
    labelColor: "t-faint",
    runColor: "t-faint",
    runSize: "text-[0.86rem]",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 lg:py-24 border-b rule scroll-mt-20"
    >
      <div className="grid gap-8 lg:gap-16 md:grid-cols-[9rem_1fr] lg:grid-cols-[11rem_1fr]">
        <div>
          <p className="kicker">Stack</p>
          <h2 className="section-title t-ink mt-3">
            What I<br className="hidden md:block" /> work with
          </h2>
        </div>

        <div className="space-y-12">
          {tiers.map((tier, i) => (
            <div key={tier.label}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`font-mono text-[0.72rem] tracking-widest uppercase ${tier.labelColor}`}
                >
                  {tier.label}
                </span>
                <span className="h-px flex-1 border-t rule" />
                <span className="font-mono text-[0.72rem] t-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div
                className={`techrun leading-relaxed ${tier.runSize} ${tier.runColor}`}
              >
                {tier.items.map((tech) => (
                  <span key={tech} className="tech">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
