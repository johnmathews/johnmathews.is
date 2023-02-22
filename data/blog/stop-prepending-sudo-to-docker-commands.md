---
title: Stop Prepending sudo to Docker Commands
slug: stop-prepending-sudo-to-docker-commands
date: "2021-03-05 23:22:58"
category: t.snippet
tags: ["sudo", "docker", "linux"]
---

```bash
sudo groupadd docker -> make the group
sudo gpasswd -a $USER docker -> add $USER to the docker group
newgrp docker -> activate the changes
```
