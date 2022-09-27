---
title: Globbing
slug: globbing
date: "2021-05-10 16:12:25"
category: snippet
tags: ["linux"]
---

- `????` → 4 chars
- `*` → any number of chars
- `[:upper:]` ⇔ `[A-Z]` same for `[:lower:]` and `[:digit:]`
- `[:alpha:]` ⇔ `[a-zA-Z]`
- `[:alnum:]` ⇔ `[a-zA-Z0-9]`

- `ls -l [a-d]` → part of a range
- ^ and &#36; works like in regex
- `la a*.{doc,docx}` → OR
- `ls a*.(doc|docx)` → OR
