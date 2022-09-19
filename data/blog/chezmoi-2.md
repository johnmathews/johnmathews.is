---
title: >
  Chezmoi: Part 2
slug: chezmoi-2
date: "2021-12-02 10:57:42"
category: Technical/Developer Tools
tags: ["automation", "dotfiles"]
---

[Chezmoi](https://www.chezmoi.io) is a dotfiles management tool. I wrote about
it [previously](chezmoi) when I almost deleted my
dotfiles and was looking for a better way to manage them.

7 months later and I'm happy I chose Chezmoi. I'm managing dotfiles across 3
machines and 2 OS's currently. I have a basic workflow and it seems like a good
time to see if there are further benefits to be found. This is a review of my
workflow and some notes on how to use the tool more effectively.

I've aliased `chezmoi` to `cm` in this article and on all my machines.

Including files or subdirectories from other projects is really interesting and
something I didn't realise was possible. It goes a long way to bridging the gap
between simple dotfiles management and something more powerful like Ansible.

Next steps (in another 7 months?) would be to use [templates](https://www.chezmoi.io/docs/how-to/#use-templates) and make use of
the secrets management capabilities.

## Setup

1.  When you `cm init` you create a new git repo in `~/.local/share/chezmoi`.
    This is where the _source state_ lives. It's a repo, so you can do all the
    usual vcs things you'd expect, but cm won't do it for you (by default).

1.  `cm edit-config` opens the configuration file for editing.

## Include dotfiles from other projects

1.  Use `.chezmoiexternal.toml` to tell cm to import dotfiles from a different
    repo. See below for an example

1.  You can't include subdirectories from other projects like `oh-my-zsh`
    because you can't use git submodules (cm uses its own format for the source
    state).

1.  The section heading (the part with square brackets) is the destination path
    of the object being imported.

1.  `type` is "archive" for collections of files (projects) and "file" for
    individual files. If the url is a tarball then cm will unpack it.

1.  The default value for `refreshPeriod` is never. Cm caches downloaded archives locally to
    avoid downloading them every time `apply` is called. To force a refresh, call
    `cm --refresh-externals apply` or `cm -R apply`.

1.  When using `Oh My Zsh`, make sure you disable auto-updates by setting
    `DISABLE_AUTO_UPDATE="true"` in `~/.zshrc`. Auto updates will cause the
    `~/.oh-my-zsh` directory to drift out of sync with cm's source state.
    Refresh the downloads (by setting `refreshPeriod`) to update Oh My Zsh and
    its plugins.

## Adding files and directories

1.  You add a file to cm with `cm add <file>`. This copies the file
    into the source state but changes the name. If the file you want to track is
    `~/.zshrc` then cm will create a file in the source state called
    `dot_zshrc`.

1.  You can `cm add <dir>` just like you can `cm add <file>`. If you copy a
    directory into the source state, the name of the source state copy will be
    prepended with `dot_`, too. The names of the files and dirs inside the
    directory are not changed.

## Which files are tracked, not tracked or ignored

1.  `cm managed` shows a list of manged files

1.  `cm unmanaged` shows a list of unmanaged files. You can add entire
    directories with `cm add`.

1.  `.chezmoiignore` contains a list of files that _won't_ be copied from the
    source directory to the destination when you run `cm apply`. This is the
    opposite of my intuition [[documentation](https://www.chezmoi.io/docs/reference/#chezmoiignore)].

1.  Because `cm apply` can change so much stuff, try `cm apply --dry-run --verbose` first.

1.  `.chezmoiignore` is a template, so you can ignore different files on
    different machines.

## Editing tracked files

`cm diff` will show you what changes would be applied if your ran `cm apply`
from the perspective of the source state (Green ⇒ added to source state).

`cm apply` will overwrite local changes (after prompting for confirmation) with
the copy from the source state.

You can resolve differences if things get messy with `cm merge $FILE`.

There are 4 ways of editing files:

1.  `chezmoi edit $FILE` - opens \$FILE in the editor. `cm edit` will open the
    source state directory. You can also use `cm edit --apply $FILE` to apply
    the changes as soon as you close the file.

1.  `cm cd` and then edit the files directly. Then `cm apply` to apply the
    changes. `cm diff` will show you what changes would be made by running `cm apply`, from the perspective of the source state. (Green means added to the
    source state, red is removed. This is the opposite of my intuition).

1.  Edit the file in the home directory and then re-add it using `cm add $FILE`
    or `cm re-add` (re-add doesn't work with templates). I've created an alias
    to re-add all files that have been changed `cm aa`.

1.  Edit the file in the home directiry and then merge the changes into the
    source state with `cm merge $FILE`.

## Examples

### Importing an entire project:

To import `Oh My Zsh`, the `zsh-syntax-highlighting` plugin, and `powerlevel10k` by putting the following in `~/.local/share/chezmoi/.chezmoiexternal.toml`:

```toml
[".oh-my-zsh"]
    type = "archive"
    url = "https://github.com/ohmyzsh/ohmyzsh/archive/master.tar.gz"
    exact = true
    stripComponents = 1
    refreshPeriod = "168h"
[".oh-my-zsh/custom/plugins/zsh-syntax-highlighting"]
    type = "archive"
    url = "https://github.com/zsh-users/zsh-syntax-highlighting/archive/master.tar.gz"
    exact = true
    stripComponents = 1
    refreshPeriod = "168h"
[".oh-my-zsh/custom/themes/powerlevel10k"]
    type = "archive"
    url = "https://github.com/romkatv/powerlevel10k/archive/v1.15.0.tar.gz"
    exact = true
    stripComponents = 1
```

### Importing a single file from another project

To import `plug.vim` from `github.com/junegunn/vim-plug` into `~/.vim/autoload/plug.vim` add this to
`~/.local/share/chezmoi/.chezmoiexternals.toml`

```toml
[".vim/autoload/plug.vim"]
    type = "file"
    url = "https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim"
    refreshPeriod = "168h"
```

## Source

Most of this was taken directly from the [documentation](https://www.chezmoi.io/docs/how-to/).
