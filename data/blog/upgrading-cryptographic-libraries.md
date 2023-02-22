---
title: Upgrading Cryptographic Libraries
date: "2021-07-10 11:17:16"
category: t.snippet
tags: ["hashing", "versioning"]
---

[Blog post](https://gcollazo.com/eventually-you-will-need-to-upgrade-the-crypto/) about how to make it easier to upgrade a cryptographic or hashing library.

Django encodes passwords for database storage like this:

```text
<algorithm>$<iterations>$<salt>$<hash>
```

Interestingly, Giovanni Collazo emphasises that we should **design systems for
change**, which initially seems pretty close to contradicting **YAGNI**, but the
answer lies in the context.
