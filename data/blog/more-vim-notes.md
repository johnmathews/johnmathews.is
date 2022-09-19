---
title: More VIM Notes
slug: more-vim-notes
date: "2021-5-10 10:44"
category: Technical/Developer Tools
tags: ["tips", "vim"]
---

[TOC]

### Quickfix list

- A quickfix list is a set of positions in one or more files
- A quckfix list is global. Not local to a particular buffer.
- A quickfix list is _not_ the quickfix window. The window can show the list. The list is a datastructure.
- A changelist is local to its buffer.

### Registers

- `0` contains the content of the last yank
- `1`-`9` contains the content you've deleted or changed

- `_` blackhole register - send something here and it wont change any other register.
- `-` contains any deleted or changed content smaller than 1 row.
- `%` contains the name of the current file.

### Expression register

1. In insert mode, `<C-r>=`.
2. Type any valid vimscript.
3. The output is inserted into the buffer.

### Substitutions

- `:&&` → repeat the last substitution command with its flags
- `:~` → repeat the lat substitution with the same replacement, but with the last used search pattern

### Command line

- `q:` - opens the command line window. Good for yanking and viewing previous commands
- `:<C-f>` - open command history list
- `:UltiSnipsEdit` - opens the ultiSnips file for the current buffers filetype. See which snippets are defined.

### Delete stuff without leaving insert mode:

- `<C-h>` - same as backspace
- `<C-w>` - delete previous word
- `<C-u>` - delete everything before cursor (on same row)
- `<C-d>` or `<C-t>` - (un)indent a row
- `<C-e>` - delete next word

### Text objects

- `gf` - edit the file at the file path under the cursor (useful for netrw?)
- `gx` - open the file at the file path under the cursor (useful for netrw?)
- `[m`, `]m` - move to the start or end of a method
- `@:` - repeat the last command
- `>>` will indent a line. `.` will repeat the operation, so `>>..` would indent
  a line 3 times.

  You can use this along with a count, which will do the indention for `n` number
  of lines (with the current line being the top line). `3>>..` will indent 3
  lines 3 blocks to the right.

### Screen Movement

- `<C-y>` - up one line, and moves the cursor if it would go off the screen
- `<C-e>` - down one line, and moves the cursor if it would go off screen
- `<C-f>` - down one page, with cursor at top of screen
- `<C-b>` - up one page, with cursor at bottom of screen

### Sources

1. _[The Valuable Dev](https://thevaluable.dev/vim-advanced/)_ has a lot of great tips.
2. _[Vim for Python](https://www.vimfromscratch.com/articles/vim-for-python/)_ has some great notes on linting and code completion plugins that I've either copied or was more or less doing already.
