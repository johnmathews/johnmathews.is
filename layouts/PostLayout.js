import { useRouter } from "next/router"
import { useEffect } from "react"

import Link from "@/components/Link"
import PageTitle from "@/components/PageTitle"
import { BlogSEO } from "@/components/SEO"
import path from "path"
import Image from "@/components/Image"
import siteMetadata from "@/data/siteMetadata"
import ScrollTop from "@/components/ScrollTop"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

const Notebook = dynamic(() => import("@/components/Notebook"), {
  ssr: false,
})

const postDateTemplate = { year: "numeric", month: "long" }

export default function PostLayout({ frontMatter, authorDetails, children }) {
  const { slug, date, title } = frontMatter
  const { theme } = useTheme()
  var PostImage
  if (frontMatter.image) {
    // https://stackoverflow.com/questions/66845889/next-js-image-how-to-maintain-aspect-ratio-and-add-letterboxes-when-needed
    PostImage = (
      <div className="relative -mt-12 mb-5 h-64 w-full md:mb-10 md:h-96 md:w-full lg:mt-0 lg:ml-0 xl:h-postHeaderImage">
        <Image
          src={frontMatter.image}
          alt={frontMatter.title}
          layout="fill"
          objectFit={"contain"}
        />
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
        <div id="notebookWrapper" className="">
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

  const router = useRouter()

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = true
      return true
    })
  }, [router])

  return (
    <>
      <div id="sectionContainerWrapsFooter" className="mt-5 md:px-4 lg:mt-0 xl:px-0 ">
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
            <article id="article" className="md:mx-5 lg:mx-0 2xl:mt-20">
              <div className="">
                <header className="pt-0 2xl:mb-12">
                  {PostImage}
                  <div className="space-y-1 text-center">
                    <div className="2xl:mt-10 3xl:mt-20">
                      <PageTitle>{title}</PageTitle>
                    </div>
                  </div>
                  <div className="mt-12 font-serif text-lg font-semibold text-gray-600 dark:text-gray-200 lg:text-2xl ">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </div>
                </header>
                <div
                  id="contentContainer"
                  className="max-w-4xl 2xl:max-w-5xl"
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
                        className="text-lg font-semibold text-blue-700 hover:underline dark:text-blue-300"
                        href="#"
                      >
                        <a onClick={() => router.back()}>← Go back</a>
                      </Link>{" "}
                    </div>
                  </footer>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}
