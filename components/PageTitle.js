export default function PageTitle({ children }) {
  return (
    <h1 className="break-words text-left font-serif font-normal leading-loose tracking-normal text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl xl:text-8xl 2xl:text-9xl">
      {children}
    </h1>
  )
}
