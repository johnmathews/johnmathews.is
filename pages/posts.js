import { AppContext } from "@/components/ContextProvider"
import { useContext, useEffect } from "react"

import { getFromStorage } from "@/lib/localStorage"
import { useRouter } from "next/router"

import { getAllFilesFrontMatter } from "@/lib/mdx"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter("blog")
  const posts = allPosts.filter(function (post) {
    return !post.category[0].toLowerCase().includes("snippet")
  })

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
