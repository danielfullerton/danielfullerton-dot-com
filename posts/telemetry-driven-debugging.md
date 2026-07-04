---
# Core Metadata
title: "Telemetry-Driven Debugging: A Field Guide to Root-Causing Livesite Incidents"
date: "2026-07-03"
lastModified: "2026-07-03"
author: "Daniel Fullerton"
language: "en"
status: "published"

# SEO & Social
description: "After owning 169 livesite incidents in six months, I've converged on a repeatable method for root-causing production problems: start from telemetry, drill to a single entity, separate retries from real failures, and end with a deliberate skeptic's pass. Here's the field guide."
excerpt: "After owning 169 livesite incidents in six months, I've converged on a repeatable method for root-causing production problems — start from telemetry, drill to one entity, separate retries from real failures, and always run a skeptic's pass."
keywords:
  [
    "livesite",
    "on-call",
    "incident response",
    "observability",
    "telemetry",
    "debugging",
    "root cause analysis",
    "distributed systems",
    "reliability",
    "SRE",
    "production engineering",
  ]
canonicalUrl: "/blog/telemetry-driven-debugging"
noindex: false
nofollow: false

# Visual Assets
image: "/debugging_cover.png"
coverImage: "/debugging_cover.png"
openGraphImage: "/debugging_cover.png"

# Content Organization
category: "Software Engineering"
tags: ["reliability", "debugging", "observability", "on-call"]
series: "Engineering Notes"
featured: true
timeToRead: "8 minutes"

# Enhanced Navigation
tableOfContents: true
---

## The pager goes off

Over one recent six-month stretch I was the directly-responsible engineer for 169 livesite incidents on a mission-critical billing platform — a handful of them the wake-you-at-3am kind. That volume forces you to stop debugging by vibes. You either develop a repeatable method or you drown.

What follows is the method I converged on. It's not clever. Its whole value is that it's *boring and repeatable*, which is exactly what you want at 3am when your judgment is at its worst.

## Start from telemetry, not theories

The most expensive mistake in incident response is starting with a hypothesis. Someone says "I bet it's the database," everyone nods, and the next hour is spent trying to confirm a story instead of reading the evidence. Half the time the story is wrong and you've burned the hour.

The discipline I hold to is: **before I have a theory, I have a query.** The first thing I do is pull the actual telemetry — logs, metrics, traces — for the exact time window and the exact scope of the alert, and let the shape of the data suggest the hypothesis rather than the other way around.

