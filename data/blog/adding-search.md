---
title: Adding Search
slug: adding-search
date: "2021-3-12 17:27"
category: Technical>Web
tags: ["blog", "search", "tinysearch", "web"]
---

I've added search to this blog. Results are generated as you type. Try it by
typing `/` or `cmd-k`.

If you look on the Pelican [plugins](https://github.com/pelican-plugins) index
you'll see that [Tipue search](https://github.com/pelican-plugins/tipue-search)
is the only search tool with a ready-made Pelican plugin, but unfortunately the
project seems to have died and the projects [website](https://tipue.com/) is
now something else.

But searching a static site must be quite a common need and googling for
alternatives gave me a few choices. [Lunr.js](https://lunrjs.com/) seems to be
the most popular, but it also seemed fairly complicated and like it was
probably more than I needed. I went with [Tiny
Search](https://github.com/tinysearch/tinysearch) because it seemed to do what
I needed and was easy to setup. There's even an example for
Pelican blogs.

One hurdle to success was minimising the false positives. The default settings
seem to prioritise keeping the size of the index small (tiny) over giving a
good user experience. Maybe its because the amount of text on my site is
significanly less, or more, than the typical use case. Either way, after
checking the project's issues on Github I found an issue that matched my
problem perfectly. The solution is to increase the tiny_magic variable at build time.

According to the Readme, this requires using a container and building the index
using `docker run...`. Unfortunately the Dockerfile wouldn't complete without
errors. Checking the issues again and adding to the discussion resulted in an
alternative Dockerfile being suggested, which works. Woohoo! I could then build
the search index with a massive tiny_magic value (2048).

Then something weird happened. I write in Vim and I use `fzf` to find and open
files. I realised that `fzf` had stopped working. After some investigating, I
realised it was only not working in the blog project, and that `fzf.vim` calls
the `fzf` CLI tool, which in turn calls the `ripgrep` tool. The underlying
issue was that `ripgrep` wasn't working, and after a few hours (sob) of
debugging, I found out that one of the things that makes `rg` special is that
it ignores stuff in your .gitignore file. Sneakily, and without me noticing,
the Docker image for constructing the tinysearch files had created a
.gitignore file with a single entry. The entry was \*, which selects
everything. So `rg` was ignoring everything, and giving no results. Which
meant I couldn't find and open files.

I still don't know how (or which part of) the Dockerfile does this, so I've
created a .gitignore-master file which contains the correct content, and
after I generate a new search index I replace the new traitorous .gitignore
with the contents of .gitignore-master. I'll come back to it later
when/if I have a better understanding of Dockerfile syntax, or Rust.

Adding search to the site made the content feel a lot closer and more
accessible. Once it was working I immediately wanted to use some keyboard
shortcuts to open the search box and select results. Kind of like
[tailwindcss.com](https://tailwindcss.com/) does it. It feels really fast and
precise.

Googling for some jquery packages, and also some vanilla javaScript showed me
enough to get things working. You can hit `/` or `ctrl-k` or `cmd-k` and bring up a search box
that populates results as you type!

Only whole words are matched unfortunately, but its still a super useful
feature. The search index includes article content as well as article titles
and categories. I'd like to tweak a few of the keyboard shortcut behaviours,
and add the contents of various pages (which aren't articles) to the search
index.

## Update

I've reimplemented search using `fuse.js`. You can read about it [here]({filename}../articles/fuse.md)
