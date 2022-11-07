import PostsInYear from "@/components/PostsInYear"

const PostsGroupedByYear = ({ posts }) => {
  return (
    <>
      {Object.keys(posts)
        .reverse()
        .map((year) => {
          return (
            <>
              <div key={year} className="text-3xl font-medium 2xl:my-10 2xl:text-4xl">
                {year}
              </div>
              <ul>
                <PostsInYear year={year} posts={posts} />
              </ul>
            </>
          )
        })}
    </>
  )
}

export default PostsGroupedByYear
