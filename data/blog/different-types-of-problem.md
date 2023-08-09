---
title: 3 Different Types Of Programming Problems
slug: different-types-of-problem
date: '2021-1-18 13:00'
category: Technical>Web
tags: ['uncategorized']
---

## Three categories of problem

Last year when I was creating [moneybar](https://moneybar/nl) and
[pippip](https://pippip.email) there were a few problems that took much more
effort to solve than all the others.

I think I could group problems into 3 buckets, based on how much time they take
to solve. `Type 1` takes less than 15 minutes to solve, `type 2` takes between
15 and 45 minutes to solve, and `type 3` takes more than 45 minutes (usualy
_much_ more).

### Type 3:

When I start learning a hard thing (like web development), almost everything is
in the third bucket and it's exhausting. You need to set aside big chunks of
time, you need to be focussed and undistracted, calm and wide awake, and you
need to be prepared for a long arduous journey.

Probably your criteria for success should be "am I dead?" because then if
you're asking the question you're guaranteed to be successful and keeping
morale high is necessary for success.

### Type 2:

Hopefully you can make good progress understanding the basics and internalizing
the relevant abstractions, and your problems quickly[^1] become `type 2`
problems. They each take from 15 to 45 minutes to solve.

Maybe this is because you know enough to break some big general problem into
smaller problems (you are developing domain expertise) and your intuitions for
how to solve the problem are becoming better so your first or second attempts are
likely to be correct, rather than your fifth or sixth.

Knowing how to google a problem so that you get the answer you need is also a
really important skill, which requires intuiting how an English speaking expert
would ask the question. This isn't trivial but I don't hear people discussing
this often.

When most of my coding problems are `type 2`, it feels like I'm learning most
efficiently and when I'm most productive[^2].

### Type 1:

After a while, the problems that need to be solved become `type 1` problems.
They take less than 15 minutes to solve, because:

1. All the big problems have been solved and now you've only got smaller problems left, and
2. Your intuitions are good and your expertise has increased and you know where to look for
   answers[^3].

## Exceptional problems:

But there seems to be a consistent exception to this model.[^4] Let's
be silly and call them `type W` problems. These are the problems that eat up
far too many hours, and are tiring to solve, even when you are (in most other
respects) an expert.

For me, these tend to relate to blob storage solutions for web apps deployed
into production. I can think of several factors why this is so, and I'll
describe the specifics before generalising.

When a web app runs in production, the data is not stored on the web server
because the things that make a web-server cheap and efficient are not the
things that make a database or a file storage bucket cheap and efficient.

Therefore they are stored somewhere else and you need some plumbing to join
everything together. There are some abstractions involved to make this work
easily and securely. However when developing locally, you are doing everything
on your laptop. You have a web-server, relational database and file system all
in the same place.

This is a big, fundamental, architectural difference between your development
environment and your production environment. As a general rule, these are
supposed to be as similar as possible.

These differences make it much easier to make something that works locally but
doesn't work in production, and it's very hard to test if a thing will work in
production without deploying it to your staging environment, which you are
likely less familiar with than your local development setup.

Deploying to staging and debugging on staging is slower and harder than doing
the same thing locally. Logging (and filtering) will likely be more important.

## Solving exceptional problems

So how do you solve these problems quickly and efficiently? What is it about
this problem that makes it so hard? Let's examine what makes the problem
difficult to solve:

1.  Iteration cycles are slow - I can't test locally, I have to deploy to
    staging and this takes time.

2.  The problem occurs in a 'high friction' environment - its difficult to dig
    around and figure out what's really going on when its hidden below 3
    different layers of abstraction, on a remote machine that I have limited
    access to via a web browser. I want to be able to dig and investigate
    quickly and easily using the same tools I use for writing and testing code
    locally. I've taken great efforts to set up my local development
    environment so that I can do this, and its stressful to switch to a
    different and more limited set of tools.

3.  The problem is the result of several things interacting at once, and I can't
    just test things one at a time. These things are probably very similar to
    the abstractions.

    Thinking clearly, learning, buidling, solving problems, all rely on being
    able to separate or untangle a seemingly complex situation into its
    component parts so that you can figure out what causes what. If you can't
    isolate individual concerns or components, you have a black box that is
    keeping you ignorant.

    In web development, customized logging is usually a good way to being
    isolating and exploring particular components.

Having said all that, I think the best way to solve a problem is to prevent it
from occurring in the first place, but I'm not good enough to figure out how to
do that, yet.

[^1]:
    on which timescale? Life is long, does it really matter if it takes 1 week
    or 1 month to learn something meaningful? Momentum, and having fun, is important
    though.

[^2]:
    from a personal growth point of view. I suppose from an employers point of
    view they want all problems solved fast, `type 1` problems.

[^3]:
    Open the right file, google the right query (and follow the link to stack
    overflow), make some changes, run your static type checker and linter, run your
    tests, and push. Done and on to the next item.

[^4]:
    which is totally fine. It's just a mental model, and the map is not the
    territory
