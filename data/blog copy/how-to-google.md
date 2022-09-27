---
title: Advanced googling
slug: how-to-google
date: "2022-04-05 12:01:55"
category: Technical/Developer Tools
tags: ["search"]
---

<div className="relative mt-3" style="padding-top: 56.25%">
   <iframe
    loading="lazy"
    className="absolute inset-0 w-full h-full"
    src="https://youtube.com/embed/cEBkvm0-rg0"
    frameBorder="0"
    allow="autoplay; encrypted-media" allowFullScreen >
  </iframe>
</div>

## Meta

- `related:<url>` - find sites similar to `<url>`, can be a blog post not just a domain.
- `cache:<url>` - see what google thinks your site looks like. Has google cached the latest version?

## Filters

- `site:<url> <search terms>`
- `filetype:<ft> <search terms>`
- `-<excluded-terms>`

## Dates

- `after:<year>`
- `before:<year>`

- range: `2019..2021` or `$10..$50`

## Logical Operators

- one term or another term `<term 1>|<term 2>`
- `(<term A>|<term B>)<term c>`

## Wildcard

- `*` is a wildcard `site:*.tailwind.com <terms>` - search only subdomains
