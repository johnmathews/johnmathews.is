import { PageSEO } from "@/components/SEO"
import ParentCategory from "@/components/ParentCategory"
import siteMetadata from "@/data/siteMetadata"
import { getAllCategories } from "@/lib/categories"

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

  return (
    <>
      <PageSEO title={`Categories - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="">
        <div id="titleWrapper" className="space-x-2 pb-8 md:space-y-5">
          <div
            id="title"
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
          >
            Categories
          </div>
        </div>
        <div key={"cat_parent"} id="categories" className="flex max-w-lg flex-col"></div>
        {Object.keys(structuredCategories).map((category) => {
          console.log("--- debug pages/categories.js category: ", category)
          return (
            <ParentCategory
              key={category}
              catName={category}
              structuredCategories={structuredCategories[category]}
            />
          )
        })}
      </div>
    </>
  )
}