![Telemetry-first debugging: read the signal, drill to one entity, form a hypothesis, then run a skeptic's pass before calling it.](/debugging_flow.svg)

This inversion matters because telemetry is falsifiable and theories are seductive. A theory will happily survive contact with three pieces of evidence that don't quite fit. A query result won't. When I catch myself reasoning about what *should* be happening, that's my cue to go find the data that shows what *is*.

## Drill to a single entity

Aggregates are where root causes go to hide. "Error rate is up 4%" tells you something is wrong but nothing about *what*. The move that breaks open more incidents than any other is to **stop looking at the population and follow one member of it end to end.**

Pick a single failing request, message, or record — ideally one from the middle of the incident — and reconstruct its complete story from the telemetry. When did it arrive? What touched it? What did each hop log? Where did the trail go cold?

One incident sticks with me as the perfect example. We had a recurring dead-letter alert — messages piling up in a failure queue, day after day. The aggregate story was "processing is failing." So I pulled *one* message and followed it. The telemetry showed it had been received ten separate times, at exactly five-minute intervals, with **zero processing log lines in between** before it was finally dead-lettered.

That single trace rewrote the entire diagnosis. The messages weren't *failing* to process — they were never being *picked up* to process at all. "Failing" and "never attempted" call for completely different fixes, and no amount of staring at the aggregate error count would have told them apart. One entity did.

## Separate the retry from the real failure

Modern distributed systems retry aggressively, and retries systematically lie to your dashboards. This is subtle enough that it deserves to be a permanent item on everyone's mental checklist.

Here's the trap. A monitor pages because a failure percentage crosses a threshold — say 11% of attempts failed. That sounds bad. But "attempts" counts *every retry*, and if every one of those failed attempts was retried and then **succeeded** within a minute, the number your customers actually experienced is 0% failure. The system worked exactly as designed; the alert is measuring the machinery of resilience, not a real outcome.

I've root-caused whole families of recurring alerts that turned out to be this. A couple of patterns worth internalizing:

- **Alert on terminal outcomes, not attempts.** What matters is whether the operation *ultimately* succeeded or failed, deduplicated by its identity. An alert that fires on retryable attempts will page you forever about a system that's actually healthy.
- **Metric amplification is real.** One logical failure can explode into dozens of counted physical events — a single failed operation retried across many low-level calls can register as 50× its true weight, sailing past a static threshold that was set with the true count in mind. When an alert count looks implausibly high, ask whether you're counting logical failures or physical hiccups.

The general lesson: **a count is meaningless until you know what one unit of it represents.** Attempts or outcomes? Logical or physical? Deduplicated or not? Get that wrong and you'll spend hours fixing a system that was never broken.

## Read the retry policy carefully

Retries save you right up until they're configured wrong, at which point they fail you invisibly. A pattern I've hit more than once: a transient dependency error clears in a couple of seconds, but the retry policy is set to a fixed number of attempts at a short fixed delay — say ten tries, 50 milliseconds apart. That's a *count*-bounded budget that exhausts itself in half a second and gives up long before the two- or three-second blip has cleared.

The policy *looks* generous on paper ("ten retries, up to a 20-second window!") but the fixed short delay means it never comes close to using that window. It burns its whole budget in the first heartbeat of the outage and reports terminal failure for something that would have recovered on its own a moment later.

The habit this builds: when retries aren't saving you, **don't assume the dependency is truly down — read the actual retry math.** Count-bounded and time-bounded backoff behave completely differently under a brief outage, and the gap between how a policy reads and how it behaves is a classic hiding spot for recurring incidents.

## Watch for flapping and missing hysteresis

Some of the nastiest incidents aren't a hard failure at all — they're a system rapidly oscillating between two states. If ownership of something toggles back and forth with no hysteresis — no deadband, no "wait and see before you flip" — a component can end up thrashing hundreds of times a day, hammering a downstream store and driving latency up for everyone.

The telltale sign is a metric that isn't flat or trending but *sawtoothing*. When I see that, I stop looking for a thing that broke and start looking for a **control loop without damping** — two forces fighting over the same state with nothing to settle the argument. The fix usually isn't "make the thing faster"; it's "add hysteresis so it stops flip-flopping."

## Structural problems wear an incident's clothes

Not every page is an anomaly. Sometimes the system is doing precisely what it was built to do, and what it was built to do is too slow. I've investigated "latency incidents" that turned out to be a write path making six storage round-trips in series — consuming the overwhelming majority of a budget it was structurally guaranteed to blow on a busy day.

That's not a bug you can hotfix at 3am. The honest finding is: *"this isn't an incident, it's a design that crosses its SLA by construction, and here's the round-trip breakdown that proves it."* Naming a structural problem as structural — instead of band-aiding it and re-paging next week — is one of the more valuable things an on-call engineer can do. The deliverable is a clear-eyed writeup, not a quick patch.

## End with a skeptic's pass

The last step of every investigation, before I write "root cause confirmed," is a deliberate attempt to *disprove* my own conclusion. Call it rubber-ducking, call it red-teaming yourself — the point is to spend five honest minutes trying to break the story I just told.

I ask a fixed set of questions:

- What would I expect to see in the telemetry if this root cause were true — and is it *actually* there, or am I pattern-matching?
- What's an alternative explanation that fits the same evidence, and how would I rule it out?
- Am I confusing correlation with cause because the timing lined up?
- Does the magnitude add up? If I claim X caused the gap, does the size of X match the size of the gap?

This step is cheap and it has saved me from confidently shipping the wrong fix more than once. A root cause that can't survive five minutes of you attacking it is not a root cause — it's a guess wearing a lab coat.

## The method, condensed

Strip away the war stories and the loop is short:

1. **Telemetry before theory.** Have a query before you have a hypothesis.
2. **One entity, end to end.** Follow a single failing unit through the whole system; aggregates hide the cause.
3. **Retry or real?** Separate terminal outcomes from attempts before you believe a failure count.
4. **Read the retry math.** Count-bounded and time-bounded policies fail very differently.
5. **Flat, trending, or flapping?** A sawtooth means a control loop without damping.
6. **Is it even an incident?** Some pages are structural truths, not anomalies — say so.
7. **Try to disprove yourself.** A root cause that can't survive a skeptic's pass isn't one.

The reason this works isn't that any single step is brilliant. It's that following the same evidence-first sequence every time keeps you from the two failure modes that actually cost you at 3am: falling in love with a theory, and mistaking the noise of resilience for a real fire. Do the boring thing, in the same order, every time.

Thanks for reading.
