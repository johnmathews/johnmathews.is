---
title: nohup and Background Processes
slug: nohup-and-background-processes
date: '2021-3-2 13:10'
category: Technical>Developer-Tools
tags: ['uncategorized']
---

# Stop stuff stopping

If you run a command in a terminal session and the terminal session is
disconnected, then the processes running in it will also be terminated.

I discovered this when I was trying to download a ~500GB database
overnight. I logged in the next morning expecting to see a completed download, but
found I only had half the file.

# Use `nohup` to ignore `HUP` signals

One solution to this seems to be to use `nohup`, a command that
ignores the `HUP` signal. It stops your programme from stopping if the terminal
session its running in is stopped.

By convention, the `HUP` signal is the method used by a terminal to warn
dependent processes that it is about to logout.

You probably want to run `nohup` in the background. You might want to prevent
it from creating `nohup.out`.

# Close or redirect fd0 - fd2

On Linux, `nohup` automatically closes `stdin`. If you're using MacOS or BSD
this doesn't automatically happen, so you might want to redirect it yourself.
This is because if a background process tries to read anything from `stdin`
then it will pause itself whilst it waits for you to bring it to the foreground
and type some input. This is probably a waste of time.

If `nohup` detects that you have redirected `stdout` and `stderr` then it won't
create `nohup.out`.

As with all commands, if you put `&` at the end of the command, it will run in
the background. You can bring it to the foreground by running `fg`, or see a
list of jobs by running `jobs`.

If you redirect input to /dev/null (`</dev/null`) you will stop the program
from receiving keyboard (stdin) input, but you won't prevent it from accessing
the terminal directly. Also you haven't removed the program from the shell's
process group.

# Stopping signals using `disown`

If you want to remove a program from the shell's process group, then
immediately after you've run the command to start your programme, run `disown`
with no arguments. This will make the background process no longer associated
with the shell job and it wont have any signals forwarded to it by the shell.

A `disown`ed process gets nothing (no signals) sent to it by the shell. But
without a `nohup` it will still be sent a `HUP` signal sent via other means,
such as a manual `kill` command.

A `nohup`ed process will ignore any and all `HUP` signal, no matter how they
are sent.

[Source](https://stackoverflow.com/questions/10408816/how-do-i-use-the-nohup-command-without-getting-nohup-out)

# Related

## `w` is a combination of `who`, `uptime`, and `ps -a`.

Use `w` to see who is logged in and what they are doing. It summarises who is
logged in, what they are currently doing, and the load of the current
activities.

## Process Groups

A collection of one or more processes. It's used to control the distribution of
a signal. When a signal is directed to a process group, the signal is delivered
to each process that is a member of the group.

## Sessions

A collection of one or more process groups. A process may not create a process
group that belongs to another session. A process is not permitted
to join a process group that is a member of another session. A process
is not permitted to migrate from one session to another.
