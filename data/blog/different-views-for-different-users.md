---
title: Different Views For Different Users
slug: different-views-for-different-users
date: '2021-1-19 10:32'
category: Technical>Web
tags: ['uncategorized']
---

This blog serves a variety of purposes. It's partly a journal of how I'm
teaching myself to be a developer and a data scientist, and it's also a
personal blog, with articles about my interests and experiences.

It's unlikely that anyone is interested in every type of article, and I'd
like to make it easy for people to only read the content they're interested in.
Therefore I thought I would separate the articles into two broad groups,
`technical` and `non-technical`.

If you visit this blog for the first time by clicking a link to a technical
article, the site will then only show you the technical articles on the blog.
It's the same for non-technical articles. If you want, you can change these
settings by clicking the paw icon[^1] in the navbar on the blog index page.

I did this mainly because I could. I like playing around with the blog. The JAM
stack feels accessible and its fun working with tailwind and with jQuery.

I think that playing (being curious, lighthearted, and unhurried and not being
concerned with failure) is really important. Especially for adults who don't
usually do it much. Most of my successes or big opportunities have been the
result of a process that started with playing around.

Here is the list of requirements I used when adding the feature:

**Requirements**:

- [x] If user lands on a page and DOESNT have local setting - create local setting based on type of article being read
- [x] If user lands lands on a page and DOES have local setting which is contradicted - reset local setting to “all”
- [x] If user lands on index and DOES have local settings, only show articles that match the setting

**Steps**:

- [x] Index page: check if local storage option exists, print to console the result
- [x] Index page: make button group
- [x] Index page: make correct button active on page load by using localstorage
- [x] Index page: update active button on page click

* [x] Index page: filter/unfilter articles when button clicked
* [x] Index page: if local storage does exist, respect it
* [x] Index page: add 3 stage switch to hamburger menu
* [x] Index page: make hamburger menu behave intuitively on small screens
* [x] Index page: if local storage does not exist, pop up a modal asking for a choice
* [x] Article page: check if local storage option exists, print to console the result
* [x] Article page: if local storage doesn't exist, create it according to article type
* [x] Article page: if local storage does exist and is contradicted, update article type to all

[^1]:
    It's a paw because cat's have paws and cat is like category. I might
    change this to something more intuitive in future, like making the icon an `N`
    if the user is only seeing non-technical posts, `T` for technical, and `A` for
    all posts.
