---
title: Notes on learning Django
slug: learning-to-django
date: "2021-1-14 14:17"
category: Technical>Web
tags: ["uncategorized"]
---

Contents:
<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

## In the beginning

I came to web development via business analytics. I was working as an
accountant and Excel wasn't good enough anymore, so I looked around for a way
to get started and came across [Jupyter
Notebooks]({filename}jupyter-ipython-notebooks-pandas.md).

Notebooks are said to be a kind of "gateway drug" to programming, and I think
that's true. They're the easiest and fastest way to start programming that I've
come across.

When you're working in a notebook, its easy to get data, wrangle it, and show
some results. But as soon as you can create a chart or some summary table you
inevitably wonder how you can show this to people more easily, and publishing
the results to a website feels like the best most general and versatile
solution.

Unfortunately it's also the hardest, and so begins a long series of compromises
and incremental progress. Learn to use a dashboarding API, and learn to create
static sites. But the end-goal, the ultimate solution, is a data driven web
app, with authentication, saved user preferences, scalable performance, and
automatically updated data sources.

## A personal finances dashboard

When I moved to the Netherlands, I wanted to use a personal finances dashboard
to check weekly expenses. There wasn't a web-app that would do this (though
there are a couple of apps that are trying) so I built my own dashboard. Then a
few friends asked if they could use it too. They couldn't because it was just a
dashboard and not a web app, but I thought this was a good reason to jump into
web development.

It was a much bigger task than I anticipated. (And that's OK.)

It took several attempts and was super frustrating, I would dabble for a few
weeks, do a few tutorials, and then get completely lost when I tried to do
something by myself. I'd get disorientated working across many different files
and trying to visualise which part of the Model-View-Controller model, or the
request-response cycle I was currently working on.

I came to realise that the mental load seems so large at the beginning because
"web-development" is really a whole stack of technologies and abstractions
combined (or stacked) together. Many of these have to be used together at the
same time before you can see _any evidence of success at all_.

## Learning Django

I think the hardest things about Django are not actually Django. You'll need to
comfortable with classes and inheritance. You'll also need to be comfortable
with working across multiple files, and have some tools for searching across
all you open buffers, or all the files in the project, at the same time. You'll
also need to be comfortable with version control (Git) and using the command
line. Get familiar with stack traces too.

If you're familiar enough with all these things, so that using them doesn't
feel new, but ideally feels familiar and comfortable, then I think you'll make
quite quick progress with Django.

Django uses the Model-View-Controller model. Models are how django maps Python
objects to items in your database (oh yeah, you need to be familiar with SQL
too...), Views are where requests are processed (also Middleware) and turned
into Responses, which are then combined with templates (unless your building an
API). You might notice I haven't mentioned what a Controller is - get used to
information feeling incomplete whilst you're learning the ropes. It'll become
clear soon enough.

## The best moments

The 'curse of knowledge' states that once you've learnt something you can't
imagine or remember what it's like to not know it. Before that happens
completely, I want to record some of the 'ahah!' moments of 'learning Django'.

For context, I stopped working as a freelance data scientist in April and after
a few weeks wondering if django and PostgreSQL and python was the way to go
(yes it is. use boring technology), I began working full-time on what would
become [MoneyBar.nl](https://moneybar.nl). I called it 'myeuros' in the
beginning.

The learning curve felt steep. I wanted to do things "right" the first
time because I wasn't building a toy, and although I felt that hindsight would
show this to be a mistake in terms of efficiency, I did it anyway because I
have a hunch that following my compulsions sometimes makes life harder in the
short term and better in the long term.

The best moments are usually preceded by the most frustrating.

### Adding a unique identifier to an existing authentication model

I used pydanny's `cookiecutter-django` template. Honestly, by the time I'd gone
through the quickstart process and googled the nouns in all the questions (what
is `Sentry`, what is `Celery` and what is a `task que`, what is `whitenoise`,
etc.) I was already tired. Play with it a few times and come back to it.

Anyway, I wanted to start with authentication, because the project template has
that part kind of up and rnuning for you out of the box. `cookiecutter-django`
uses the `Django Allauth` package, which is awesome, and reliable, and fully
featured... and extremely abstracted. Good luck looking at the module code and
understanding it if youre not an expert.

I wanted to give each user a unique ID - a `UUID` when they signed up. This
would be used in query strings instead of usernames or incremental keys. This
was so hard the first time! And it turns out its not a trivial task, not if you
already have a few users in your (test) database. Sure you can reset the
database and start again, but experimenting like this is fairly complex.
Understanding how the python model classes (the ORM) maps to the relations in
the PostgreSQL databse was complex, and if I got confused, should I try to fix
it by changing python Models, or editing migrations, or working on the database
directly? Getting started is one of the hardest things.

After I'd figured out authentication, I started creating models for other
simpler data (transactions and bank accounts I expect). This was much simpler
and faster. I remember driving home one evening thinking that if I could get
this far then success was inevitable.

### Testing code

Before long, testing each part of the app by hand when I added or changed a
feature was no longer trivial. I needed to find some way of automatically
creating users and checking that they could log in and access views.

I began working with `pytest`, and really found it hard to wrap my head around
the idea accessing different parts of the app not by requests and responses but
by accessing class methods directly.

I think its normal and good to code at the limit of your knowledge, where you
know just enough to make a thing "work". But this approach falters when you
want to then test what you wrote. Or at least, the measure of "just enough"
really changes when you require tests to be written. You don't just need to
make it work, you need to understand why it works, so that you can write tests
to assert that certain conditions pass and others fail.

This feels really satisfying when it works, because you have proof that you
really have grasped a bigger picture. There are far fewer (relevant) black
boxes when you write tests. But it also makes learning slower, at least in the
short term. It means you might have two get comfortable with a handful of
abstractions, when you've already solved the problem you started with. This is
frustrating, and it takes discipline to slow down, take a deeper look at the
solution, and not just race on to the next feature.
