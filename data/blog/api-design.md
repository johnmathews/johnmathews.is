---
title: API Design Principles
slug: api-design
date: "2021-1-4 16:59"
category: Technical>Developer-Tools
tags: ["uncategorized"]
---

Some super brief notes I made about API design:

## Background

- It's more of an art than a science
- RESTful (REpresentational State Transfer) API design is an architectural style.
- Alternative API architectures:
  - SOAP (Simple Object Access Protocol) is a heavier style.
  - `GraphQL` - doesnt overfetch. Graph query language made by Facebook.
- APIs are everywhere (not just web APIs). They're an [abstraction](/blog/principles-of-oop#2-abstraction) that hides an implementation. `Django` model managers are an API (and also part of Django's ORM), JavaScript is an API, etc.

## RESTful APIs

- Web APIs (all REST APIs?) expose a databases to clients
- A rest api is a URL route (endpoint) that returns JSON or XML.
- POST, GET, PUT, PATCH, DELETE, corresponds to Create, Read, Update/Replace, Update/Modify, Delete (HTTP methods correspond to CRUD methods)
- HTTP METHODS:
  - PUT (create or update) is idempotent, POST is not idempotent (keep on creating, updating)
  - PATCH - partial update
  - GET, HEAD, OPTIONS and TRACE methods are idempotent cos they are only designed for retrieving data.
  - DELETE
  - HEAD - almost identical to GET, but without any body. Good for checking what a request would return, i.e. Before downloading a large amount of data,
  - OPTIONS - returns data describing what other methods and operations the server supports at the given URL. More loosely defined than other verbs.

## Qualitative Advice

- Use HTTP verbs to make requests more meaningful
- Use sensible resource names. Naming things is hard, so think about this a bit
  before starting.
  - Use identifiers in your URLs, not the query string.
    - **Good**: `/users/12345`
    - **Poor**: `/api?type=user&id=23`
- Use the hierarchical structure of the URL to imply the structure of the API.
- Design (names and structure of things) for the user/client, not for the database.
  - Resource names should be nouns not verbs
  - Use plurals consistently, not collection verbiage. Good: customers/123 Bad: customer_list/123
  - Use case-insensitivity.
  - Use camel case or snake case consistency
  - Short is better than long, but be clear
  - Spend time on design before writing code
- Use HTTP response codes to indicate status
- Prefer JSON over XML. (Hotline does HTML..)
- XML requires schemas for validation and namespaces. Don’t support this complexity at the beginning (or ever) unless required. If it is required, make the XML as similar to JSON as possible.
- Put links in the HTTP link header, or use a JSON representation of this.
- Use the HTTP location header to contain a link on resource creation, or for GET with pagination, use first, last, next, prev.
- Connectedness - return links in the response which link to useful resources. At minimum, a link to show how the data was received, or posted.
- Idempotence - clients making the same repeated requests create the same result on the server side. I.e. making repeated requests has the same result as making a similar request, server side. On the client side, a response code may change, of course.
