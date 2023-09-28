import { BlogArticle, BlogChunk, BlogJSON } from '@/types/chat'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import { encode } from 'gpt-3-encoder'

const BASE_URL = 'https://www.johnmathews.is'
const CHUNK_SIZE = 200

const filePath = 'scripts/blog_content.json'
const backupPath = 'scripts/blog_content.json.backup'

const getLinks = async () => {
  const html = await axios.get(`${BASE_URL}/posts`)
  const $ = cheerio.load(html.data)

  const listLayoutWrapper = $('#listLayoutWrapper')

  const linksArr: { url: string | undefined; title: string }[] = []

  listLayoutWrapper.children('div').each((_i, div) => {
    if ($(div).attr('id') != 'titleWrapper') {
      $(div)
        .children('ul')
        .children('li')
        .each((_i, li) => {
          $(li)
            .children('div')
            .each((_i, li) => {
              $(li)
                .children('div')
                .each((_i, li) => {
                  $(li)
                    .children('div')
                    .each((_i, li) => {
                      $(li)
                        .children('div')
                        .each((_i, li) => {
                          $(li)
                            .children('a')
                            .each((_i, a) => {
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

const otherLinks = async () => {
  const otherLinks = [
    { title: 'About', url: '/about' },
    { title: 'Experience', url: '/experience' },
  ]
  return otherLinks
}

const getPageContent = async (linkObj: { url: string; title: string }) => {
  const { url } = linkObj

  let article: BlogArticle = {
    title: '',
    url: '',
    date: '',
    content: '',
    length: 0,
    tokens: 0,
    chunks: [],
  }

  const fullLink = BASE_URL + url
  const html = await axios.get(fullLink)
  const $ = cheerio.load(html.data)

  const pageTitle = $('#pageTitle').text().trim()

  let cleanedText = ''

  // for the about page
  $('#pageContent')
    .children('p')
    .each((_, element) => {
      cleanedText += $(element).text() + ' '
    })

  // for the experience page
  $('#pageContent')
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
  const trimmedContent = cleanedText.trim()

  article = {
    title: pageTitle,
    url: fullLink,
    date: '',
    content: trimmedContent,
    length: trimmedContent.length,
    tokens: encode(trimmedContent).length,
    chunks: [],
  }

  return article
}

const getBlogPost = async (linkObj: { url: string; title: string }) => {
  const { url } = linkObj

  let article: BlogArticle = {
    title: '',
    url: '',
    date: '',
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
    content: trimmedContent,
    length: trimmedContent.length,
    tokens: encode(trimmedContent).length,
    chunks: [],
  }

  return article
}

const chunkBlogPost = async (webPage: BlogArticle) => {
  const { title, url, date, content } = webPage

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

    const chunk: BlogChunk = {
      blog_title: title,
      blog_url: url,
      blog_date: date,
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

  const chunkedSection: BlogArticle = {
    ...webPage,
    chunks: essayChunks,
  }

  return chunkedSection
}

// this syntax is an immediatly invoked function expression (IIFE)
// it functions like `if __name__=="__main__":` in python
;(async () => {
  const links = await getLinks()
  let blogPosts = []

  console.log('\nscraping manual pages..')
  const otherPages = await otherLinks()
  for (let i = 0; i < otherPages.length; i++) {
    const webPage = await getPageContent(otherPages[i])
    const chunkedWebPage = await chunkBlogPost(webPage)
    blogPosts.push(chunkedWebPage)
  }

  // blog posts with these words in the title wont be crawled
  let skipTheseBlogPosts = ['peter', 'proverbs', 'jesus']

  console.log('scraping blog posts..\n')
  for (let i = 0; i < links.length; i++) {
    const lowerTitle = links[i].title.toLowerCase()

    // Skip if title contains any word in skipTheseBlogPosts
    if (skipTheseBlogPosts.some((badWord) => lowerTitle.includes(badWord))) {
      continue
    }

    const blogPost = await getBlogPost(links[i])
    const chunkedBlogPost = await chunkBlogPost(blogPost)
    blogPosts.push(chunkedBlogPost)
  }

  const json: BlogJSON = {
    current_date: '2023-09-15',
    author: 'John Mathews',
    url: 'http://johnmathews.is/posts',
    length: blogPosts.reduce((acc, essay) => acc + essay.length, 0),
    tokens: blogPosts.reduce((acc, essay) => acc + essay.tokens, 0),
    posts: blogPosts,
  }

  // Delete existing backup if it exists
  if (fs.existsSync(backupPath)) {
    fs.unlinkSync(backupPath)
  }

  // Rename existing file to .backup if it exists
  if (fs.existsSync(filePath)) {
    fs.renameSync(filePath, backupPath)
  }

  fs.writeFileSync(filePath, JSON.stringify(json))
})()
