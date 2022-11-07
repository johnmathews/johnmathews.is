import Link from "next/link"

import formatDate from "@/lib/utils/formatDate"
import BlogListItem from "@/components/BlogListItem"

const PostsInYear = ({ year, posts }) =>
  posts[year].map((post) => {
    const { slug, date, title, category } = post
    console.log("--- debug category: ", category)

    const catType = []
    category.forEach((cat) => {
      if (cat.toLowerCase().split(".")[0] === "technical") {
        catType.push("technical")
      } else if (cat.toLowerCase().split(".")[0] === "personal") {
        catType.push("personal")
      } else {
        catType.push("other")
      }
    })

    const categoryTypes = [...new Set(catType)]

    if (category[0].toLowerCase() !== "snippet") {
      return (
        <li key={slug} className={`text-normal my-5 lg:my-3  ${categoryTypes.toString()}`}>
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
              className="hidden flex-none text-right font-serif text-xl font-semibold leading-6 text-gray-900 dark:text-gray-200 md:block 2xl:text-2xl "
            >
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          </div>
        </li>
      )
    }
  })

export default PostsInYear
