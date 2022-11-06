import fs from "fs"
import PageTitle from "@/components/PageTitle"
import generateRss from "@/lib/generate-rss"
import { MDXLayoutRenderer } from "@/components/MDXComponents"
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from "@/lib/mdx"

import Tag from "@/components/Tag"
import Category from "@/components/Category"
import Link from "@/components/Link"
import MobileNav from "@/components/MobileNav"
import ThemeSwitch from "@/components/ThemeSwitch"

import Footer from "@/components/Footer"

import Autocomplete from "@/components/AutoComplete"
import "@algolia/autocomplete-theme-classic"

import headerNavLinks from "@/data/headerNavLinks"
import Logo from "@/data/logo.svg"
import siteMetadata from "@/data/siteMetadata"

const DEFAULT_LAYOUT = "PostLayout"

export async function getStaticPaths() {
  const posts = getFiles("blog") // list of filenames
  // need to get the file using the slug, and then filter the slugs/files based on draft status

  const notDrafts = posts.filter(async (p) => {
    const post = await getFileBySlug("blog", formatSlug(p))
    return !post.draft
  })

  const paths = notDrafts.map((p) => ({
    params: {
      slug: formatSlug(p).split("/"),
    },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog")
  const thisPost = allPosts.filter((post) => formatSlug(post.slug) === params.slug.join("/"))[0]

  const thisCategory = thisPost.category // an array

  const allPostsInCategory = allPosts.filter(function (post) {
    for (const category of thisCategory) {
      for (const postCategory of post.category) {
        if (category.toLowerCase() == postCategory.toLowerCase() && post.draft !== true) {
          return true
        }
      }
    }
  })

  const postIndex = allPostsInCategory.findIndex(
    (post) => formatSlug(post.slug) === params.slug.join("/")
  )
  const prev = allPostsInCategory[postIndex + 1] || null
  const next = allPostsInCategory[postIndex - 1] || null
  const post = await getFileBySlug("blog", params.slug.join("/"))
  const authorList = post.frontMatter.authors || ["default"]
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug("authors", [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync("./public/feed.xml", rss)
  }

  return { props: { post, authorDetails, prev, next } }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post
  const { date, category } = frontMatter
  const postDateTemplate = { year: "numeric", month: "long" }
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mr-4 lg:hidden">
        <MobileNav />
      </div>
      <div id="header" className="hidden lg:-mt-10 lg:block lg:w-32 xl:mt-10 2xl:mt-5">
        <div id="navbarWrapper" className="fixed ml-10 w-32 xl:mt-24 xl:w-40">
          <div id="sidebarTopSection" className="hiddden text-base leading-5 md:block ">
            <div className="">
              <div className="-ml-3 text-left">
                <ThemeSwitch />
              </div>

              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="my-4 flex text-left text-lg text-gray-900 hover:underline dark:text-gray-100 md:flex-col"
                >
                  {link.title}
                </Link>
              ))}

              <div id="autoCompleteComponentWrapper" className="-mt-2">
                <Autocomplete />
              </div>
            </div>
          </div>
          <div
            id="sidebarBottomSection"
            className="hiddden items-center text-base leading-5 md:block"
          >
            <div
              id="sideBarDivider"
              className="my-8 border-t-4 border-double border-gray-800 dark:border-gray-100 lg:-mx-3 2xl:my-10 2xl:-mr-10"
            ></div>

            <div className="hidden md:block">
              <div className="flex flex-col  ">
                <div className="my-3  text-lg">
                  <dt className="my-1 flex text-left text-gray-900 dark:text-gray-200 md:flex-col">
                    Published:
                  </dt>
                  <dd className="text-gray-900 dark:text-gray-200">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>

                <div className="my-3  text-lg">
                  <dt className="my-1 flex text-left text-gray-900 dark:text-gray-200 md:flex-col">
                    Category:
                  </dt>
                  <dd className="my-1 flex text-left text-gray-900 hover:underline dark:text-gray-200 md:flex-col">
                    {category.map((cat) => {
                      return <Category key={cat} text={cat} />
                    })}
                  </dd>
                </div>

                {(next || prev) && (
                  <div className="flex justify-between py-3 text-gray-900 dark:text-gray-200 lg:block 2xl:py-8">
                    {prev && (
                      <div id="previousPost" className="my-3 2xl:my-5 ">
                        <div className="mb-1 2xl:mb-2"> Previous: </div>
                        <div className="line-clamp-2 hover:underline">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div id="nextPost" className="my-3 2xl:my-5">
                        <div className="mb-1 2xl:mb-2"> Next: </div>
                        <div className="line-clamp-2 hover:underline">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="main" className="w-full lg:ml-32 lg:pr-32 2xl:-mt-32 2xl:pr-0">
        {frontMatter.draft !== true ? (
          <MDXLayoutRenderer
            layout={frontMatter.layout || DEFAULT_LAYOUT}
            toc={toc}
            mdxSource={mdxSource}
            frontMatter={frontMatter}
            authorDetails={authorDetails}
            prev={prev}
            next={next}
          />
        ) : (
          <div className="mt-24 text-center">
            <PageTitle>
              Under Construction{" "}
              <span role="img" aria-label="roadwork sign">
                🚧
              </span>
            </PageTitle>
          </div>
        )}
      </div>
    </div>
  )
}
