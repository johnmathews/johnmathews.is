import { getAllFilesFrontMatter } from "@/lib/mdx"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"

export const POSTS_PER_PAGE = 55

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter("blog")
  const posts = allPosts.filter(function (post) {
    return post.category[0].toLowerCase() != "snippet"
  })

  return { props: { posts } }
}

export default function Blog({ posts }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} title="Blog Posts" />
    </>
  )
}
