---
title: Chezmoi commands
slug: chezmoi-commands
date: '2021-11-05 17:03:37'
category: technical.snippet
tags: ['dotfiles', 'tools', 'productivity', 'developer']
---

Chezmoi is a dotfiles manager.

- `chezmoi diff` - see the difference between the current state of your local dotfiles compared against the checked-in versions.
- `cm aa` - to update chezmoi with all your local changes.

```zsh
alias -g aa="status | cut -c 4- | xargs -I % -p sh -c 'chezmoi add ~/%'"
```
