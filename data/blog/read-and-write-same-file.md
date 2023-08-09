---
title: Read and Write the Same File in Bash
slug: read-and-write-same-file
date: '2021-03-24 23:11:55'
category: technical.snippet
tags: ['shell', 'pipe', 'syntax', 'bash']
---

I tried to read and write the same file in a pipeline, and got caught out by a race condition (why is the file empty?!). Do this instead:

```bash
some_script < file > smscrpt.$$ \
&& mv smscrpt.$$ file || rm smscrpt.$$
```

`||` removes the temporary file if it errors.

`$$` is the process ID and ensures that you always have a unique temporary
file name.
