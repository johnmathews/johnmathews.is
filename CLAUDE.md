# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog for johnmathews.is — a Next.js 13 (Pages Router) application with MDX content, Algolia search, and an OpenAI-powered chatbot. Deployed on Vercel.

## Commands

```bash
# Development
npm run dev          # Next.js dev server
npm run start        # Dev server with socket.io hot reload for content changes in ./data

# Build (runs: next build → generate sitemap → update Algolia search index)
npm run build

# Lint (ESLint + Prettier with --fix)
npm run lint

# Auxiliary build steps
npm run aux              # Regenerate sitemap + search index without full build
npm run buildSearchIndex # Update Algolia index only
npm run buildSitemap     # Generate sitemap only

# Chatbot pipeline
npm run scrape       # Scrape published site for training data
npm run embed        # Generate OpenAI embeddings → Supabase
npm run chat         # Run scrape + embed together

# Analysis
npm run analyze      # Bundle size analysis (sets ANALYZE=true)
```

No test framework is configured.

## Architecture

### Content Pipeline

Blog posts live in `data/blog/` as `.md` and `.mdx` files with YAML frontmatter. The core content processing is in `lib/mdx.js`, which uses `mdx-bundler` with a chain of remark plugins (GFM, math, footnotes, code titles, image-to-JSX) and rehype plugins (slug, autolink-headings, KaTeX, Prism syntax highlighting, citation, minify). Posts are statically generated at build time.

### Routing

- `pages/blog/[...slug].js` — catch-all route for individual blog posts
- `pages/*.js` — collection/category pages (posts, engineering, finance, snippets, etc.)
- `pages/api/` — API routes for search and chat
- `pages/chat.tsx` — chatbot interface

### Layouts

Layout components in `layouts/` wrap page content: `PostLayout`, `ListLayout`, `SnippetLayout`, `SnippetCardLayout`, `AboutPageLayout`, `ExperienceLayout`. Posts select their layout via frontmatter `layout` field.

### Key Files

- `data/siteMetadata.js` — global site config (must remain CommonJS `module.exports`)
- `lib/mdx.js` — MDX bundling, frontmatter parsing, file listing
- `pages/_app.js` — theme setup, global state providers, layout wrapper
- `next.config.js` — Preact swap in production, security headers, image domains, redirects
- `scripts/searchCache.js` — builds Algolia index from post content
- `scripts/generate-sitemap.js` — generates XML sitemap

### State & Search

- React Context for UI state (keyboard navigation mode, filters)
- Primary search: Algolia with autocomplete UI
- Fallback search: Fuse.js (client-side, no external calls)

### Production Optimizations

- Preact replaces React on client-side in production builds (configured in `next.config.js` webpack aliases)
- SVGs imported as React components via `@svgr/webpack`

## Code Style

- Prettier: single quotes, no semicolons, 100 char width, Tailwind class sorting
- ESLint: `eslint-config-next` + `eslint-config-prettier`
- Pre-commit hook (Husky + lint-staged) auto-lints and formats staged files
- Mixed JS/TS codebase (mostly JS, strict mode disabled)
- Components: PascalCase filenames, default exports
- Tailwind CSS with dark mode (class-based via `next-themes`)

## Post Frontmatter Schema

```yaml
title: string # required
date: string # ISO date
tags: [string]
category: string # "technical" | "non-technical" | "snippet"
draft: boolean # true excludes from build and sitemap
summary: string
layout: string # layout component name (e.g. "PostLayout")
```

## Environment Variables

Required in `.env.local`:

- `OPENAI_API_KEY` — chatbot
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — embeddings storage
- `ALGOLIA_ADMIN_API_KEY`, `ALGOLIA_INDEX_NAME` — search indexing (used by `searchCache.js`)
