---
title: Tmux resurrect - restore a particular session
date: 2023-11-26 17:34:26
category: technical.developer-tools
tags: ['tmux']
<!-- image: # /static/images/.png -->
<!-- description: -->
---

[Tmux](https://github.com/tmux/tmux/wiki) has a plugin called
[Resurrect](https://github.com/tmux-plugins/tmux-resurrect) that lets you restore your last session
if you've had to restart your computer. It works alongside a another plugin called
[Continuum](https://github.com/tmux-plugins/tmux-continuum) that automatically saves your Tmux
environment.

It stores session data in `.txt` files at `~/.local/share/tmux/resurrect/` and creates a symlink
called `share` that points to the most recent save file.

When resurrect restores a session, it loads it from `share`. In order to load a different save file,
change what file the `share` symlink points to.

```
cd ~/.local/share/tmux/resurrect
rm last
ln -s tmux_resurrect_20230101T120000.txt last
```

`prefix ctrl-s` will save a session

`prefix ctrl-r` will restore a session
