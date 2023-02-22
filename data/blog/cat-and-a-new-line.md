---
title: >
  `cat` and a new line
slug: cat-and-a-new-line
date: "2021-03-5 23:21:43"
category: t.snippet
tags: ["cat", "linux", "bash", "shell"]
---

If you're `cat`-ing a file and the bash prompt doesn't start on a new line (cos
the file you displayed using cat doesn't end with a new line char) the
following will fix it:

`cat <filename> ; echo`
