---
title: ChezMoi shortcuts
slug: chezmoi-shortcuts
date: "2021-05-05 17:58:52"
category: snippet
tags: ["dotfiles", "alias"]
---

Chezmoi is a great tool for managing dotfiles. This is a shortcut to update the source state based on local changes.

`chezmoi status | cut -c 4- | xargs -I % -p sh -c 'chezmoi add ~/%'`

[Github](https://github.com/twpayne/chezmoi)
