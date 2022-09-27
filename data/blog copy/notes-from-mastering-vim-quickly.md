---
title: Notes From "Mastering Vim Quickly"
slug: notes-from-mastering-vim-quickly
date: "2021-1-21 16:22"
category: Technical/Developer Tools
tags: ["uncategorized"]
---

Contents:
<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

## Verbs

1.  `s` - delete char under cursor and enter Insert Mode.
2.  `r` - replace char under cursor.
3.  `c/hello` - change until next occurrence of 'hello'

## Registers

12. `"ayy` yank the entire row into register `a`.
13. `"Ay` yank to register A and append the new text to the existing contents of
    the register.
14. `:registers` - preview the contents of your registers.

## Insert Mode

2. `<C-W>` - delete back one word.
3. `<C-U>` - delete back to the start of the line or start of current insert.
4. `cgn` - if you are searching for a word (either by using `/` or `*` or `#`)
   and you want to change each instance of the search result, use `<verb>gn` to
   _change_ or _delete_ and then go to the next result. This will let you use
   the `.dot` operator to repeat both the steps (moving and changing).
5. `<C-R> 0` - paste. `<C-R><C-P>0` if there are new-line chars causing
   trouble.

## Normal Mode

1. `<C-A>` or `<C-X` increase or decrease a number.

## Command Mode

1. `set ft?` - find out which filetype is loaded.

## Visual Block Mode `<C-V>`

1. Select a column of numbers you want to increment, then `g<C-A>` will turn
   them into an incremented list.

## Ranges

1. `:put =range(1,10)` - insert a list of ascending numbers.
2. `:for i in range(1,100) | put ='192.168.1.'.i | endfor` - use a loop to
   generate a long list.

## Searching

1.  `g#` or `g*` for partial matches, like `#` or `*` for exact matches.
2.  Search for the word under the cursor, or similar:
    1. Press `/`.
    2. `<C-R>` `<C-W>` - this will copy and paste the word under the cursor
       into the search box. Edit it as necessary.
    3. After you've done your search, `<C-o>` to jump back to where your cursor
       was before.
3.  Find and replace whole words only: `:s/<old_word\>/new/g`
4.  Find and replace either old-word1 or old_word2: `:s/(old_word1\|old_word2\)/new/g`
5.  `g <C-G>` - show some stats about current bugger - word count, line count,
    char count.

## Undo

3.  `g-` and `g+` - undo branches.
4.  Under changes within a period of time:
    - `:earlier 2d` - undo changes in the last 2 days
    - `:later 5m` - redo all changes in the last 5 minutes
    - `:earlier 3f` - undo all changes in the last three buffer writes
    - `s` seconds, `m` minutes, `h` hours, `d` days, `f` saves
5.  `:g/my_string/normal @a` - Use the global command to execute macro `a` on
    all lines of the current buffer containing string 'my_string'
6.  `:g/good/s/bad/ugly/g` - For every line containing “good” substitute all
    “bad” with “ugly”

## Splits

14. `<C-W> r` - rotate the splits from left to right but only if they are split
    vertically. `<C-W> R` - rotate the splits from right to left. `<C-W> H` -
    move the current split to the far left and make it full height. `<C-W> J` -
    move the current split to the bottom of the screen and use the full width.
15. `:only` - close all splits except the current split.

## Macros

16. `:g/pattern/norm @o` - do the macro stored in buffer `O` on all lines that
    match the pattern "pattern"

## Other

2.  `<C-O>` in Insert Mode will jump you into Command Mode for one command only
    and then put you back into Insert Mode automatically.
3.  The `.dot` command only repeats commands that changes the buffer content. It
    wont repeat navigation commands.
