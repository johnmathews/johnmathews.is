---
title: Unison helper
slug: unison-helper
date: "2021-11-23 15:09:46"
category: Technical>Developer-Tools
tags: ["linux", "syncronization"]
---

[Unison](https://www.cis.upenn.edu/~bcpierce/unison/) is a file synchronization
tool that works across operating systems. It can sync in both directions and
works for collections of directories and files.

I wanted to sync projects between my local machine and a dev machine reliably
and simply. Using git to push to an origin and then pull from the other
side wasn't simple enough.

Unison can power the synrconization, but I wanted some nice convenient way to
run the syncronization steps for an entire project, even if I were in a
subdirectory. I also wanted the location of the project on the other machine to
be found automatically, so that I didn't need to think about paths and couldn't
accidentally move files to the wrong location.

With that in mind, I decided that:

1.  The project root is the same as the git root. The git project root can be found using: `localProjectRoot=$(git rev-parse --show-toplevel)`
1.  The location of the project on the remote dev-box should be specified in
    some configuration file. I decided to create a `.remoteprojectroot` file the project's (local) root directory: `remoteProjectRoot=$(cat $localProjectRoot/.remoteroot)`

I then created the following function which lets me run `uni` from
anywhere within the project on my local machine, and have the project state
synced to the remote dev-box.

```shell
uni() {
  host=<host>
  user=<user>
  localProjectRoot=$(git rev-parse --show-toplevel)
  remoteProjectRoot=$(cat $localProjectRoot/.remoteroot)
  echo "Local Project Root: "$localProjectRoot
  echo "Remote Project Root: "$remoteProjectRoot
  unison -batch -color true $localProjectRoot ssh://$host@$user/$remoteProjectRoot
}
```

TODO:

1.  Stop syncronization if `remoteProjectRoot` can't be found.
