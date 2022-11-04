export default function PageTitle({ children }) {
  return (
    <div className="break-words text-left font-serif text-4xl font-normal tracking-normal text-gray-900 dark:text-gray-100 md:text-5xl md:leading-loose xl:text-8xl 2xl:-mr-72 2xl:text-9xl">
      {children}
    </div>
  )
}
