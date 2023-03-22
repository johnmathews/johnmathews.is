---
title: AI prompt engineering
date: 2023-03-22 15:15:29
category: technical.data
tags: ['ai', 'prompt']
description:
---

A
[blog post](https://danielmiessler.com/blog/response-shaping-how-to-move-from-ai-prompts-to-ai-whispering/?mc_cid=ced72d1077&mc_eid=26f442a5ad)
by Daniel Miessler with a few techniques for increasing the quality of responses from AIs.

1. Persona

   - Tell the AI who you want it to be
   - "you are an X with 'defining characteristic y"

2. Format

   - Tell the AI what output format you want
   - "you produce bullet points with no more than 12 words", "you produce valid JSON", etc

3. Task

   - Give it the thing you want done
   - "Write a summary of this article", "Create a blog post about Joe Blogs using their linkedIn and
     social media accounts"

4. Steps

   - Give the steps you want it to take to complete the task
   - "Break down this input from a journalism standpoint, then look at its entertainment value, and
     then evaluate its humor level"

5. Output

   - Tell it exactly how you want the output to look
   - "I want three sections: Introduction, followed by 2 paragraphs of analysis, Main Points,
     followed by 1 set of 5 bullets, and Takeaways, which gives you 3 things to immediately start
     doing tomorrow"

6. Examples

   - Show 1 - 5 examples of ideal output
   - "Here’s an example poem that you should try to capture the feel of in your responses", "The
     JSON should have this exact format", "The story should have this character to it"

7. Tweaking

   - Tell it what to include or what to exclude
   - "Don’t start with a preamble sentence; just create the output", "Make sure you always
     capitalize the output"
