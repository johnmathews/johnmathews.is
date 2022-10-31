import fs from "fs"
import PageTitle from "@/components/PageTitle"
import generateRss from "@/lib/generate-rss"
import { MDXLayoutRenderer } from "@/components/MDXComponents"
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from "@/lib/mdx"

import Tag from "@/components/Tag"
import Category from "@/components/Category"
import SectionContainer from "@/components/SectionContainer"
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
    <SectionContainer>
      <div id="layoutWrapper" className="h-screen xl:mt-12 2xl:mt-40">
        <div id="bigContainer" className="mx-3 lg:mx-auto lg:mt-10 lg:w-5/6 lg:pt-5 2xl:mt-28">
          <div id="mx-auto w-full">
            <div id="flex">
              <div id="header" className="hidden flex-none xl:inline xl:w-32">
                <div className="fixed w-32 xl:w-40">
                  <div className="hidden">
                    <Link href="/" aria-label={siteMetadata.headerTitle}>
                      <div className="items-center ">
                        <div className="mb-12">
                          <Logo />
                        </div>
                        {typeof siteMetadata.headerTitle === "string" ? (
                          <div className="mb-12 hidden h-6 text-2xl font-semibold sm:block">
                            {siteMetadata.headerTitle}
                          </div>
                        ) : (
                          siteMetadata.headerTitle
                        )}
                      </div>
                    </Link>
                  </div>
                  <div id="sidebarTopSection" className="hiddden text-base leading-5 md:block ">
                    <div className="hidden md:block">
                      <div className="-ml-5 text-left">
                        <ThemeSwitch />
                      </div>

                      {headerNavLinks.map((link) => (
                        <Link
                          key={link.title}
                          href={link.href}
                          className="my-1 flex py-1 text-left text-lg text-gray-900 hover:underline dark:text-gray-100 md:flex-col 2xl:my-3"
                        >
                          {link.title}
                        </Link>
                      ))}

                      <div id="autoCompleteComponentWrapper" className="-ml-8 dark:-ml-1">
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
                      className="my-5 -mr-10 border-t-4 border-double border-gray-800 dark:border-gray-100 2xl:my-10"
                    />

                    <div className="hidden md:block">
                      <div className="flex flex-col">
                        <div className="mb-2 2xl:mb-5">
                          <dt className="my-1 flex text-left text-gray-900 dark:text-gray-200 md:flex-col">
                            Category:
                          </dt>
                          <dd className="my-1 flex text-left text-gray-900 hover:underline dark:text-gray-200 md:flex-col">
                            {category.map((cat) => {
                              return <Category key={cat} text={cat} />
                            })}
                          </dd>
                        </div>

                        <div>
                          <dt className="my-1 flex text-left text-gray-900 dark:text-gray-200 md:flex-col">
                            Published:
                          </dt>
                          <dd className="text-gray-900 dark:text-gray-200">
                            <time dateTime={date}>
                              {new Date(date).toLocaleDateString(
                                siteMetadata.locale,
                                postDateTemplate
                              )}
                            </time>
                          </dd>
                        </div>
                        {(next || prev) && (
                          <div className="xl:space-y- flex justify-between py-3 text-gray-900 dark:text-gray-200 xl:block 2xl:py-8">
                            {prev && (
                              <div className="my-3 2xl:my-5">
                                <div className="mb-1 2xl:mb-2"> Previous: </div>
                                <div className="hover:underline ">
                                  <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                                </div>
                              </div>
                            )}
                            {next && (
                              <div className="my-3 2xl:my-5">
                                <div className="mb-1 2xl:mb-2"> Next: </div>
                                <div className="hover:underline ">
                                  <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <MobileNav />
                </div>
              </div>

              <div id="main" className="min-h-screen w-full flex-auto xl:ml-72 xl:w-5/6 ">
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
          </div>
        </div>
        <Footer />
      </div>
    </SectionContainer>
  )
}
