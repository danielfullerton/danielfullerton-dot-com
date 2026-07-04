---
# Core Metadata
title: "How I Use ChatGPT and Todoist to Plan My Day in Under 10 Minutes"
date: "2025-04-29"
lastModified: "2025-04-29"
author: "Daniel Fullerton"
language: "en"
status: "published"

# SEO & Social

description: "How I use ChatGPT and Todoist together to plan my day in under 10 minutes - complete with prompt setup, examples, and copy-ready syntax."
excerpt: "How I use ChatGPT and Todoist together to plan my day in under 10 minutes - complete with prompt setup, examples, and copy-ready syntax."
keywords:
  [
    "ChatGPT",
    "Todoist",
    "daily planning",
    "task management",
    "productivity tools",
    "AI workflow",
    "prompt engineering",
  ]
canonicalUrl: "/blog/how-i-use-chatgpt-and-todoist-to-plan-my-day-in-under-10-minutes"
noindex: false
nofollow: false

# Visual Assets

image: "/gpt_todoist_image.png"
coverImage: "/gpt_todoist_cover.png"
openGraphImage: "/gpt_todoist_image.png"

# Content Organization

category: "Artificial Intelligence"
tags: ["ai", "prompt-engineering", "best-practices", "productivity"]
series: "AI & Engineering"
featured: true
timeToRead: "7 minutes"

# Enhanced Navigation

tableOfContents: true
---

# How I Use ChatGPT and Todoist to Plan My Day in Under 10 Minutes

Recently, I’ve started using ChatGPT to help me plan my day alongside Todoist, which has been my longtime go-to for managing tasks. I had the idea to use ChatGPT not only to estimate how long my tasks might take and help me prioritize them, but also to generate a copy-pasteable list in Todoist syntax.

---

## 🧠 Why I Built This

In the era of AI, I'm finding more and more use cases not just for innovating and creating new things with AI, but also for streamlining my existing systems and processes, reducing friction and freeing up more time to focus on the things that matter most. One of the big reasons I plan my day in Todoist in the first place is that I am somewhat meticulous about timeboxing my tasks, prioritizing them based on urgency, and ensuring I spend my day wisely (carpe diem!). However, planning is something most people don't enjoy doing - rather, we enjoy actually doing and completing the tasks we set out to accomplish. So, I wanted to find a way to make the planning process more efficient.

So, here were my goals:

1. Tell AI what I need to do today
2. Ask it to estimate how long each task will take
3. Ask it to prioritize the tasks based on urgency
4. Ask it to generate a list of tasks in Todoist format so I can copy and paste them into my task manager
5. All of this in under 10 minutes

---

## 🤖 How It Works

Here's how I have it set up:

![](/todoist_day_planning.png)

First, I created a new project in ChatGPT called "Todoist Day Planning." By using a project, we can have a "project-level" prompt (called "Instructions") that will be applied to all conversations in the project. This is useful because it means we only have to define the main prompt once, then we can just create a new conversation each day and ChatGPT will already know what we want to do:

![](/todoist_planning_instructions.png)

I'll share the full prompt at the end of the article in case you'd like to use it for yourself!

Next, I create a new conversation in the project each day. Generally, I already have a decent idea of what tasks I need to get done each day, but sometimes I will quickly write them down somewhere just to get them out of my head. Then, I use the "Dictate" feature in ChatGPT to quickly tell it what I need to get done. This is one of my favorite ChatGPT features, as simple as it may seem - it saves me a ton of time and effort typing things out, but I still have the option to review and edit the transcribed text before sending it to ChatGPT.

Here's an example of how the conversation might start:

![](/plan_conversation_start.png)

And how it might continue:

![](/todoist_output.png)

---

## 🧾 Example Output from ChatGPT

As you can see, ChatGPT provided a perfectly formatted list of tasks, which already include the times to perform them at, how long they will take, and the priority level:

