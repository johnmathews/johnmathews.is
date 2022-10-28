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

  const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a])
  return (
    <>
      <PageSEO title={`Categories - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="md:mt-24">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Categories
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(categories).length === 0 && "No categories found."}
          <ul>
            {sortedCategories.map((t) => {
              return (
                <li key={t} className="mt-2 mb-2 mr-5 text-lg">
                  <Category text={t} />
                  <Link
                    href={`/categories/${kebabCase(t)}`}
                    className="ml-2 font-semibold uppercase text-gray-600 dark:text-gray-300"
                  >
                    {` (${categories[t].length})`}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
