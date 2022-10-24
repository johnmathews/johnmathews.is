---
title: Adding italic text to iTerm2
slug: adding-italic-text-to-iterm2
date: "2022-01-28 10:32:08"
category: Technical>Developer-Tools
tags: ["terminals"]
---

This [article](https://weibeld.net/terminals-and-shells/italics.html) explains
how to enable italic text in iTerm2 and Tmux.

It links to [this article](https://gist.github.com/sos4nt/3187620) which
suggests overriding the existing terminfo entry so that `ssh` uses the correct
(new) profile by default. Otherwise you'd need to pass the correct environment
along with the `SSH` command.

# iTerm2

## Enable support for italic text

```
Preferences > Profiles > Text > Italic text allowed
```

## Create TERMINFO entry with italics support

1\. Create temporary file terminfo with following content:

```
xterm-256color-italic|xterm with 256 colors and italic,
    sitm=\E[3m, ritm=\E[23m,
    use=xterm-256color,
```

2\. Create a new entry in the TERMINFO database

```
tic terminfo
```

3\. Delete the temporary terminfo file

## Bind iTerm2 to new TERMINFO entry

_Preferences > Profiles > Terminal > Report Terminal Type: > xterm-256color-italic_

## Test it

Close and reopen iTerm2, then try:

```
echo `tput sitm`italics`tput ritm`
```

If the output is printed in italicised, then iTerm2 is now capable of printing
italic text.

Also the below command should now output `xterm-256color-italic`

```
echo $TERM
```

# TMUX

## Create a new TERMINFO entry

1\. Create temporary file terminfo with following content:

```
tmux|tmux terminal multiplexer,
    ritm=\E[23m, rmso=\E[27m, sitm=\E[3m, smso=\E[7m, Ms@,
    use=xterm, use=screen,

tmux-256color|tmux with 256 colors,
    use=xterm-256color, use=tmux,
```

2\. Create new entry in the TERMINFO database:

```
tic -x terminfo
```

3\. Delete the temporary terminfo file.

## Bind tmux to new TERMINFO entry

Set the following in ~/.tmux.conf:

```
set -g default-terminal "tmux-256color"
set -as terminal-overrides ',xterm*:sitm=\E[3m'
```

## Test it

Close and reopen tmux, then try:

```
echo `tput sitm`italics`tput ritm`
```

If the output is printed in italicised, then tmux is now capable of printing
italic text. Furthermore:

```
echo $TERM
```

should now output tmux-256color
