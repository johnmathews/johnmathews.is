---
title: Bat
slug: bat
date: '2021-12-03 12:00:34'
category: Technical>Developer-Tools
tags: ['cli']
---

[Bat](https://github.com/sharkdp/bat#adding-new-themes) is like cat, but has
syntax highlighting and git integration. It integrates with all the tools, there are examples on the GitHub readme.

## Commands:

- List languages for syntax highlighting: `bat --list-languages`
- Show configuration file location: `bat --config-file`
- Show configuration directory: `bat --config-dir`
- List themes: `bat --list-themes`
- Generate the configuration file: `bat --generate-config-file`

## `~/.zshenv`:

```zsh
export BAT_CONFIG_PATH="$HOME/.bat.conf"
```

## Configuration settings:

Specify the theme:

```
--theme="Dracula"
```

Map file types to syntax:

```
--map-syntax ".ignore:Git Ignore"
--map-syntax ".py:Python"
--map-syntax ".json:JSON"
--map-syntax ".zsh*:Bourne Again Shell (bash)"
--map-syntax ".js:JavaScript"
```
