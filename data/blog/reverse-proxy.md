---
title: Proxy Servers
slug: reverse-proxy
date: "2021-11-22 10:13:06"
category: snippet
tags: ["networks,"]
---

### Reverse proxy server

- A reverse proxy is a server.
- It sits in front of other servers and forwards client requests to them.
- Is a middleman or broker on behalf of origin servers.

#### Usually used to:

- Increase security (keeping the IP addresses of origin servers private makes
  DDoS attacks much harder).
- Optimize performance (caching).
- Increase reliability (load balancing).

The client thinks that the reverse proxy _is_ the end-point server.

### Normal proxies

- Also called a web or forwarding (normal) proxy.
- Sits between client machines and hosts.
- Is a middleman on behalf of the clients.

The server thinks that the client _is_ the proxy.

Source: [cloudflare](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)
