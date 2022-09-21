import { getAllFilesFrontMatter } from "@/lib/mdx"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import SnippetLayout from "@/layouts/SnippetLayout"
import { PageSEO } from "@/components/SEO"

export const POSTS_PER_PAGE = 25

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog")
  const snippets = posts.filter((post) => post.frontmatter.category === "snippet")
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, snippets, pagination } }
}

export default function Blog({ snippets, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <SnippetLayout
        posts={snippets}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog Posts"
      />
    </>
  )
}
