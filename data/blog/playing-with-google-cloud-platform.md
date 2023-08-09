---
title: Playing with Google Cloud Platform
slug: playing-with-google-cloud-platform
date: '2021-07-13 21:18:29'
category: Technical>Engineering
tags: ['cloud', 'google-cloud-platform', 'serverless']
---

Building my own [web analytics](analytics) has
been a gateway to learning more about Google Cloud Platform. So far I've used
DataStore, BigQuery, Cloud Functions, Pub/Sub, Storage Buckets and Scheduler.

## Version 1

My first version of the analytics tool took the following form:

### Logger Function

1.  When the browser navigates to a page on the site, a JavaScript beacon is
    sent which triggers a cloud function.
1.  The function parses the page URL and the IP address, and creates a record in
    the database.

### Aggregator Function

1.  Each time the analytics page is loaded, a cloud function is triggered that
    gets every record from DataStore, parses the data and returns a JSON object
    containing the aggregated data.
1.  The browser receives the JSON, parses it and creates some charts and
    tables.

The good: It works, it was quick and simple to build.

The bad: Its expensive. Loading the analytics page is slow - when the DataStore
was small it took 3 or 4 seconds, after a few thousand page views it took about
40 seconds.

Conclusion - keep the logger function as it is, but improve the aggregator
function.

## Version 2

The second version still used DataStore but was much more efficient. It didn't
read the entire database and generate the aggregated results every time the analytics
page was viewed.

Instead, a cloud function periodically collected all the records in the
datastore database and calculated the results. The results were
written to a JSON file and sent to a storage bucket.

When the analytics page was loaded in a browser, the browser collects and
processes the JSON file from the bucket. This is much faster, performant
and cheaper than creating a new JSON object each time the analytics page is viewed.

The good: The analytics page loads at the same speed regardless of how much data
has been aggregated and how frequently the analytics page is being viewed.
Performance issues have been solved, though I still don't think DataStore is the
best database solution for this use case.

The bad: DataStore seems expensive - I am being charged for AppEngine
services (which I don't really understand but is caused by using
DataStore). If I can get monthly costs down to about a cup of coffee (about
€4/month or €0.15/day) then I don't mind running it indefinitely.

## Version 3

Use BigQuery instead of DataStore. BigQuery is a Data Warehouse that is
well suited for analytics. It is not well suited for transactional use cases -
where data is being read, updated or created many times per second.

This is fine for my use case - the Page Logger function writes a record to a
BigQuery table each time each time a page view is logged. During times of high traffic it's
possible that concurrency issues might arise and some page views will be lost,
but this isn't an issue 99% of the time. My site traffic is very light. I believe I
could use a newer API that google recently released to solve this problem but
for now I'll use the normal API.

The rest of the process is unchanged - the aggregator function periodically
reads the (BigQuery) database, crunches that data and sends a JSON file to a
storage bucket.

The good: This is completely free. The analytics page can be viewed quickly
regardless of the amount of site traffic.

The bad: Under heavy traffic some page views might be lost due to a limit on how
quickly new rows can be added to BigQuery tables. Using a new API might resolve
this.

## Conclusion

### Totally free tools forever

The combination of Cloud Functions, Storage Buckets and Big Query (along with
Scheduler and Pub/Sub) seems really versatile and I think there are many
interesting things that could be done by combining these services[^1].

Using them all for free (my usage is well within the free tier) makes the
possibilities even more interesting. Having compute and storage services
running indefinitely in the cloud for free is amazing.

[Documentation](https://cloud.google.com/free/docs/gcp-free-tier#free-tier-usage-limits)

### Aggregate by calendar month

An improvement to this analytics setup would be creating aggregated metrics for
each calendar month and storing them in separate JSON files. This would prevent
data older than one month being processed repeatedly, and create a cap on the
amount of computational effort required (the maximum amount of data processed
by one cloud function instance would become capped at one month).

If the browser wanted to display more than one month of data, it would simply
request more than one JSON file from the storage bucket.

### TODO

- [x] Frontend - the DataTables column containing the date should be sorted as a Date object. It is being sorted like a normal string.
- [ ] Backend - create separate JSON files for each month.

[^1]: The question then becomes: "Just because you could do it, should you do it?"
