---
title: Google Cloud Storage - TTL and CORS settings
slug: gcp-storage-bucket-ttl-and-cors-settings
date: "2021-09-20 15:45:42"
category: snippet
tags: ["google-cloud-platform", "storage", "cloud", "caching"]
---

[Documentation](https://cloud.google.com/storage/docs/configuring-cors)
explaining how to set CORS and TTL for a storage bucket.

Create a JSON file with something like this:

```json
[
  {
    "origin": ["..."],
    "method": ["GET", "PUT"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 300
  }
]
```

```bash
gsutil cors set cors.json gs://johnmathews.is
```

```sh
gsutil cors get gs://johnmathews.is | jq
```
