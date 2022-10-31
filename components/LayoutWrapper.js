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
      <div id="layoutWrapper" className="h-screen justify-between md:flex md:flex-col">
        <div className="mx-auto justify-between md:flex md:flex-row lg:mt-24 lg:w-5/6 ">
          <header
            id="header"
            className="mb-10 mr-5 md:items-center md:justify-between md:py-10 2xl:mr-32 2xl:w-1/5"
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

            <div id="sidebarTopSection" className="hiddden text-base leading-5 md:block">
              <div className="hidden md:block lg:mt-16">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="my-3 flex py-1 font-serif text-2xl text-gray-900 hover:underline dark:text-gray-100 md:flex-col"
                  >
                    {link.title}
                  </Link>
                ))}
                <div className="mt-10 -ml-2">
                  <ThemeSwitch />
                </div>

                <div id="autoCompleteComponentWrapper" className="mt-8 font-serif">
                  <Autocomplete />
                </div>
              </div>
            </div>
            <div ref={ref} id="sidebarBottomSection" />
            <MobileNav />
          </header>
          <main id="main" className="mb-auto md:ml-16 ">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
