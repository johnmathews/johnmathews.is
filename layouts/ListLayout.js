import PostsGroupedByYear from "@/components/PostsGroupedByYear"
import Pagination from "@/components/Pagination"

import { useContext } from "react"
import { AppContext } from "@/components/ContextProvider"

export default function ListLayout({ title, initialDisplayPosts = [], pagination }) {
  const displayPosts = initialDisplayPosts

  const yearlyDisplayPosts = {}
  displayPosts.map((frontMatter) => {
    const dt = new Date(frontMatter.date)
    const year = dt.getFullYear()
    if (year in yearlyDisplayPosts) {
      yearlyDisplayPosts[year].push(frontMatter)
    } else {
      yearlyDisplayPosts[year] = [frontMatter]
    }
  })

  function useContextToDescribeState() {
    const [state, _] = useContext(AppContext)
    if (state.technical && state.nonTechnical) {
      return "All posts"
    } else if (state.technical) {
      return "Technical posts only"
    } else if (state.nonTechnical) {
      return "Non-technical posts only"
    } else {
      return "No posts"
    }
  }

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
          <p>{useContextToDescribeState()}</p>
        </div>

        <PostsGroupedByYear posts={yearlyDisplayPosts} />
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
