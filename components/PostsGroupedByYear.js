import PostsInYear from "@/components/PostsInYear"

const PostsGroupedByYear = ({ posts, filterSnippets = true, filterCats = true }) => {
  return (
    <>
      {Object.keys(posts)
        .reverse()
        .map((year) => {
          return (
            <div key={year}>
              <div className="pb-6 text-3xl font-medium 2xl:my-10 2xl:text-4xl">{year}</div>
              <ul>
                <PostsInYear
                  year={year}
                  posts={posts}
                  filterSnippets={filterSnippets}
                  filterCats={filterCats}
                />
              </ul>
            </div>
          )
        })}
    </>
  )
}

export default PostsGroupedByYear
