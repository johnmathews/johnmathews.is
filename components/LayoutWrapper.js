import headerNavLinks from "@/data/headerNavLinks"

import { useState } from "react"
import Link from "./Link"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import ThemeSwitch from "./ThemeSwitch"

import Autocomplete from "@/components/AutoComplete"
import "@algolia/autocomplete-theme-classic"

import { useEffect } from "react"

const LayoutWrapper = ({ children }) => {
  const [technicalPosts, setTechnicalPosts] = useState("")
  const [nontechnicalPosts, setNontechnicalPosts] = useState("")
  const [alllPosts, setallPosts] = useState("")

  // useEffect(() => {
  //   const allTechnical = Array.from(
  //     document.getElementsByClassName('technical')
  //   );
  //   const allNonTechnical = Array.from(
  //     document.getElementsByClassName('nonTechnical')
  //   );
  // }, []);

  // const handleClick = (event) => {
  //   // 👇️ toggle class on click
  //   // event.currentTarget.classList.toggle("hidden")
  //   allTechnical.forEach((el) => {
  //     el.classList.toggle("hidden")
  //   })
  // }

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
          <div
            id="sidebarOuterWrapper"
            className="mr-12 hidden w-1/6 flex-none lg:block xl:mr-0 2xl:mt-5"
          >
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
              <div>
                <button
                  onClick={() => {
                    setTechnicalPosts(!technicalPosts)
                  }}
                >
                  Click
                </button>
              </div>
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
