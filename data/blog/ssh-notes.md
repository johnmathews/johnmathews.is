---
title: SSH-Notes
slug: ssh-notes
date: '2021-04-21 10:21:15'
category: Technical>Developer-Tools
tags: ['ssh', 'linux', 'security']
---

<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

## TLDR

- Public key only on the remote server.
- `ssh-keygen -t rsa <optional:email_address>` Generate a key pair and keep the private key privately on your local remote machine.
- The new keys are added to `~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub`.
- You could reuse an existing key pair but if it gets compromised you'll need to reset several accounts.
- `cat ~/.ssh/id_rsa.pub` to upload or copy a public key.
- Copy all the output from the relevant line: `ssh-rsa <long-hash> user@email.com`.
- Send the public key to the server. If it's your server, it goes in `~/.ssh/authorized_keys`. This file contains a list of authorized public keys, one per line.

## Setup `SSH-Agent` to prevent passphrase prompt

- Ensure that `ssh-agent` is running `eval $(ssh-agent -s)`
- Ensure that the following is in `~/.ssh/config`:

```apache
    Host *
     AddKeysToAgent yes
     UseKeychain yes
     IdentityFile ~/.ssh/id_rsa
```

- Add the private key to your local ssh-agent `/usr/bin/ssh-add -K ~/.ssh/id_rsa`. Use the full path to ensure that the Apple version of the command is used.

# Authentication

## Passwords and Keys

1. There are three authentication methods:

   1. Keys - very secure.
   1. Passwords - less secure than keys.
   1. IP white lists - connect without authentication by specifying a particular IP address, I think. Presumably via some VPN or proxy.

2. Passwords are encrypted. They are conceptually familiar but can and will
   be brute forced. There are tools that will block repeated attempts (e.g. fail2ban) or
   block/allow authentication attempts from particular IP addresses.

3. SSH keys using public and private (or secret) key pairs and are very secure.
   Keys are generated in pairs.

   - The public key can be shared freely without concern.
   - The secret key must be kept as secure and secret as a password.

4. To authenticate using a key pair:

   - The client must have both keys (a key pair) on their computer.
   - The server must have the public key in a file called `authorized_keys`.
   - If the server has the private key then something has gone wrong and you should generate new keys and delete the compromised key.

5. The server stores the public keys of users who can connect as a particular
   user in the file `~/.ssh/authorized_keys`. This file contains a list of
   public keys, one public key on each row.

## Handshake

1. When a client wants to connect to a server using SSH, it tells the server
   which public key to use. The server then checks in the `authorized_keys` file
   for the public key.

2. A unique session ID is generated and shared between the client and server.

3. If the server has the same public key that the client sent when it began
   the connection attempt, the server generates a random string and encrypts
   it using the public key. This random string can only be decrypted using the
   private (secret) key associated with the public key.

4. The server sends the encrypted string to the client. The client decrypts it
   using the secret key and combines the original random string with the
   session ID. The client then hashes the combined string and sends the hash
   back to the server.

5. The server already has the hash of the string combining the original random
   string and the session ID. If the hash from the client matches the hash on
   the server, the server can be sure that the client has the private key.

# Background

1. Secure Shell lets you securely connect to remote servers. You connect using
   an account that exists on the remote server. Once you've connected you'll be
   dropped into a shell session.

2. The computer you connect from is the "local" or "client" computer. The
   computer you connect to is the "host" or the "server".

3. When you're connected to the server using SSH, any commands you input from
   the client are sent securely and privately through a _tunnel_ to the remote
   computer, where the commands are executed.

4. SSH is implemented using the client-server model. The server must be running
   a small app to listen for SSH connections. This kind of app is
   called a daemon (_day-mon_). For SSH to work, the host must be
   running the SSH daemon. The SSH daemon listens for connections on a specific
   port (22), authenticates connections requests, and (if the connection
   request is approved) it will spawn the correct environment. The correct
   environment is a terminal session.

5. The client (the computer you connect from) must be running an SSH client,
   which is a small app that can communicate using the SSH protocol. (A
   protocol is a set of rules.) It needs to be able to receive information
   about which host to connect to, which user to connect as and which
   credentials to use when trying to connect.

# Source

[article](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys)
