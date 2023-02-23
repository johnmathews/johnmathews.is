---
title: Find
slug: find
date: "2021-12-03 13:15:28"
category: technical.snippet
tags: ["fd", "cli"]
---

`fd` is a replacement for `find` with more intuitive defaults.

- Case-insensitive.
- Ignores hidden directories and files.
- Ignores patterns in `.gitignore`.

## Commands

- `fd PATTERN`
- not `find -iname '*PATTERN*'`
- `fd --help`

[repo](https://github.com/sharkdp/fd)
