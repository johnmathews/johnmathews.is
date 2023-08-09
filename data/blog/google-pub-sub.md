---
title: Google Pub/Sub
slug: google-pub-sub
date: '2021-09-20 21:09:20'
category: technical.snippet
tags: ['google-cloud-platform', 'message-systems']
---

Google Pub/Sub has client libraries in all the usual languages. You can also
construct the API calls yourself. This is a link to the
[API](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics/publish)
documentation.

If I were to use a JavaScript beacon to push a message to a topic, my web
analytics engine (a collection of cloud functions) could subscribe to the topic.

This would have the advantage that if the site were flooded with traffic and the
maximum number of function instances wasn't enough to handle all the events, then
none of the page views (or other events) would be lost because Pub/Sub guarantees
delivery and would keep trying to deliver the message for up to 7 days.

Using the beacon to trigger the cloud functions directly wouldn't work at scale,
because once the maximum number of instances are being triggered as frequently
as the function takes to run, the endpoint would become unresponsive. There is
no caching layer.

However, the site isn't being flooded with traffic, and I have better things
to do than fix stuff that isn't broken.
