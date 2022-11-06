import Link from "next/link"
import PostsInYear from "@/components/PostsInYear"

function PostsGroupedByYear({ posts }) {
  return (
    <>
      {Object.keys(posts).map((year) => {
        return (
          <>
            <div key={year} className="text-3xl font-semibold">
              {year}
            </div>
            <PostsInYear year={year} posts={posts} />
          </>
        )
      })}
    </>
  )
}

export default PostsGroupedByYear
