// https://medium.com/@matswainson/building-a-search-component-for-your-next-js-markdown-blog-9e75e0e7d210
// ignore yaml, get content only https://stackoverflow.com/questions/15207069/remove-yaml-header-from-markdown-file

const fs = require("fs")
const path = require("path")
const matter = require("grey-matter")

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)
    const markdownContent = fileContents.replace(/---(.|\n)*?---/, "")
    return {
      id,
      title: matterResult.data.title,
      tags: matterResult.data.tags,
      category: matterResult.data.category,
      content: markdownContent,
    }
  })
  return JSON.stringify(posts)
}

const searchableContent = `export const posts = ${getAllPosts()}`

try {
  fs.readdirSync("cache")
} catch (e) {
  fs.mkdirSync("cache")
}

fs.writeFile("cache/data.js", searchableContent, (err) => {
  if (err) console.log(err)
  else {
    console.log("Posts cached.")
  }
})
