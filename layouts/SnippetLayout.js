import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import formatDate from '@/lib/utils/formatDate'

import { AppContext } from '@/components/ContextProvider'
import { useContext } from 'react'

export default function SnippetLayout({ content, frontMatter, title }) {
  const [state, _] = useContext(AppContext)

  // anything to do with a specific snippet post is within content.map loop below
  return (
    <>
      <div id="snippetLayoutWrapper" className="lg:-ml-10 xl:-ml-0">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div className="mb-10 text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </div>
          <div className="relative mt-20 max-w-lg ">
            {' '}
            Notes and bookmarks to content from around the web.
          </div>
        </div>
        <div
          id="snippetsSection"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-3 xl:gap-5 2xl:grid-cols-3"
        >
          {content.map((post) => {
            const { slug, date, title, tags, category } = post.frontMatter
            const lowerCaseCategories = category.map(function (item) {
              return item.toLowerCase()
            })
            const { mdxSource } = post

            var PostDescription
            const description = post.frontMatter.summary || post.frontMatter.description
            if (description) {
              PostDescription = (
                <div id="postSummary" className=" mb-3 text-lg">
                  {' '}
                  {description}{' '}
                </div>
              )
            } else {
              PostDescription = null
            }

            var showPost = false
            if (state.technical && state.nonTechnical) {
              showPost = true
            } else if (state.technical && lowerCaseCategories.includes('technical.snippet')) {
              showPost = true
            } else if (
              state.nonTechnical &&
              lowerCaseCategories.includes('non-technical.snippet')
            ) {
              showPost = true
            }

            return (
              <article
                key={slug}
                className={`snippet flex flex-col rounded-lg border-2 border-gray-300 bg-gray-100 shadow-lg dark:border-gray-200 dark:bg-slate-800 ${
                  showPost ? null : 'hidden'
                }`}
              >
                <div className="flex-grow">
                  <div className="my-3 px-4">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </div>
                  <div className="markdown  max-h-snippetContent overflow-y-auto ">
                    <div className="px-4 pb-4 text-lg  ">
                      {PostDescription}
                      <MDXLayoutRenderer layout="SnippetCardLayout" mdxSource={mdxSource} />
                    </div>
                  </div>
                </div>
                <div
                  id="footer"
                  className="min-h-16 mb-1 border-t-2 border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-slate-800"
                >
                  <div className="markdown mx-3  mb-1 mt-2">
                    <dl>
                      <dd className="font-mono text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                  </div>
                  <div className="mb-2 mt-1 flex flex-wrap px-3">
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
    </>
  )
}
