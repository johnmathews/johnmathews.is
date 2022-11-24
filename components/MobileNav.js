import { useState } from "react"
import Link from "./Link"
import headerNavLinks from "@/data/headerNavLinks"

import { getAlgoliaResults } from "@algolia/autocomplete-js"
import algoliasearch from "algoliasearch"
import Autocomplete from "@/components/AutoComplete"

import ThemeSwitch from "@/components/ThemeSwitch"
import SearchItem from "@/components/SearchItem"
import Search from "@/components/Search"

import "@algolia/autocomplete-theme-classic"

const appId = "56G1FXZV4K"
const apiKey = "c9a76549bd2473401cb96c00b503698e"
const searchClient = algoliasearch(appId, apiKey)

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

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

  return (
    <div id="MobileNav" className="top-16 z-50 mt-5 mb-1 text-right">
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
        className={`top-0 left-0 z-10 min-h-screen w-full transform overflow-auto bg-gray-200 opacity-100 duration-300 ease-in-out dark:bg-slate-900 ${
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
        <nav id="mobileNavLinks" className="fixed mt-8 h-full">
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
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
