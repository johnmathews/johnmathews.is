---
title: zsh suspend or push function
slug: zsh-suspend-or-push-function
date: "2021-11-05 11:24:01"
category: technical.snippet
tags: ["zsh"]
---

In zsh you can suspend a command whilst typing it.

This clears the current line, lets you run another command, and then when it
finishes the original unfinished text is put back.

This is useful if whilst typing a command you realise you need to run another
command first, like:

- `ls` to check the name for an argument.
- creating a location before moving something into that location.
- checking `man` or `tldr` for a command flag.

Zsh has built-in functions `push-line` and `push-input`.

[blog post](https://sgeb.io/posts/bash-zsh-half-typed-commands/) and also this [SO answer](https://unix.stackexchange.com/a/10851/235350)

[zsh widgets](https://sgeb.io/posts/zsh-zle-custom-widgets/)
[zsh documentation](https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html#Zle-Widgets)
