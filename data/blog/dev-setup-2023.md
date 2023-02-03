---
title: My code editor setup in 2023
date: 2023-02-03 15:36:36
category: Technical.Developer-Tools
tags: ["neovim", "tmux", "vim"]
---

# Background

I've used [Vim](https://www.vim.org/) and then [Neovim](https://neovim.io/) since I started
programming ~5 years ago[^1]. I like the feeling of control that comes from using a completely
open-source tool chain, and to be honest I don't know what I'm missing when I think about using VS
Code or an alternative editor.

I like seeing what new plugins are created, and the new features and utility they bring. Neovim has
some buzz around it at the moment, and its fun to be around people who enjoy their code editing
experience.

I use Neovim from within Tmux. I have multiple sessions running - one session for each project or
thing I'm working on - and never need to close anything. I can have ten or twenty instances of
Neovim open, and its still instantaneous to open others or close and reopen.

It's also convenient being able to run a code-editor in the same terminal window, right next to a
shell that is running the code. You can also run shells from within Neovim (or vim) to execute tests
or build code.

# Context - why it matters

I have in the past tried to use (Neo)vim distributions, like LunarVim, and have always found them
too restrictive. I like my setup and I don't want to learn a new way of doing a thing if I can help
it. Ideally editing, navigating and exploring code would be intuitive and the only thing to think
about would be the code itself, not the tooling that lets me access it. I think that my Neovim setup
is good at this, and will continue to get better as time passes.

To me, programming is a craft motivated by the satisfaction and fun found in being creative. My
editor setup is like a workshop where I practice my craft. Its personal, and an environment that I'm
familiar with. This is different to, for example, a simple tool like a hammer that serves a single
purpose and should be interchangeable with other hammers if the need arises. I might have a
favourite hammer, but a generic hammer will do. Not so with a developer environment, if I want to
keep on enjoying the experience of getting better.

# My setup

- At the end of 2021 I began to convert my [previous vim setup](/blog/vim-for-large-projects) to
  Neovim and was using Neovim from January 2022.
- By the end of 2022 I had a setup I was super comfortable and familiar with, and had smoothed out a
  few rough edges. The setup has no black boxes or scary parts.

  The 'complicated' or 'magical' features have now been tamed:

  - Adding 'sources' to the [CMP](https://github.com/hrsh7th/nvim-cmp) completion engine, including
    snippets, [GitHub copilot](https://github.com/zbirenbaum/copilot-cmp), and LSP.
  - The LSP tool-chain, using [mason](https://github.com/williamboman/mason.nvim) ,
    [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim),
    [toggle-lsp-diagnostics](https://github.com/WhoIsSethDaniel/toggle-lsp-diagnostics.nvim) , and
    [LSP-Saga](https://github.com/glepnir/lspsaga.nvim) .

- I've been using GitHub copilot, which is usually helpful and occasionally jaw-dropping.
- Overall the change from Vim to Neovim is a big improvement - I can't imagine going back.
  - The setup seems more flexible, performant, feature rich and easier to maintain.
  - The tooling seems faster and more capable.
  - Innovation and new features seem to be being added regularly and quickly.
  - Learning Lua feels useful and pleasant, compared to Vimscript which seemed like something to
    avoid as much as possible.
- I still have a hacky workaround for my occasional flaky colorscheme problems

## Favourite plugins

- [LSP-Saga](https://github.com/glepnir/lspsaga.nvim) makes LSP stuff seem more usable and less
  delicate
  - `lsp-finder` is great
  - `lsp-outline` could be great, if it was more reliable
- [toggle-lsp-diagnostics](https://github.com/WhoIsSethDaniel/toggle-lsp-diagnostics.nvim) is useful
  because it provides an easy way to toggle diagnostics, (not all my projects play nicely with LSP.)
- [mason](https://github.com/williamboman/mason.nvim) and
  [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim), cover every linting, formatting, or
  LSP-server I could want. Their interfaces make sense to me, so now I have lovely code almost all
  the time.
- [auto-session](https://github.com/rmagatti/auto-session) makes session management easy without
  having Session.vim files as clutter

## Things I would miss

This is a list of features I enjoy using and find helpful

- The collection of plugins that let me format, lint and explore code -
  [mason](https://github.com/williamboman/mason.nvim),
  [LSP-Saga](https://github.com/glepnir/lspsaga.nvim),
  [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim).
- [auto-pairs](https://github.com/windwp/nvim-autopairs) and
  [matchtag-always](https://github.com/Valloric/MatchTagAlways) - automatically close tags,
  quotations, brackets, and jump to the other one easily.
- [nvim-tree](https://github.com/nvim-tree/nvim-tree.lua) - its a file explorer that does what it
  does well - navigate, create, move, rename, hide/unhide git-ignored or hidden files. Its not that
  different to `nerd-tree`, but I much prefer this approach to a file explorer than the
  alternatives.
- [whichkey](https://github.com/folke/which-key.nvim) - makes learning and finding new features much
  easier.
- [close-buffer](https://github.com/Asheq/close-buffers.vim) and
  [smartq](https://github.com/marklcrns/vim-smartq) make quitting and closing buffers a little more
  intuitive for me.

[^1]:
    Now that I've written that, it seems really odd - how and why did I go from nothing to vim.. How
    did I even know that vim was an option, and not choose something obvious like VS Code. I cannot
    remember. I didn't go straight from excel to python-edited-vim though, I spent some time using
    jupyter (or iPython) notebooks learning data-analytics first.
