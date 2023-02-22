---
title: View a List of Keyboard Mappings in Vim
slug: vim-debug-mapping
date: "2021-05-18 10:37:17"
category: t.snippet
tags: ["vim"]
---

`:map` → show a list of the current keyboard mappings for _normal_, _visual_, _select_ and _operator pending_ modes.

`:map!` → show a list of the current keyboard mappings for _insert_ and _command-line_ mode

Top put all the mappings into a convenient text file:

```vim
:redir! > vim_maps.txt
:map
:map!
:redir END
```

[source](https://stackoverflow.com/questions/2483849/detect-if-a-key-is-bound-to-something-in-vim)
[another source](https://vi.stackexchange.com/questions/7722/how-to-debug-a-mapping)
