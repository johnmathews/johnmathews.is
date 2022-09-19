---
title: >
  Cardano: Generating Addresses
slug: cardano-generating-addresses
date: "2021-3-5 16:14"
category: Technical / Cryptocurrencies
tags: []
---

If many different customers are to deposit or send ADA (The unit of currency on the
Cardano blockchain) to a Cardano node, it will be necessary to determine which
customer is responsible for each transaction so that the correct customer
account can be updated.

As with many things involving blockchains, this initially seemed like a simple
requirement but involved several hours of work.

Cardano wallets are generated using a parameter called ADDRESS_POOL_GAP. The
default value is 20, and is the number of unused addresses that the node will
generate and return to a client using the REST API. If one of the addresses is
used, the node will automatically generate another so that there are always 20
unused addresses.

This is probably very convenient for personal use. If I want someone to send me
some funds, I can make a simple api call using cURL and get a fresh address.
But if you are running a service, weather its e-commerce or a financial
service, its not really good enough. Some advice on the forums says to generate
a wallet with a very large ADDRESS_POOL_GAP value such as 10,000 and just
generate a new wallet when you run out of fresh addresses, but it still
feels like a compromise.

But lets explain our situation in more detail first. If a customer wants to
send us some ADA, we want to give them a fresh address that's never been used
before and that only they have. Then we know that any funds that arrive to that
address are from a particular customer. However we don't know if the customer
will actually use the address and transfer any funds. The address might remain
unused or it might not. Nevertheless, that address is now reserved for them,
and no one else can use it.

In this way, we might need to generate and maintain a list of thousands of
addresses that are never used. Using ADDRESS_POOL_GAP for this seems like a bad
solution.

Fortunately,
[Cardano-Addresses](https://github.com/input-output-hk/cardano-addresses) has
the answer, albeit in a fairly convoluted and obscured form. If you have the
mnemonic that was used to generate a wallet originally, you can generate 2^31
unique addresses like so:

Clone the repo and build the docker image:

```bash
git clone https://github.com/input-output-hk/cardano-wallet
docker build -t cardano-address .
```

Get the mnemonic and generate a file containing a list of space separated words on one row.

Run the following:

```bash
export increment=0
((increment=increment+1)) && cat mnumonic.txt | docker run --rm -i cardano-address key from-recovery-phrase Shelley | docker run --rm -i cardano-address key child 1852H/1815H/0H/0/$increment | docker run --rm -i cardano-address key public --with-chain-code  | docker run --rm -i cardano-address address payment --network-tag testnet > payment.addr && cat payment.addr ;echo
```
