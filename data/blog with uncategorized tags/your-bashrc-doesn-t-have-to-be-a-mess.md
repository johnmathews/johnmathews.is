---
title: Your .bashrc doesn't have to be a mess
slug: your-bashrc-doesn-t-have-to-be-a-mess
date: "2021-06-11 11:14:41"
category: snippet
tags: ["bash", "shell", "zsh,"]
---

[Blog post](https://write.as/bpsylevc6lliaspe) demonstrating how to split a
`.bashrc` file into "submodules" and keep it maintainable.

```bash
BASHRC_D=~/.config/bashrc.d
[[ -r ${BASHRC_D}/bootstrap ]] && . ${BASHRC_D}/bootstrap
```

```bash
for file in ${BASHRC_D}/*.sh; do
  [[ -r $file ]] && . $file
done
unset file
```
