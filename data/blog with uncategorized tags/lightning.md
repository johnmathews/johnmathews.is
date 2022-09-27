---
title: The Bitcoin Lightning Network
slug: lightning
date: "2018-4-12 15:53"
category: Technical/Cryptocurrencies
tags: ["bitcoin"]
image: src="/images/lightningTestnet.jpg" alt="lightning network on bitcoin testate"
tweet: Bitcoin lightning network
summary: This is an unfinished article from 2018. I'm publishing it in 2021 because it has a few ideas I'd like to be able to refer to in future.
---

The lightning network is a protocol that operates on top of the Bitcoin network. It allows instant transactions between participants and is the leading solution to current scalability problems.

This post is based on the excellent seminar by Joseph Poon and Thaddeus Dryja "Scaling Bitcoin to Billions of Transactions Per Day" which was given at the San Francisco bitcoin developers conference in early 2015. You can see the seminar [here](https://youtu.be/8zVzw912wPo).

## The Problem

Bitcoin doesn't scale well enough to facilitate the rate of transactions necessary for it to become a medium of exchange in everyday life. This is because

1. Transactions aren't instant - the average block time is 10 minutes
2. Transaction fees are variable and too high (particularly when blocks are almost full) to enable low value transactions (micro-payments)

Currently, Bitcoin has a 1MB block size limit. This allows about 2750 transactions per block [(link)](https://blockchain.info/charts/n-transactions-per-block) or 4.6 transactions per second. This isn't fast enough for a global payment system.

## Solutions

### Bigger blocks

In 2017 there was a lot of contentious debate about how to solve Bitcoins scaling problems. One of the most frequently suggested solutions is to increase the block size, so that more transactions can fit into each block.

If you had 7 billion people making 2 transactions per day, you would need 24GB blocks, generating data at a rate of 3.5TB/day. This would make running a full bitcoin node impractical for many people which would result in centralisation, fewer miners and lower security.

(Note: you would expect corporations and large miners to support efforts to increase block sizes, because the associated infrastructure cost increases create a higher barrier for entry to newcomers. This would decrease the competition for new blocks and protect their revenue from miners fees.)

### More efficient databases

SQL is a much more efficient database model than a blockchain. Its scalable and fast, and is what is used today to power visa, master card, central banks. But it isn't trustless. With a SQL database model you have a trusted 3rd party maintaining the database which everyone else needs to query to discover or verify a balance. This is equivalent to giving the 3rd party your money and trusting they do the right thing.

### Side chains

A blockchain with other blockchains running parallel to it. Maybe like a a rope made of many different chords. Side chains are not primarily a scaling solution. If you want to send a payment to an address that is on a different side chain you would create 2 transactions. Not any-to-any.

### Payment channels

Many payments between two predetermined parties. Useful when two parties pay each other multiple times, not necessarily good for paying many different accounts relatively few times each. Its not any-to-any.

---

What we want is payments from **anyone to anyone**

### Lightning Network

- Payment channels between many parties in a multi-hop hub and spoke model
- Minimally trusted intermediaries - they can't take your coins, but they could conceivably delay setllement
- Requires the malleability fix that occurred in 2017

Previous soft forks:

1. Pay to script hash,
2. bip34 (coinbase transactions)

## What are payment channels

- Uses multisig
- Allows two people to send transactions to each other quickly without hitting the blockchain everytime

### A 2 party unidirectional payment channel

Alice and Bob create a multisig address that they each control

Alice wants to send 1 BTC to the multisig address

Before she does this, she gets Bobs refund signature, this means that at worst, Alice loses her coin for 30 days.

Bob creates a 30 day nLock time refund signature, signs it, and sends it to Alice.

Alice can either sign it immediately and keep it, or wait to sign it herself (keeping it half-signed).

Once Alice has the refund signature she knows its safe to send her BTC to the multisig address she and Bob just created.
