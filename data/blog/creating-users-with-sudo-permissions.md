---
title: creating users with sudo permissions
slug: creating-users-with-sudo-permissions
date: "2021-03-04 23:25:50"
category: snippet
tags: ["sudo", "linux", "user", "admin"]
---

```bash
adduser -m <username>
usermod -aG sudo <username>
```

CentOS:

```bash
adduser -m <username>
passwd <username>
usermod -aG wheel <username>
```

(wheel is a usergroup with sudo permissions)
