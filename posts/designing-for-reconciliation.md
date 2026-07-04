---
# Core Metadata
title: "Designing for Reconciliation: Building Data Pipelines That Have to Be Right"
date: "2026-06-27"
lastModified: "2026-06-27"
author: "Daniel Fullerton"
language: "en"
status: "published"

# SEO & Social
description: "In billing and other financial systems, 'mostly correct' is a failing grade. Here's how I design data pipelines around reconciliation as a first-class concern — idempotent replay, dropped-event detection, and comparison at scale — so the numbers always add up by month close."
excerpt: "In financial systems, 'mostly correct' is a failing grade. How I design data pipelines around reconciliation — idempotent replay, dropped-event detection, and comparison at scale — so the numbers add up every time."
keywords:
  [
    "data engineering",
    "reconciliation",
    "billing systems",
    "distributed systems",
    "Apache Spark",
    "idempotency",
    "data quality",
    "streaming pipelines",
    "exactly-once",
    "financial systems",
    "reliability",
  ]
canonicalUrl: "/blog/designing-for-reconciliation"
noindex: false
nofollow: false

# Visual Assets
image: "/recon_cover.png"
coverImage: "/recon_cover.png"
openGraphImage: "/recon_cover.png"

# Content Organization
category: "Software Engineering"
tags: ["data-engineering", "reliability", "distributed-systems", "spark"]
series: "Engineering Notes"
featured: true
timeToRead: "9 minutes"

# Enhanced Navigation
tableOfContents: true
---

## When "mostly correct" is a failing grade

Most software gets to be approximately right. A recommendation feed that's 98% relevant is a great feed. A search index that's a few minutes stale is fine. But some systems don't grade on a curve — and billing is the clearest example. If a pipeline that turns raw usage into customer charges is 99.9% accurate over billions of events a month, that last 0.1% is still real money attached to real invoices, and someone has to answer for every cent of it by the time the books close.

I've spent the last couple of years building and operating exactly this kind of system: a near-real-time platform that ingests a firehose of billing events, enriches and rates them, and has to agree with itself — to the penny — by month close. The single most important design idea I've taken away is this: **reconciliation is not a report you run at the end. It's a property you engineer into the system from the start.**

This post is about what that actually means in practice.

## Reconciliation as a first-class citizen

The naive mental model of a data pipeline is a straight line: events come in one side, transformed data comes out the other, and you trust the transformation. The problem is that every stage in that line can silently drop, duplicate, or reorder data, and a straight line gives you no way to notice.

The fix is to stop thinking of the pipeline as a line and start thinking of it as a **loop that closes on itself**. For every output the pipeline produces, there should be an independent path that answers the question: *does this output still agree with the input it came from?* When the answer is "no," that disagreement is the single most valuable signal your system emits — it's a bug caught before it becomes a customer-facing error.

![The reconciliation loop: ingest, transform, and an independent check that compares output back to source and surfaces any drift.](/recon_loop.svg)

Concretely, that means treating three things as real, first-class components — not afterthoughts:

- **A source of truth you can re-derive from.** Keep the raw, pre-transformation events immutable and queryable. If you can't go back to what actually arrived, you can't prove anything.
- **A reconciliation job that compares independently.** It should re-compute expectations from the source and diff them against what the pipeline produced — using different code from the pipeline itself, so a bug can't hide in both.
- **A discrepancy as a unit of work.** Every mismatch gets a magnitude (how much money?), a category (what kind of mismatch?), and an owner. "Recon is off by some amount" is an anxiety; "142 orders are off because of a known service-date skew" is a task.

## Idempotency is the whole ballgame

The instant you accept that stages fail and get retried, you're forced into a hard rule: **every operation has to be safe to run more than once.** In a system that has to be exactly right, at-least-once delivery plus idempotent processing is how you manufacture effectively-once semantics. There is no reliable "exactly-once" fairy; there's just idempotency doing the work.

In practice this looks like:

- **Deterministic keys.** Every event carries a stable identity — some combination of business keys — that uniquely identifies it regardless of how many times it's delivered. Downstream writes are keyed on that identity so a replay overwrites rather than duplicates.
- **Upserts, not appends.** Writing "the current truth for key K" is replay-safe. Appending "another row for key K" is a landmine that turns a harmless retry into a double charge.
- **Merge-on-write with source tracking.** When two versions of the same fact arrive, the pipeline needs a deterministic rule for which one wins — usually the freshest source timestamp — so the outcome doesn't depend on race conditions.

Once every stage is idempotent, replay stops being scary. And replay being safe is what unlocks the next piece.

