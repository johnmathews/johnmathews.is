---
title: Performance Optimizations for the shell prompt
slug: performance-targets
date: '2021-05-28 13:48:59'
category: technical.snippet
tags: ['shell']
---

Something should happen within 100ms of the users input in order to maintain a
feeling of responsiveness.

If something happens within 50ms of the trigger event, it will feel almost
instant.

Also, checkout [hyperfine](https://github.com/sharkdp/hyperfine) for performance
benchmarking.

Lots of useful tips in the original [blog post](https://seb.jambor.dev/posts/performance-optimizations-for-the-shell-prompt/).
