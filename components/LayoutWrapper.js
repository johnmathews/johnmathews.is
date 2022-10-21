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

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div id="layoutWrapper" className="h-screen justify-between md:flex md:flex-col">
        <div className="mx-auto w-screen justify-between md:flex md:flex-row lg:mt-24 lg:w-5/6 ">
          <header
            id="header"
            className="mb-10 mr-5 md:w-1/5 md:items-center md:justify-between md:py-10 lg:mr-32"
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

            <div
              id="sidebarTopSection"
              className="hiddden items-center text-base leading-5 md:block"
            >
              <div className="hidden md:block lg:mt-16">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="my-3 flex py-1 text-center font-serif text-2xl text-gray-900 hover:underline dark:text-gray-100 md:flex-col"
                  >
                    {link.title}
                  </Link>
                ))}
                <div className="mt-10 -ml-2 text-center">
                  <ThemeSwitch />
                </div>

                <div className="mt-5 dark:-ml-5">
                  <Autocomplete />
                </div>
              </div>
            </div>

            <MobileNav />
          </header>
          <main id="main" className="mb-auto md:w-4/5 ">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
