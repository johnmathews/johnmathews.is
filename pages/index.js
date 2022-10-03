import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import formatDate from "@/lib/utils/formatDate"

import ThemeSwitch from "@/components/ThemeSwitch"
import NewsletterForm from "@/components/NewsletterForm"
import Image from "next/image"

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog")

  return { props: { posts } }
}

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <div className="max-w-7/8 my-auto mx-auto grid grid-cols-1 content-center md:mr-10 md:min-h-screen md:grid-cols-3 lg:gap-4 xl:mr-5 ">
        <div id="primaryList" className="m-auto mx-3 w-full content-center ">
          <ul className="my-3 text-center">
            <li className="my-5">Posts</li>
            <li className="my-5">Snippets</li>
            <li className="my-5">Projects</li>
            <li className="my-5">About</li>
            <li className="my-5">
              <ThemeSwitch />
            </li>
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

        <div className="mt-20 hidden w-full">
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
