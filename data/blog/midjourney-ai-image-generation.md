---
title: Using AI for social media content creation.
date: 2023-03-17 09:54:14
category: technical.data
tags: ['ai', 'language-model']
image: /static/images/robot-midjourney.png
---

I've been thinking about how I can use the new AI models to help me build
[lettergun.com](https://lettergun.com)[^1]. I'm experimenting with using:

1. Chat GPT to write tweets, blog posts and anything else I can think of.
2. An image generation model to create header images for blog posts, tweets, and anything else I can
   think of.

I asked Chat GPT to recommend social media management services, and the explanation and links it
provided were useful and coherent. I went with Hootsuit because, despite being very expensive at
about €100/month, it's designed to do exactly what I want - manage, plan and post lots of social
media as effortlessly as possible.

Last year I used UpWork to work with copy writers and social media content creators to generate
blogs, tweets and LinkedIn posts. I think I can do all of this myself now, using the AI models to
generate ideas, do research, create images, maybe even short videos. The costs this month will be
about 10% of the monthly costs I incurred last year working with humans. Literally a 10x cost
reduction.

## Chat GPT

I'm using Chat GPT from within Bing in the Edge browser, and its intuitive. Maybe I will find that I
need to refine the style of answer or increase fact checking, but for now its as simple as typing
what I would say to a... genie? servant? I'm not sure how to think of it.

Initially I found it felt weird to type prompts as if I was talking to a human. I would naturally
factor in the effort involved and ask for simpler things. So instead of saying "recommend me the
best X" I would ask "which is the better X, product A or product B?", but I should go further still
and ask how to solve the problem that I assume using product X would.

Having enough imagination to use the model is a key skill, and I know that children will be better
at this than adults. I'm so used to working within the confines of google search (being able to
google effectively has been a key life skill and has benefited me enormously) that its going to take
some deliberate practice to adjust to this new paradigm.

## Midjourney

I read an
[article](https://arstechnica.com/information-technology/2023/02/viral-instagram-photographer-has-a-confession-his-photos-are-ai-generated/)
recently about a photographer whose instagram got popular and then revealed the images were
generated using AI. The model he used was Midjourney, which you need to access from within Discord,
which seems like a weird way to make your product harder to use.

### Parameters

I've tried using DALL-E2 from OpenAI, and the results are OK but I couldnt get the kind of images I
wanted. I've had more success with Midjourney but I need to use some parameters in the prompt. Here
are a few I want to remember:

1. `--v 5` - Use the latest version, it can generate hands properly!
2. `-- no x` - Generate an image that doesnt have X in it.

### Promting

1. a more descriptive prompt is better for a unique look
2. Concentrate on the main concepts you want to create.
3. The Midjourney Bot does not understand grammar, sentence structure, or words like humans.
4. specific synonyms work better in many circumstances. Instead of big, try gigantic,
5. Remove words when possible. Fewer words mean each word has a more powerful influence. Use commas,
   brackets, and hyphens to help organize your thoughts, but know the Midjourney Bot will not
   reliably interpret them.
6. Anything left unsaid may suprise you. Be as specific or vague as you want, but anything you leave
   out will be randomized. Being vague is a great way to get variety,
7. Try specific numbers. "Three cats" is more specific than "cats.", “flock of birds” instead of
   "birds."

## Parameters

[source](https://docs.midjourney.com/docs/multi-prompts)

1. It is possible to have the Midjourney Bot consider two or more separate concepts individually
   using `::` as a separator. Separating prompts allows you to assign relative importance to parts
   of a prompt. e.g, `hot::2 dog` places twice as much emphasis on `hot` than on `dog`, and
   considers `hot` and `dog` to be two different prompts. Removing the double colon would use a
   single prompt and would return food instead of a canine.
2. Negative weights can be added to prompts to remove unwanted elements. The sum of all weights must
   be a positive number. `vibrant tulip fields:: red::-.5` compared to `vibrant tulip fields`
3. The `--no` parameter is the same as weighing part of a multi prompt to "-.5"

## Remix

[source](https://docs.midjourney.com/docs/remix)

1. Use Remix Mode to change prompts, parameters, model versions, or aspect ratios between
   variations. Remix will take the general composition of your starting image and use it as part of
   the new Job. Remixing can help change the setting or lighting of an image, evolve a subject, or
   achieve tricky compositions.
2. Activate Remix mode with the `/prefer` remix command or by using the `/settings` command and
   toggling the Remix Mode button. Remix changes the behavior of the variation buttons (V1, V2, V3,
   V4) under image grids. When Remix is enabled, it allows you to edit your prompt during each
   variation. To Remix an upscale select `Make Variations`. e.g.:
   1. `line-art stack of pumpkins`
   2. `Remix`
   3. `pile of cartoon owls`

## Image prompts

1. You can use images as part of a prompt to influence a Job's composition, style, and colors.
   Images prompts can be used alone or with text prompts.

## Commands

[doc](https://docs.midjourney.com/docs/command-list)

- blend images together
- increase quality
- `/prefer option list`
- you can set a custom option name that can be used to easily include a set of options

[^1]: We are an "AI" company, after all.
