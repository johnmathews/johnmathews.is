import { CategorySEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import generateRss from "@/lib/generate-rss"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import { getAllCategories } from "@/lib/categories"
import kebabCase from "@/lib/utils/kebabCase"
import fs from "fs"
import path from "path"

const root = process.cwd()

export async function getStaticPaths() {
  const categories = await getAllCategories("blog")

  const paths = Object.keys(categories).map((category) => ({
    params: {
      category: category.split("."),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog")
  const strCategory = params.category.join(".")
  console.log("--- debug strCategory: ", strCategory)
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.category.map((c) => c).includes(strCategory)
  )
  console.log("--- debug filteredPosts: ", filteredPosts)

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `categories/${params.category}/feed.xml`)
    const rssPath = path.join(root, "public", "categories", kebabCase(params.category))
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, "feed.xml"), rss)
  }

  return { props: { posts: filteredPosts, category: params.category } }
}

export default function Category({ posts, category }) {
  // Capitalize first letter and convert space to dash
  const title = category[1]
  return (
    <>
      <CategorySEO
        title={`${title} - ${siteMetadata.author}`}
        description={`${title} category - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
