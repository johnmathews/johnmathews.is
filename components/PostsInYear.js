import Link from "next/link"

import { useContext } from "react"
import { AppContext } from "@/components/ContextProvider"

import formatDate from "@/lib/utils/formatDate"

const PostsInYear = ({ year, posts, filterSnippets = true }) => {
  const [state, _] = useContext(AppContext)
  return posts[year].map((post) => {
    const { slug, date, title, category } = post

    const catType = []
    category.forEach((cat) => {
      if (cat.toLowerCase().split(".")[0] === "technical") {
        catType.push("technical")
      } else if (cat.toLowerCase().split(".")[0] === "non-technical") {
        catType.push("nonTechnical")
      } else {
        catType.push("other")
      }
    })
    const categoryTypes = [...new Set(catType)]

    var showPost
    if (state.technical && state.nonTechnical) {
      showPost = true
    } else if (state.technical && categoryTypes.includes("technical")) {
      showPost = true
    } else if (state.nonTechnical && categoryTypes.includes("nonTechnical")) {
      showPost = true
    } else {
      showPost = false
    }

    if (!filterSnippets || category[0].toLowerCase() !== "snippet") {
      return (
        <li
          key={slug}
          className={`text-normal my-5  hover:underline lg:my-6 ${showPost ? null : "hidden"}`}
        >
          <div className="flex">
            <div className="flex-auto">
              <div>
                <div className="font-serif text-2xl font-bold">
                  <Link
                    href={`/blog/${slug}`}
                    className="capitalize text-gray-900 hover:underline dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </div>
              </div>
            </div>

            <div
              id="dateBox"
              className="hidden flex-none text-right font-serif text-xl font-semibold leading-6 text-gray-600 dark:text-gray-300 md:block 2xl:text-2xl "
            >
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          </div>
        </li>
      )
    } else {
      return null
    }
  })
}

export default PostsInYear
