---
title: Python Notes
slug: python-notes-2
date: "2021-3-17 09:12"
category: Technical/Developer Tools
tags: ["python", "learning notes"]
---

# \_\_call\_\_()

In Python, every time you call a function or method such as `my_function()` or
`my_class.my_method()` the interpreter will replace the `(` with
`.__call__(`

```python
>>> def my_function(x):
>>>    return x+1

>>> my_function.__call__(2)
3
```

```python
class Prefixer:
    def __init__(self, prefix):
       self.prefix = prefix
    def __call__(self, message):
       return self.prefix + message
```

Then use _prefixer_ like this:

```bash
>>> simonsays = Prefixer("Simon says: ")
>>> simonsays("jump up high!")
'Simon says: jump up high!'
```

Every time you call a function or method, you're really just calling a built in
`__call__` method.

# There should be one, and preferably only one, obvious way to do something

It's in the 'zen of Python', which is a set of guidelines that help make
design decisions. It's a choice that Python made, and other languages do it
differently.

There are different
[levels]({filename}/articles/python-notes.md#levels-of-python-code) to
languages and this applies more to the idiom level than the design pattern
level. It applies even less at the architectural level where there can be
several equally good ways of organizing business logic and data
representations.

Perl has the "TMTOWTDI" (tim towtdi) principle - "There's More Than One Way To Do
It". Perl's philosophy is to give users more than one way to do something.
