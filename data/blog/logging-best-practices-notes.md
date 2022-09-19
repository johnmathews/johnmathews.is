---
title: Logging Best Practices
slug: logging-best-practices-notes
date: "2021-10-07 11:24:48"
category: Technical/Engineering
tags: ["programming", "back-end,"]
---

[TOC]

A great [aricle](https://tuhrig.de/my-logging-best-practices/) by someone called
Thomas about how to build useful logs. I find the inclusion of examples to be
very useful, and the background information in the introduction is a nice
addition.

# Past tense only

- Most stuff should be past tense.

- Say what happened, not what is about to happen. This makes it much more explicit and easier to read. The reader
  doesn't need to infer anything.

# Separate messages and parameter values

- Think about how you might search for parameter values - if they are
  interspersed between normal English sentences it becomes harder to search for.

- Also consider readability if the parameters are very long or harder to read
  literally.

# Warnings are for things that worked

- The thing was done, but not perfectly.

# Errors are for things that did not work

- The thing wasn't done.

# Info is for business

- The info log looks like a book and reads like a story.

- It tells you what happened, but not necessarily how it happened.

- `User x signed up`
- `User x bought an item`
- `User x navigated to settings`

# Debug is for technology

- It tells you how stuff happened.

- `Saved user credentials`
- `Started cron job`
