---
title: Unison
slug: unison
date: '2021-11-17 14:01:06'
category: technical.snippet
tags: ['syncronization', 'linux', 'macos', 'infrastructure']
---

- If you can `ssh` into the server then Unison should work.
- Install the same version on the client and on the server.

To sync the contents of `dir b` into `dir a`:

```shell
unison -batch -color true <dir-a> ssh://<user>@a<host>/<dir-b>
```

## Setup

1.  Download the binary file with `wget`
1.  `chmod +x &lt;file&gt;`
1.  copy the executable somewhere on your path like `/usr/local/bin`
1.  `unison -doc tutorial` > `remote method` > `remote shell method`
1.  use a filewatcher to sync on change, or use cron to sync every n minutes

You can also use unison to sync files on the same computer.

## References

[gist](https://gist.github.com/asksven/ee38dbe5bdab7e39aa133a1df24dd034)

## Background

Recently I needed to work on a codebase that was on a remote machine whilst
still using my local workflow and developer tools.

Vim's built in `scp://` functionality isn't versatile enough - i wanted to use
`fzf.vim` to search for text across the code base. This led me to `rsync`, `sshfs`,
and eventually `unison`.
