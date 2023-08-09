---
title: Arrow syntax in bash
slug: arrow-syntax-in-bash
date: '2021-04-01 22:59:00'
category: technical.snippet
tags: ['bash', 'syntax']
---

`bar << foo` bar will stop reading input when it reached "foo".

`bar <<< "foo"` foo is all the input. bar wont run interactively.

`bar < <(foo:list)` process subscription. Kind of like piping in the output of multiple commands.

[Stack Overflow](https://askubuntu.com/questions/678915/whats-the-difference-between-and-in-bash)
