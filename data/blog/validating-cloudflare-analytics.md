---
title: Validating CloudFlare analytics
slug: validating-cloudflare-analytics
date: "2021-06-29 17:40:38"
category: Technical>Web
tags: ["uncategorized"]
---

Contents:
<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

## A mystery

CloudFlare give me two different measures of how many people have
visited my website, one using their Analytics product and other from their new
Web Analytics product. I get very different results for page views and number of
visitors. I also get a third distinct set of results from my own [analytics tool](/metrics).

## Possible Reasons

The reasons for this don't seem to be explained anywhere obvious, but I think it
could be caused by ad blockers preventing the JavaScript used for the Web
Analytics product. The normal, (not Web) Analytics product might derive its
results from server side events, which would catch everything including bots and
RSS clients, and be unaffected by ad blockers.

Most of my visitors read the technical articles and therefore the audience is
probably very technical and likely to be using an ad blocker. If this is the
case then one way to test my hypothesis would be to write some articles that
appeal to a non-technical audience who are less likely to use an ad blocker. In
this case I would expect the two analytics methods to agree more closely.

## Comparison

I made some screen shots at 11pm on June 29$^{th}$ and compared the results from
the CloudFlare [Analytics](https://www.cloudflare.com/analytics/), CloudFlare
[Web Analytics](https://www.cloudflare.com/web-analytics/), and my own
analytics [tool](/metrics).

CloudFlare's (normal) analytics say I've had 234 unique visitors. But their Web
Analytics tool says I've had 11 visitors. My own tool reports 12 unique visitors.

Why are these results so different? Maybe one measure might be including bots
and another might only be trying to report real people using normal browsers,
but the difference seems too high for that.[ref]CloudFlare do tell me they've
blocked 199 attacks in the last month, but I don't think this explains the
difference.[/ref] I'd also expect real usage to fall when its night in the
countries I get most traffic from, which I don't see. Perhaps the difference is
caused by 95% of my readers are using an ad blocker.

My own analytics [tool](/metrics) can't give results
from a rolling 24 hour window, it only groups data by day. Therefore I recorded
the values at 11pm, which should be close enough. My simple method of logging IP
addresses when a page is loaded and counting the unique IP addresses each day
says that I've had 12 unique users. Much closer to the CloudFlare
analytics beta result, but I wouldn't expect my bespoke tool to be blocked by an
Ad Blocker.

If it were as simple as concluding that my own results agree with the CloudFlare
analytics beta then that might be enough. But they only agree on this particular
metric. I've logged 47 page views today using my own tool but the CloudFlare
Analytics beta reports only 11 page views[ref]With an average load time of 90ms -
pretty snappy if it can be believed.[/ref].

Please let me know on [twitter](https://twitter.com/johnmathews) if you have any
ideas!

## CloudFlare Analytics

[![CloudFlare analytics tab](/static/images/cloudflare/cloudflare_analytics_tab.png)](/static/images/cloudflare/cloudflare_analytics_tab.png)

## CloudFlare Web Analytics

[![CloudFlare analytics beta](/static/images/cloudflare/cloudflare_analytics_beta.png)](/static/images/cloudflare/cloudflare_analytics_beta.png)

## My own analytics tool

[![homebrew analytics](/static/images/cloudflare/homebrew_analytics_visitors.png)](/static/images/cloudflare/homebrew_analytics_visitors.png)
