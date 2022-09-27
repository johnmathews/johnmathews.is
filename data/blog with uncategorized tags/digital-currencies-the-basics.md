---
title: >
  >
  Digital currencies: the basics
date: "2016-08-19 21:02"
Author: John Mathews
category: Technical/Cryptocurrencies
tags: ["bitcoin", "cryptocurrencies", "cryptography", "digital currencies", "finance", "fintech"]
slug: digital-currencies-the-basics
status: published
---

Digital currencies are often discussed in the context of finance, technology and economics. The Blockchain - the technology which applications like Bitcoin are built on - is significant because it removes the need for trust or an intermediary between unrelated parties transacting with each other. So far, the most influential and famous digital currency is Bitcoin.

This post is intended to introduce the basic concepts of digital currencies and the problems a distributed ledger system needs to overcome.

## What is a digital currency?

A digital currency is an internet based medium of exchange. Units of digital currency are not printed, are not physical, and represent nothing. A unit of currency is produced by running algorithms to solve complex mathematical problems. When a solution is found, a unit of currency (for example, 1 Bitcoin) is generated.

## If the currency represents nothing, why is it valuable?

Because people believe that in future, other people will believe it does, and because people are willing to trade real goods and services in exchange for it.

This is the same as for dollars, sterling and euros (fiat currencies) which also don't represent anything physical. (Although these examples are  supported by laws or regulation).

In the past, creating a new currency without the support of government hasn't been practical because:

1.  A central bank was required to control the physical creation of new currency (otherwise people would create counterfeit currency, decreasing scarcity and moving its value towards zero)
2.  An intermediary (a bank) was required for all large or remote transactions, to make sure that the amount of money each party owns is correctly recorded and updated in a ledger (preventing double spending of funds)

The technological breakthrough was preventing double spending without requiring an intermediary. This is made possible by using cryptographic techniques developed over the last few decades, and cheap, powerful computers which have only recently become available.

## Central and distributed ledgers

With conventional currencies everyone's balance and transactions are recorded in one central ledger (a list showing how much money each account has) and each account holder only has access to their own balance and transactions. With digital currencies, a copy of the entire ledger (every transaction ever made by everyone) is held on each computer (or node), and anyone can see everyone's transactions.

Conventionally, if two parties wish to make a remote transaction then they need a bank to be the intermediary. The bank mediates by updating the central ledger to record the change in each parties funds as a result of the transaction. This is how one party knows if the counter-party is able to pay, and how payment is confirmed. If there is only one copy of the ledger, maintained by the bank, then the bank must be involved in every transaction between its account holders. This need for an intermediary increases the complexity and cost of doing business.

## Sending money

To send money, a message is broadcast to the network that the amount in your account should decrease and the amount in another account should increase. Each computer in the network (a node) which receives this message will check its authenticity, make the changes, and pass the message along to other nodes.

## What problems does blockchain solve?

For a transaction to be accepted and entered into the distributed ledger, its authenticity needs to be verified. Because the ledger is distributed, everyone can see everyone else's transactions. Therefore user authentication and transaction authorisation needs to be possible without compromising a user's ability to send secure payments in future.

There is also the problem of double spending - because the currency is neither physical, printed or representative of anything, how do you prevent a user from spending their currency more than once, or simply creating as much new currency as they want?

Another problem is the addition of new transactions to the ledger from many unrelated users. If each party has their own copy of the ledger, updating (or changing) it as they want, how would the ledgers completeness and accuracy be assured? How would you update your ledger to take account of transactions between third parties, and how would you know the order in which they occurred?[^1] The blockchain is remarkable because it is the first technology to solve all of these problems. Future posts will consider each of these problems are overcome.

[^1]:
    This is the Byzantine Generals problem, which is nicely described in the introduction of
    [this paper](http://research.microsoft.com/en-us/um/people/lamport/pubs/byz.pdf)
