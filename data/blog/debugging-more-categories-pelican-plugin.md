---
title: Debugging the more_categories plugin for Pelican
slug: debugging-more-categories-pelican-plugin
date: "2021-1-19 12:00"
category: Technical>Developer-Tools
tags: ["uncategorized"]
---

I've realised that one of the plugins I use to make this blog is not working
correctly. I use the `more_categories` plugin to:

1. add subcategories
2. assign multiple categories to articles.

Subcategories aren't working and Pelican thinks each article just has
categories than contain forward slashes.

In his "Powerful Python" emails, Aaron Maxwell recommends looking at the source
code for popular python libraries to see how really good Python is written, and
how talented developers write code and solve problems.

This is a good opportunity to look at the code that powers the plugin and see
if if I can:

1. Understand the source code
2. Locate the source of the problem
3. Fix the problem

I don't know if Pelican is amazingly good quality or not, I get the feeling it
could do with more developer resources, but I've got a real reason and
motivation to look at the underlying code so I'm going to give it a shot.

The documentation is sparse which doesn't help, I get the impression that
whoever wrote it feels like Pelican is simple and it's obvious what's going on
[ref]I guess it's the "curse of knowledge"[/ref]. It's not obvious to me.

## Pelican Plugins

Every plugin has to have a `register()` function, here it is for the
`more-categories` plugin:

```python
def register():
    signals.article_generator_context.connect(get_categories)
    signals.article_generator_finalized.connect(create_categories)
```

I understand the idea of signals from Django, and generators are discussed a
bit in the [documentation](https://docs.getpelican.com/en/latest/internals.html#how-to-implement-a-new-generator). So what else is happening...

As I write down my understanding of the plugin, I'm aware that my understanding
is definitely incomplete and probably wrong. I hope that as I progress I will
see the mistakes in what I've already written.

`get_categories()` is called first, and it takes two arguments, `generator` and
`metadata`. The entire function is 3 lines so here it is:

```python
def get_categories(generator, metadata):
    categories = text_type(metadata.get('category')).split(',')
    metadata['categories'] = [Category(name, generator.settings) for name in categories]
    metadata['category'] = metadata['categories'][0]
```

It looks like it gets the category from the metadata for each article.
Presumably by the time this function is called the articles have already been
parsed and a `metadata` object has already been created and populated with
metadata about the articles, including categories.

The first row of `get_categories()` splits up the categories if multiple
categories are listed. `metadata` must be a dictionary, and there must be a
metadata dict for each article, otherwise you couldn't just get get the value
assoiciated with the dictionary key and then split the string on commas.

This means that this function is called once for each article.

I don't know what `text_type` does yet. Maybe it ensures that the output is
always a string. It's imported from `six` which I remember seeing being a
dependecy of some other packages.

.. Having checked the
[documentation](https://six.readthedocs.io/#six.text_type) for `six` it looks like I was
right - it represents unicode textual data in both `python2` and `python3`.
Pelican was originally written in Python2 I guess.

Next step is to write a new key-value pair to the metadata dictionary for each
article. This plugin adds functionality to python by enabling `categories`
and not just a `category` for each article. It seems clear that adding a
`categories` key to the metadata dict is an obvious way to do this. The value
for the `categories` key is a `list` where each item is an instance of the
`Category` class. This class is instantiated using two arguments, `name` which
is the string from the previous row, and `generator.settings` which is
currently not understood.

.. printing the contents of `generator.settings` shows that its a dictionary of
all the settings. Easily assumed and good to confirm.

I'll dig into the `Category` class in a moment, but first lets quickly cover
the last row of the function. The `category` attribute of the articles metadata
is simply updated with the first item in the categories list (`categories`
must be a list because it can be indexed.)

## class Category():

This class is the only class defined by the plugin (which is only 96 lines of
code). It has 6 methods, 5 of them are decorated, and it has no constants.

The decorators are `property` [3], `_name.setter` [1] and `URLWrapper.name.setter` [1].
`URLWrapper` is imported from `pelican.urlwrappers` and I don't know what that
does beyond "wrapping URLs".

### @property

Decorators are functions that takes methods or functions as inputs. Using
`property` along with `setter` decorators lets a class have a property assigned
to it whilst ensuring that arbitrary conditions or logic is upheld. If the `@property`
decorator is over a method called `foo`, then there would need to be a
decorator called `foo.setter` on a method somewhere in the class.

That doesn't seem entirely right though, because in our `Category` class, we
have a `@property` decorator over a `_name` method, and also a `@_name.setter`
decorator over another method called `_name`. But the other methods with
`@property` decorators (`slug` and `ancestors`) do not have any associated setter
decorators or methods.

The setter for `_name` seems to create parent categories if the string contains
slashes:

```python
@_name.setter
def _name(self, val):
    if '/' in val:
        parentname, val = val.rsplit('/', 1)
        self.parent = self.__class__(parentname, self.settings)
    else:
        self.parent = None
    self.shortname = val.strip()
```

Here, `self.parent` becomes an instance of the category class, that is
instantiated using `parentname` and `self.settings`. This is recursive to
however many levels of subcategories are specified.

The `ancestors` and `as_dict` methods seem more confusing. `ancestors` isn't
called or mentioned within the class definition, but is called from the
`create_categories` function which is called after the `get_categories`
function returns. I don't understand why it needs an `@property` decorator
though.

The class inherits from `URLWrapper` so that is probably the next best place to
look... Indeed, looking at the definition of `URLWrapper` shows that the
`as_dict` method is overriding the definition in the base class.
