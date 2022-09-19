---
title: File Descriptors and /dev/null
slug: file-descriptors
date: "2021-3-2 11:36"
category: Technical/Developer Tools
tags: []
---

## /dev/null

In Linux everything is a file, including virtual devices like keyboards. Processes
(programmes) can request access to or from these devices.

The only difference between these virtual device "files" and real files, is
that for a virtual device the OS generates the data that goes into the file,
instead of reading the data from storage.

`/dev/null` is a virtual device that looks like a file and is used to write
output into a black hole that is discarded, lost forever and never seen. It
isn't written to the terminal.

## File Descriptors

File descriptors are integer values assigned to a file.

- **stdin** has a file descriptor of 0
- **stdout** has a file descriptor of 1
- **stderr** has a file descriptor of 2

Two outputs are generated whenever a CLI is run `stdout` and
`stderr`. By default, both these data streams are associated with the
terminal. You can use file descriptors to redirect them.

If a command exits successfully, the exit status is 0.

If it exits unsuccessfully, the exit status will be something else.

If you don't specify which file descriptor you want to use, bash will use
`stdout` by default.

The following redirects `stdout` away from the terminal and into `/dev/null`.

```bash
$ echo “Hello World” > log.txt
```

This will redirect `stderr` into a file:

```bash
$ asdfadsa 2> error.txt
```

If you run a command that generates lots of error messages along with "good"
messages, you can redirect all the error messages (`stderr`) into `/dev/null`
so that you can only see the useful `stdout` messages. e.g.:

```bash
$ grep -r hello /sys/ 2> /dev/null
```

If you want to run a command and only see the errors, (`stderr`) then you can
filter out all the `stdout` by redirecting the `stdout` messages to
`/dev/null`:

```bash
$ ping google.com 1> /dev/null
```

## Redirect all output into /dev/null if you want a command to run quietly,

Redirect all the output. The command below redirects `stdout` to `/dev/null`
(the default file descriptor is 1 if it isn't specified) and then redirects
file descriptor 2 into file descriptor 1.

```bash
$ grep -r hello /sys/ > /dev/null 2>&1
```

## Read input from a file instead of the terminal

```bash
0<infile
```

## Direct stderr to append to a particular file

```bash
2>>logfile
```

## Combining file descriptors

`2>&1` means send `stderr` wherever `stdout` is going. This means that you've
combined `stdout` and `stderr` into one data stream and you can't separate them
anymore. It also means you can pipe `stderr` the same as you can `stdout`.

# Input

You can redirect `stdin` similarly. If you run `</dev/null` then if the program
attempt to read from `stdin` then it will get end-of-file.

The merge (or redirect) syntax (for example `<&2`) won't work, because you can
only redirect in the same direction.
