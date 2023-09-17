import { IconArrowRight, IconExternalLink, IconSearch } from '@tabler/icons-react'
import endent from 'endent'
import Head from 'next/head'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'

import { JMChunk } from '@/types/Chat'

import Answer from '@/components/chat/Answer/Answer'
import ChatFooter from '@/components/chat/Footer'
import ChatNavbar from '@/components/chat/Navbar'

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState<string>('')
  const [chunks, setChunks] = useState<JMChunk[]>([])
  const [answer, setAnswer] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [mode, setMode] = useState<'search' | 'chat'>('chat')
  const [matchCount, setMatchCount] = useState<number>(5)
  const [apiKey, setApiKey] = useState<string>('')

  const handleSearch = async () => {
    if (!apiKey) {
      alert('Please enter an API key.')
      return
    }

    if (!query) {
      alert('Please enter a query.')
      return
    }

    setAnswer('')
    setChunks([])

    setLoading(true)

    const searchResponse = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, apiKey, matches: matchCount }),
    })

    if (!searchResponse.ok) {
      setLoading(false)
      throw new Error(searchResponse.statusText)
    }

    const results: JMChunk[] = await searchResponse.json()

    setChunks(results)

    setLoading(false)

    inputRef.current?.focus()

    return results
  }

  const handleAnswer = async () => {
    if (!apiKey) {
      alert('Please enter an API key.')
      return
    }

    if (!query) {
      alert('Please enter a query.')
      return
    }

    setAnswer('')
    setChunks([])

    setLoading(true)

    const searchResponse = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, apiKey, matches: matchCount }),
    })

    if (!searchResponse.ok) {
      setLoading(false)
      throw new Error(searchResponse.statusText)
    }

    const results: JMChunk[] = await searchResponse.json()

    setChunks(results)

    const prompt = endent`
    Use the following passages to provide an answer to the query: "${query}"

    ${results?.map((d: any) => d.content).join('\n\n')}
    `

    const answerResponse = await fetch('/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, apiKey }),
    })

    if (!answerResponse.ok) {
      setLoading(false)
      throw new Error(answerResponse.statusText)
    }

    const data = answerResponse.body

    if (!data) {
      return
    }

    setLoading(false)

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setAnswer((prev) => prev + chunkValue)
    }

    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (mode === 'search') {
        handleSearch()
      } else {
        handleAnswer()
      }
    }
  }

  const handleSave = () => {
    if (apiKey.length !== 51) {
      alert('Please enter a valid API key.')
      return
    }

    localStorage.setItem('JM_KEY', apiKey)
    localStorage.setItem('JM_MATCH_COUNT', matchCount.toString())
    localStorage.setItem('JM_MODE', mode)

    setShowSettings(false)
    inputRef.current?.focus()
  }

  const handleClear = () => {
    localStorage.removeItem('JM_KEY')
    localStorage.removeItem('JM_MATCH_COUNT')
    localStorage.removeItem('JM_MODE')

    setApiKey('')
    setMatchCount(5)
    setMode('search')
  }

  useEffect(() => {
    if (matchCount > 10) {
      setMatchCount(10)
    } else if (matchCount < 1) {
      setMatchCount(1)
    }
  }, [matchCount])

  useEffect(() => {
    const PG_KEY = localStorage.getItem('PG_KEY')
    const PG_MATCH_COUNT = localStorage.getItem('PG_MATCH_COUNT')
    const PG_MODE = localStorage.getItem('PG_MODE')

    if (PG_KEY) {
      setApiKey(PG_KEY)
    }

    if (PG_MATCH_COUNT) {
      setMatchCount(parseInt(PG_MATCH_COUNT))
    }

    if (PG_MODE) {
      setMode(PG_MODE as 'search' | 'chat')
    }

    inputRef.current?.focus()
  }, [])

  return (
    <>
      <Head>
        <title>John Mathews GPT</title>
        <meta name="description" content={`AI-powered search and chat for my blog.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen flex-col">
        <ChatNavbar />
        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center px-3 pt-4 sm:pt-8">
            <button
              className="mt-4 flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 px-3 py-1 text-sm hover:opacity-50"
              onClick={() => setShowSettings(!showSettings)}
            >
              {showSettings ? 'Hide' : 'Show'} Settings
            </button>

            {showSettings && (
              <div className="w-[340px] sm:w-[400px]">
                <div>
                  <div>Mode</div>
                  <select
                    className="block w-full max-w-[400px] cursor-pointer rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    value={mode}
                    onChange={(e) => setMode(e.target.value as 'search' | 'chat')}
                  >
                    <option value="search">Search</option>
                    <option value="chat">Chat</option>
                  </select>
                </div>

                <div className="mt-2">
                  <div>Passage Count</div>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={matchCount}
                    onChange={(e) => setMatchCount(Number(e.target.value))}
                    className="block w-full max-w-[400px] rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mt-2">
                  <div>OpenAI API Key</div>
                  <input
                    type="password"
                    placeholder="OpenAI API Key"
                    className="block w-full max-w-[400px] rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value)

                      if (e.target.value.length !== 51) {
                        setShowSettings(true)
                      }
                    }}
                  />
                </div>

                <div className="mt-4 flex justify-center space-x-2">
                  <div
                    className="flex cursor-pointer items-center space-x-2 rounded-full bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                    onClick={handleSave}
                  >
                    Save
                  </div>

                  <div
                    className="flex cursor-pointer items-center space-x-2 rounded-full bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    onClick={handleClear}
                  >
                    Clear
                  </div>
                </div>
              </div>
            )}

            {apiKey.length === 51 ? (
              <div className="relative mt-4 w-full">
                <IconSearch className="absolute left-1 top-3 h-6 w-10 rounded-full opacity-50 sm:left-3 sm:top-4 sm:h-8" />

                <input
                  ref={inputRef}
                  className="h-12 w-full rounded-full border border-zinc-600 pl-11 pr-12 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pl-16 sm:pr-16 sm:text-lg"
                  type="text"
                  placeholder="How do I start a startup?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button>
                  <IconArrowRight
                    onClick={mode === 'search' ? handleSearch : handleAnswer}
                    className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-blue-500 p-1 text-white hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
                  />
                </button>
              </div>
            ) : (
              <div className="mt-7 text-center text-3xl font-bold">
                Please enter your
                <a
                  className="mx-2 underline hover:opacity-50"
                  href="https://platform.openai.com/account/api-keys"
                >
                  OpenAI API key
                </a>
                in settings.
              </div>
            )}

            {loading ? (
              <div className="mt-6 w-full">
                {mode === 'chat' && (
                  <>
                    <div className="text-2xl font-bold">Answer</div>
                    <div className="mt-2 animate-pulse">
                      <div className="h-4 rounded bg-gray-300"></div>
                      <div className="mt-2 h-4 rounded bg-gray-300"></div>
                      <div className="mt-2 h-4 rounded bg-gray-300"></div>
                      <div className="mt-2 h-4 rounded bg-gray-300"></div>
                      <div className="mt-2 h-4 rounded bg-gray-300"></div>
                    </div>
                  </>
                )}

                <div className="mt-6 text-2xl font-bold">Passages</div>
                <div className="mt-2 animate-pulse">
                  <div className="h-4 rounded bg-gray-300"></div>
                  <div className="mt-2 h-4 rounded bg-gray-300"></div>
                  <div className="mt-2 h-4 rounded bg-gray-300"></div>
                  <div className="mt-2 h-4 rounded bg-gray-300"></div>
                  <div className="mt-2 h-4 rounded bg-gray-300"></div>
                </div>
              </div>
            ) : answer ? (
              <div className="mt-6">
                <div className="mb-2 text-2xl font-bold">Answer</div>
                <Answer text={answer} />

                <div className="mb-16 mt-6">
                  <div className="text-2xl font-bold">Passages</div>

                  {chunks.map((chunk, index) => (
                    <div key={index}>
                      <div className="mt-4 rounded-lg border border-zinc-600 p-4">
                        <div className="flex justify-between">
                          <div>
                            <div className="text-xl font-bold">{chunk.blog_title}</div>
                            <div className="mt-1 text-sm font-bold">{chunk.blog_date}</div>
                          </div>
                          <a
                            className="ml-2 hover:opacity-50"
                            href={chunk.blog_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <IconExternalLink />
                          </a>
                        </div>
                        <div className="mt-2">{chunk.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : chunks.length > 0 ? (
              <div className="mt-6 pb-16">
                <div className="text-2xl font-bold">Passages</div>
                {chunks.map((chunk, index) => (
                  <div key={index}>
                    <div className="mt-4 rounded-lg border border-zinc-600 p-4">
                      <div className="flex justify-between">
                        <div>
                          <div className="text-xl font-bold">{chunk.blog_title}</div>
                          <div className="mt-1 text-sm font-bold">{chunk.blog_date}</div>
                        </div>
                        <a
                          className="ml-2 hover:opacity-50"
                          href={chunk.blog_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IconExternalLink />
                        </a>
                      </div>
                      <div className="mt-2">{chunk.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 text-center text-lg">{`AI-powered search & chat for my blog.`}</div>
            )}
          </div>
        </div>
        <ChatFooter />
      </div>
    </>
  )
}
