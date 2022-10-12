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
    return {
      id,
      objectID: id,
      title: matterResult.data.title,
      tags: String(matterResult.data.tags),
      category: matterResult.data.category,
      content: markdownContent.replaceAll('"', "'").replaceAll("\n", " "),
    }
  })
  return posts
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
    console.log("Posts cached to cache/searchData.js")
  }
})
fs.writeFile("cache/searchData.json", JSONData, (err) => {
  if (err) console.log(err)
  else {
    console.log("Posts cached to cache/searchData.json")
  }
})

// obj = JSON.parse(JSONData)
// console.log('--- debug obj: ', obj);

index
  .saveObjects(getAllPosts(), { autoGenerateObjectIDIfNotExist: false })
  .then(({ objectIDs }) => {
    // console.log(objectIDs)
  })
  .catch((e) => console.log(e))
