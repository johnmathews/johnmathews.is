import headerNavLinks from "@/data/headerNavLinks"
import Link from "./Link"
import SectionContainer from "./SectionContainer"
import MobileNav from "./MobileNav"
import ThemeSwitch from "./ThemeSwitch"

import Autocomplete from "@/components/AutoComplete"
import "@algolia/autocomplete-theme-classic"

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer className="mb-10 mr-5 md:items-center md:justify-between">
      <div
        id="sidebarTopSection-LayoutWrapper"
        className="hiddden text-base leading-5 md:block 2xl:mt-20"
      >
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

      <MobileNav />
      <main id="main-layoutwrapper" className="mx-auto ml-60">
        {children}
      </main>
    </SectionContainer>
  )
}

export default LayoutWrapper
