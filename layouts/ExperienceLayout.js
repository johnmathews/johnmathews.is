import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name } = frontMatter

  return (
    <>
      <PageSEO title={`Experience - ${name}`} description={`Experience - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Experience
          </h1>
        </div>
        <div className="max-w-none">
          <div className="prose pt-8 pb-8 dark:prose-dark">{children}</div>
        </div>
      </div>
    </>
  )
}
