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

function categoryGroup(categories) {
  // each post can have more than one category
  // returns a set showing which category groups the post belongs too
  // technical, non-technical, or snippet
  var groups = new Set()
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].split(".")[0].toLowerCase() == "non-technical") {
      groups.add("non-technical")
    } else if (categories[i].split(".")[0].toLowerCase() == "technical") {
      groups.add("technical")
    } else if (categories[i].split(".")[0].toLowerCase() == "snippet") {
      groups.add("snippet")
    }
  }
  return groups
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
    var catGroups = categoryGroup(post.category)
    if (catGroups.has("non-technical")) {
      post["indexNonTechnical"] = nontechnicalIndex
      nontechnicalIndex++
    }
    if (catGroups.has("technical")) {
      post["indexTechnical"] = technicalIndex
      technicalIndex++
    }
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
