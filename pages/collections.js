import siteMetadata from '@/data/siteMetadata'
import collectionsData from '@/data/collectionsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Collections() {
  const indexOffset = 0
  return (
    <>
      <PageSEO
        title={`Collections - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Collections
          </h1>
          <p>This page links to various collections of posts organised around a common theme.</p>
        </div>
        <div className="container py-12">
          <div className="-m-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {collectionsData.map((d, index) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                keyboardShortcut={d.keyboardShortcut}
                index={index + indexOffset}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
