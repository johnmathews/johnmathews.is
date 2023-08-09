---
title: Vim register for yanked text
slug: vim-yanked-text-buffer
date: '2021-05-05 18:00:44'
category: technical.snippet
tags: ['vim', 'text']
---

It's annoying when you delete something and overwrite your yanked text.

Use numbered registers!
`"0` to `"9`

- `"0` contains the most recent yank.
- `"1` contains the most recent deleted text
- `"0p` - paste the most recent yank, even if you deleted something after yanking it
