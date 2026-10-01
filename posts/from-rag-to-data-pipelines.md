---
# Core Metadata
title: "Thinking About AI Workflows Like Data Pipelines"
date: "2026-09-28"
lastModified: "2026-09-28"
author: "Daniel Fullerton"
language: "en"
status: "published"

# SEO & Social

description: "How I think about AI workflows the way I think about data pipelines: fan out to gather evidence, refine it through Bronze, Silver, and Gold layers, and fan back in so the final reasoning step gets useful context."
excerpt: "The scarce resource in an AI workflow isn't information. It's useful context. Here's how the medallion architecture and fan-out / fan-in shape how I think about AI work."
keywords:
  [
    "AI workflows",
    "context management",
    "medallion architecture",
    "fan out fan in",
    "data engineering",
    "AI agents",
    "orchestration",
  ]
canonicalUrl: "/blog/from-rag-to-data-pipelines"
noindex: false
nofollow: false

# Visual Assets

image: "/rag-pipeline-cover.png"
coverImage: "/rag-pipeline-cover.png"
openGraphImage: "/rag-pipeline-og.jpg"

# Content Organization

category: "Artificial Intelligence"
tags: ["ai", "data-engineering", "agents", "context-management"]
series: "AI & Engineering"
featured: false
timeToRead: "5 minutes"

# Enhanced Navigation

tableOfContents: false
---

# Thinking About AI Workflows Like Data Pipelines

I was learning about RAG recently, and it got me thinking about something bigger than retrieval. In a typical RAG workflow, a search finds material before the model answers, and the selected passages get added to its context. The model still reads those passages. It just doesn't have to carry everything the search looked through.

That made me wonder how much of a complex AI task really needs to happen in one conversation. Finding information, checking it, and making a decision are different kinds of work. Why put every raw result in front of the model that's supposed to make the final call?

I think about this through my data engineering background. I've worked with Spark, data reconciliation, and data quality, where you often start with far more raw information than anyone needs at the end. You don't throw away that information, but you also don't hand all of it to the person reading the final report. You move it through stages so the result is useful and can still be checked.

The scarce resource in an AI workflow isn't information. It's useful context: the material the model has available when it needs to reason. I'd rather spend that context on the decision than on sorting through everything collected along the way.

One data engineering pattern that helps me picture this uses Bronze, Silver, and Gold layers, sometimes called the medallion architecture. Bronze keeps the raw material. Silver cleans and checks it. Gold gives the next consumer something ready to use. I don't think AI work needs a formal three-stage pipeline every time, but the jobs those layers do feel familiar.

![Raw documents, code, and logs in a Bronze layer are refined into validated facts in Silver and compact summary cards in Gold, with dotted lines tracing each conclusion back to its sources](/rag-medallion-layers.png)

For an AI task, Bronze might be pages, code, logs, documents, and tool results. I'd want to save that material in files or notes instead of expecting one long conversation to hold it all. That's similar to keeping the source data behind a report. When a conclusion seems questionable, you need somewhere to go back and look.

Silver is the part that feels most like reconciliation work to me. Pull out the useful facts, remove repeats, and check them against the source. If two sources disagree, that disagreement is often one of the most useful things you've found. I wouldn't want a summary to quietly pick one and move on. I'd want it to say what disagrees and what, if anything, could settle it.

Gold is the smaller set of findings the final reasoning step needs. It might say what each area of an investigation found, how sure we are, and which questions are still open. The details don't all have to travel with it, as long as the findings point back to the notes and raw material. In data engineering, I want to be able to trace a number in a report back to the data behind it. I'd want the same basic check for an AI-generated conclusion.

This is also where fan-out and fan-in start to make sense to me. Fanning out means splitting a job into separate questions. Fanning in means bringing the answers back together. Say I'm weighing a technical decision with cost, performance, and operational risk. Each question could be investigated in its own context, with its own sources and notes. Then the final step could compare the findings without reading every search result and tool response from all three investigations.

![One question fans out into separate cost, performance, and risk investigations, each with its own sources, and their summaries fan back in to a single decision](/rag-fan-out-fan-in.png)

The part I find interesting is that this can nest. Someone working on performance might need to split that into latency, throughput, and failure behavior. Those findings can be brought back together before performance is compared with cost and risk. Work gets broken down on the way out and built back up on the way in: top-down decomposition, bottom-up aggregation. I'd only add another layer when it changes the level of detail in a useful way. Otherwise, it's one more handoff where something could get lost.

And things *do* get lost in handoffs. It's basically a game of telephone. A tool result that says "187 milliseconds under these conditions" could become "latency was high," then "performance may be a problem," and finally "this design has serious performance issues." But "high" wasn't in the original result. Whether 187 milliseconds is high depends on what the system needed to do. A useful summary has to keep the conditions, uncertainty, and a way back to the measurement.

Honestly, this is why I've started thinking less about finding the perfect prompt and more about how the work is set up around the model. A good prompt helps, but it can't make a pile of mixed evidence clear on its own. I want the raw material saved, disagreements kept visible, and each conclusion short enough to reason with while still being easy to check. That's the part of data engineering I think carries over.

If I had to boil it down: fan out by responsibility, fan in by abstraction, and keep knowledge in artifacts and cognition in context.
