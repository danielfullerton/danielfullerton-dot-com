export type WorkEntry = {
  title: string;
  context: string;
  summary: string;
  metrics: string[];
};

// Selected work on the Commerce charge-lifecycle platform. Figures are real but
// deliberately generalized — no customer names, internal codenames, or IDs.
export const work: WorkEntry[] = [
  {
    title: "Near-real-time charge reconciliation",
    context: "Owner · Commerce billing platform",
    summary:
      "I own the reconciliation layer for a commerce platform that processes billions of billing events a month across nine processing units and multiple Azure regions. I built automated dropped-event detection and replay, and hardened the alignment and comparison logic that keeps open and closed orders in agreement.",
    metrics: [
      "~10k dropped events/mo → 0",
      "100% reconciliation accuracy",
      "billions of events / month",
    ],
  },
  {
    title: "Legacy pipeline shutdown & streaming cutover",
    context: "Tech lead · multi-quarter program",
    summary:
      "Led the cutover of hundreds of thousands of billing groups off a legacy consumption pipeline onto a new streaming-sourced path — standing up processing and reconciliation infrastructure across regions and running auditable, financially-tiered batch cutovers with disciplined rollback when discrepancies appeared.",
    metrics: [
      "100s of thousands of billing groups",
      "100% accuracy at close",
      "zero SLA breaches",
    ],
  },
  {
    title: "Livesite, reliability & cost",
    context: "On-call DRI · platform operations",
    summary:
      "As on-call DRI I owned 169 livesite incidents (8 Sev2) over six months with telemetry-driven root-cause analysis, while cutting recurring cloud spend, reducing CI build time, and shaving reconciliation runtime so month-close validation lands hours earlier for every partner team.",
    metrics: [
      "169 incidents owned",
      "~78% faster CI builds",
      "~$35K/yr cloud cost removed",
    ],
  },
  {
    title: "Security & compliance",
    context: "Owner · SFI / SecurePaaS / SOX",
    summary:
      "Brought ~95 cloud resources into network-security-perimeter compliance across public and sovereign clouds, delivered managed-identity auth uplifts across every production region, and took over ownership of four SOX controls — including a reusable, AI-assisted audit-evidence workflow.",
    metrics: [
      "95 resources → compliant",
      "4 SOX controls owned",
      "10 production regions",
    ],
  },
];
