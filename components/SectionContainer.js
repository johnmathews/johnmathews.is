import Footer from "./Footer"

export default function SectionContainer({ children }) {
  return (
    <div
      id="sectionContainerWrapsFooter"
      className="mx-auto px-4 sm:px-6 xl:px-0 2xl:mt-32 2xl:w-5/6"
    >
      <div
        id="layoutWrapperDoesntWrapFooter"
        className="min-h-screen justify-between md:flex md:flex-col 2xl:mx-auto"
      >
        <div id="LayoutWrapperForFlex" className="justify-between md:flex md:flex-row">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}
