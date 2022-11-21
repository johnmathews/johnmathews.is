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

const LayoutWrapper = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = useContext(AppContext)

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
        <div className="text-md mt-5">
          <div className={`my-1`}>
            <button
              id="selectTechnical"
              className={`${
                state.technical && !state.nonTechnical ? "font-medium" : "font-normal"
              }`}
              onClick={ONLY_TECHNICAL}
            >
              {`${state.technical && !state.nonTechnical ? ">" : ""}`} Technical
            </button>
          </div>
          <div className={`my-1 `}>
            <button
              id="selectNonTechnical"
              className={`${
                !state.technical && state.nonTechnical ? "font-medium" : "font-normal"
              }`}
              onClick={ONLY_NONTECHNICAL}
            >
              {`${!state.technical && state.nonTechnical ? ">" : ""}`} Non-Technical
            </button>
          </div>
          <div className={`my-1 `}>
            <button
              id="selectAllPosts"
              className={`${state.technical && state.nonTechnical ? "font-medium" : "font-normal"}`}
              onClick={ALL_POSTS}
            >
              {`${state.technical && state.nonTechnical ? ">" : ""}`} All
            </button>
          </div>
        </div>
      </>
    )
  } else {
    bottomSection = null
  }

  return (
    <div
      id="LayoutWrapper"
      className="mt-5 px-4 md:mx-auto lg:mx-32 lg:mt-16 xl:mt-32 xl:px-0 2xl:mt-32 2xl:w-5/6"
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
          <main id="mainWrapper" className="flex-auto ">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutWrapper
