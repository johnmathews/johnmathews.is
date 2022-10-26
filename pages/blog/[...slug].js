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
  const posts = getFiles("blog")
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog")
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join("/"))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
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
  const { slug, fileName, date, title, images, tags, category } = frontMatter
  const postDateTemplate = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  const categoryString = category.replace("/", " > ")
  return (
    <SectionContainer>
      <div id="layoutWrapper" className="h-screen justify-between md:flex md:flex-col">
        <div className="mx-auto justify-between md:flex md:flex-row lg:mt-24 lg:w-5/6 ">
          <header
            id="header"
            className="mb-10 mr-5 md:w-1/5 md:items-center md:justify-between md:py-10 lg:mr-32"
          >
            <div className="hidden">
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <div className="items-center justify-between">
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

            <div
              id="sidebarTopSection"
              className="hiddden items-center text-base leading-5 md:block"
            >
              <div className="hidden md:block lg:mt-16">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="my-3 flex py-1 text-center font-serif text-2xl text-gray-900 hover:underline dark:text-gray-100 md:flex-col"
                  >
                    {link.title}
                  </Link>
                ))}
                <div className="mt-10 -ml-2 text-center">
                  <ThemeSwitch />
                </div>

                <div
                  id="autoCompleteComponentWrapper"
                  className="mx-auto mt-3 w-32 font-serif dark:pl-7"
                >
                  <Autocomplete />
                </div>
              </div>
            </div>
            <div
              id="sidebarBottomSection"
              className="hiddden items-center text-base leading-5 md:block"
            >
              <div className="hidden md:block lg:mt-16">
                <div className="my-3 flex py-1 text-center font-serif text-2xl text-gray-900 dark:text-gray-100 md:flex-col">
                  <div>
                    <dt className="text-xs font-medium uppercase leading-6 text-gray-500 dark:text-gray-400">
                      Published:
                    </dt>
                    <dd className="text-primary-500 ">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>

                  <div className="mb-5">
                    <dt className="mt-3 text-xs font-medium uppercase leading-6 text-gray-500 dark:text-gray-400">
                      Category:
                    </dt>
                    <dd className=" text-primary-500 ">
                      <Category key={categoryString} text={categoryString} />
                    </dd>
                  </div>
                  {tags && (
                    <div className="mb-5">
                      <div className="mt-3 text-xs font-medium uppercase leading-6 text-gray-500 dark:text-gray-400">
                        Tags
                      </div>
                      <div className="flex flex-wrap justify-center text-primary-500">
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
                          <div className="text-primary-500">
                            <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Next Article
                          </h2>
                          <div className="text-primary-500">
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
          </header>
          <main id="main" className="mb-auto md:w-4/5 ">
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
          </main>
        </div>
        <Footer />
      </div>
    </SectionContainer>
  )
}
