---
title: Ansible
slug: ansible
date: "2021-04-12 11:40:41"
category: Technical/Developer Tools
tags: ["ansible", "servers", "ssh", "automation"]
---

# Background

I've been spending a lot of time lately working on nodes for various blockchain
projects (Polkadot, Cardano, Tron, Binance Chain, Ethereum, ...). The rosetta
api spec is super interesting, but like most things in crypto the documentation
is sometimes wrong or incomplete and there are bugs and undocumented features.

Each of the nodes runs on a separate server, and we typically have one node for
mainnet and another for testnet. I'm working across mutiple servers, doing
difficult stuff, and I want it to be as easy as possible.

I need to reduce friction and cognitive load.

Accessing the servers is easy - I use Tmux with the
[continuum](https://github.com/tmux-plugins/tmux-continuum) and
[resurrect](https://github.com/tmux-plugins/tmux-resurrect) plugins and
maintain different sessions for each type of server. This makes accessing
multiple servers during the same work day really simple and effortless. But
working on the servers is still awkward.

On my dev machine I have `zsh` with syntax highlighting, command completion,
and various tools, like [z](https://github.com/agkozak/zsh-z) to make
navigation supper easy. I also have a lot of aliases defined. E.g. `..` → `cd ..`. Working on a remote server should be as convenient and familiar as working
on my local machine, so I want to find a way to configure a server the same way
as my laptop, and I want to do it automatically so that it can be done many
times, with no additional effort.

# Ansible

Ansible seems to be popular because:

1. It's free
2. It's got all the features and capabilities you're going to need
3. It's agentless - you don't need to install anything on the machine you want
   to control - you can use Ansible with anything that you can ssh into.

I used the following resources to get started:

- This [useful video](https://www.youtube.com/watch?v=w9eCU4bGgjQ) gave me some
  orientation and helped me figure out what I was aiming for and how to get
  started. Before watching it, I didn't know "which way was up".

- This [blog
  post](http://matthieure.me/2018/12/31/ansible_inventory_plugin.html) showed
  me how to create an inventory using the `gcp_compute` plugin.

- I spent a lot of time being unnecessarily confused about service accounts.
  I guess until you have 1 success at understanding something you don't know
  if you've misunderstood by a little or a lot.

- Once you have an inventory of servers that you want to connect to, you
  still need to specify (and prepare for) how you will connect to them. I'd
  hoped that the `gcp_compute` plugin would do some heavy lifting for me in
  this step, but it seems not. It _can_ do lots of useful stuff like
  creating instances and specifying disk space and networks, but it won't
  really help you ssh into an instance. No matter though...

- This [blog post](https://alex.dzyoba.com/blog/gcp-ansible-service-account/)
  turned out to be just what I needed. I found it at the beginning of my
  search when I was trying to create an inventory, and discarded it as almost
  useful. Turns out that `OS Login` is the best way to ssh into a GCE
  instance and once you've got your inventory taken care of, this blog post
  really helps.

When I was installing python modules, I had some errors about pyenv shims
being incorrect. The scripts were looking for versions that weren't present.
Running `pyenv reshash` fixed it. Kind of magically, but annoying.

Setting up a service account and giving it the correct permissions took more
time and was more confusing than anything to do with Ansible.

I found this [blog post](https://www.arthurkoziel.com/setting-up-vim-for-yaml/)
about setting up vim for `yml` files.

The preferred way to install ansible on Mac is using `pip`.

When you use `OS Login` the username you have when you ssh into the compute
instance will change. This [SO
question](https://superuser.com/questions/1379434/google-compute-engine-ssh-different-username-after-switching-to-os-login)
explains why.

# Commands

- `gcloud auth list`
- `ansible-config view|list|dump`
- `ansible-inventory -i inventory.compute.gcp.yml --graph`
- `ansible -i inventory.compute.gcp.yml all -m ping`
