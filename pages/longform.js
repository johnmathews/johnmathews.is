import siteMetadata from '@/data/siteMetadata'
import longFormPageData from '@/data/longFormPageData'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'

export default function BookNotes() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Idle words
          </h1>
          <p> Longer posts of original content. Usually introspective or reflective.</p>
        </div>
        <div className="container py-12">
          <div className="-m-4">
            {Object.keys(longFormPageData).map((h) => {
              return (
                <div key={h} className="ml-5">
                  <ul className="ml-5 list-disc ">
                    {longFormPageData[h].map((d) => (
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
