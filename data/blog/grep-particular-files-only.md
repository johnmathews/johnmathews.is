---
title: Grep only inside particular files
slug: grep-particular-files-only
date: "2021-05-18 13:11:15"
category: technical.snippet
tags: ["grep", "linux"]
---

```bash
grep -inr --include package.json \
    'shortcut": {' . -A 3
```

- It's the `--include` flag that does the important part.
- `-i` → case insensitive
- `-n` → print line number
- `-r` → recursive from starting page
- `.` → start in current directory
- `-A 3` → print the 3 lines below the found line
