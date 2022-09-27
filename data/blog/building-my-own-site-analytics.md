---
title: Building my own web analytics
slug: building-my-own-site-analytics
date: "2021-06-22 14:30:07"
category: Technical/Web,
tags: ["cloud-functions", "data"]
---

I've built a simple client-side website analytics tool for this site, you can
see it at [/analytics]({filename}/pages/website-analytics.md). It has the
following metrics:

- Page views per day,
- Unique IP addresses per day
- Views per page per day.

This article eventually made it to the front page of [Hacker
News](https://news.ycombinator.com/item?id=27686873), which resulted in a lot of
extra traffic and an opportunity to see how the tool performed under a much
heavier load. I wrote about the affects of this and subsequent design changes
[here](loadtesting-analytics).

I compare the different results from CloudFlare Analytics, CloudFlare Web
Analytics and my own tool in this follow-up
[article](analytics-comparison).

## Motivation

### Google Analytics

Google Analytics felt like overkill. It has so many data-points that the
useful metrics are obscured. I also like this site to load quickly
and GA makes it slower.

### CloudFlare Analytics

I've also tried CloudFlare Analytics. It's a lot simpler than GA and better
suits my use case, but I don't think its accurate.

## Design Considerations

The analytics should be easy to access and easy to understand.[ref]In Google
Analytics it can be fun clicking around on all the things and seeing lots of
options, but its not really useful once the novelty has worn off.[/ref]

I know from my work visualizing data and building dashboards that the metrics
presented will alter the users perception of the underlying reality.

The way that someone thinks about their impact on a business, the value they've
produced, or the dynamics of the underlying system (a product's quality, site
performance, growth, etc) is influenced by the design decisions I make, such as
which metrics are available, how easy they are to access, or which metrics are
above the fold.

If I present a particular metric as if its important, it will be difficult
for someone who uses the dashboard to resist this implied message. They'll eventually
consider the metric as a Key Indicator of some kind.

For these reasons I wanted to see only the most important metrics about my
website, and I wanted to see them in a simple way without distraction.

The only metrics I'm interested in are:

1.  How many people are reading my site
1.  What are they reading
1.  How much are they reading.

I'd like to be able to infer whether I have a few people who read a lot, or a lot of people
who read a little. (Or, as is the case, a few people who read a little.)

## Method

### Motivation

The main reason for making my own analytics tool it because its a fun challenge
with an obvious and useful result. Building it required connecting a few technologies -
Serverless Computing (Cloud Functions on GCP), NoSQL databases (DataStore),
JavaScript, HTTP headers.

### Assumptions

I'm assuming that unique IP addresses is a good enough proxy for unique readers, even
though I'm not considering crawlers, bots, or RSS subscribers[ref]I think this
might be quite wrong, but I don't know why.[/ref] .

### Technique

The analytics "engine" works by consuming a request that is sent by the client
each time a page is loaded. The request is parsed by a Cloud Function on GCP
which extracts the page URL and the IP address. This is then recorded in a
DataStore database along with the current date and time.

Viewing the analytics is as simple (and as complicated) as making a request to
the database, parsing the data and visualizing it conveniently. For example,
group the data by days and count the distinct IP Addresses to figure out how
many people are visiting each day. This is achieved by making a request to
another Cloud Function that returns a response with a JSON payload.

It's not a perfect solution, there are edge cases I'm not considering. I expect
it to be mostly right and good enough for my purposes. It didn't take much
effort and it was a fun mini project. The hardest part was figuring out
`chart.js`, the slowest part was iterating on the Cloud Functions.

### Mocking Cloud Functions

I haven't figured out how to easily test cloud functions locally - it would
require setting up a NoSQL database and mocking Flask requests and responses.
Instead of doing that, I watched Peaky Blinders for a couple of minutes whilst
each new version of the Cloud Function was deploying.

### Improvements

Eventually I'll want to group the metrics by week or month I expect. It'll be a
good way of learning and playing with cloud technologies and JavaScript.

Unless someone decides to spam the site, I expect the costs to be less than
€1/month. This site is hosted using CloudFlare, so I suppose I could setup some
page rules to prevent malicious traffic[ref]The page is now rate limited to 5
requests per minute per IP address.[/ref] .

## Tasks for later

- [x] Make `/analytics.html` load faster - latency is caused by the Cloud Function initialising. Short of paying actual money for always-on resources I can't see a way to reduce this. However it's only an issue if you are the first person to view the page in the last ~10 minutes - this [blog post](https://mikhail.io/serverless/coldstarts/gcp/) explains whj.
- [x] Add loading spinners - I used the same snippets as in my [Machine Vision demo](portfolio-traffic-lights).
- [ ] Group data by weeks or months as well as day.
- [ ] Identify bots and search engines - the analytics requires JavaScript to be running so I think some types of non-human activity is already filtered. How can I do this?
- [ ] Aggregate the data (once per day) in a Cloud Function instead of repeatedly in the browser.
- [ ] Understand why the DataStore API is called multiple times for a single fetch.

## Questions

1.  I'd be interested to know if there is a way to track RSS subscribers. I know
    that the usual method is to inspect server logs, but this site is hosted on
    GitHub pages so I don't think this is possible.
1.  To what extent does requiring JavaScript in order to log a page view filter out bots and crawlers?
1.  I've used the `chart.js` library because its reasonably fast and lightweight. My
    preferred library would be `Plotly` if it could be responsive and fast even
    if there are >10 charts to render.

    Has `plotly.js` improved recently to the point where it wouldn't cause a browser to lag if multiple plots are being rendered?

Finally, it occurs to me that I could make an analytics widget for my desktop
using [Übersicht](https://tracesof.net/uebersicht/). It could show page views
for the current day perhaps. I've made a couple of widgets before
[[1](http://tracesof.net/uebersicht-widgets/#time_since),
[2](http://tracesof.net/uebersicht-widgets/#time_until)] which were written in
CoffeeScript, but the newer widgets are written in React, so I guess this is an
opportunity to learn[ref]Done! My desktop now looks like this:

![Dekstop widgets](/static/images/widgets.png)[/ref] .

Writing the "Time Since" (my daughters birth) and "Time Until" (my next
accounting exam[ref]I failed the exam because I'd been working on
[Ry's Git Tutorial](git) instead.[/ref] ) widgets were my
first ever taste of CSS, HTML and JavaScript. The first ever article on
this blog was about the "Time Since" widget. CoffeeScript, and Ubersicht were
just about simple enough for me to learn by trial and error, copying someone
else's code and changing it bit by bit until I had what I want.

[**Site Analytics**]({filename}/pages/website-analytics.md)
