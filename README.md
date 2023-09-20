# Personal blog built using Tailwind and Nextjs.

## Setup for local development

1. `yarn`
2. `npm run build`
3. `yarn start`

Then go to localhost:3000

## How to create a new blog post or snippet

1. Run `:Mp name-of-markdown-file`
2. In neovim, use the `meta` snippet to generate the frontmatter.

## Deploy and publish

1. Just push to `main`. Vercel is watching the github repo.

## Search and sitemap

1. run `npm aux`. If you run `npm run build` then the search index and aloglia data will be updated
   and uploaded. Sitemap is also updated I think.

## Chatbot

1. run `npm run scrape` - this scrapes the live site at johnmathews.is and creates
   `scripts/jm.json`
2. run `npm run embed`

## TODO

I should write some context here. Including:

- some of the keyboard shortcuts
- the video archive feature
- how GCP buckets are used
- the chatbot feature

## Known issues

- The keyboard shortcuts library (reakeys) causes some errors about SSR and useEffect.
- The photos pages, or maybe images in general, cause some warnings about latex incompatible input.
