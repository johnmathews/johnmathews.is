---
title: Notes From "Powerful Python"
slug: python-notes
date: "2021-1-21 14:55"
category: Technical>Developer-Tools
tags: ["uncategorized"]
---

The parts of Aaron Maxwell's [Powerful Python](https://twitter.com/powerfulpython)
newsletter that I don't want to forget:

Contents:
<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

## Emergent Abstractions

Get used to expecting and letting abstractions emerge from projects. If you
find yourself repeatedly solving similar problems in similar ways, what can you
do that will simplify the code and the implementation[ref]
[Abstraction](/blog/principles-of-oop#2-abstraction) is a
principal of OOP[/ref]?

Is it a couple of convenience methods on some helper class?

The code below gives you three ways of instantiating the twitter API
client within the same class:

1. A generic "normal" way
2. A specialized way that looks for certain environment variables
3. A specialized way that looks for a configuration file

```python
import os
import twitter # https://pypi.org/project/python-twitter/

class ApiClient:
    def __init__(self, consumer_key, consumer_secret,
                 access_token_key, access_token_secret):
        self.api = twitter.Api(
            consumer_key,
            consumer_secret,
            access_token_key,
            access_token_secret)

    @classmethod
    def from_environ(cls):
        return cls(
            os.environ['TWITTER_CONSUMER_KEY'],
            os.environ['TWITTER_CONSUMER_SECRET'],
            os.environ['TWITTER_ACCESS_TOKEN_KEY'],
            os.environ['TWITTER_ACCESS_TOKEN_SECRET'])

    @classmethod
    def from_config_file(cls, path):
        with open(path) as config_file:
            # ...
            return cls(...)

    # ...
```

## Practioner, Engineer, Scientist

1. **Practioner** - You can use a thing (a framework, a tool)
2. **Engineer** - You can use a thing and if you needed to, you could recreate it
3. **Scientist** - You can create frameworks and paradigms that have never existed before

Aim for the engineer level.

## Sentinel Values

Instead of setting your sentinel value to something that is not quite
impossible, like `None` or `"None"` set it to `object()`

This is better because it creates a unique instance of the `object` class and
there can be no ambiguity about where it came from.

- A sentinel value is a value you can set a variable to.
- It's special because it differs from all other legal or possible values that the variable could have.
- It's used as a signal or as a canary that something (bad or unexpected) has happened.

## Levels of Python Code

1.  **Syntax** - understand what indentation is important, when you need
    parenthesis, colons, etc

2.  **Idioms** - the building blocks of a program. "Paragraphs" of code that
    follow common patterns, like for loops, \_\_init\_\_() methods (boilerplate)
    or context managers.

3.  **Design Patterns** - Less well defined that Idioms, but more useful. [More
    info](design-patterns).

    - Creational Patterns, like Factories
    - Structural Patterns, like Adapters or Proxies
    - Behavioural Patterns, like `Visitor` or `Strategy`

    These tend to be the same across different languages.

4.  **Architectural** - the largest structures in your software system. The
    language itself doesn't make a lot of difference, an application would have
    the same architecture whether it is written in Python or Java. The interface
    between different components would be different, but the "organs" of the
    body would essentially be the same.

## Read PEPs

A Python Enhancement Proposal is a document that's written to propose a new
feature of Python.

It fully details the proposed feature, the arguments for and against it, and
lots of sample code.

If the PEP is accepted into a future version of Python, the PEP becomes
the authoritative document for that feature and how to use it.

PEPs tend to be written by the best programmers in the world, so hang out with
them.
