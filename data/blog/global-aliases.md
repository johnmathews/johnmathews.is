---
title: Global Aliases
slug: global-aliases
date: '2021-05-05 18:02:11'
category: technical.snippet
tags: ['alias', 'linux']
---

If you want to alias a bunch of arguments for a command, use global aliases:

```bash
alias -g foo="some complicated options"
```

`grep some complicated options`

becomes: `grep foo`

[https://www.thorsten-hans.com/5-types-of-zsh-aliases/](https://www.thorsten-hans.com/5-types-of-zsh-aliases/)
