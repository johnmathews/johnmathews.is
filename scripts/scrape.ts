import { JMArticle, JMChunk, JMJSON } from '@/types/chat'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import { encode } from 'gpt-3-encoder'

const BASE_URL = 'https://www.johnmathews.is'
const CHUNK_SIZE = 200

const getLinks = async () => {
  const html = await axios.get(`${BASE_URL}/posts`)
  const $ = cheerio.load(html.data)

  const listLayoutWrapper = $('#listLayoutWrapper')
  const childDivCount = listLayoutWrapper.children('div').length

  const linksArr: { url: string | undefined; title: string }[] = []

  listLayoutWrapper.children('div').each((i, div) => {
    if ($(div).attr('id') != 'titleWrapper') {
      // select an unorderlist inside the element and an iterate through the li elements
      $(div)
        .children('ul')
        .children('li')
        .each((i, li) => {
          $(li)
            .children('div')
            .each((i, li) => {
              $(li)
                .children('div')
                .each((i, li) => {
                  $(li)
                    .children('div')
                    .each((i, li) => {
                      $(li)
                        .children('div')
                        .each((i, li) => {
                          $(li)
                            .children('a')
                            .each((i, a) => {
                              const url = $(a).attr('href')
                              const title = $(a).text()
                              const linkObj = {
                                url,
                                title,
                              }
                              linksArr.push(linkObj)
                            })
                        })
                    })
                })
            })
        })
    }
  })

  return linksArr
}

const getBlogPost = async (linkObj: { url: string | undefined; title: string }) => {
  const { title, url } = linkObj

  let article: JMArticle = {
    title: '',
    url: '',
    date: '',
    thanks: '',
    content: '',
    length: 0,
    tokens: 0,
    chunks: [],
  }

  const fullLink = BASE_URL + url
  const html = await axios.get(fullLink)
  const $ = cheerio.load(html.data)

  const articleHeader = $('#article').children(':first-child').find('header')
  const timeElement = articleHeader.find('time')

  const date: string | undefined = timeElement.attr('datetime')
  let dateStr: string = 'Date not available' // Initialize with a default value

  const articleTitle = articleHeader.find('div div div').first().text().trim()

  // const articleText = $("#content").text();
  // let cleanedText = articleText.replace(/\s+/g, " ");
  // cleanedText = cleanedText.replace(/\.([a-zA-Z])/g, ". $1");

  // try to not include nested html tags
  let cleanedText = ''
  $('#content')
    .find('*')
    .each((_, element) => {
      if ($(element).children().length === 0) {
        cleanedText += $(element).text() + ' '
      }
    })

  // remove image tags
  cleanedText = cleanedText
    .replace(/<img[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (date !== undefined) {
    const dateObj = new Date(date)
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
    dateStr = dateObj.toLocaleDateString('en-US', options)
  }

  const trimmedContent = cleanedText.trim()

  article = {
    title: articleTitle,
    url: fullLink,
    date: dateStr,
    thanks: '',
    content: trimmedContent,
    length: trimmedContent.length,
    tokens: encode(trimmedContent).length,
    chunks: [],
  }

  return article
}

const chunkBlogPost = async (essay: JMArticle) => {
  const { title, url, date, thanks, content, ...chunklessSection } = essay
  console.log('scraping: ', title)

  let essayTextChunks = []

  if (encode(content).length > CHUNK_SIZE) {
    const split = content.split('. ')
    let chunkText = ''

    for (let i = 0; i < split.length; i++) {
      const sentence = split[i]
      const sentenceTokenLength = encode(sentence)
      const chunkTextTokenLength = encode(chunkText).length

      if (chunkTextTokenLength + sentenceTokenLength.length > CHUNK_SIZE) {
        essayTextChunks.push(chunkText)
        chunkText = ''
      }

      if (sentence.length > 1) {
        if (sentence[sentence.length - 1].match(/[a-z0-9]/i)) {
          chunkText += sentence + '. '
        } else {
          chunkText += sentence + ' '
        }
      }
    }

    essayTextChunks.push(chunkText.trim())
  } else {
    essayTextChunks.push(content.trim())
  }

  const essayChunks = essayTextChunks.map((text) => {
    const trimmedText = text.trim()

    const chunk: JMChunk = {
      blog_title: title,
      blog_url: url,
      blog_date: date,
      blog_thanks: thanks,
      content: trimmedText,
      content_length: trimmedText.length,
      content_tokens: encode(trimmedText).length,
      embedding: [],
    }

    return chunk
  })

  if (essayChunks.length > 1) {
    for (let i = 0; i < essayChunks.length; i++) {
      const chunk = essayChunks[i]
      const prevChunk = essayChunks[i - 1]

      if (chunk.content_tokens < 100 && prevChunk) {
        prevChunk.content += ' ' + chunk.content
        prevChunk.content_length += chunk.content_length
        prevChunk.content_tokens += chunk.content_tokens
        essayChunks.splice(i, 1)
        i--
      }
    }
  }

  const chunkedSection: JMArticle = {
    ...essay,
    chunks: essayChunks,
  }

  return chunkedSection
}

;(async () => {
  const links = await getLinks()

  let blogPosts = []

  for (let i = 0; i < links.length; i++) {
    const blogPost = await getBlogPost(links[i])
    const chunkedBlogPost = await chunkBlogPost(blogPost)
    blogPosts.push(chunkedBlogPost)
  }

  const json: JMJSON = {
    current_date: '2023-09-15',
    author: 'John Mathews',
    url: 'http://johnmathews.is/posts',
    length: blogPosts.reduce((acc, essay) => acc + essay.length, 0),
    tokens: blogPosts.reduce((acc, essay) => acc + essay.tokens, 0),
    posts: blogPosts,
  }

  fs.writeFileSync('scripts/jm.json', JSON.stringify(json))
})()
