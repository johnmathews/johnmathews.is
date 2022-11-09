import PostsGroupedByYear from "@/components/PostsGroupedByYear"

export default function ListLayout({ title, posts }) {
  const yearlyDisplayPosts = {}
  posts.map((frontMatter) => {
    const dt = new Date(frontMatter.date)
    const year = dt.getFullYear()
    if (year in yearlyDisplayPosts) {
      yearlyDisplayPosts[year].push(frontMatter)
    } else {
      yearlyDisplayPosts[year] = [frontMatter]
    }
  })

  return (
    <>
      <div id="listLayoutWrapper" className="xl:ml-20 2xl:mt-10 ">
        <div
          id="titleWrapper"
          className="mb-10 space-y-2 border-b-8 border-double border-gray-600 pb-10 dark:border-gray-200 md:space-y-5  lg:mb-20 lg:pb-20 2xl:mb-20 2xl:pb-24"
        >
          <div
            id="title"
            className="ml-2 font-serif text-6xl dark:text-gray-50 md:ml-0 lg:text-8xl 2xl:text-9xl"
          >
            {title}
          </div>
        </div>

        <PostsGroupedByYear posts={yearlyDisplayPosts} />
      </div>
    </>
  )
}
