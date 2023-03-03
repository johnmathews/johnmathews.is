import { AppContext } from "@/components/ContextProvider"
import { useContext, useEffect } from "react"

import { getFromStorage } from "@/lib/localStorage"
import { useRouter } from "next/router"

import { getAllFilesFrontMatter } from "@/lib/mdx"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"

function compareDates(a, b) {
  // descending
  if (new Date(a.date) < new Date(b.date)) {
    return 1
  }
  if (new Date(a.date) > new Date(b.date)) {
    return -1
  }
  return 0
}

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter("blog")
  const unsortedPosts = allPosts.filter(function (post) {
    return !post.category[0].toLowerCase().includes("snippet")
  })
  const posts = unsortedPosts.sort(compareDates)
  var technicalIndex = 0
  var nontechnicalIndex = 0
  posts.map((post, index) => {
    // doesnt consider posts with multiple categories
    post["indexAllPosts"] = index
    if (post.category[0].toLowerCase() == "non-technical") {
      post["indexNonTechnical"] = nontechnicalIndex
      nontechnicalIndex++
    } else {
      post["indexTechnical"] = technicalIndex
      technicalIndex++
    }
  })
  console.log("--- debug posts: ", posts.slice(0, 13))
  return { props: { posts } }
}

export default function Blog({ posts }) {
  const router = useRouter()
  const [_, dispatch] = useContext(AppContext)
  useEffect(() => {
    const currentFilter = getFromStorage("postFilter")
    if (currentFilter != null) {
      if (currentFilter == "technical") {
        dispatch({
          type: "TECHNICAL",
        })
      } else if (currentFilter == "nontechnical") {
        dispatch({
          type: "NONTECHNICAL",
        })
      } else {
        dispatch({
          type: "ALL",
        })
      }
    }
  }, [router])

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} title="Blog Posts" />
    </>
  )
}