## Detect, then replay

Dropped events are the quiet killer of billing pipelines. A message expires in a queue, a downstream service is briefly unavailable, a partition is skewed and a batch times out — and a sliver of data just never makes it to the output. Nothing crashes. No alert fires. The number is simply a little too low, and you find out weeks later when reconciliation won't close.

The durable fix is a **detect-and-replay loop** built directly on the reconciliation signal:

1. **Detect.** The reconciliation job already knows the source and the output disagree. Extend it to enumerate *exactly which keys* are missing or wrong, not just the aggregate delta.
2. **Quantify.** Attach financial impact and a root-cause category to each gap. This is what lets you triage — 5 low-value gaps and 5,000 high-value ones deserve very different responses.
3. **Replay.** Because processing is idempotent, you can safely re-inject the missing keys through the normal path and let the pipeline reprocess them. No manual data surgery, no bespoke fix-up scripts.

Building this loop was one of the highest-leverage things I've done. It took a recurring, hours-long manual investigation — *"why are we short again this month?"* — and turned it into an automated system that detects the gap, replays it, and restores the output to full accuracy on its own. The class of incident didn't get smaller; it disappeared.

The key insight is that **detection and remediation share the same substrate.** The comparison that tells you something's wrong is the exact same comparison that tells you which records to replay. Build one, get the other nearly for free.

## Alignment: the bug that isn't in your code

Here's a failure mode that took me a while to fully respect. Two systems can both be perfectly correct and still fail to reconcile, because they disagree about *time*.

Say your pipeline cuts a batch at midnight UTC, but the source system you're reconciling against considers a record "final" six hours later. Compare them at the wrong instant and you'll see a mountain of discrepancies — none of which are bugs. They're artifacts of comparing two snapshots taken at different moments in a system that's constantly moving.

I once chased a reconciliation gap that sat stubbornly around 95–96% accuracy. It looked like data loss. It wasn't — it was a cutoff misalignment: the two sides were being compared across a boundary where one had committed data the other hadn't seen yet. Fixing the *alignment*, not the data, took it to 99.9%.

The lessons I carry from that:

- **Reconcile over closed windows.** Only compare periods both sides consider final. Comparing live, still-mutating data guarantees noise.
- **Make the comparison boundary explicit and configurable.** Cutoffs drift as upstream systems change. A hard-coded boundary is a future incident.
- **Scope the comparison precisely.** In a partitioned system, a job should only compare records within its own partition. Aggregate metrics that blend everything together will happily let a stalled partition hide behind healthy ones — a blind spot I've had to design monitors specifically to eliminate.

## Comparing at scale without lying to yourself

When "the data" is a 500-million-row table on one side and a 600-million-row table on the other, the comparison itself becomes a serious engineering problem. A few things that have kept me honest:

- **Pre-aggregate before you diff.** Field-by-field comparison across hundreds of millions of rows is brutally expensive. Collapsing each side into keyed, pre-computed projections first turns an intractable join into a cheap one. I've cut reconciliation query times by an order of magnitude — from ~17 minutes to ~2 — purely by aggregating before comparing instead of after.
- **Categorize mismatches by root cause, not just count.** "10,000 mismatches" is noise. "9,700 from a known upstream date skew, 300 from a genuine rating bug" is a map. Bucketing discrepancies by *why* is what separates the signal you must act on from the noise you can explain.
- **Watch the edges.** The mismatches that actually cost money tend to cluster in edge cases: negative or credit line items, quantities of exactly zero or one, currency rounding, scaling factors that collapse to a no-op. Test those explicitly. A surprising number of "pricing bugs" are really just a truncation or a rounding rule that behaves differently on a boundary value.

## What I'd tell a past me

If I could hand these rules to myself before I started, it would be a short list:

1. **Build the reconciliation loop before you build the features.** It's not scaffolding you add later; it's the thing that tells you whether everything else works.
2. **Make every stage idempotent from day one.** Retro-fitting idempotency onto an append-based pipeline is far more painful than designing for it up front.
3. **Detection and replay are the same system.** The comparison that finds the gap should also drive the fix.
4. **Most reconciliation gaps are alignment bugs, not data loss.** Check *when* you're comparing before you go hunting for lost records.
5. **A discrepancy needs a magnitude, a cause, and an owner** — otherwise it's just a number that makes people nervous.

None of this is glamorous. There's no clever algorithm at the center of it. But when the requirement is "the books close at 100% accuracy, every month, over billions of events," this is the difference between a system you trust and a system you babysit. I'd rather build the one you trust.

Thanks for reading.