```
🍽️ today 3:00p for 30 min Do the dishes p2 #misc
🧹 today 3:35p for 30 min Clean off upper deck p3 #misc
```

This syntax matches exactly what Todoist expects for its NLP (natural language processing) feature, so I can just copy and paste it directly into Todoist using the "Quick Add" feature (hotkey Q). When a multiline task is pasted into Todoist, it will automatically create a new task for each line:

![](/add_2_tasks.png)

Once we click "Add 2 tasks," we can see that the tasks are all added to our Todoist inbox, and the times and priorities were parsed and set correctly!

![](/today_todoist.png)

---

## 💡 Why This Works So Well

You know what you need to do. ChatGPT can be leveraged to find the optimal way for you to do it. Todoist can be used to help you track the completion of those tasks, but it currently lacks the AI capabilities to actively coordinate and plan your day for you. By combining these tools, we can create a powerful system that allows us to focus on the tasks at hand without getting bogged down in the planning process.

---

## 👋 Final Thoughts

I hope some of my fellow Todoist and ChatGPT power users will find this to be an interesting and genuinely useful experiment. I love having my day planned, but I hate planning it! Of course, while we still have to make sure AI is giving us an appropriate schedule and not missing anything important, for most day-to-day tasks, I find this to be a great way to get a solid plan in place quickly and efficiently.

As a broader note, I think this is a great example of how we can build larger, more "generic" prompts that are reusable and higher order, and then build on top of them with more specific prompts in individual conversations. Perhaps there's even a future agentic (i.e. automated) implementation for this where you could have an agent that is proactively asking you about your tasks and planning your day for you! I'm excited to see how we continue to streamline the boring but essential parts of our days so that we can spend more time actually **doing**.

Thank you for taking the time to read!

## 🧰 The Full Prompt (You Can Copy This)

````markdown
Prompt Instructions: Todoist Task Planning with GPT

Please help me organize my Todoist tasks for today. I need you to break down my tasks into smaller, actionable steps with specific time estimates for each task. Each step should be clear and time-boxed (e.g., “spend 20 minutes on task A” or “focus for 30 minutes on task B”).

If new tasks come up during the day, incorporate them into today’s plan logically, considering priority, estimated time, and my available time slots. Prioritize the most important and time-sensitive tasks first. Each task should be focused and actionable.

Make sure the structure flows logically, with no large gaps in the schedule, and account for mental and physical transition time between tasks (minimum of 5 minutes). However, do not list those transitions as tasks.

Before Generating Tasks:

- Ask me how much total time I have for focused work today.
- Ask for the estimated time and priority level for each task.
- Help me break down any tasks longer than 1 hour.
- If I am trying to fit in too much, push back and help me cut or defer items.

Task Rules:

- Tasks must be actionable - something I can actively do.
  - Do not include passive tasks like “wait for delivery” or non-task items like “transition time” or “lunch”.
- Each task must be between 15 minutes and 1 hour.
- Time estimates should be realistic and practical, considering setup and wrap-up time.

Output Format Rules

- Format each task as a one-line entry for Todoist bulk import.
- Every task must:
  - Start with a \*\*relevant emoji
  - Include the word "today"
  - Include start time and duration (e.g., `today 10:30a for 30 min`)
  - Include a priority flag: `p1` (highest) to `p4` (lowest)
  - Include a #project_name, defaulting to `#misc` if none is provided
- Do not include transitions or breaks as tasks.
- Present the final list inside a single triple-quoted code block.
- Separate each task with a line break.

Example of CORRECT Output

```
🌿 today 10:00a for 15 min Spray for ants outside p0 #misc
🛠️ today 10:30a for 30 min Meet with deck contractor p2 #misc
```

Example of INCORRECT Output
🌿 10:00a for 15 min - Spray for ants outside #misc 🛠️ 10:15a for 5 min - Transition to prepare for deck contractor #misc 🛠️ 10:30a for 30 min - Prepare for deck contractor #misc
````
