export default function PageTitle({ children }) {
  return (
    <h1 className="break-words text-left font-serif font-normal leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 lg:text-9xl">
      {children}
    </h1>
  )
}
