import chalk from 'chalk'
import { JMArticle, JMJSON } from '@/types/Chat'
import { loadEnvConfig } from '@next/env'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import { Configuration, OpenAIApi } from 'openai'

loadEnvConfig('')

const generateEmbeddings = async (articles: JMArticle[]) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  for (let i = 0; i < articles.length; i++) {
    const section = articles[i]

    for (let j = 0; j < section.chunks.length; j++) {
      const chunk = section.chunks[j]

      const {
        blog_title,
        blog_url,
        blog_date,
        blog_thanks,
        content,
        content_length,
        content_tokens,
      } = chunk

      const embeddingResponse = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: content,
      })

      const [{ embedding }] = embeddingResponse.data.data

      const { data, error } = await supabase
        .from('jm')
        .insert({
          blog_title,
          blog_url,
          blog_date,
          blog_thanks,
          content,
          content_length,
          content_tokens,
          embedding,
        })
        .select('*')

      if (error) {
        console.log('error', error)
      } else {
        console.log(
          chalk.blue('article ') + i + chalk.blue(' chunk ') + j + ': ' + chalk.green('saved')
        )
      }

      await new Promise((resolve) => setTimeout(resolve, 200))
    }
  }
}

;(async () => {
  const book: JMJSON = JSON.parse(fs.readFileSync('scripts/jm.json', 'utf8'))

  await generateEmbeddings(book.posts)
})()
