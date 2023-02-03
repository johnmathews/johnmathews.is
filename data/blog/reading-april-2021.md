---
title: Reading - April 2021
slug: reading-april-2021
date: "2021-04-21 12:55:20"
category: Non-technical>Journal, Technical>Other
tags: ["reading"]
---

<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

Articles and blog posts I saved to read later:

# [The Architecture Behind A One-Person Tech Startup](https://anthonynsimon.com/blog/one-man-saas-architecture/)

An article by [Anthony Najjar Simon](https://twitter.com/anthonynsimon) about how he runs his one-man SaaS using Django.

- Low stress, one-person company, run from a flat.
- Self-funded, taking things slow - _he likes taking things slow_.
- Grateful to be standing on the shoulders of the open source giants who went ahead and made the OSS stack we all enjoy and benefit from.
- Your own context matters when choosing a tech stack. There is no "holy grail". I guess this means that you should use what you're familiar with and what is _boring_ for you.
- Uses K8s on AWS. He says "dont fall into the trap of thinking you need to use it too" - expertise with these tools was learnt over several years fighting fires on the day job.
- Productive because he used the tools he is most familiar with and he can focus on shipping.
- Django, Celery, PostgreSQL, Python, AWS, Redis. - same as MoneyBar and PipPip.

# [Boring tech behind a one person SaaS](https://www.listennotes.com/blog/the-boring-technology-behind-a-one-person-23/)

- The tech-stack keeps evolving
- "Boring" means "what I'm familiar with so that I can focus on the business"
- Most of his time is spent talking to people and thinking. He spends 15% of his time on engineering. Probably it was more when he was setting stuff up.
- The methods described in the post are **definitely not the best way**. _It's just one way of doing engineering in a very specific type of business. It's not the only way._
- Django, Celery, PostgreSQL, Python, AWS, Redis. - same as MoneyBar and PipPip.
- Uses Ansible for provisioning machines. - YAML files. Should look into this.
- "Good enough for now"
- Doesn't use CI tools, he uses Ansible with a shell script he wrote.
- Uses [Datadog](https://www.datadoghq.com/) for monitoring and alerting, and PagerDuty.
- Uses [Rollbar](https://rollbar.com/), which seems similar to Sentry.
- Uses Slack, not to talk with humans, but integrations with Rollbar and Datadog, and also [slack incoming webhooks](https://api.slack.com/messaging/webhooks) to be notified when someone signs up or does something interesting like deletes a thing.
- Make a "ding" sound whenever someone signs up.
- He's _always very careful about operational stuff_ to prevent downtime and outages. Servers are over-provisioned to protect against spikes caused by sudden media interest.
- Avoids working from home or cafe cos its more productive in an office. Productivity is important - make every minute count. He doesn't often work more than 8 hours/day.
- He optimizes for spending less time and making money instead of more time and saving money.
- Uses `Vagrant` and `virtualbox` on an MBP so that dev work is on the same systems as prod infra.
- Uses 1 monolithic repo. Likes this approach.
- _He uses contractors_!!
- Usually, the biggest obstacle to building and shipping things is overthinking. What if this, what if that. You are not important at all and no one cares. No one sees. Even if you screw up the initial product launch, no one will care because they're not looking. Only when you've proved that you deserve their attention will you have any attention and visibility.
- **[Think big, start small, act fast](https://hackernoon.com/think-big-start-small-act-fast-6fdab1f771ea)**.
- Use boring technology, or whatever tech you want. Just make sure you're solving an actual problem.
- Ignore the [cargo cult people](https://stevemcconnell.com/articles/cargo-cult-software-engineering/) and ignore the noise. Keep calm and carry on.

# [Django's place in a web development world](https://thenewstack.io/djangos-place-in-a-web-development-world-ruled-by-react/)

- Not everything needs to be an SPA
- Django is a back-end framework, it'll work with an front-end framework, because separation of concerns.
- To use Django with an SPA, you could use DRF, or just normal views that return JSON.
- Reading this makes me want to check out React to see what all the fuss is about.

# <s>[Cache invalidation](https://yihui.org/en/2018/06/cache-invalidation/)</s>

# [Vim abbreviations](https://jovica.org/posts/vim_abbreviations/)

- Cool and all, but not as powerful as snippets I think.
- Auto correcting typos: teh -> the
- Expanding phrases: kr -> kind regards
- Multi-line text expansion.
- It really seems similar to what I'm using UltiSnips for.
- I found [this](https://stackoverflow.com/questions/30266587/snippets-vs-abbreviations-in-vim) question on SO comparing abbreviations and snippets. TLDR: It's easier to add and maintain snippets than abbreviations, and you have less boilerplate with snippets than abbreviations, especially in complex cases.

# <s>[To fix the social sciences, look to the “dark ages” of medicine](https://thereader.mitpress.mit.edu/social-sciences-dark-ages/)</s>

# [Emotional resilience in leadership report](https://docs.google.com/document/d/18FfZ86PGA_uSFf425EzKXAmiFQLFBPqjqPN7iu1TZRw/preview?pru=AAABdEZGCv8*_gdPBrQH8tAPyvMfLk6Unw)

# [3 virtues of a programmer](http://threevirtues.com/)

- Laziness - The quality that makes you go to great effort to reduce overall energy expenditure. It makes you write labor-saving programs that other people will find useful and document what you wrote so you don't have to answer so many questions about it.
- Impatience - The anger you feel when the computer is being lazy. This makes you write programs that don't just react to your needs, but actually anticipate them. Or at least pretend to.
- Hubris - The quality that makes you write (and maintain) programs that other people won't want to say bad things about.
- Also, I read a quote somewhere saying the mark of a great program is having people use it in ways you didn't expect, or something like that.

# [Is WebAssembly magic performance pixie dust?](https://surma.dev/things/js-to-asc/)

# [Yamauchi No.10 Family Office](https://y-n10.com/)

- A beautifully designed website.

# [Improve and Extend Your Text Objects With targets.vim](https://www.barbarianmeetscoding.com/blog/exploring-vim-plugins-improve-and-extend-your-text-objects-with-targets-vim)

# [A Vim Guide for Adept Users](https://thevaluable.dev/vim-adept)

- How to manipulate multiple quickfix and location lists.
- What are digraphs and how to use them.
- Useful keystrokes in INSERT mode.
- Useful keystrokes in VISUAL mode.
- Vim regular expressions.
- Using shell commands in Vim.
- Folding content.

# [Deep dive in CORS](https://ieftimov.com/post/deep-dive-cors-history-how-it-works-best-practices/)

# [The TTY demystified](http://www.linusakesson.net/programming/tty/index.php)

- `ps 1` - see which processes are running or sleeping. `WCHAN` tells you which
  kernel event a waiting processing is awaiting.
