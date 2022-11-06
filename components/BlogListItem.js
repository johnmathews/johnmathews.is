import Link from "next/link"

const BlogListItem = ({ post }) => {
  console.log("--- debug post.title: ", post.title)
  return <div key={post.slug}>post.title</div>
}

export default BlogListItem
