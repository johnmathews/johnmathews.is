export enum OpenAIModel {
  DAVINCI_TURBO = 'gpt-3.5-turbo',
}

export type JMArticle = {
  title: string
  url: string
  date: string
  thanks: string
  content: string
  length: number
  tokens: number
  chunks: JMChunk[]
}

export type PGEssay = {
  title: string
  url: string
  date: string
  thanks: string
  content: string
  length: number
  tokens: number
  chunks: PGChunk[]
}

export type JMChunk = {
  blog_title: string
  blog_url: string
  blog_date: string
  blog_thanks: string
  content: string
  content_length: number
  content_tokens: number
  embedding: number[]
}

export type PGChunk = {
  essay_title: string
  essay_url: string
  essay_date: string
  essay_thanks: string
  content: string
  content_length: number
  content_tokens: number
  embedding: number[]
}

export type JMJSON = {
  current_date: string
  author: string
  url: string
  length: number
  tokens: number
  posts: JMArticle[]
}

export type PGJSON = {
  current_date: string
  author: string
  url: string
  length: number
  tokens: number
  essays: JMArticle[]
}
