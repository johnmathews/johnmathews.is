import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import headerNavLinks from '@/data/headerNavLinks'

import MobileNav from '@/components/MobileNav'

import ThemeSwitch from '@/components/ThemeSwitch'
import Image from 'next/image'

import Autocomplete from '@/components/AutoComplete'
import '@algolia/autocomplete-theme-classic'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

function getRandomImage() {
  var images = [
    'bike.jpeg',
    'square.jpeg',
    'roofs.jpeg',
    'roof-tower.jpeg',
    'starship-first-stacking.png',
  ]
  var imageName = images[Math.floor(Math.random() * images.length)]
  var imageSource = '/static/images/landing/' + imageName
  return imageSource
}

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div id="centerer" className="mx-auto flex h-screen w-4/5 flex-col md:flex-row 2xl:w-3/5 ">
        <div className="mx-auto mt-32 mb-12 flex content-center md:hidden ">
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>

        <div
          id="landingListColumn"
          className="my-auto mx-auto hidden content-center font-serif text-xl leading-relaxed dark:text-gray-200 md:block md:leading-normal lg:text-3xl"
        >
          <ul id="primaryList" className="my-3 text-left">
            {headerNavLinks.map((link) => (
              <li key={link.title} className="my-5">
                <Link
                  href={link.href}
                  className="font-normal text-gray-700 hover:underline dark:text-gray-200 "
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li className="mt-10 -ml-20 pl-1">
              <Autocomplete />
            </li>
            <li className="mt-4 -ml-3 font-normal text-gray-700 hover:underline dark:text-gray-200 ">
              <ThemeSwitch />
            </li>
          </ul>
        </div>
        <div id="imageColumn" className="-mt-5 md:my-auto md:w-96 md:pl-10 lg:ml-32 lg:w-auto ">
          <Link href="/posts">
            <Image src={getRandomImage()} alt="placeholder" width="1000" height="800" />
          </Link>
        </div>
      </div>
    </>
  )
}
