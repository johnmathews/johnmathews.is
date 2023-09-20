export enum OpenAIModel {
  DAVINCI_TURBO = 'gpt-3.5-turbo',
}

export type BlogArticle = {
  title: string
  url: string
  date: string
  content: string
  length: number
  tokens: number
  chunks: BlogChunk[]
}

export type BlogChunk = {
  blog_title: string
  blog_url: string
  blog_date: string
  content: string
  content_length: number
  content_tokens: number
  embedding: number[]
}

export type BlogJSON = {
  current_date: string
  author: string
  url: string
  length: number
  tokens: number
  posts: BlogArticle[]
}
