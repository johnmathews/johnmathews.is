import { IconArrowRight, IconExternalLink, IconSearch } from '@tabler/icons-react'
import endent from 'endent'

import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { JMChunk } from '@/types/Chat'

import Answer from '@/components/chat/Answer/Answer'

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

  useEffect(() => {
    if (loading) {
      console.log('Loading is true')
    }
  }, [loading])

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
      <PageSEO title={`Chat - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Chatbot
          </h1>
          <p>Ask an AI some questions about me</p>
        </div>
        <div className="flex h-screen flex-col">
          <div className="">
            <div
              id="parentContainer"
              className="items-left mx-auto flex h-full w-full max-w-[750px] flex-col space-y-20"
            >
              <div className="hidden">
                <button
                  id="settings"
                  className="items-left ml-0 flex cursor-pointer space-x-2 rounded-full border border-zinc-600 px-3 py-1 text-sm hover:opacity-50"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  {showSettings ? 'Hide' : 'Show'} Settings
                </button>
              </div>

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
                <div id="queryContainer" className="relative mt-4 w-full">
                  <input
                    id="queryBox"
                    ref={inputRef}
                    className="h-12 w-full rounded-md border border-zinc-600 pl-11 pr-12 text-gray-800 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 dark:text-gray-800 sm:h-16 sm:py-2 sm:pl-16 sm:pr-16 sm:text-lg"
                    type="text"
                    placeholder="What skills does John have?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />

                  <button>
                    <svg
                      onClick={mode === 'search' ? handleSearch : handleAnswer}
                      className=" absolute right-2 -mt-5 h-7 w-12 animate-spin bg-blue-500 p-1 pt-1 text-gray-900 hover:cursor-pointer hover:bg-blue-600 dark:text-gray-100 sm:right-3 sm:top-3 sm:h-10 sm:w-10 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                    >
                      <g data-name="11-Arrow Right">
                        <path d="M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z" />
                        <path d="m19.71 8.29-1.42 1.42 5.3 5.29H5v2h18.59l-5.29 5.29 1.41 1.41 7-7a1 1 0 0 0 0-1.41z" />
                      </g>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="mt-7 text-center text-3xl font-bold">
                  Please enter your
                  <a
                    className="mx-2 px-2 underline hover:opacity-50"
                    href="https://platform.openai.com/account/api-keys"
                  >
                    OpenAI API key
                  </a>
                  in settings.
                </div>
              )}

              {loading ? (
                <div id="chatResults" className="mt-12 w-full">
                  {mode === 'chat' && (
                    <>
                      <div className="text-2xl font-bold">Answer</div>
                      <div className="mt-2 animate-pulse">
                        <div className="h-4 animate-pulse rounded bg-gray-300">...</div>
                        <div className="mt-2 h-4 animate-pulse rounded bg-gray-300">...</div>
                        <div className="mt-2 h-4 animate-pulse rounded bg-gray-300">...</div>
                        <div className="mt-2 h-4 rounded bg-gray-300">...</div>
                        <div className="mt-2 h-4 rounded bg-gray-300">...</div>
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
                <div id="answer" className="mt-12">
                  <div className="mb-2 text-2xl font-bold">Answer</div>
                  <Answer text={answer} />

                  <div className="mb-16 mt-6">
                    <div id="passages" className="mt-12 text-2xl font-bold">
                      Passages
                    </div>

                    {chunks.map((chunk, index) => (
                      <div key={index}>
                        <div className="mt-8 rounded-lg border border-zinc-600 p-4">
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
                <div className=""></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
