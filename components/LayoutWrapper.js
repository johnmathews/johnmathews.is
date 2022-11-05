import headerNavLinks from "@/data/headerNavLinks"
import Link from "./Link"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import ThemeSwitch from "./ThemeSwitch"

import Autocomplete from "@/components/AutoComplete"
import "@algolia/autocomplete-theme-classic"

const LayoutWrapper = ({ children }) => {
  return (
    <div
      id="sectionContainerWrapsFooter"
      className="mt-5 px-4 md:mx-auto lg:mx-32 lg:mt-16 xl:px-0 2xl:mt-32 2xl:w-5/6"
    >
      <div
        id="layoutWrapperDoesntWrapFooter"
        className="min-h-screen justify-between md:flex md:flex-col 2xl:mx-auto"
      >
        <div id="LayoutWrapperForFlex" className="justify-between lg:flex lg:flex-row">
          <div className="lg:hidden">
            <MobileNav />
          </div>
          <div className="relative mr-5 md:items-center md:justify-between">
            <div
              id="sidebarTopSection-LayoutWrapper"
              className="hidden text-base leading-5 lg:fixed lg:-ml-12 lg:block 2xl:mt-5"
            >
              <div className="">
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
              </div>
            </div>
          </div>
          <main id="main-layoutwrapper" className="mx-auto lg:ml-32 2xl:ml-48">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutWrapper
