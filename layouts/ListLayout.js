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

  // https://whereisthemouse.com/create-a-list-component-with-keyboard-navigation-in-react

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="font-serif text-3xl font-extrabold leading-9 tracking-normal text-gray-900 dark:text-gray-100 sm:text-4xl md:text-6xl lg:text-9xl">
            {title}
          </h1>
        </div>
        <ul>
          {!filteredBlogPosts.length && "No posts found."}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, category } = frontMatter
            if (category.toLowerCase() !== "snippet") {
              return (
                <li key={slug} className="mt-5 py-4">
                  <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="font-serif text-3xl font-bold">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 hover:underline dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap">
                          <Category key={category} text={category} />
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>

                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="font-serif text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-200">
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
