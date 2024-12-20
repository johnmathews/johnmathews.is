import { AppContext } from '@/components/ContextProvider'
import Link from '@/components/Link'
import { useContext } from 'react'

import formatDate from '@/lib/utils/formatDate'

const PostsInYear = ({ year, posts, filterSnippets = true, filterCats = true }) => {
  const [state, _] = useContext(AppContext)
  return posts[year].map((post) => {
    const { slug, date, title, category } = post

    // create a set of category types called categoryTypes
    const catType = []
    category.forEach((cat) => {
      if (cat.toLowerCase().split('.')[0] === 'technical') {
        catType.push('technical')
      } else if (cat.toLowerCase().split('.')[0] === 'non-technical') {
        catType.push('nonTechnical')
      } else {
        catType.push('other')
      }
    })
    const categoryTypes = [...new Set(catType)]

    // show or hide post depending on visibility state and what groups the post
    // belongs to. Doesnt work on category page because cat group state doesnt
    // apply to a category page.
    var showPost = false
    var index = 0

    if (!filterCats) {
      showPost = true
    } else if (state.technical && state.nonTechnical) {
      showPost = true
      index = post.indexAllPosts
    } else if (state.technical && categoryTypes.includes('technical')) {
      showPost = true
      index = post.indexTechnical
    } else if (state.nonTechnical && categoryTypes.includes('nonTechnical')) {
      showPost = true
      index = post.indexNonTechnical
    } else {
      showPost = false
    }

    if (!filterSnippets || category[0].toLowerCase() !== 'snippet') {
      return (
        <li
          key={slug}
          className={`text-normal mb-5 px-1  hover:underline lg:mb-6 ${
            state.keyboardMode && state.listPosition == index
              ? '-ml-1 -mr-1 rounded-md border-2 border-slate-400 bg-blue-200 px-2 dark:border-slate-300 dark:bg-blue-600'
              : null
          } ${showPost ? 'viewable index-' + index : 'hidden'}`}
        >
          <div className="flex">
            <div className="flex-auto">
              <div>
                <div className="font-serif text-2xl font-bold">
                  <Link
                    href={`/blog/${slug}`}
                    className={`${state.listPosition == index ? 'selected' : 'notSelected'}`}
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
