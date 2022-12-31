import headerNavLinks from "@/data/headerNavLinks"
import Link from "./Link"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import ThemeSwitch from "./ThemeSwitch"

import { useRouter } from "next/router"

import { useContext } from "react"
import { AppContext } from "./ContextProvider"

import Autocomplete from "@/components/AutoComplete"
import "@algolia/autocomplete-theme-classic"

import siteMetadata from "@/data/siteMetadata"
import Category from "@/components/Category"

const LayoutWrapper = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = useContext(AppContext)

  // this is needed because I dont understand conceptually what happens when i click a link to another post
  // placeHolder is needed, but is never seen
  const placeHolderPostMetaData = {
    title: "PLACEHOLDER",
    date: "2021-08-01",
    category: ["PLACEHOLDER"],
    next: "PLACEHOLDER",
    prev: "PLACEHOLDER",
  }
  const postMetaData = state.blogPostMeta ? state.blogPostMeta : placeHolderPostMetaData

  const postDateTemplate = { year: "numeric", month: "long" }

  function ONLY_TECHNICAL() {
    dispatch({
      type: "TECHNICAL",
    })
  }
  function ONLY_NONTECHNICAL() {
    dispatch({
      type: "NONTECHNICAL",
    })
  }
  function ALL_POSTS() {
    dispatch({
      type: "ALL",
    })
  }

  var bottomSection
  if (router.asPath === "/posts") {
    bottomSection = (
      <>
        <div className="mt-10 mb-10 w-36 border-b-8 border-double  border-gray-600 dark:border-gray-200 "></div>
        <div className="mt-5 text-lg">
          <div className="mb-2 font-medium">Categories:</div>
          <div className={`my-2`}>
            <button
              id="selectTechnical"
              className={`${
                state.technical && !state.nonTechnical ? "font-medium" : "font-normal"
              }`}
              onClick={ONLY_TECHNICAL}
            >
              {`${state.technical && !state.nonTechnical ? "> " : ""}`} Technical
            </button>
          </div>
          <div className={`my-2 `}>
            <button
              id="selectNonTechnical"
              className={`${
                !state.technical && state.nonTechnical ? "font-medium" : "font-normal"
              }`}
              onClick={ONLY_NONTECHNICAL}
            >
              {`${!state.technical && state.nonTechnical ? "> " : ""}`} Non-Technical
            </button>
          </div>
          <div className={`my-2 `}>
            <button
              id="selectAllPosts"
              className={`${state.technical && state.nonTechnical ? "font-medium" : "font-normal"}`}
              onClick={ALL_POSTS}
            >
              {`${state.technical && state.nonTechnical ? "> " : ""}`} All
            </button>
          </div>
        </div>
      </>
    )
  } else if (router.query.slug !== undefined) {
    bottomSection = (
      <div id="sidebarBottomSection" className="hiddden items-center text-base leading-5 md:block">
        <div
          id="sideBarDivider"
          className="my-8 border-t-4 border-double border-gray-800 dark:border-gray-100 2xl:my-10"
        ></div>

        <div className="md:block">
          <div className="flex flex-col  ">
            <div className="text-md mt-3  mb-3">
              <dt className="mb-1 flex text-left text-gray-900 dark:text-gray-100 md:flex-col">
                Published:
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">
                <time dateTime={postMetaData.date}>
                  {new Date(postMetaData.date).toLocaleDateString(
                    siteMetadata.locale,
                    postDateTemplate
                  )}
                </time>
              </dd>
            </div>

            <div className="text-md mb-3">
              <dt className="mb-1 flex text-left text-gray-900 dark:text-gray-100 md:flex-col">
                Category:
              </dt>
              <dd className="flex text-left text-gray-900 hover:underline dark:text-gray-100 md:flex-col">
                {postMetaData.category.map((cat) => {
                  return <Category key={cat} text={cat} />
                })}
              </dd>
            </div>

            {(postMetaData.next || postMetaData.prev) && (
              <div className="mt-3 mb-3 flex w-44 flex-col justify-between text-gray-900 dark:text-gray-100 lg:block">
                {postMetaData.prev && (
                  <div className="mb-3">
                    <div className="mb-1"> Previous: </div>
                    <div className="line-clamp-2 hover:underline">
                      <Link id="previousPost" href={`/blog/${postMetaData.prev.slug}`}>
                        {postMetaData.prev.title}
                      </Link>
                    </div>
                  </div>
                )}
                {postMetaData.next && (
                  <div className="mb-3">
                    <div className="mb-1"> Next: </div>
                    <div className="line-clamp-2 hover:underline">
                      <Link id="nextPost" href={`/blog/${postMetaData.next.slug}`}>
                        {postMetaData.next.title}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    bottomSection = null
  }

  return (
    <div
      id="LayoutContainer"
      className="3xl:w-0/12 mx-auto mt-5 px-4 lg:mt-16 lg:px-10 xl:mt-32 xl:w-11/12 xl:px-0 2xl:w-10/12"
    >
      <div id="layoutwrapperInclFooter" className="min-h-screen">
        <div
          id="LayoutWrapperExcFooter"
          className="mx-auto flex flex-col justify-between lg:flex-row"
        >
          <div id="mobileNavWrapper" className="lg:hidden">
            <MobileNav />
          </div>
          <div id="sidebarOuterWrapper" className="css/Tailwind.css">
            <div id="sidebarInnerWrapper" className="text-base leading-5 lg:fixed ">
              <div className="-ml-3 mb-3 text-left">
                <ThemeSwitch />
              </div>
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="my-1 flex py-1 text-left text-lg text-gray-900 hover:underline dark:text-gray-100 md:flex-col 2xl:my-2"
                >
                  {link.title}
                </Link>
              ))}

              <div id="autoCompleteComponentWrapper" className="-mt-1">
                <Autocomplete />
              </div>
              {bottomSection}
            </div>
          </div>
          <main id="mainWrapper" className="flex-auto lg:ml-12 2xl:ml-28 2xl:mr-36">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutWrapper
