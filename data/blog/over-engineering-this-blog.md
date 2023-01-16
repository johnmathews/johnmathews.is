---
title: Over-Engineering this blog
date: "2021-4-5 11:54"
category: Technical.Web, Non-technical.Journal
tags: ["blog", "javascript", "self-reflection"]
---

Over the last few weeks I've spent an unreasonable amount of time and energy making unnecessary
improvements to this blog.

Some of these improvements are:

1. Adding keyboard shortcuts (type `?` to find out which).
2. [Implementing](adding-search), then [reimplementing](fuse-search), and then optimizing
   client side fuzzy search.
3. Using `src-set` to serve responsive images
   ([Image-Process](https://github.com/pelican-plugins/image-process)).
4. Lazy loading images to make this site load faster.
5. Compressing page files using `brotli` and also `gzip`
   ([Precompress](https://github.com/kurtmckee/pelican_precompress)).
6. Trying (and ultimately failing) to avoid a "white flash" when dark mode is chosen and a new page
   loads ([GitHub discussion](https://github.com/tailwindlabs/tailwindcss/discussions/3904)).

I'm not really sure why I did it. It makes almost no difference to anyone but me. It felt a bit
compulsive.

I like tinkering, and it's nice to build something that will continue to work with no maintenance. I
tell myself that over the next few years I will gain the benefits of these features even when I've
forgotten I implemented them.

It's taught me a lot of JavaScript, which is a great language to be familiar with - it's everywhere.
I would warmly encourage someone younger than myself to pursue interests for the sake of curiosity
and fun. And there is a very high chance that even if no-one uses the shortcuts except me, my new
JavaScript skills will come in useful somewhere else.

But even if they do I'm not sure its a good enough reason - things should be built when they solve a
present problem, not over-engineered for what-ifs and maybes.
[YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it). I wouldn't let myself do this in
a professional capacity. There is a tension between being curious and being focussed.

I'm not really sure that I need to justify myself. Its a hobby, I wanted to do it, I enjoy tinkering
with web technologies and learning new things.

But also, I lost sleep over this - I stayed up too late, and let it put pressure on other things.

I know that being curious, and making room to play with interesting things, has been one of the most
useful approaches to personal development and up-skilling myself. But there must be a limit..

There is a tension between wasting my time and taking a risk, and it will take a few years before I
know for sure if these efforts were worthwhile, or not.

If it's not fun, don't do it.

Successful business owners seem to be very good at leaving things alone once they're "good enough",
and not being perfectionists. In fact, I think that being a perfectionist is antithetical to being
an entrepreneur. I am not a perfectionist, I'm just really curious and have a big appetite for
learning.

But this "appetite for learning" stops me from focussing. I let myself become distracted by adding
new features to this blog, when instead I should zoom out a bit and think about working towards a
more substantial and meaningful goal, to the exclusion of more minor goals.

I think that good entrepreneurs are very focussed, to a fault. I am not that focussed. I am too
distracted by life.

It's a balancing act, there is a tension between being emotionally and physically present with my
family and friends, and ignoring as many things as possible so that I can focus on doing something
meaningful that is necessarily hard.
