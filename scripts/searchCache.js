// https://medium.com/@matswainson/building-a-search-component-for-your-next-js-markdown-blog-9e75e0e7d210
// ignore yaml, get content only https://stackoverflow.com/questions/15207069/remove-yaml-header-from-markdown-file

require("dotenv").config()

const algoliasearch = require("algoliasearch")

const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

const client = algoliasearch("56G1FXZV4K", process.env.ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "data/blog")
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)
    const markdownContent = fileContents.replace(/---(.|\n)*?---/, "")
    const post_url = process.env.ROOT_URL + "/blog/" + id
    return {
      id,
      url: post_url,
      objectID: id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tags: String(matterResult.data.tags),
      category: matterResult.data.category,
      draft: matterResult.data.draft,
      content: markdownContent.replaceAll('"', "'").replaceAll("\n", " "),
    }
  })
  const publishedPosts = posts.filter((post) => {
    return post.draft !== true
  })

  return publishedPosts
}

const searchableContent = `export const posts = ${JSON.stringify(getAllPosts(), null, 2)}`
const JSONData = JSON.stringify(getAllPosts(), null, 2)

try {
  fs.readdirSync("cache")
} catch (e) {
  fs.mkdirSync("cache")
}

fs.writeFile("cache/searchData.js", searchableContent, (err) => {
  if (err) console.log(err)
  else {
    console.log("Updated local index: cache/searchData.js")
  }
})

fs.writeFile("cache/searchData.json", JSONData, (err) => {
  if (err) console.log(err)
  else {
    console.log("Updated local index: cache/searchData.json")
  }
})

index
  .saveObjects(getAllPosts(), { autoGenerateObjectIDIfNotExist: false })
  .then(() => {
    console.log("Algolia index updated!")
  })
  .catch((e) => console.log(e))
