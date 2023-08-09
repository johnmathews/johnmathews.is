---
title: Someone else's guiding principles after 20 years of programming
slug: someone-elses-guiding-principles-after-20-years-of-programming
date: '2022-03-22 13:14:35'
category: Technical>Developer-Tools
tags: ['advice']
---

This is a copy of a great article on [medium](https://alexewerlof.medium.com/my-guiding-principles-after-20-years-of-programming-a087dc55596c) by Alex Ewerloef.

I've copied it here because an article on Medium could disappear at any moment,
and its too good to lose:

---

I’ve been programming since 1999 and this year I’ve officially coded for 20+
years. I started with Basic but soon jumped into Pascal and C and then learned
object oriented programming (OOP) with Delphi and C++. In 2006 I started with
Java and in 2011 I started with JavaScript. I’ve worked with a wide range of
businesses from robotics, fin tech, med tech to media and telecom. Sometimes I
had a different hat as a researcher, CTO, TPM (technical product manager),
teacher, system architect or TL (technical leader) but I’ve always been coding.
I’ve worked on some products that served millions of people, and some that
failed before being released. I worked as a consultant and I even had my own
startup. I have spent lots of time on open source projects, closed source
projects and internally open source projects (proprietary code that is developed
by a community inside the company). I’ve worked with tiny microcontrollers all
the way to mobile and desktop apps to cloud servers and lately serverless.

For my 20 years programming anniversary, I tried to list the top principles that
have been accumulated over the years as my guiding principles through my career:

1.  Don’t fight the tools: libraries, language, platform, etc. Use as much native
    constructs as possible. Don’t bend the technology, but don’t bend the problem
    either. Pick the right tool for the job or you’ll have to find the right job for
    the tool you got.

1.  You don’t write the code for the machines, you write it for your colleagues
    and your future self (unless it’s a throw away project or you’re writing
    assembly). Write it for the junior ones as a reference.

1.  Any significant and rewarding piece of software is the result of
    collaboration. Communicate effectively and collaborate openly. Trust others and
    earn their trust. Respect people more than code. Lead by example. Convert your
    followers to leaders.

1.  Divide and conquer. Write isolated modules with separate concerns which are
    loosely coupled. Test each part separately and together. Keep the tests close to
    reality but test the edge cases too.

1.  Deprecate yourself. Don’t be the go-to person for the code. Optimize it for
    people to find their way fixing bugs and adding features to the code. Free
    yourself to move on to the next project/company. Don’t own the code or you’ll
    never grow beyond that.

1.  Security comes in layers: each layer needs to be assessed individually but
    also in relation to the whole. Risk is a business decision and has direct
    relation to vulnerability and probability. Each product/organization has a
    different risk appetite (the risk they are willing to take for a bigger win).
    Often these 3 concerns fight with each other: UX, Security, Performance.

1.  Realize that every code has a life cycle and will die. Sometimes it dies in its
    infancy before seeing the light of production. Be OK with letting go. Know the
    difference between 4 categories of features and where to put your time and
    energy:

        - Core: like an engine in a car. The product is meaningless without it.
        - Necessary: like a car’s spare wheel. It’s rarely used but when needed, its function decides the success of the system.
        - Added value: like a car’s cup-holder. It’s nice to have but the product is perfectly usable without it.
        - Unique Selling Point: the main reason people should buy your product instead of your rivals. For example, your car is the best off-road vehicle.

1.  Don’t attach your identity to your code. Don’t attach anyone’s identity to
    their code. Realize that people are separate from the artifacts they produce.
    Don’t take code criticism personally but be very careful when criticizing
    others’ code.

1.  Tech debt is like fast food. Occasionally it’s acceptable but if you get used
    to it, it’ll kill the product faster than you think (and in a painful way).

1.  When making decisions about the solution all things equal, go for this
    priority:

1.  Security > Reliability > Usability (Accessibility & UX) > Maintainability > Simplicity (Developer experience/DX) > Brevity (code length) > Finance >
    Performance

1.  But don’t follow that blindly because it is dependent on the nature of the
    product. Like any career, the more experience you earn, the more you can find
    the right balance for each given situation. For example, when designing a game
    engine, performance has the highest priority, but when creating a banking app,
    security is the most important factor.

1.  Bugs’ genitals are called copy & paste. That’s how they reproduce. Always
    read what you copy, always audit what you import. Bugs take shelter in
    complexity. “Magic” is fine in my dependency but not in my code.

1.  Don’t only write code for the happy scenario. Write good errors that answer
    why it happened, how it was detected and what can be done to resolve it.
    Validate all system input (including user input): fail early but recover from
    errors whenever possible. Assume the user holds a gun: put enough effort into
    your errors to convince them to shoot something other than your head!

1.  Don’t use dependencies unless the cost of importing, maintaining, dealing
    with their edge cases/bugs and refactoring when they don’t satisfy the needs is
    significantly less than the code that you own.

1.  Stay clear from hype-driven development. But learn all you can. Always have
    pet projects.

1.  Get out of your comfort zone. Learn every day. Teach what you learn. If
    you’re the master, you’re not learning. Expose yourself to other languages,
    technologies, culture and stay curious.

1.  Good code doesn’t need documentation, great code is well documented so that
    anyone who hasn’t been part of the evolution, trial & error process and
    requirements that led to the current status can be productive with it. An
    undocumented feature is a non-existing feature. A non-existing feature shouldn’t
    have code.

1.  Avoid overriding, inheritance and implicit smartness as much as possible.
    Write pure functions. They are easier to test and reason about. Any function
    that’s not pure should be a class. Any code construct that has a different
    function, should have a different name.

1.  Never start coding (making a solution) unless you fully understand the
    problem. It’s very normal to spend more time listening and reading than typing
    code. Understand the domain before starting to code. A problem is like a maze.
    You need to progressively go through the code-test-improve cycle and explore the
    problem space till you reach the end.

1.  Don’t solve a problem that doesn’t exist. Don’t do speculative programming.
    Only make the code extensible if it is a validated assumption that it’ll be
    extended. Chances are by the time it gets extended, the problem definition looks
    different from when you wrote the code. Don’t overengineer: focus on solving the
    problem at hand and an effective solution implemented in an efficient manner.

1.  Software is more fun when it’s made together. Build a sustainable community.
    Listen. Inspire. Learn. Share.

I don’t claim to be an authority in software development. These are just the wisdom I earned along the way. I’m sure this list will be more mature after another 20 years.
