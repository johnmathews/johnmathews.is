# Personal blog built using Tailwind and Nextjs.

## Setup for local development

1. `yarn`
2. `yarn build`
3. `yarn start`

Then go to localhost:3000

## How to create a new blog post or snippet

1. Run `:Mp name-of-markdown-file`
2. In neovim, use the `meta` snippet to generate the frontmatter.

## Deploy and publish

1. Just push to `main`. If you push to another branch the deploy will be built but it won't be
   promoted to production.

## Search and sitemap

1. run `yarn aux`. If you run `yarn build` then the sitemap, search index and aloglia data will be updated
   and uploaded too.

## Chatbot

Goto [/chat](https://johnmathews.is/chat) and you can ask a chatbot questions about me and the
content on my blog. It's kind of like an interactive CV.

### Build

1. run `npm run scrape` - this scrapes the live site at [johnmathews.is](johnmathws.is) and puts the data in `scripts/jm.json`.
2. run `npm run embed`

## Extra things

- Use `?` to show keyboard shortcuts
- There are simple usage metrics at [/metrics](https://johnmathews.is/metrics)

## TODO

- the video archive feature

## Known issues

- The photos pages, or maybe images in general, cause some warnings about latex incompatible input.
