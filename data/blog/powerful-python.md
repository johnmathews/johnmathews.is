---
title: Powerful Python
slug: powerful-python
date: '2021-11-29 13:23:47'
category: Technical>Engineering
tags: ['python']
---

Aaron Maxwell's Powerful Python course looks great. It's outstanding because, as
far as I can tell, it explains abstract ideas clearly and with practical
examples. If becoming exceptionally good at Python ever makes it to the top of
my list of professional priorities then I'd certainly take the course. For now
though I'm going to make some notes on the marketing emails he send:

<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

## Good mental models:

```python
def f(x):
    return x+2
```

Function `f` is a nameless function object tied to a variable called "f". You
can also think of it as a function called "f", but the first mental model is
more useful. It lets you reason about function factories, passing functions as
arguments to other functions, and writing decorators.

Also, apparently, Virginia Satir was such an incredible family therapist that
people wrote books about how great she was. She once said _"Most people think the
will to survive is the strongest instinct in humans, but it isn't. The strongest
instinct is to keep things familiar"_.

## Staying motivated

Most people think that motivation is about willpower, but its not. It's about
creating "wins". When you invest your time and effort, you get that "aha!"
moment where you see the computer do something new, or you get that feeling of a
little breakthrough. It makes you excited to take another step and go a little
further. And get another little win.

## 95/5 rule

OOP is not just a tool for organizing your code. It's a tool for organizing how
you think about code. Here is a roadmap to break into the top 1% of python
programmers:

- Create powerful abstractions that accelerate and amplify all the python
  you write.
- Write automated tests, which lets you break through the ceiling of
  complexity, so that you can suddenly write truly complex software as easily
  as you used to write simple software.
- Create robust high-performance scalability - writing software than gracefully
  handles increasing magnitudes of data without breaking a sweat.
- Learn how to use the higher-order abstractions that the most important
  and prominent python libraries are built on (pandas, flask, django, pytest,
  requests).

## Hidden meaning of "("

```python
class Prefixer:
    def __init__(self, prefix):
        self.prefix = prefix
    def __call__(self, message):
        return self.prefix + message
```

Use it like:

```zsh
>>> simonsays = Prefixer("Simon says: ")
>>> simonsays("Get up and dance!")
'simon says: Get up and daance!'
```

What is the type of `simonsays`? If you look at just the last line you would
think its a function, but it is not. It is an instance of `Prefixer`.

There is a translation step. When you write "simonsays('foo')" it is translated
(kind of) to "simonsays.**call**('foo')". In other words, `simonsays(` triggers
a function call.

Also:

```zsh
>>> def increment(x):
...     return x+1
...
>>> increment.__call__(2)
3
```

You can do it with regular functions too.
There is a difference between the python that you write, and the python that the
compiler perceives. The `(` is replaced with `.__call__(`.

## Current favourite python book

There are 4 levels of Python code:

1.  Syntax
1.  Idioms
1.  Patterns
1.  Architecture

Check out "Architecture Patterns with Python" by Harry Percival and Bob Gregory.

## Secret Instinct

Something that the best programmers have in common:

_They really hate repetitive code._
