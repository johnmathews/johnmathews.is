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
              <div className="">
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            id="contentContainer"
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div id="content" className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                {children}
              </div>
            </div>
            <footer className="">
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/posts"
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
