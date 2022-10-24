---
title: >
  >
  Data Science vs Web Development: Larger Code Bases
slug: larger-code-bases
date: "2021-1-14 13:40"
category: Technical>Developer-Tools
tags: ["uncategorized"]
---

## Code Structure

One of the most immediate and basic differences between working as a data
scientist or as a web developer is the number of files the codebase
is spread across and the amount of code within each file.

Web applications tend to be very modular - there are a lot of different things
going on in a modern web app and generally they all need to be able to be
modified or updated independently of each other. This requirement encourages
modular code base architecture with the code broken down into testable units.

When working on a data science project you often have a well defined and quite narrow pipe line. Each stage of a pipeline has well defined inputs and outputs.

This seems to have the consequence of making data science projects tend towards a handful of files each with a substantial amount of unique (not boilerplate) code. In web development there seems to be more boilerplate, many more
files spread across a tree of directories, and the average number of lines of code per file is significantly lower.

## IDE features

These differences mean that code organization tools and IDE features play very
different roles within each industry. In web development you really need to be able to jump between different files (or buffers) quickly, and search for text across multiple files. Writing idiomatically becomes more important, and writing code within discreet testable units becomes essential so that things don't break without being noticed.

In data science, linting feels more optional, and searching for text within methods or functions outside the current module is rarer.

I didn’t appreciate this until I paused my work as a Data Scientist and began building non-trivial web apps.
