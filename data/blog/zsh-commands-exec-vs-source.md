---
title: >
  Zsh commands: exec vs source
slug: zsh-commands-exec-vs-source
date: "2021-11-09 10:34:10"
category: snippet
tags: ["zsh", "shell"]
---

`source` and `exec` are both built-ins.

`source` evaluates or runs the content of a file. For example, if you `source ~/.zshrc` you
apply the content of the file to the currently running Zsh process. You can
source and valid Zsh code.

`exec` replaces the current shell process with another process. Your terminal
(`tty`) session is running a shell. Replace it with another shell without
launching another tty. It could be
the same shell with different settings or flags.

The `tty` (teletypewriter) command prints the name of the terminal you're using.
