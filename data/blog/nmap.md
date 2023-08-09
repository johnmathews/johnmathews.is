---
title: nmap
slug: nmap
date: '2021-09-04 20:30:04'
category: technical.snippet
tags: ['networking', 'cli']
---

`sudo nmap -sP 192.168.1.1/24 | grep "Nmap"`

Thanks to Jeff Geerling (again) I found this nifty command to see what devices
are connected on a local network.

Found in this
[article](https://www.jeffgeerling.com/blog/2017/setting-pi-hole-whole-home-adtracker-blocking) about setting up a pi-hole.
