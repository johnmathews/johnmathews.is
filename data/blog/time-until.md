---
title: >
  Übersicht widget: Time Until
date: "2016-08-07 11:40"
Author: John Mathews
category: Technical>Web
tags: ["applescript", "coffeescript", "javascript", "time until", "übersicht", "widgets"]
slug: time-until
status: published
---

In a [previous post](time-since) I described how I was introduced to CoffeeScript via [Übersicht](http://tracesof.net/uebersicht/), the desktop widget app for OS X, and eventually published the "[Time Since](http://tracesof.net/uebersicht-widgets/#time_since)" widget.

Seeing a few people download the widget was really satisfying, and I was soon wondering what else I could publish. As a pragmatic engineer, it seemed clear to me what the next widget should do: If my first widget calculated the time since an event, the next should calculate the time until an event. I set out to create the companion to "Time Since" and
improve upon the underlying code.

My first code design choice was to cut out the use of an Apple Script and calculated everything in one CoffeeScript file. It would be more efficient and easier to read.

Unfortunately I soon began to realise why the original widget I'd based "Time Since" on had used AppleScript to calculate the time elapsed. Date-Times are fiddly to work with in many languages, and this is true in JavaScript also.

My code began to look increasingly like spaghetti as I tried to achieve 6 key features:

1.  Calculate the number of months and days between two dates
    (complicated by the varying number of days in different months)
2.  Add the option to specify the level of detail in the output text (to
    the minute, to the hour, to the day, etc.)
3.  Remove any 0 amounts from the output ("2 Months and 5 Hours" not "2
    Months, 0 Days and 5 Hours")
4.  Add the option to abbreviate times ('years' → 'y', 'hours' → 'h',
    'and' → '&', etc.)
5.  Output a grammatically correct sentence (correct pluralisation and
    comma separated terms, with an "and" between the last two terms)
6.  Prepend and append users defined strings

After a few frustrating hours, it was clear that it would be a lot easier to modify the existing AppleScript rather than reinvent the wheel in JavaScript. I decided to use it instead of using only JavaScript as I knew the AppleScript file could correctly consider the number of days in
the months between the 2 dates (feature 1), and it contains a function to pluralise the correct parts of the string (feature 5).

The remaining features were added by using a combination of if statements and arrays. The if statements simply ask if an amount is equal to zero. If not, then it's appended to an array of terms to include in the output. At the end of this code chunk it's possible to ask how many non-zero terms to include in the output. An array with length one less than the number of output terms is created and filled with commas with an 'and' in the final position.

The two arrays are combined in the correct order by looping through the index of the longer array and appending each term to a final array. The final array is the output.

_'[Time Until](http://tracesof.net/uebersicht-widgets/#time_until)'_ can be downloaded from the [Übersicht](http://tracesof.net/uebersicht/) [widgets gallery](http://tracesof.net/uebersicht-widgets/). I think another useful feature would be an option to specify the output only in terms of a chosen amount, such as weeks or days. Maybe I'll do that in the future.
