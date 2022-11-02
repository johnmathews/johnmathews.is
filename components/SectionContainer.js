import Footer from "./Footer"

export default function SectionContainer({ children }) {
  return (
    <div id="sectionContainerWrapsFooter" className="mx-auto px-4 sm:px-6 xl:px-0 2xl:w-5/6">
      <div
        id="layoutWrapperDoesntWrapFooter"
        className="min-h-screen justify-between md:flex md:flex-col 2xl:mx-auto"
      >
        <div
          id="subLayoutWrapper"
          className="mx-auto justify-between md:flex md:flex-row lg:mx-auto lg:w-5/6 lg:pt-5"
        >
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}
