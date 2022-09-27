---
title: Managing environment variables with Direnv
slug: direnv
date: "2022-01-28 17:23:51"
category: Technical/Developer Tools
tags:
  ["cli", "environment-variables", "project-management", "direnv", "pyenv", "virtual-environments"]
---

## Background

`Direnv` is a utility to load and unload environment variables automatically as
you navigate in and out of directories. It can also hook into pyenv to load
and unload virtual environments.

Global config for direnv exists in `~/.config/direnv`. This is where you put
the additional pyenv commands.

You need to create a `.envrc` file in the project root which you want to trigger
the virtualenv activation. E.g.:

It works by checking for the existence of a `.envrc` or `.env` file in the
current or parent directories. If the file exists and is authorized then it's
loaded into a **bash** subshell, and all exported variables are then captured by
direnv and made available to the current shell.

It can also hook into pyenv to load and unload virtual environments.

Direnv is fast enough to be unnoticeable on each prompt, because its compiled
into a single static executable. It is language agnostic.

## Config

Global config for direnv exists in `~/.config/direnv`. This is where you put
the additional pyenv commands.

The project's [wiki](https://github.com/direnv/direnv/wiki/Python#pyenv-virtualenv)
contains instructions for setting up direnv with pyenv, pyenv-virtualenv and
other python tools, and tools for other languages

You need to create a `.envrc` file in the project root which you want to trigger
the virtualenv activation. E.g.:

```bash
pyversion=3.10.0
pvenv=blog

use python ${pyversion}
layout virtualenv ${pyversion} ${pvenv}
layout activate ${pvenv}
```

## References

A [useful gist](https://gist.github.com/ZhangChen199102/da3133fc05e3b03afab405fdc3152fb3)
