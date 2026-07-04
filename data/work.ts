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
    context: "Multi-quarter program",
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
      "As the on-call directly-responsible engineer, I'm the person the pager wakes. I run calm, telemetry-driven root-cause analysis on production incidents, hold the line through the highest-stakes week of every month at close, and mentor teammates through their first on-call rotations. Alongside that I cut recurring cloud spend, reduced CI build time, and shaved reconciliation runtime so month-close validation lands hours earlier for every partner team.",
    metrics: [
      "telemetry-driven RCA",
      "~78% faster CI builds",
      "~$35K/yr cloud cost removed",
    ],
  },
  {
    title: "SOX ownership, security & compliance",
    context: "Owner · SOX / Security",
    summary:
      "I own four SOX controls end-to-end for the platform — compiling the annual audit-evidence packages, leading auditor and tester walkthroughs to minimal follow-ups, and authoring a reusable, AI-assisted evidence workflow that makes the process repeatable year over year. On the security side, I brought ~95 cloud resources into network-security-perimeter compliance across public and sovereign clouds and delivered managed-identity auth uplifts across every production region.",
    metrics: [
      "4 SOX controls owned",
      "95 resources → compliant",
      "10 production regions",
    ],
  },
];
