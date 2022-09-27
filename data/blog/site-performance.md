---
title: Optimizing The Performance Of This Blog
slug: site-performance
date: "2021-1-4 16:05"
category: Technical/Web
tags: ["uncategorized"]
---

I'm coming to the end of redesigning this site. Now that the main changes have been
made its fun (and good practice) to optimize the site so that it loads quickly and
is optimized for SEO and accessibility.

Lighthouse is a utility built into Chrome that runs a technical audit on a
webpage and assesses a wide range of features. It also provides details about how to improve the page.

My site is hosted on Github Pages and is accessed via Cloudflare, which gives me a lot of performance
gains including minified HTML and CSS, caching, and super fast server response times.

I'm using Github Pages and Cloudflare for free and I think its
amazing that I can get the benefits of these services without needed to pay
anything. If someone knows where to look and can teach themselves using free
resources, they could be read by anyone anywhere in the world. It's amazing.

Below are the lighthouse results for the blog's index page and for a recent post.

![lighthouse score for index page](/static/images/lighthouse_index_page.png)

![lighthouse score for a blog article](/static/images/lighthouse_article_page.png)
