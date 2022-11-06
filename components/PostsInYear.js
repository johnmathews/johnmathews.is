import BlogListItem from "@/components/BlogListItem"

const PostsInYear = ({ year, posts }) => {
  posts[year].map((post) => {
    return <BlogListItem key={post.slug} post={post} />
  })
}

export default PostsInYear
