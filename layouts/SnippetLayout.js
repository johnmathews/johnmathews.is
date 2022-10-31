import Link from "@/components/Link"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import { useState } from "react"
import { MDXLayoutRenderer } from "@/components/MDXComponents"
import Pagination from "@/components/Pagination"
import formatDate from "@/lib/utils/formatDate"

export default function SnippetLayout({
  content,
  frontmatter,
  title,
  initialDisplayPosts = [],
  pagination,
}) {
  const [searchValue, setSearchValue] = useState("")
  const filteredSnippets = content.filter((post) => {
    const fm = post.frontMatter
    const searchContent = fm.title + fm.summary + fm.category + fm.tags.join(" ")
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredSnippets

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search snippets"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-slate-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div
          id="snippetsSection"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-3 lg:gap-8 2xl:grid-cols-3"
        >
          {!filteredSnippets.length && "No posts found."}
          {displayPosts.map((post) => {
            const { slug, date, title, tags } = post.frontMatter
            const { mdxSource } = post
            return (
              <article
                key={slug}
                className="snippet flex flex-col rounded-lg border-2 border-gray-300 bg-gray-100 shadow-lg dark:border-gray-200 dark:bg-slate-800 "
              >
                <div className="flex-grow">
                  <div className="mt-1 px-4 pt-2">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </div>
                  <div className="markdown max-h-snippet overflow-y-scroll">
                    <div className="px-4 pb-4 font-serif text-lg">
                      <MDXLayoutRenderer layout="SnippetCardLayout" mdxSource={mdxSource} />
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-gray-200 dark:border-gray-700">
                  <div className="markdown mx-3  mb-1 mt-2">
                    <dl>
                      <dd className="font-mono text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                  </div>
                  <div className="mt-1 mb-2 flex flex-wrap px-3">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
