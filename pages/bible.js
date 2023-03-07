import siteMetadata from '@/data/siteMetadata'
import bibleData from '@/data/bibleNotesPageData'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'

export default function BookNotes() {
  return (
    <>
      <PageSEO title={`Bible - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Bible Notes
          </h1>
          <p>These are quick and candid thoughts on various parts of the bible.</p>
          <p>They're not particularly well considered, and the opinions are lightly held.</p>
        </div>
        <div className="container py-12">
          <div className="-m-4">
            {Object.keys(bibleData).map((h) => {
              return (
                <div key={h} className="ml-5">
                  <h2 className="-mb-2 text-lg font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-2xl md:leading-14">
                    {h}
                  </h2>
                  <ul className="ml-5 list-disc ">
                    {bibleData[h].map((d) => {
                      return (
                        <li key={d} className="my-3">
                          <Link
                            href={d.href}
                            className={`text-xl font-normal text-gray-700 hover:underline dark:text-gray-200`}
                          >
                            {d.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
