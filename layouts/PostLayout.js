import Link from "@/components/Link"
import PageTitle from "@/components/PageTitle"
import SectionContainer from "@/components/SectionContainer"
import { BlogSEO } from "@/components/SEO"
import Image from "@/components/Image"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import Comments from "@/components/comments"
import ScrollTop from "@/components/ScrollTop"

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: "long", year: "numeric", month: "long", day: "numeric" }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, images, tags, category } = frontMatter
  const categoryString = category.replace("/", " > ")

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTop />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div id="content" className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                {children}
              </div>
            </div>
            <footer>
              <div className="mt-10 divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                <div className="mb-5">
                  <dt className="text-xs font-medium uppercase leading-6 text-gray-500 dark:text-gray-400">
                    Published:
                  </dt>
                  <dd className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 ">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>

                <div className="mb-5">
                  <dt className="mt-3 text-xs font-medium uppercase leading-6 text-gray-500 dark:text-gray-400">
                    Category:
                  </dt>
                  <dd className=" text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 ">
                    {categoryString}
                  </dd>
                </div>
                {tags && (
                  <div className="py-4 xl:py-5">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
