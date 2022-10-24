import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { getFiles } from "./mdx"
import kebabCase from "./utils/kebabCase"

const root = process.cwd()

export async function getAllCategories(type) {
  const files = await getFiles(type)

  let categoryCount = {}
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, "data", type, file), "utf8")
    const { data } = matter(source)

    if (typeof data.category == "string") {
      data.category = data.category.split(" ")
    }

    if (data.category && data.draft !== true) {
      data.category.forEach((category) => {
        // const formattedCategory = kebaCase(category)
        const formattedCategory = String(category).replace(",", "").replace(" ", "")
        if (formattedCategory in categoryCount) {
          categoryCount[formattedCategory] += 1
        } else {
          categoryCount[formattedCategory] = 1
        }
      })
    }
  })

  return categoryCount
}
