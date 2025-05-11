---
# Core Metadata
title: "ROLE - An Effective Prompt Engineering Technique I Use Every Day"
date: "2025-04-06"
lastModified: "2025-04-06"
author: "Daniel Fullerton"
language: "en"
status: "published"

# SEO & Social
description: ""
excerpt: ""
keywords:
  [
    "prompt engineering",
    "AI interaction",
    "LLM techniques",
    "AI prompting",
    "language models",
    "AI best practices",
    "ChatGPT tips",
    "AI communication",
    "effective prompting",
    "AI optimization",
  ]
canonicalUrl: "/blog/Effective%20Prompt%20Engineering%20Techniques%20ROLE"
noindex: false
nofollow: false

# Visual Assets
image: "/prompt-techniques.png"
coverImage: "/prompt-engineering-cover.png"
openGraphImage: "/prompt-techniques.png"

# Content Organization
category: "Artificial Intelligence"
tags: ["ai", "prompt-engineering", "best-practices", "productivity"]
series: "AI & Engineering"
featured: false
timeToRead: "5 minutes"

# Enhanced Navigation
tableOfContents: true
---

## The ROLE Technique: Setting Clear Expectations

AI models like ChatGPT are powerful tools, but they aren't mind readers. The clarity of your prompt directly impacts the quality of the output. Structured prompting can save time and reduce frustration mid-conversation when you are trying to hone in the model's focus "on the fly." One of the most effective frameworks for doing this is the **ROLE technique**, which helps set precise expectations for how the model should respond. I began using this technique after reading about it in the book [Generative AI Basics & Beyond](https://www.amazon.com/Generative-Basics-Beyond-Productivity-Creativity-Even/dp/1069112763) by Melissa Peneycad.

"ROLE" stands for: **R**ole, **O**bjective, **L**imitations, and **E**xamples.

### Understanding the Components

#### **Role**: _Defining the AI's Expertise_

![](/role_image.png)

First, you want to give the model a "role" to play. You're essentially casting it in a specific role, which helps it understand the context and tone of the conversation. I think of this step as applying the largest, most important constraint on the model's behavior. It takes the model from being highly generic to being more focused and relevant before the conversation even begins.

> You are an expert JavaScript engineer with experience in full-stack development, especially working with Node.js and modern frontend frameworks like React.

By setting the stage, you help the model narrow its frame of reference and adopt the appropriate tone, vocabulary, and assumptions. You’ll get more relevant, practical, and immediately usable answers.

#### **Objective**: _Setting Clear Goals_

![](/objective_image.png)

This is where you tell the model what you _want_ it to do. Without a specific objective, it might wander, giving you too much, too little, or something entirely off-target.

> Your objective is to help me understand how to implement React Router in my existing React application. I will need to use nested routes and lazy loading for some components.

Clear goals reduce guesswork and make the AI behave more like a focused collaborator. With a defined task, the model can work directly toward your intended outcome.

#### **Limitations**: _Establishing Boundaries_

![](/limitations_image.png)

Next, you want to set limitations. This is where you can further specify any constraints or boundaries that the model should respect. This could include things like:

- Avoiding certain libraries
- Sticking to a specific coding style
- Not giving too much information in a single response (thus overwhelming you)

If you think of the role as the initial "large" constraint, limitations are like the fine-tuning constraints that help the model stay on track and get a better idea of exactly what you want and, more importantly, what you don't want.

> Please avoid using any third-party libraries or frameworks outside of React Router. I want to keep the implementation as lightweight as possible.
> Also, please provide code snippets in TypeScript, using the Standard JavaScript style guide.
> Finally, please keep the responses concise and focused on the task at hand, only providing 2-3 sentences at a time.

#### **Examples**: _Providing Context_

![](/examples_image.png)

Finally, providing examples-even just one or two-can help the model understand how you want the output to look, and it also gives you concrete context to work with. For example, instead of just saying "I want to implement React Router," you could provide a specific example of how you want the routes structured or how you want the components to be lazy-loaded.

> Here’s an example of how I would like the routes to be structured:
> "/app/dashboard" should load the Dashboard component, and "/app/settings" should load the Settings component. I also want to lazy-load the UserProfile component when navigating to "/app/user/:id".

This helps the model to understand what you are looking for beyond just the words of your prompt. This gives the model a clearer picture of the end goal and helps it generate more relevant and useful responses.

### Putting It All Together

Using our above examples altogether, let's see how this works in practice. Here’s a complete prompt using the ROLE technique:

> Role: You are an expert JavaScript engineer with experience in full-stack development, especially working with Node.js and modern frontend frameworks like React.
>
> Objective: Your goal is to help me understand how to implement React Router in my existing React application. I will need to use nested routes and lazy loading for some components.
>
> Limitations: Please avoid using any third-party libraries or frameworks outside of React Router. I want to keep the implementation as lightweight as possible. Also, please provide code snippets in TypeScript, using the Standard JavaScript style guide. Finally, please keep the responses concise and focused on the task at hand, only providing 2-3 sentences at a time.
>
> Example: Here’s an example of how I would like the routes to be structured: "/app/dashboard" should load the Dashboard component, and "/app/settings" should load the Settings component. I also want to lazy-load the UserProfile component when navigating to "/app/user/:id".

This gives the model a very clear picture of what you want, but it also doesn't give the model any information it doesn't need. It balances specificity with focus, providing the model with the information it needs to be successful but also keeping the conversation focused on the task at hand. The model now understands _who_ it is, _what_ it should do and not do, and _how_ you want it to do it. This is a great way to get the most out of your interactions with AI models like ChatGPT.

### Closing Thoughts

The ROLE technique is a powerful way to set clear expectations for AI models, making them more effective collaborators. I've really enjoyed using this technique since I first learned about it, and I highly recommend the book that introduced it to me, _Generative AI Basics & Beyond by Melissa Peneycad_, which you can find on Amazon [here](https://www.amazon.com/Generative-Basics-Beyond-Productivity-Creativity-Even/dp/1069112763).
