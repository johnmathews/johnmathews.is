---
title: Git LFS
slug: git-lfs-2
date: "2021-06-11 11:52:59"
category: snippet
tags: ["git", "lfs", "github-pages,"]
---

Key commands

- `git lfs install` (also uninstall)
- `git lfs track "**/*.mp4"`
- `git lfs ls-files`
- `git lfs status`

`track` just updates the `.gitattributes` file.

Commit the .gitattributes file with the tracking configuration before committing
the large files.

`status` or `ls-files` should show the large files in question
before you push the commit that starts tracking the large files.
