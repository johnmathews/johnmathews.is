# Personal blog built using Tailwind and Nextjs.

## Setup for local development

1. `npm install`
2. `npm run build`
3. `npm start`

Then go to localhost:3000

## How to create a new blog post or snippet

1. Run `:Mp name-of-markdown-file`
2. In neovim, use the `meta` snippet to generate the frontmatter.

## Deploy and publish

1. Just push to `main`. Vercel is watching the github repo.

## Search and sitemap

1. run `npm aux`

## TODO

I should write some context here. Including:

- what the blog is for.
- how I use it
- which commands to run to:
  - create a new post,
  - deploy to vercel,
  - build search cache,
  - build sitemap
  - or just look in `package.json`
- how to use snippets
- some of the keyboard shortcuts
- the video archive feature
- how GCP buckets are used
