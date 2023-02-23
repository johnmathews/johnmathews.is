import Link from "next/link"
import kebabCase from "@/lib/utils/kebabCase"
import ChildCategory from "@/components/ChildCategory"

const ParentCategory = ({ catName, structuredCategories }) => {
  var category = ""
  // this is because the `capitalize` className doesnt work with hyphens
  if (catName == "non-technical") {
    category = "Non-Technical"
  } else {
    category = catName
  }

  return (
    <div key={catName}>
      <div className="my-3 text-2xl font-bold capitalize text-gray-900 dark:text-gray-100 ">
        {category}
      </div>

      <div>
        {structuredCategories.map((category) => {
          return <ChildCategory key={category} parentName={catName} category={category} />
        })}
      </div>
    </div>
  )
}

export default ParentCategory
