---
title: Prediction Markets
slug: prediction
date: "2018-6-7 12:29"
category: Technical>Cryptocurrencies
image: src="/images/dover.jpg" alt="Port of Dover"
tags: ["gnosis", "prediction", "markets", "brexit", "betting"]
tweet: Prediction markets - more reliable than surveys, experts and many statistical methods, and they're getting easier and cheaper! #Gnosis
summary: Prediction markets can be more accurate than surveys, experts, and polls, and they're becoming easier and cheaper to create.
---

# Predicting port traffic using prediction markets

## Background

A [prediction market](https://en.wikipedia.org/wiki/Prediction_market) allows people to bet on an unknown future event. For example, "What will the Euro-Dollar exchange rate be on date X?".

In several common forecasting scenarios, prediction markets have been more accurate than polls, expert opinions, and statistical methods[^1] and therefore prediction models are useful for observers (anybody who is interested in the outcome) and not just the market's participants. Prediction markets can be used for categorical events (a specific event that either does or doesn't happen) or scalar events (when the outcome is between a range of values). The predefined source of truth for the outcomes being predicted is called an Oracle.

Prediction markets enables participants to purchase shares or tokens tied to the outcome of a specific future event. Once the event has occurred, holders of the tokens representing the actual outcome will receive a reward of predefined value. This creates an incentive to hold tokens corresponding to the correct outcome, and the market dynamics of supply and demand allow the price to reflect perceived probabilities of different outcomes. Helpfully, the price of each type of token corresponds to the relative probability of each outcome occurring which allows for simple interpretation of the results. If the reward for holding a share corresponding to the correct outcome is $1, and the present price of this share is 50 cents, then the market's estimate of the likelihood of this outcome occurring is 50%.

Shares can be traded continuously. As trading occurs over time the probability of different outcomes will change as new information becomes known, and the changing price of the shares quantify this.

## An example

Let's describe how this could work with an example:

There is a large degree of uncertainty[^2] around how Britain will continue to trade with the other European countries when it exits the EU on March 29, 2019. A prediction market will likely be a better predictor of the outcome than any other method.

If an adequate agreement isn't achieved, Britain's main port at [Dover](https://en.wikipedia.org/wiki/Port_of_Dover) will certainly experience long delays and large traffic jams. Therefore a prediction market asking "How many vehicles will be admitted into Britain at the port of Dover between 00:00 and 23:59 on March 29 2019?" will give a useful prediction about the outcome of Britain's trade negotiations - a key component and sticking point in the Brexit negotiations.

Each type of token in the prediction market will correspond to different quantities of vehicles entering the port[^3] - for example there could be four (or more) categories; Less than 8000, between 8000 and 11000, between 11000 and 14000, and more than 14000. The relative price of a share in each category will correspond to the relative probabilities of each possible outcome.

If the number of vehicles is lower than would otherwise be expected, (around 12000) this would likely be due to the impact of Brexit and thus the market will serve as a useful proxy for predicting what kind of Brexit will occur.

## Stakeholder incentives are aligned

One reason that prediction markets work so well is because they aggregate information from disparate sources and the price shows not only an impartial assessment of the most likely outcome but the aggregated level of confidence that the participants have. Since no one is obliged to participate, those that do believe they have valuable information which gives them a competitive advantage. This creates a mechanism that moves good quality information into the prediction market, with the resulting prices reflecting the probability of a range of outcomes.

In our example, people with relevant information would include port employees, business owners in the UK and in Europe, politicians, civil servants, business analysts, bankers, etc. Whilst it is clear that any of these roles may have useful information or judgement about the outcome, it is not clear how useful each participants role is relative to the others. By allowing a participant to bid for as many shares in as many different categories as they want, each participant's confidence in their information can be quantified.

In this way, prediction markets align the incentives of market participants and observers. If the market is large enough then it becomes prohibitively expensive to distort the market and promote poor quality information, including information designed to create FUD (Fear, Uncertainty, Doubt), fake news, or alternative facts.

## Market providers

Prediction markets are nothing new, with political betting being used to make predictions as early as the 1500s. However the adoption of the internet and decentralised networks now allow prediction markets to be used more widely and cheaply than ever before. Gnosis is building a platform on the Ethereum blockchain on which others can build new applications which harness the power of prediction markets.

By lowering the cost and complexity of creating a prediction market, observers can benefit from high quality and impartial predictive information about future events, and market participants are rewarded for accurate assessments of likely outcomes. This will enable better decision making and empower observers with previously unobtainable insight. In our example, the market could be created and funded by any organisation that would benefit from knowing the results of the prediction market. This could be the port of Dover itself, news organisations, or market research firms. Any of these businesses would benefit from an accurate prediction.

[^1]: K. J. Arrow, R. Forsythe, M. Gorham, R. Hahn, R. Hanson, J. O. Ledyard, S. Levmore, R. Litan, P. Milgrom, F. D. Nelson, G. R. Neumann, M. Ottaviani, T. C. Schelling, R. J. Shiller, V. L. Smith, E. Snowberg, C. R. Sunstein, P. C. Tetlock, P. E. Tetlock, H. R. Varian, J. Wolfers, and E. Zitzewitz. The promise of prediction markets. Science, 320(5878), 2008.
[^2]: For example https://www.nytimes.com/2018/06/03/world/europe/brexit-customs-union-dover-border.html
[^3]: Data from https://www.doverport.co.uk/about/performance/
