## 2. Objective Reiteration: Maintaining Focus in ChatGPT

One of the most common frustrations when working with AI tools is when the model seems to "lose the plot" — giving you answers that are off-topic, overly generic, or misaligned with what you asked for initially. Even with a strong opening prompt, long or complex conversations can introduce drift. That’s where **Objective Reiteration** comes in — a simple technique that helps the model stay on track throughout the interaction.

### Why Models Drift

Language models like ChatGPT operate on a rolling context window. While they’re pretty good at remembering earlier parts of a conversation, they don’t truly "understand" the objective in the way a human would. They rely entirely on token-based pattern prediction — meaning the longer the conversation gets, the more room there is for the model to lose the thread, especially when:

- The task evolves gradually (e.g., a script morphs from Bash to Python, or you shift from React to Svelte).
- You revisit earlier decisions (e.g., deciding to remove a database dependency halfway through).
- The conversation spans many different sub-tasks (debugging, optimization, formatting, testing, etc.).

This can lead to irrelevant answers or helpful-sounding content that subtly ignores key constraints or priorities.

### Implementing Objective Reiteration

To mitigate this, you can explicitly ask the model to **restate the objective in each response** — or at least at key transition points in the task. This keeps the scope fresh in context and serves as a built-in guardrail to catch drift early.

Here’s how you’d frame it in your prompt:

> After each response, restate the original objective you are working toward. If the objective seems to have changed, ask for clarification before continuing.

This does a few things:

1. It gives _you_ a chance to correct the model if it starts to veer off course.
2. It reinforces your own intent, especially in long or branching discussions.
3. It encourages the model to "self-check" against the goal before producing an answer.

This technique is especially useful in tools like **ChatGPT**, where there’s no token-based billing pressure. With **Claude**, **Gemini**, or other usage-metered tools, this approach might not be ideal — reiterating the objective every time can add unnecessary token bloat, which translates directly into cost. In those cases, it’s more efficient to re-state the objective manually every few messages or at logical checkpoints in the workflow.

**Example:**

Let’s say you’re working on an automation script that pulls in GitHub issues tagged with a specific label and adds them to a Notion database.

Your prompt might look like:

> You are a developer familiar with GitHub and Notion APIs. Your goal is to help me write a Node.js script that fetches open issues from a repo and syncs them to a Notion table via the Notion API. Only include libraries that are actively maintained. After each response, reiterate this objective to ensure we’re still aligned.

And then you'd get a reply like:

> Sure. Here's a script using `octokit` to fetch GitHub issues and `@notionhq/client` to post them to Notion. This script filters by label and handles pagination.
>
> **Objective:** Build a Node.js script to fetch GitHub issues with a specific label and sync them to a Notion database, using actively maintained libraries.

That reinforcement keeps the interaction grounded, especially if the conversation goes into pagination, rate limiting, retries, or webhook-based automation later on.

## 3. Chain of Thought Reasoning: Step-by-Step Problem Solving

One of the most underused — but incredibly effective — prompting techniques is **Chain of Thought (CoT) Reasoning**. It’s particularly useful for problem-solving tasks, whether you're debugging a script, designing a feature, or tackling algorithmic challenges for fun.

Rather than asking the model to jump straight to the solution, you encourage it to reason _step by step_ — mimicking the way experienced developers break down problems before implementing code.

### The Psychology Behind It

This technique works because large language models are predictive engines. If you prompt them to "think out loud" before giving an answer, they’re more likely to follow a logical structure, catch inconsistencies, and arrive at a higher-quality result.

It also helps you as the user:

- Spot faulty assumptions earlier.
- Understand _why_ the model chose a particular approach.
- Guide the model back on track more easily when it goes off-course.

Think of CoT as the AI equivalent of rubber-duck debugging.

### Implementation Strategy

To use CoT effectively, modify your prompt to include phrases like:

> "Think step by step before answering."  
> "List out the reasoning first, then provide the code."  
> "Start by breaking down the problem before jumping into the solution."

This works in both simple and complex scenarios. For example:

**Basic scripting task:**

> _“I need a script that checks disk space usage and emails me if it exceeds 90%. Think step-by-step before writing the code.”_

**LeetCode-style challenge:**

> _“Given an array of integers, return the indices of two numbers that add up to a specific target. Walk through the logic step-by-step before writing the function.”_

**Web dev debugging:**

> _“I’m getting a CORS error when trying to fetch data from a backend running on localhost:5000 into a React app on localhost:3000. Explain the likely causes step-by-step and suggest a fix.”_

Adding this structure gives the model room to "show its work" — which is helpful for verifying correctness before you commit time or deploy a change.

### Practical Examples

Here’s a real-world automation scenario using Chain of Thought:

**Prompt:**

> _You're a developer helping me write a Python script to rename files in a directory based on a pattern. First, list out the steps the script needs to perform, then write the code._

**Model Output (ideal):**

> 1. Identify the target directory.
> 2. List all files in the directory.
> 3. Match filenames against the pattern.
> 4. Generate the new filename for each match.
> 5. Rename the files using `os.rename()`.
>
> Here’s the Python script that implements this logic:
>
> ```python
> import os
> import re
>
> directory = '/path/to/your/files'
> for filename in os.listdir(directory):
>     if re.match(r'^old_pattern_', filename):
>         new_name = filename.replace('old_pattern_', 'new_prefix_')
>         os.rename(os.path.join(directory, filename), os.path.join(directory, new_name))
> ```

Notice how the reasoning sets expectations and gives you a chance to verify the plan before seeing the implementation.

---

Chain of Thought isn't just helpful — it can be the difference between copy-paste code and a real understanding of what the AI is doing. It’s especially valuable for tasks that are easy to get wrong without thinking carefully — like recursion, regex, or managing side effects in automation.
