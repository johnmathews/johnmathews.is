import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import { getAllFilesFrontMatter } from "@/lib/mdx"

import headerNavLinks from "@/data/headerNavLinks"

import MobileNav from "@/components/MobileNav"

import ThemeSwitch from "@/components/ThemeSwitch"
import Image from "next/image"

import Autocomplete from "@/components/AutoComplete"
import "@algolia/autocomplete-theme-classic"

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog")

  return { props: { posts } }
}

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div
        id="centerer"
        className="my-auto mx-auto grid w-4/5 grid-cols-1 content-center md:min-h-screen md:grid-cols-3 lg:gap-72 xl:pl-60"
      >
        <div className="mx-auto mt-32 mb-12 flex content-center md:hidden ">
          <div className="">
            <MobileNav />
          </div>
          <div className="mt-1">
            <ThemeSwitch />
          </div>
        </div>
        <div
          id="listColumn"
          className="m-auto mx-auto hidden w-full content-center font-serif text-3xl leading-relaxed dark:text-gray-200 md:block md:leading-normal  "
        >
          <ul id="primaryList" className="my-3 text-center">
            {headerNavLinks.map((link) => (
              <li key={link.title} className="my-5">
                <Link
                  href={link.href}
                  className=" font-normal text-gray-700 hover:underline dark:text-gray-200 "
                >
                  {link.title}
                </Link>
              </li>
            ))}

            <div className="-ml-1">
              <ThemeSwitch />
            </div>

            <div className="lg:mt-10">
              <Autocomplete />
            </div>
          </ul>
        </div>
        <div id="imageColumn" className="col-span-2 lg:mx-0 ">
          <Image
            src="https://picsum.photos/seed/123/1000/800"
            alt="placeholder"
            width="1000"
            height="800"
          />
        </div>
      </div>
    </>
  )
}
