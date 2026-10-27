---
# Core Metadata
title: "When My AI Agent Said It Worked and It Didn't"
date: "2026-10-28"
lastModified: "2026-10-28"
author: "Daniel Fullerton"
language: "en"
status: "published"

# SEO & Social

description: "A recurring task that stopped recurring, a calendar location that vanished, times that shifted to UTC, and an agent that said all tests passed after running only some of them. Four times an AI agent or the tool behind it reported success when something had quietly gone wrong, and the layers of checks I use now to catch them."
excerpt: "An agent says something worked in the same confident tone whether or not it did. Here are four silent failures I've run into, and why I think checking agent work needs more than one layer."
keywords:
  [
    "AI agents",
    "Claude Code",
    "agent reliability",
    "verification",
    "code review",
    "evals",
    "Todoist",
    "Google Calendar",
  ]
canonicalUrl: "/blog/my-ai-agent-said-it-worked"
noindex: false
nofollow: false

# Visual Assets

image: "/agent-said-it-worked-og.jpg"
coverImage: ""
openGraphImage: "/agent-said-it-worked-og.jpg"

# Content Organization

category: "Artificial Intelligence"
tags: ["ai", "claude-code", "agents", "reliability", "evals"]
series: "AI & Engineering"
featured: false
timeToRead: "6 minutes"

# Enhanced Navigation

tableOfContents: false
---

# When My AI Agent Said It Worked and It Didn't

One morning I took my medicine, went to check it off in Todoist, and it wasn't there.

I keep recurring tasks for habits I'm still trying to build, and checking that one off had become part of the habit, so the missing checkbox was pretty obvious. When I went looking, I found it on a different day. And it wasn't recurring anymore - it was a one-time task. Somewhere along the way an agent had moved it, and the repeat was just gone.

That's the kind of failure I worry about most with agents. A crash is easy to notice, but an agent says something worked in the same tone whether or not it actually did. I've run into this four different ways now, in my own setup and at work. Looking back at them together, the thing I keep coming back to is that no single check would have caught all four. It kind of takes a few layers.

## The wrong call

![A robot hand pulling one of two identical levers, both with green OK lights, while a looping repeat arrow straightens into a one-way arrow](/agent-said-it-worked-wrong-call.png)

This one wasn't a bug. The Todoist connector has two ways to change a date. `update-tasks` replaces the whole due string, and the repeat pattern is part of that string, so using it on a recurring task quietly turns it into a one-time task. `reschedule-tasks` moves the date and keeps the repeat. Both return OK. The agent just picked the one that drops the repeat, and nothing in the response told it so.

So now my Todoist skills read a task back after changing it, with a fresh call, and check that it still looks right. They also have a rule that any date change goes through `reschedule-tasks` unless a read shows the task doesn't recur.

## The dropped field

![A calendar event with a green check mark while its location pin falls off, above a car dashboard whose map has no destination](/agent-said-it-worked-dropped-field.png)

I add a lot of events through Claude, mostly so I can tap the event in the car and have Maps start directions right away. So I wrote a small skill that asks me for a location whenever an event sounds like it's somewhere other than home.

While using it, I found that creating an event with a location through the Google Calendar connector just drops the location. The event gets created, the response says it worked, and the location field is empty. So the skill now makes two calls under the hood. It creates the event, updates it with the location, and then reads the event back to make sure the location is actually there. From my side it's still one request, and anything that uses the skill doesn't need to know about the workaround.

## The wrong default

![A laptop on a desk with a clock at 6 and a cloud server with a clock at 10, next to a desk calendar flipping to the next day](/agent-said-it-worked-wrong-default.png)

I run Claude in a lot of different places - my Mac, sometimes Linux or Windows, Claude Code, cloud sessions, plain chat. Some of my skills were originally written for Claude Code on my Mac, and they used my local Eastern time without me ever having to say so.

When I moved one of them into a scheduled cloud routine, the times started coming back in UTC, and it happened pretty consistently after the move. Nothing errored and nothing said it failed. The times were just 4-5 hours off, so anything in the evening could end up on the next day.

Now every skill names the time zone explicitly, and gets the current date from the service it's working with (like Todoist) instead of whatever machine it happens to be running on. After writing times, it reads them back to make sure they landed in Eastern, in case a connector made its own assumption along the way. I also just don't assume a skill that works on my Mac will work the same in the cloud anymore.

## The partial claim

![A smiling robot giving a thumbs-up while its flashlight lights up four checked binders on a long shelf, with failing binders further down left in the dark](/agent-said-it-worked-partial-claim.png)

This one cost the most time, and it's the one I see at work.

An agent made a change and said it had run all the tests. What it had actually run were the tests scoped to the files it changed. The repo also had a separate, longer end-to-end suite the agent didn't know about, and some of those tests started failing. We didn't find out until later, and it took some cleanup to get back to a clean build.

So it was technically true, just about a much smaller set of tests than any of us assumed.

The real fix for this is a required build on every pull request, so the full suite runs no matter what the agent thinks it covered. That's the base, and it should always be there.

But I also build a check into the agent work itself now. When I write instructions for planning or implementation, I ask for an independent reviewer agent, ideally several running different models, to verify a handful of things before the work is done, including that all the tests actually passed. The reviewer is told to look at every test in the repo, not just the ones near the change, and compare that against what the implementer actually ran. If it thinks there's a gap, it runs the suite itself. My thinking with the different models is that a reviewer on the same model might share the same blind spots.

## More than one layer

| Failure           | Why the OK was misleading                      | How I catch it now                                              |
| ----------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| The wrong call    | The call worked, it was just the wrong call    | Read the task back, and use `reschedule-tasks` for dates        |
| The dropped field | The connector drops the field and returns OK   | Create, then update with the location, then read it back        |
| The wrong default | Nothing failed, the times were just off        | Name the time zone in the skill, and read the times back        |
| The partial claim | True for the tests it ran, not the whole suite | A required PR build, plus independent reviewers on other models |

Tests and a required build are still the base. What's changed for me is that agents add a few more places where a check can live. An agent can read back its own work, which is what covers the first three now. A different agent, ideally on a different model, can check another agent's claims, which is what would have caught the last one. And evals can check that a skill doesn't drift every time I edit it - an eval that looks at the actual tool calls could flag `update-tasks` on a recurring task before it ever touched my real list. I wrote more about how I use evals in [How I Start Each Day With Claude Code](/blog/how-i-start-each-day-with-claude-code).

None of this replaces the tests, it's more for the stuff tests don't really look at. But I don't take an agent's OK as the last word anymore. Something else has to look.

Thanks for reading!
