import siteMetadata from "@/data/siteMetadata"
import headerNavLinks from "@/data/headerNavLinks"
import Logo from "@/data/logo.svg"
import Link from "./Link"
import SectionContainer from "./SectionContainer"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import ThemeSwitch from "./ThemeSwitch"

import Autocomplete from "@/components/AutoComplete"
import "@algolia/autocomplete-theme-classic"

import { useRef } from "react"

const LayoutWrapper = ({ children }) => {
  const ref = useRef("sidebarBottomSection")
  return (
    <SectionContainer>
      <div
        id="layoutWrapper"
        className="min-h-screen justify-between md:flex md:flex-col xl:mt-12 2xl:mx-auto "
      >
        <div
          id="subLayoutWrapper"
          className="mx-auto justify-between md:flex md:flex-row lg:mx-auto lg:mt-24 lg:w-5/6 lg:pt-5"
        >
          <header id="header" className="mb-10 mr-5 md:items-center md:justify-between md:py-10">
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

            <div id="sidebarTopSection" className="hiddden text-base leading-5 md:block ">
              <div className="hidden md:block">
                <div className="-ml-3 mb-5 text-left">
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

                <div id="autoCompleteComponentWrapper" className="mt-3">
                  <Autocomplete />
                </div>
              </div>
            </div>
            <div ref={ref} id="sidebarBottomSection" />
            <MobileNav />
          </header>
          <main id="main" className="mb-auto md:ml-16 2xl:w-5/6">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
