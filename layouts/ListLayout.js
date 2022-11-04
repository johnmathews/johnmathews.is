import Link from "@/components/Link"
import Tag from "@/components/Tag"
import Category from "@/components/Category"
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

  // const yearlyDisplayPosts = {}
  // displayPosts.map(frontMatter) => {
  //   year = frontMatter.date.year
  //   if (year in yearlyDisplayPosts) {
  //     yearlyDisplayPosts[year].push(frontMatter)
  //   } else {
  //     year[year] = [frontMatter]
  //   }
  // }

  return (
    <>
      <div id="listLayoutWrapper" className=" 2xl:mt-10 ">
        <div
          id="titleWrapper"
          className="space-y-2 border-b-8 border-double border-gray-600 dark:border-gray-200 md:space-y-5 2xl:mb-20 2xl:pb-24"
        >
          <div
            id="title"
            className="ml-2 font-serif text-6xl dark:text-gray-50 md:ml-0 lg:text-8xl 2xl:text-9xl"
          >
            {title}
          </div>
        </div>
        <ul className="">
          {!filteredBlogPosts.length && "No posts found."}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, category } = frontMatter
            if (category[0].toLowerCase() !== "snippet") {
              return (
                <li key={slug} className="my-3">
                  <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="font-serif text-2xl font-bold">
                          <Link
                            href={`/blog/${slug}`}
                            className="capitalize text-gray-900 hover:underline dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h3>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>

                    <dl>
                      <dd
                        id="dateBox"
                        className="text-right font-serif text-xl font-semibold leading-6 text-gray-900 dark:text-gray-200 2xl:text-2xl "
                      >
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                  </article>
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
