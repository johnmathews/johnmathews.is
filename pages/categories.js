import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import Category from "@/components/Category"
import siteMetadata from "@/data/siteMetadata"
import { getAllCategories } from "@/lib/categories"
import kebabCase from "@/lib/utils/kebabCase"

export async function getStaticProps() {
  const categories = await getAllCategories("blog")

  return { props: { categories } }
}

export default function Categories({ categories }) {
  const structuredCategories = {}
  Object.keys(categories).forEach((category) => {
    const categoryParts = category.split(".")
    const categoryParent = categoryParts[0]
    const categoryChild = {}
    categoryChild[categoryParts[1]] = categories[category]

    if (categoryParent in structuredCategories) {
      structuredCategories[categoryParent].push(categoryChild)
    } else {
      structuredCategories[categoryParent] = [categoryChild]
    }
  })
  console.log("--- debug structuredCategories: ", structuredCategories)

  // const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a])

  //         <ul>
  //           {sortedCategories.map((t) => {
  //             return (
  //               <li key={t} className="mt-2 mb-2 mr-5 text-lg">
  //                 <Category text={t} />
  //                 <Link
  //                   href={`/categories/${kebabCase(t)}`}
  //                   className="ml-2 font-semibold uppercase text-gray-600 dark:text-gray-300"
  //                 >
  //                   {` (${categories[t].length})`}
  //                 </Link>
  //               </li>
  //             )
  //           })}
  //         </ul>
  return (
    <>
      <PageSEO title={`Categories - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="md:mt-24">
        <div id="titleWrapper" className="space-x-2 pt-6 pb-8 md:space-y-5">
          <div
            id="title"
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
          >
            Categories
          </div>
        </div>
        <div id="categories" className="flex max-w-lg flex-col">
          {Object.keys(structuredCategories).map((category) => {
            return (
              <div
                key={category}
                className="my-3 text-2xl font-bold capitalize text-gray-900 dark:text-gray-100 "
              >
                {category}

                {structuredCategories[category].forEach((subCat) => {
                  console.log("--- debug subCat: ", subCat)
                  Object.keys(subCat).map((subCatKey) => {
                    console.log("--- debug subCat key: ", subCatKey)
                    console.log("--- debug subCat posts: ", subCat[subCatKey])
                    return (
                      <div
                        id="subCat"
                        key={subCatKey}
                        className="my-3 text-lg font-bold capitalize text-gray-900 dark:text-gray-100 "
                      >
                        {subCatKey}
                      </div>
                    )
                  })
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
