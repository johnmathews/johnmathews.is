import Link from "@/components/Link"
import PageTitle from "@/components/PageTitle"
import { BlogSEO } from "@/components/SEO"
import path from "path"
import Footer from "@/components/Footer"
import Image from "@/components/Image"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import Comments from "@/components/comments"
import ScrollTop from "@/components/ScrollTop"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

const Notebook = dynamic(() => import("@/components/Notebook"), {
  ssr: false,
})

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  titleImage,
  children,
}) {
  const { slug, fileName, date, title, images, tags, category } = frontMatter
  const { theme } = useTheme()
  var PostImage
  if (frontMatter.image) {
    PostImage = (
      <div className="pb-5">
        <Image src={frontMatter.image} alt={frontMatter.title} height="500" width="900" />
      </div>
    )
  } else {
    PostImage = null
  }

  var PostSummary
  if (frontMatter.summary) {
    PostSummary = <div className="py-5 font-serif text-xl"> {frontMatter.summary} </div>
  } else {
    PostSummary = null
  }

  function getContent(frontMatter, children) {
    if (frontMatter.isNotebook) {
      const notebookPath = path.join(`/notebooks/${frontMatter.slug}.ipynb`)
      return (
        <div id="notebookWrapper">
          <Notebook
            filePath={notebookPath}
            notebookInputLanguage="python"
            className="notebook p-0"
            inputCodeDarkTheme={theme === "dark"}
            outputDarkTheme={theme === "dark"}
            inputMarkdownDarkTheme={theme === "light"}
            outputImageClassName="bg-white"
          />
        </div>
      )
    } else {
      return children
    }
  }

  return (
    <>
      <div id="sectionContainerWrapsFooter" className="mt-5 px-4 xl:px-0 2xl:w-5/6">
        <div
          id="layoutWrapperDoesntWrapFooter"
          className="min-h-screen justify-between md:flex md:flex-col"
        >
          <div id="LayoutWrapperForFlex" className="justify-between lg:flex lg:flex-row">
            <BlogSEO
              url={`${siteMetadata.siteUrl}/blog/${slug}`}
              authorDetails={authorDetails}
              {...frontMatter}
            />
            <ScrollTop />
            <article id="article" className="md:mx-5 lg:mx-0 xl:mt-20">
              <div className="">
                <header className="pt-0 2xl:mb-6">
                  {PostImage}
                  <div className="space-y-1 text-center">
                    <div className="">
                      <PageTitle>{title}</PageTitle>
                    </div>
                  </div>
                </header>
                <div
                  id="contentContainer"
                  className="pb-8 xl:max-w-5xl"
                  style={{ gridTemplateRows: "auto 1fr" }}
                >
                  <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
                    {PostSummary}
                    <div id="content" className="prose-xl max-w-none pt-10 pb-8">
                      {getContent(frontMatter, children)}
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
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
