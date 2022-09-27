---
title: >
  Cardano: Running a full node
slug: cardano-node-api
date: "2021-3-1 18:01"
category: Technical/Cryptocurrencies
tags: []
---

I recently deployed a Cardano node on Google Cloud Platform and used its API to
create and watch addresses, and make transactions.

Helpfully, Cardano make it quite simple to get up and running if you are
familiar with Docker-Compose, and know where to look, and what questions to ask.

Contents:
<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

# Docker Compose

The [Cardano Wallet](https://github.com/input-output-hk/cardano-wallet)
repo[ref][https://github.com/input-output-hk/cardano-wallet](https://github.com/input-output-hk/cardano-wallet)[/ref]
contains almost all you need to get started. The command to run is:

`NETWORK=testnet docker-compose up -d`

This does a couple of things for you:

1. Creates a Cardano node and begins syncing with the network
2. Creates a Cardano Wallet instance
3. Creates all the required data volumes
4. Maps the ports required to make API calls.

Running `docker ps` should show that two containers are running, `cardano-node`
and `cardano-wallet`.

# Cardano wallet

In order to run `cardano-wallet` commands (not using the API, but directly on
the node) you'll need to `docker exec` into the container like this:

```bash
sudo docker exec -it cardano-wallet_cardano-wallet_1 sh
```

Then you can run commands like:

```bash
cardano-wallet network information
```

# Cardano-CLI

Similarly, if you want to use the `cardano-cli` programme, exec into the
`cardano-wallet` container:

```bash
sudo docker exec -it cardano-wallet_cardano-node_1 sh
```

```bash
cardano-cli —version
```

# REST API

Perhaps you wont need to do this though because once the containers are up and
running and online, you can use the REST API to monitor the node, make
transactions, and watch
addresses.[ref][https://input-output-hk.github.io/cardano-wallet/api/edge/#operation/postwallet](https://input-output-hk.github.io/cardano-wallet/api/edge/#operation/postWallet)[/ref]

For example, a good test to see if the node is ok is to run

```sh
curl http://localhost:8090/v2/network/information
```

Addresses on Cardano need to be BIP39 compliant, and before you can use the
REST API to create the address you will need to have already generated the keys
and the mnemonic. This can be done using various other tools
([web page](https://iancoleman.io/bip39/), [python](https://github.com/trezor/python-mnemonic)) and the results put into a JSON file
according to the API spec.

# Surprising things

Cardano requires that addresses are created sequentially and instead of
allowing the user to generate them _ad-hoc_, the node by default will manage
the creation of addresses of each
wallet.[ref][https://input-output-hk.github.io/adrestia/docs/common-use-cases/how-to-create-addresses/](https://input-output-hk.github.io/adrestia/docs/common-use-cases/how-to-create-addresses/)[/ref]

The value of `ADDRESS_POOL_GAP` sets the number of unused addresses in each
wallet. By default this is 20. When an address is used, the node will
automatically generate a new unused address for the wallet, so that there is
always a pool of 20 unused addresses.
