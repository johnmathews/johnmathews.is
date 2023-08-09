---
title: Chezmoi
slug: chezmoi
date: '2021-04-20 11:46:46'
category: Technical>Developer-Tools
tags: ['automation', 'dotfiles']
---

<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

Update: 7 months later, I've written some more detailed notes
[here](more-chezmoi).

# Background

Chezmoi seems to be dotfiles management for power users. Until a few days ago,
when I realised I'd massively broken a lot of things, I'd been putting my
dotfiles in a version controlled directory and using a shell script to generate
symlinks in my home directory.

This had worked really well for several years. It's a great system for
maintaining dotfiles on a single machine. But it's not robust or flexible enough
for managing multiple machines or multiple operating systems.

Also, it's not just files that sit in _$home_ anymore, I need to track
configuration files that live in other places too[^1].

I needed something more robust and flexible than generating symlinks from a
bash script.

# Razor

I think I read somewhere that when purchasing a new appliance you should buy
the cheapest you think you can get away with, and if that doesn't work then get
the best you can afford. Moving from a custom bash script to Chezmoi is an
example of this. My custom bash script was the most basic approach, and it
broke badly. Chezmoi seems like the most heavy duty tool for dotfiles management
I could find.

For example, I think I'm able to encrypt my files using 1Password or similar.
I can use Jinja templates to create scripts for different scenarios. I
don't even know what that means at the moment. I've only scratched the surface
but I'm happily managing dotfiles across different machines and
updating/modifying them safely. Chezmoi (aliased to cm) is free and OSS so I'm
confident it'll be "my" tool for the next few decades. I'm happy to invest a
couple of hours to learn a few new habits and iron out a few
wrinkles[^2].

# One Question

I don't understand why `chezmoi cd` creates a new shell in order to jump into the
Chezmoi directory. Why not simply `cd` into the Chezmoi directory? What's the
advantage/necessity of a new shell?

You have to remember to `exit` after you've done whatever you went there to do,
but my habit is to `cd` or `z ..`. I guess it's nice to exit and then
immediately go back to where ever you were before, but there are other ways of
doing that - you could write the current directory to an environment variable.
It seems unnecessarily complex.

# Command Reference

Update - the notes in my [follow-up](more-chezmoi) are likely much more useful.

1.  Show which files have changed → **cm status**

1.  List of managed files → **cm managed**

1.  List of unmanaged files → **cm unmanaged**

1.  Start tracking a file → **cm add &gt;path&#47;to&#47;file&lt;**

1.  Update a file, add the file again → **cm add ..**

1.  Edit tracked version of file → **cm edit &lt;file&gt;** - don't think I'm going to
    use this, I'd rather edit the source file, test it, and then update using
    **cm add ..**

1.  Differences between local version tracked versions → **cm diff &lt;file&gt;** -
    this tells me which files I need to **cm add** again. This feels clunky and I
    suspect there is a better workflow. Parsing git style diff files is
    horrible.

1.  Clobber local version with the tracked version → **cm apply**

1.  Dry run and see diff between local version and tracked version → **cm -nv apply**

1.  Pull the latest changes from your repo and apply them → **cm update**

1.  Remove a file →

    - Create **.chezmoiremove** in the source directory
    - **chezmoi apply --remove --dry-run --verbose**

1.  Type **cm** instead of **chezmoi** → **alias cm="chezmoi"**

# Links

- [Github](https://github.com/twpayne/chezmoi)
- [Project Site](https://www.chezmoi.io/)

[^1]: For example, every file in `$HOME/.vim/ftplugin/` should be version controlled.
[^2]:
    Happily, it seems like the amount of time required to learn or
    become familiar with a new tool is decreasing. I guess this is to be expected
    as experience increases but nonetheless it's gratifying to realise.<br></br>Dotfiles
    management was a fairly new and interesting concept when I first began
    symlinking into my home directory. It still feels amazing to bootstrap a fresh
    machine and have it feel like home in just a few minutes, but the
    technicalities of it are now familiar.
