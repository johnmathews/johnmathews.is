---
title: Tmux sessions
slug: tmux-sessions
date: "2021-12-03 13:14:26"
category: snippet
tags: ["tmux", "cli"]
---

- List of sessions: `<prefix> s`
- Last session: `<prefix> Z`
- Rename session: `<prefix> $`
- Rename window: `<prefix> ,`

- Previous session: `<prefix> (`

For last session I used the following key bind:

```
bind Z switch-client -l
```
