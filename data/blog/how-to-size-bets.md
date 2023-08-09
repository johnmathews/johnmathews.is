---
title: How to size bets
slug: how-to-size-bets
date: '2022-02-09 12:34:36'
category: Non-technical.Other
tags: ['statistics', 'investing', 'gambling', 'math']
---

An interactive [article](https://explore.paulbutler.org/bet/) that discusses the optimal strategy
for the following scenario:

"I have a coin that lands heads 60% of the time and tails 40% of the time. You have $25 and can bet
on either side of the coin — every time you’re right you double your bet, and every time you are
wrong you lose it."

Theres a widget on the page that lets you select an amount, what side to bet on, and a chart showing
your balance after each coin toss.

My first attempt at this game was probably my best. My intuition is that its always optimal to bet
on heads because each coin toss is independent, and 60% is more than 40%.

However the question of how much to bet on each coin toss is more complicated because you lose if
your balance dips below 0. If you bet 50% of your balance and lose on 2 consecutive coin tosses,
then you're out. The probability of this is $0.4^2 = 0.16$. 0.16 is quite low, but whilst playing
the game you will toss the coin 50 - 100 times, so there are many opportunities.

If you toss the coin 50 times, there are 49 opportunities to lose twice consecutively. I don't know
the math for this probability, so I'll go learn it, but intuitively I think that 50% of the pot is
too high. I went with 33% and won (reaching \$250) in about 50 throws.

I'd like to know how to optimise this, so I'll read the article.

Also:

- [Insurance and the Kelly Criterion](https://blog.paulhankin.net/kellycriterion/)
- [HN Comments](https://news.ycombinator.com/item?id=30265797)
