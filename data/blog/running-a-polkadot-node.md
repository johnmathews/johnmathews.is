---
title: >
  Polkadot: Running and interacting with a full node
slug: running-a-polkadot-node
date: "2021-3-1 17:40"
category: Technical>Cryptocurrencies
tags: ["uncategorized"]
---

I recently set up a Polkadot node on Google Cloud Platform that could create
addresses and make transactions.

Instead of building from source I used Docker. After some troubleshooting, I
found the command to run is:

```bash
docker run -it -p 30333:30333 -p 9944:9944 -p 80:9933 -v /mnt/polkadot:/polkadot/.local/share parity/polkadot:latest --rpc-external --rpc-cors=all --chain westend --ws-external
```

This differs from the (current) documentation in two ways:

1.  The data volume needs to point to `/polkadot/.local/share`. The symlink that
    is supposed to exist for `/data` appears to be broken in the current image.
    See this GitHub [issue](https://github.com/paritytech/polkadot/issues/2482) for details.

2.  Port 9944 needs to be mapped.

3.  One of the first API calls you are likely to make to check that things are
    working as expected, particularly for WebSocket connections, is to
    open to a WS connection to be notified when your node syncs a new block.
    The node only does this once it has caught up with its piers. Whilst it is
    still syncing it will only return the current highest block when you make
    the initial API call. I ended up chatting to one of the Parity devs about
    this issue on discord and then on [Stack Overflow](https://stackoverflow.com/questions/66358685/polkadot-websocket-api-doesnt-listen-for-new-blocks/66365716?noredirect=1#comment117342945_66365716).

Other than that, everything went as described in the documentation.
