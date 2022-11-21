---
title: Sync a BTC node, quickly
status: Published
slug: sync-bitcoin-core-node
image: "/static/images/btc-core.jpg"
date: "2018-10-13 20:34"
category: Technical>Cryptocurrencies
tags: ["bitcoin", "btc-core", "blockchain"]
tweet: Sync a BTC node for the first time, quickly, on a spinning disk by moving chainstate to an SSD and symlinking to it.
summary: Sync a Bitcoin node for the first time, quickly, on a spinning disk by moving chainstate to an SSD and symlinking to it.
---

In order to run your own bitcoin node, or lightning node, you'll need to
download the entire bitcoin blockchain and then validate it. This takes ages on
a magnetic disk due to the random access speed of the contents of the
chainstate directory.

To remove this bottleneck, move the chainstate directory to an SSD (its only
a few GB) and symlink to it from the bitcoin data directory. More details are
[on the Bitcoin wiki](https://en.bitcoin.it/wiki/Splitting_the_data_directory).
When the sync is complete, replace the symlink with the actual chainstate
directory.
