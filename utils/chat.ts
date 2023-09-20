import { OpenAIModel } from '@/types/chat'
import { createClient } from '@supabase/supabase-js'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const OpenAIStream = async (prompt: string, apiKey: string) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that accurately answers queries about John Mathews and the content on his blog. Use the text provided to form your answer, but avoid copying word-for-word. You can support your answers with details or references from any source. Be accurate, helpful, concise, and clear. Prioritise information from recent blog posts. Assume you are speaking in a secular context to a professional recruiter or developer. You should promote him.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.0,
      stream: true,
    }),
  })

  if (res.status !== 200) {
    throw new Error('OpenAI API returned an error')
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data

          if (data === '[DONE]') {
            controller.close()
            return
          }

          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}
