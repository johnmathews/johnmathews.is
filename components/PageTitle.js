export default function PageTitle({ children }) {
  return (
    <div className="break-words text-left font-serif text-6xl font-medium tracking-normal text-gray-900 dark:text-gray-100 lg:leading-snug xl:text-8xl 2xl:-mr-72 2xl:text-9xl 2xl:leading-tight ">
      {children}
    </div>
  )
}
