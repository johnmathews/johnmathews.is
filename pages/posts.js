import { getAllFilesFrontMatter } from "@/lib/mdx"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"

export const POSTS_PER_PAGE = 55

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter("blog")
  const posts = allPosts.filter(function (post) {
    // snippet posts only ever have 1 category (which is snippet)
    return post.category[0].toLowerCase() != "snippet"
  })
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog Posts"
      />
    </>
  )
}
