import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import { getAllFilesFrontMatter } from "@/lib/mdx"

import headerNavLinks from "@/data/headerNavLinks"

import MobileNav from "@/components/MobileNav"

import ThemeSwitch from "@/components/ThemeSwitch"
import Image from "next/image"

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog")

  return { props: { posts } }
}

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <div className="max-w-7/8 my-auto mx-auto grid grid-cols-1 content-center md:mr-10 md:min-h-screen md:grid-cols-3 lg:gap-4 xl:mr-5 ">
        <div className="mx-auto mt-32 mb-12 flex content-center md:hidden ">
          <div className="">
            <MobileNav />
          </div>
          <div className="mt-1">
            <ThemeSwitch />
          </div>
        </div>
        <div className="m-auto mx-3 hidden w-full content-center md:block ">
          <ul className="my-3 text-center">
            {headerNavLinks.map((link) => (
              <li key={link.title} className="my-5">
                <Link href={link.href} className="">
                  {link.title}
                </Link>
              </li>
            ))}
            <ThemeSwitch />
          </ul>
        </div>
        <div id="imageColumn" className="col-span-2 mx-5 lg:mx-0 ">
          <Image
            src="https://picsum.photos/seed/123/1000/800"
            alt="placeholder"
            width="1000"
            height="800"
          />
        </div>

        <div className="mt-20 w-full md:hidden">
          <a
            id="fuseSearch"
            className=" mx-auto -mt-10 block px-3 text-center font-serif font-semibold text-gray-700 hover:underline dark:text-gray-200 lg:ml-12 xl:ml-40 "
            href="javaScript:;"
          >
            Search
          </a>
        </div>
      </div>
    </>
  )
}
