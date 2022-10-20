import siteMetadata from "@/data/siteMetadata"
import headerNavLinks from "@/data/headerNavLinks"
import Logo from "@/data/logo.svg"
import Link from "./Link"
import SectionContainer from "./SectionContainer"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import ThemeSwitch from "./ThemeSwitch"

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div id="layoutWrapper" className="h-screen">
        <div className="  mx-auto flex w-screen flex-row justify-between lg:mt-24 lg:w-5/6 ">
          <header id="header" className="w-1/5 items-center justify-between py-10">
            <div>
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

            <div className="items-center text-base leading-5">
              <div className="mb-10 hidden sm:block">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex flex-col p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <MobileNav />
            </div>
          </header>
          <main id="main" className="mb-auto w-4/5 ">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
