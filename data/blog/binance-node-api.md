---
title: >
  Binance-Chain: Running a node
slug: binance-node-api
date: "2021-3-3 15:28"
category: Technical>Cryptocurrencies
tags: []
---

I've been setting up a binance-chain node. Unlike Polkadot or
Cardano, I'm not going to run it from a container until it's working reliably.

The Binance [docs](https://docs.binance.org/guides/node/install.html) show a
couple of ways to install a node. I used the `install.sh` script and went with
default values as much as possible.

# Installation

My first attempts to sync a full node used the `install.sh` script, but
the node wouldn't sync completely, it would get stuck. I setup a new VM and did
a manual install ("Option Two") and so far the node has been syncing without
any issues. You need to download the genesis file separately in this
case. Also, be sure to download the `node-binary` repo using `git lfs` and not
just `git`. It will look like it worked but `bnbchaind` wont have completely
downloaded unless you use `lfs`

It took me a while to realise that the documentation assumes that you have an
environment variable called `BNCHOME`. You can either create it using

```bash
export BNCHOME=/path/to/.bnbchaind/
```

(like you would for any environment variable) or replace the environment
variable in the start node command with the file path:

```bash
nohup bnbchaind start --home BNCHOME &
```

Note: I'm not sure if the `bnbchaind` needs the environment variable to be set
or not. It doesn't give errors if it isn't set, but I seem to be having more
success when `BNCHOME` is defined.

# Syncing the node

- There are [three ways](https://docs.binance.org/guides/node/synctypes.html) to sync a node.
- Fast-sync isn't the fastest way to sync your node, hot-sync is.
- Using `install.sh` _should_ put the correct default values in the `$BNCHOME/config/config.toml` file, but I needed to adjust `ping_interval` and `pong_timeout` to the recommended values.

# Surprises

The documentation assumes you have familiarity with running tasks in the
background of a terminal session, and that you're familiar with `nohup`. I
wasn't - I'd even forgotten what the `&` symbol does[^1] so I did some research and wrote some
[notes](nohup-and-background-processes)

[^1]:
    It starts a process in the background. You can move it to the foreground
    with `fg` or see a list of running jobs using `jobs`. You can move a running job
    to the background (like a vim session) using `ctrl-z`
