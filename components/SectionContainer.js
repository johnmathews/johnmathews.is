import Footer from "./Footer"

export default function SectionContainer({ children }) {
  return (
    <div
      id="sectionContainerWrapsFooter"
      className="mt-5 px-4 md:mx-auto lg:mx-32 lg:mt-16 xl:px-0 2xl:mt-32 2xl:w-5/6"
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
