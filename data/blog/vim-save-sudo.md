---
title: vim save sudo
date: '2021-04-17 22:44:10'
category: technical.snippet
tags: ['vim', 'macos', 'linux']
---

Save (write) a (read only) Vim file with sudo when you opened it without sudo-ing:

`:w !sudo tee % > /dev/null`
