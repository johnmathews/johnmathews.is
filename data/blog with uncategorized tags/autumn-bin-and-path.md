---
title: Autumn, BIN and $PATH
date: "2016-12-01 21:53"
Author: John Mathews
category: Technical/Developer Tools
tags: ["unix"]
slug: autumn-bin-and-path
status: published
---

Two small things have been learnt recently: the importance of PATH and
the contents of various BIN folders.

Autumn 2016 has not gone as planned. Whilst studying for a couple of
exams plans were put on hold and hobbies were ceased. Now that life is
returning to normal, I have opportunity to post again.

## PATH

<html>&#36;</html>PATH is a variable (string) which contains a series of folder
locations separated by ":". Each of these folders contains programmes.
When you type the name of a programme into terminal without specifying
its location, the OS looks sequentially in each of the folder locations
listed in <html>&#36;</html>PATH to see if the programme is there, and then executes
it.

## BIN

Bin as in Binary, not Bin as in Trash.

The bin folders contain binary files, which are programmes ready to be
run.

If I run "echo <html>&#36;</html>PATH" from the Terminal, I see 9 folders called bin,
and its only by convention that they contain binaries. They are just
normal folders, which the OS is set to look in when asked to run an
application.

    /Users/John/anaconda3/bin:/Library/Frameworks/Python.framework/Versions/
    3.5/bin:/Users/John/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/
    Library/TeX/texbin
