import Link from "./Link"
import headerNavLinks from "@/data/headerNavLinks"

import Autocomplete from "@/components/AutoComplete"

import ThemeSwitch from "@/components/ThemeSwitch"

import { useContext, useState } from "react"
import { AppContext } from "./ContextProvider"

import { setToStorage } from "@/lib/localStorage"
import "@algolia/autocomplete-theme-classic"

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [state, dispatch] = useContext(AppContext)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto"
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden"
      }
      return !status
    })
  }

  function ONLY_TECHNICAL() {
    dispatch({
      type: "TECHNICAL",
    })
    setToStorage("postFilter", "technical")
  }
  function ONLY_NONTECHNICAL() {
    dispatch({
      type: "NONTECHNICAL",
    })
    setToStorage("postFilter", "nontechnical")
  }
  function ALL_POSTS() {
    dispatch({
      type: "ALL",
    })
    setToStorage("postFilter", "both")
  }

  return (
    <div id="MobileNav" className="top-16 z-50 mt-3 mb-3 pb-3 text-right">
      <button
        type="button"
        id="openNav"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 z-20 min-h-screen w-full transform overflow-auto bg-gray-200 opacity-100 duration-300 ease-in-out dark:bg-slate-900 ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            type="button"
            id="closeNav"
            className="mr-8 mt-12 h-8 w-8 rounded"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav id="mobileNavLinks" className="fixed mt-0 h-full">
          <div className="px-12 py-4">
            <ThemeSwitch />
          </div>

          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}

          <div
            id="AutoCompleteWrapper"
            className="text-right text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100 "
          >
            <Autocomplete />
          </div>

          <div
            id="catChooserWrapper"
            className="mt-8 flex flex-row-reverse px-12 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100  "
          >
            <div className={`my-2 `}>
              <button
                id="selectAllPosts"
                className={`${
                  state.technical && state.nonTechnical
                    ? "font-small border-b-2 border-gray-800  px-2 dark:border-gray-200"
                    : "px-2 font-normal"
                }`}
                onClick={ALL_POSTS}
              >
                {`${state.technical && state.nonTechnical ? "" : ""}`} A
              </button>
            </div>
            <div className="my-2 mx-1">&#47;&#47;</div>
            <div className={`my-2 `}>
              <button
                id="selectNonTechnical"
                className={`${
                  !state.technical && state.nonTechnical
                    ? "font-small border-b-2 border-gray-800  px-2 dark:border-gray-200"
                    : "px-2 font-normal"
                }`}
                onClick={ONLY_NONTECHNICAL}
              >
                {`${!state.technical && state.nonTechnical ? "" : ""}`} NT
              </button>
            </div>
            <div className="my-2 mx-1">&#47;&#47;</div>
            <div className={`my-2`}>
              <button
                id="selectTechnical"
                className={`${
                  state.technical && !state.nonTechnical
                    ? "font-small border-b-2 border-gray-800 px-2 dark:border-gray-200"
                    : "px-2 font-normal "
                }`}
                onClick={ONLY_TECHNICAL}
              >
                {`${state.technical && !state.nonTechnical ? "" : ""}`} T
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
