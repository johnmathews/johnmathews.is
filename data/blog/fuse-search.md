---
title: Fuse Search
date: "2021-4-5 10:45"
category: Technical.Web
tags: ["Fuse", "Search", "Web"]
---

## Adding search made the site feel faster and more accessible

I've reimplemented search on this site using [fuse.js](https://fusejs.io/) instead of
[tinySearch](https://github.com/tinysearch/tinysearch). You can read about how I implemented
tinysearch [here](blog/tinysearch).

When I first implemented search I was surprised how much faster and more accessible the site began
to feel. I could quickly access any content by typing a few words, I didn't need to scroll or follow
a link[^1].

This means I can find content without having to think about how to get there - I don't need to break
my flow or concentration. It might sound like a trivially small consideration, but lowering friction
or cognitive load in small ways can make the difference between using or not using something when
you're already working hard or concentrating on something else.

For example, if I want to look up my notes about using the `nohup` command, I can quickly go to the
site, type `/` (the keyboard shortcut for search), type "nohup" and hit enter. This is all
muscle-memory level impulses. I don't need to think about the content, think about its category or
when I posted it, then scroll down and scan a list, or use a mouse to click on intermediate links.
Win. Working at the speed of thought rather than the speed of input is a big deal.

## Why I switched from tinySearch to Fuse.js

Before implementing `fuse.js`, this site had a search feature powered by TinySearch. I wouldn't have
had enough knowledge to implement fuse.js if I hadn't already learnt some JavaScript whilst
setting-up tinySearch.

TinySearch had an example for Pelican Blogs, and a simple and clear readme. By using tinySearch
first I saw an example of how to build the JSON array that becomes the search index, and how to
implement the javascript that's required for client side search.

Also, in the course of developing and over-engineering this blog I've become much more proficient
and comfortable with JavaScript (and jQuery) in general.

Fuse.js is really quite simple to set up once you're familiar with JavaScript. It's much more
flexible than tinySearch; you can choose search weights for different fields, accuracy thresholds,
and some parameters for the fuzzy search algorithm.

The general approach is to instantiate an instance of `Fuse` by calling Fuse with a JSON array for
it to parse, along with some options. You then give the instance a string and get back an array of
results which you can do whatever you want with.

The accuracy of the search results is higher with `fuse.js` and the speed is still acceptable. I did
have to do some optimization of the search index that Fuse generates, though.

## Optimizing the search index

The "normal" search index that Fuse uses to return results is a JSON array of all the content of all
the articles that you want to be able to search. You can generate it using a jinja template or any
other way you want. (There simply needs to be a JSON array that the browser downloads and does a
fuzzy search on). This gave me a file that was about 4MB. Once I asked Fuse to search the complete
text of each article (not just the default first 600 chars, iirc) then speed really suffered.

I optimized the index file in the following three ways:

1. Removed any non-words. Some of my articles are jupyter notebooks that have been converted to
   articles (the plugin to do this is one of the reasons why I began using Pelican). When the index
   is built, lots of code and html gets included, which isn't helpful. Any "words" that are more
   than 20 chars I just delete.

2. Removed the 150 most common words. Any word that is in many articles is not useful for
   distinguishing between different articles, so they can be deleted from the index. They don't add
   any meaning. I wrote a short pipeline of shell commands using `tr`, `sort`, `uiq` to generate a
   file with a list of the most common words. I then wrote a python script to update the original
   search index by removing all the common words.

3. Shortened any long words by only keeping the first 12 characters. If a word was 15 characters
   long, I simply removed that last 3 chars. I figured this would work fine because matching the
   first 12 characters would already be quite unique and give a good result.

Doing these 3 optimizations reduced the file size by about 90%. Compressing the JSON using `gzip` or
`brotli` makes the files even smaller, and now the amount of data transferred to the client seems
reasonably small. (This is a static site, and therefore search has to happen client side.)

The browser would still begin to lag as the search string length increased. It takes more time to
search for a 10 character string than for a 5 character string, and initially fuse was doing a
search every time a character was typed.

I wanted the site to feel as fast as possible and thought that if search was paused whilst typing
and occurred a short time after the last key was pressed this would be an improvement. I added a
short delay of 200ms to the function call, and typing during the delay time resets the time. This
reduced the lag and made the search tool feel responsive. I learnt that this is called "debouncing".

There was some further complexity when I wanted to debounce characters used for searching, but not
the navigation or keyboard shortcuts. Getting the debounce function to only run on some key presses
was surprisingly complex. It taught me a lot of JavaScript though, and it's satisfying to have made
a useful user interface.

[^1]: It also immediately gave me the idea to add keyboard shortcuts. Type `?` to see what happened.
