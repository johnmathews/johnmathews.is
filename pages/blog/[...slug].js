import fs from "fs"
import PageTitle from "@/components/PageTitle"
import generateRss from "@/lib/generate-rss"

import { MDXLayoutRenderer } from "@/components/MDXComponents"
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from "@/lib/mdx"

import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AppContext } from "@/components/ContextProvider"

import "@algolia/autocomplete-theme-classic"

const DEFAULT_LAYOUT = "PostLayout"

export async function getStaticPaths() {
  const posts = getFiles("blog") // list of filenames
  // need to get the file using the slug, and then filter the slugs/files based on draft status

  const notDrafts = posts.filter(async (p) => {
    const post = await getFileBySlug("blog", formatSlug(p))
    return !post.draft
  })

  const paths = notDrafts.map((p) => ({
    params: {
      slug: formatSlug(p).split("/"),
    },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog")
  const thisPost = allPosts.filter((post) => formatSlug(post.slug) === params.slug.join("/"))[0]

  const thisCategory = thisPost.category // an array

  const allPostsInCategory = allPosts.filter(function (post) {
    for (const category of thisCategory) {
      for (const postCategory of post.category) {
        if (category.toLowerCase() == postCategory.toLowerCase() && post.draft !== true) {
          return true
        }
      }
    }
  })

  const postIndex = allPostsInCategory.findIndex(
    (post) => formatSlug(post.slug) === params.slug.join("/")
  )
  const prev = allPostsInCategory[postIndex + 1] || null
  const next = allPostsInCategory[postIndex - 1] || null
  const post = await getFileBySlug("blog", params.slug.join("/"))
  const authorList = post.frontMatter.authors || ["default"]
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug("authors", [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync("./public/feed.xml", rss)
  }

  return { props: { post, authorDetails, prev, next } }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post
  const { date, category, image } = frontMatter
  const postDateTemplate = { year: "numeric", month: "long" }

  const [state, dispatch] = useContext(AppContext)
  const postMetaData = frontMatter
  postMetaData.prev = prev
  postMetaData.next = next

  const router = useRouter()
  useEffect(() => {
    dispatch({
      type: "BLOG_POST",
      frontMatter: postMetaData,
    })
  }, [router])

  return (
    <>
      <div id="main" className="w-full 2xl:-mt-32">
        {frontMatter.draft !== true ? (
          <MDXLayoutRenderer
            layout={frontMatter.layout || DEFAULT_LAYOUT}
            titleImage={image}
            toc={toc}
            mdxSource={mdxSource}
            frontMatter={frontMatter}
            authorDetails={authorDetails}
            prev={prev}
            next={next}
          />
        ) : (
          <div className="mt-24 text-center">
            <PageTitle>
              Under Construction{" "}
              <span role="img" aria-label="roadwork sign">
                🚧
              </span>
            </PageTitle>
          </div>
        )}
      </div>
    </>
  )
}
