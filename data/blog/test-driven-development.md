---
title: Test Driven Development
slug: test-driven-development
date: '2021-1-6 17:50'
category: Technical>Developer-Tools
tags: ['python', 'django', 'testing', 'web-app']
---

Test Driven Development was mind-bending when I first grappled with it:

- "Write a test for the code before you write the code"
- "Assert that your code matches your expectations by understanding _all_ the inputs and _all_ the outputs for _every_ function or method I write".

Last summer I was building a web app and began to break things unintentionally
when adding new features. This soon led to lots of clicking around different
pages to test if stuff was still working each time I made an update.

This led to me thinking there must be a better way, which eventually brought
me to Test Driven Development (TDD).

It should have just led me to writing tests, which it did. But googling
whatever I googled got me down the TDD rabbit hole rather than just the "write
some tests" rabbit hole. Write tests for your code before you write the code.
Write tests for bugs you've fixed to check they stay fixed. Write tests as a
kind of documentation to show what stuff is supposed to be doing. Errr...

Django was a big enough pile of abstractions as it was. Views, ORMs, mixins,
serializers... Trying to add factories and fixtures into that took some getting
used to. But eventually I made some progress, and now I quite enjoy running
coverage reports to keep coverage _close_ to 100%[^1].

Some of the main things I've learnt about writing tests:

1. Use PyTest as much as possible rather than other testing libraries - its `assert` statements are more intuitive than Django's own testing framework, and you can use it in any Python codebase, not just Django. It has lots of extensions and seems good at getting the job done fairly easily.
2. Write tests as you go. I haven't (yet) reached the elevated level of writing
   tests before I write the code to be tested, though I see why that would
   sometimes be useful. I do think writing tests sooner rather than later is
   best though, ideally as soon as you've got a basic version of your feature working.
3. Use `Coverage` to show you which code is covered by your tests, and which
   branches or edge cases are not. But be warned, it doesn't tell you if the
   test is useful or not, only that it passes and which methods or functions it
   uses.
4. Fixtures are great for keeping tests fairly DRY. `Freezegun` is great for
   testing anything to do with dates and times.
5. Static type checkers, like `Mypy`, get more attractive in proportion to
   codebase complexity and size.

[^1]:
    Which is fun and all, but testing for the sake of it doesn't necessarily
    stop bad things happening. Its very possible to write a test that covers the
    code you've just written without ensuring that _only_ the intended behaviours
    happen.
