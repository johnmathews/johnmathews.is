import siteMetadata from '@/data/siteMetadata'
import data from '@/data/engineeringPageData'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'

export default function BookNotes() {
  return (
    <>
      <PageSEO
        title={`Engineering - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Engineering
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4">
            {Object.keys(data).map((h) => {
              return (
                <div key={h} className="ml-5">
                  <h2 className="-mb-2 text-lg font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-2xl md:leading-14">
                    {h}
                  </h2>
                  <ul className="ml-5 list-disc ">
                    {data[h].map((d) => (
                      <li key={d} className="my-3">
                        <Link
                          href={d.href}
                          className="text-xl font-normal text-gray-700 hover:underline dark:text-gray-200 "
                        >
                          {d.title}
                        </Link>
                      </li>
                    ))}
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
