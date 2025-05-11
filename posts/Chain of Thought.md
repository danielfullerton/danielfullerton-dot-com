---
# Core Metadata
title: "Chain of Thought Reasoning: How to Make AI Think"
date: "2025-05-09"
lastModified: "2025-05-09"
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
    "chain of thought",
  ]
canonicalUrl: "/blog/Chain%20of%20Thought"
noindex: false
nofollow: false

# Visual Assets
image: "/good_bad_robot.png"
coverImage: "/chain_cover.png"
openGraphImage: "/good_bad_robot.png"

# Content Organization
category: "Artificial Intelligence"
tags: ["ai", "prompt-engineering", "best-practices", "productivity"]
series: "AI & Engineering"
featured: true
timeToRead: "7 minutes"

# Enhanced Navigation
tableOfContents: true
---

## Introduction

LLMs are great at quickly generating answers, but how do we make them _think_? Oftentimes, you'll find that an LLM can provide a correct answer to a subjective question, such as "what is the best programming language" or
"which color best matches with red," but it struggles with more complex or logical tasks which require reasoning. For example, even simply asking a model "After driving 60 miles at 30 mph, how long did it take?" can lead to a variety of incorrect answers. This is where **Chain of Thought (CoT) reasoning** comes into play.

## What Is Chain of Thought (CoT) Reasoning?

Chain of Thought reasoning a technique in prompt engineering which instructs the model to break down a problem into smaller steps, effectively showing
its work. This means that instead of simply jumping to the answer, the model will explain its reasoning process. This makes the model more likely to arrive at the correct conclusion, and in the case that it doesn't, it becomes easier to troubleshoot and identify where the model messed up. This is especially useful in problems which require logical deduction or multi-step reasoning, such as math problems, debugging code, or commonsense reasoning tasks.

For example, consider a simple LLM which is not designed with strong reasoning capabilities. If you ask it "After driving 60 miles at 30 mph, how long did it take?", a smaller or less capable model might respond incorrectly with "1 hour". The reason for this is that the LLM is not necessarily looking for the "correct" answer from a deterministic perspective, but rather it is trying to predict the next word in the sequence based on the training data it has seen. This means that it may not be able to accurately deduce the correct answer without additional context or reasoning.

However, if you prompt using CoT reasoning, the model will break down the problem into smaller steps. For example, if we change our prompt to "Let's think step by step. After driving 60 miles at 30 mph, how long did it take?", the model (let's assume a model like ChatGPT-4o or similar) will respond with something like this:

> **Step 1: Use the formula for time.**  
> Time = Distance / Speed
>
> **Step 2: Plug in the values.**  
> Time = 60 miles / 30 mph = 2 hours
>
> ✅ **Answer: It took 2 hours.**

As you can see, the model is now able to explain its reasoning process, forcing it to think through the problem step by step. This not only helps it arrive at the correct answer, but also makes it easier for you to understand how it arrived at that conclusion.

## Why CoT Works: Under the Hood

GPT models are designed on a simple high-level principle: they predict the next token (word or part of a word) in a sequence based on the tokens which came before it. For example, if the existing tokens are "The quick brown fox jumps over the lazy", the model could predict the next token to be "dog" since it is statistically likely to follow the previous tokens. CoT reasoning exploits this "autoregressive" nature of the model by guiding it to generate a sequence of tokens that represent its reasoning process. In our example using the time to drive 60 miles, the model is required to explicitly generate output, i.e. tokens, explaining its reasoning process, and these tokens are then used continuously generate the tokens that follow them and so on. This structured token generation increases the likelihood of accuracy, especially for multi-step reasoning tasks.

## When _Not_ to Use CoT

There are some use cases where CoT reasoning may be unhelpful or even have a negative impact:

- Simple tasks which don't require reasoning, e.g. "What is the capital of Georgia?"
- Tasks where reasoning is non-critical and may interfere with user readability, such as in an application or UI
- Simpler reasoning tasks where the model is already tuned well for reasoning, such as basic math problems, e.g. "What is 2 + 2?"

Chain of Thought reasoning is not a universal solution, and it is important to consider the specific context and requirements of your task before deciding whether to use it. In some cases, other techniques (such as simple direct answer zero-shot prompts, e.g. "What color is the sky?") may be more effective and quicker to write. Zero-shot prompts are especially effective for factual or widely seen questions in the model’s training data which may not require reasoning.

## Conclusion

I hope you have a better idea of how to use Chain of Thought reasoning in your own work. This technique can be a powerful tool for improving the accuracy and usability of LLMs, especially in tasks that require logical deduction or multi-step reasoning. By prompting the model to break down problems into smaller steps, you can help it arrive at the correct conclusion and make it easier to troubleshoot any issues that arise.

Thanks for reading!

## Additional Resources

[Jason Wei (Google) 2022 paper on CoT](https://arxiv.org/abs/2201.11903)
