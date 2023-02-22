---
title: Split Long Strings
slug: split-long-output-onto-multiple-lines
date: "2021-03-10 23:19:12"
category: t.snippet
tags: ["bash", "linux"]
---

Split long strings (or command outputs) onto multiple lines
Find and replace a particular char (maybe `:`) with a `\n`.

```
... | tr ':' '\n'

... | sed 's/:/\n/g'
```
