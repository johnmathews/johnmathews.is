---
title: >
  Blogging with Pelican: Design, Plugins, Sharing
slug: pelican2
date: "2017-6-1 18:00"
category: Technical>Web
tags: ["pelican", "jinja", "python", "twitter", "facebook", "blog", "static site"]
tweet: Building a blog without compromising
image: src="/images/get_pelican.png" alt="Pelican blogging platform"
summary: My site is optimised for speed and clarity. I've added share buttons using a plugin which I modified and improved, and added meta tags to control how Twitter and Facebook show my articles in feeds.
status: published
---

## Design

My approach to building my blog is to keep it as simple as possible, only adding features when they make a significant improvement to how the content is understood and used. Therefore I've done away with several features that would normally come baked into a WordPress theme. For example a footer full of links that would never be used, and a sidebar full of distractions.

I opted for a single column design that hopefully presents text-heavy articles clearly and intuitively (please leave a comment and tell me what you think).

## Plugins

My use of plugins to extend Pelican's functionality reflects this, there is the [Neighbors](https://github.com/getpelican/pelican-plugins/tree/master/neighbors) plugin so that the next or previous post can be accessed from the bottom of a post without going back to the index, and the [Tag Cloud](https://github.com/getpelican/pelican-plugins/tree/master/tag_cloud) plugin to reflect which subjects are written about the most (and provide a link to all relevant articles).

## Speed

The speed of the site is important because a faster site is more enjoyable to use. Therefore I've minified the CSS and the JavaScript using the [Assets](https://github.com/getpelican/pelican-plugins/tree/master/assets) plugin. I've also set the CSS and JavaScript to load asynchronously. Images are optimised using the [Optimize Images](https://github.com/getpelican/pelican-plugins/tree/master/optimize_images) plugin so that their file size is as small as possible and they download quickly. The site uses CloudFlare's free CDN features so hopefully no matter when you view the site from you get a decent page speed.

## Jinja templates

I've also arranged the homepage so that posts are shown by their category and then by posting date. This may not work very well with a larger number of posts, but I'll only consider that problem once it presents itself. Designing for hypotheticals or conditions that don't yet exist is a waste of time.

There are examples of how I've used Jinja templates below in the context of sharing my articles on Twitter and Facebook.

## Plugin: Share Post

I noticed that my posts were beginning to get tweeted about, so I thought it would be useful to have some sharing buttons at the bottom of each post for Twitter, Facebook and Email. Looking at the Pelican Plugins repo on Github showed there was (as usual) a plugin for this (called [Share Post](https://github.com/getpelican/pelican-plugins/tree/master/share_post)), though I noted it hadn't been updated for a couple of years.

Installing and initial set-up was simple thanks to the readme on the git repo. You need to copy the plugin folder to the plugins directory, and add the name of the plugin to the list in pelicanconf.py. Then you need to copy paste some Jinja/HTML into the article.html template. That's enough to make it work.

I noted though that when I shared to Twitter the text to be tweeted was encapsulated in quotes and there was a 'b' at the front. I realised this was due to using Python 3.x when the plugin (which hadn't been updated for 2 years) was likely written for Python 2.x. A quick google and the obligatory trip to SO showed me how to convert a bytes string to a normal text string.

```python
# Python 2
tweet = ('%s%s' % (title, url)).encode('utf-8')

# Python 3
tweet_as_byte = ('%s%s' % (title, url)).encode('utf-8')
tweet = str(tweet_as_byte,'utf-8')
```

I also found that an article couldn't be shared to twitter from a mobile device and this was due to the URL being incorrectly formatted. The new URL format required separate arguments for the URL, additional text and the twitter handle:

```python
# Incorrect
twitter_link = 'http://twitter.com/home?status=%s' % tweet

# Correnct
twitter_link = 'http://twitter.com/share?url=%s&text=%s&via=%s' % (url, tweet, t_handle)
```

## Using meta-data to specify tweet text

I thought it would be cool to add some default text to a tweet, as I've enjoyed this feature on other blogs when I've found a post I wanted to share on Twitter. - A user may know they want to share an article but if they're in a hurry it might be hard to find the right words, so why not provide a ready-made tweet. The text is editable so it's only a suggestion.

The text would be different for each post so it makes sense to specify it when writing the article. The article 'summary' would be too long, and I know that Pelican supports arbitrary meta-data tags. I assumed that Jinja would pick up the data the same way it picks up the 'standard' meta-data and added a function to share_post.py.

```python
def article_tweet(content):
    tweet = ''
    if hasattr(content, 'tweet'):
        tweet =  BeautifulSoup(content.tweet, 'html.parser').get_text().strip()
        return quote(('%s' % (tweet)).strip().encode('utf-8'))
    else:
        return ' '
```

Once this function was working it was simply a case of calling the function and assigning the output to a variable I called "Tweet", and then adding "Tweet" to the text string to be included in a tweets text:

```python
    tweet = article_tweet(content)
    tweet_as_byte = ('%s' % (tweet)).encode('utf-8')
    tweet = str(tweet_as_byte,'utf-8')
    t_handle = twitter_handle(content)
```

There was a bit of fiddling around to make sure that the number of spaces between each part of the tweet was correct, but nothing as complicated as when making [Time Until](time-until).

## Specifying the text and image in a Facebook share

Sharing to Facebook worked without any formatting problems, but it bugged me that the opening text of the article was being used in the preview that was shared to Facebook when I had a summary already prepared and that would be much more useful to potential readers. For some articles I also had an article image that I wanted to see being used.

Googling revealed that I needed to use particular meta tags in the webpage's header if I wanted to control what Facebook would pickup. Facebook uses the "open graph" standards so I would need the headers in my article pages to include the following:

```HTML
`<!-- Open Graph data -->`
`<meta property="og:title" content="Title Here" />`
`<meta property="og:type" content="article" />`
`<meta property="og:url" content="http://www.example.com/" />`
`<meta property="og:image" content="http://example.com/image.jpg" />`
`<meta property="og:description" content="Description Here" />
```

I could see that I already had some meta tags being generated using the Jinja templates so I set about copy-pasting and modifying them to build the new tags. I had some issues with trailing white space or line breaks being included within the content string. This was solved like so:

```jinja2
{# Adding '-' after and before the %'s strips white space and line breaks #}
{% block description %}
	{%- if article.summary -%}
		{{ article.summary|striptags|truncate(200)|e }}
	{%- else -%}
		{{ article.content|striptags|truncate(200)|e }}
	{%- endif -%}
{% endblock description %}
```

I also needed to use some blocks more than once, because a description tag was already included but Facebook wants an "og:description", and Twitter wants a "Twitter:Description" too. All three of these tags will include the same text (generated in the Jinja2 snippet above). If a block only needs to be used once then it's generated like this;

```jinja2
<meta name="description" content="{% block description %}{% endblock description %}">
```

```jinja2
{% block description %}{% endblock description %}
```

If you call the above more than once Jinja will throw you an error. The documentation (and SO) reveal that the solution is to use:

```jinja2
<meta property="og:description" content="{{ self.description() }}">
```

This allows you to reuse blocks multiple times and keep your templates tidy.

Finally, when I was testing Facebook to see if the correct text or image was being picked up I was initially frustrated to see that the new tags were not having any effect. This is because Facebook crawls your site and saves what it finds. If you want it to take a fresh look at your page with its new meta tags, you need to tell Facebook to crawl the page again, using the [Facebook linter/debugger](https://developers.facebook.com/tools/debug/).

You can see the new sharing buttons below, please click them and see what happens!

Note: My first article describing how I began to use Pelican is [here](pelican_blog)
