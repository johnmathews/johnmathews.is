import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"

export default function FourZeroFour() {
  return (
    <>
      <PageSEO title={`Page Not Found - ${siteMetadata.title}`} />
      <div className="flex flex-col items-start justify-start md:mb-10 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-12">
        <div className="space-x-2 pb-8 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-12 md:text-8xl md:leading-14">
            404
          </h1>
        </div>
        <div className="max-w-md">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            Sorry we couldn't find this page.
          </p>
          <p className="my-3">
            If you're looking for a page that used to exist, or have followed an old link, its
            probably moved.
          </p>
          <p>Try putting `/blog/` before the page name. </p>
          <p className="my-3"> Or, try searching for it (cmd-k).</p>
          <Link className="" href="/posts">
            <button className="focus:shadow-outline-blue my-10 inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
              Back to blog
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
