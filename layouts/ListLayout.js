import Link from "@/components/Link"
import Tag from "@/components/Tag"
import Category from "@/components/Category"
import PostsGroupedByYear from "@/components/PostsGroupedByYear"
import siteMetadata from "@/data/siteMetadata"
import { useState } from "react"
import Pagination from "@/components/Pagination"
import formatDate from "@/lib/utils/formatDate"

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState("")
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(" ") + frontMatter.category
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

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
        <ul className="">
          {!filteredBlogPosts.length && "No posts found."}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, category } = frontMatter
            if (category[0].toLowerCase() !== "snippet") {
              return (
                <li key={slug} className="text-normal my-5 lg:my-3">
                  <div className="flex">
                    <div className="flex-auto">
                      <div>
                        <div className="font-serif text-2xl font-bold">
                          <Link
                            href={`/blog/${slug}`}
                            className="capitalize text-gray-900 hover:underline dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div
                      id="dateBox"
                      className="hidden flex-none text-right font-serif text-xl font-semibold leading-6 text-gray-900 dark:text-gray-200 md:block 2xl:text-2xl "
                    >
                      <time dateTime={date}>{formatDate(date)}</time>
                    </div>
                  </div>
                </li>
              )
            }
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
