---
title: alias to real
slug: alias-real
date: '2021-04-20 22:40:09'
category: technical.snippet
tags: ['macos', 'linux', 'cli', 'bash']
---

Make aliased files the real file

```bash
for f in $(find . -type l -maxdepth 1);
    do cp --remove-destination $(readlink $f) $f;
done;
```
