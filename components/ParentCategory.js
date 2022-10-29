import Link from "next/link"
import kebabCase from "@/lib/utils/kebabCase"
import ChildCategory from "@/components/ChildCategory"

const ParentCategory = ({ catName, structuredCategories }) => {
  if (catName != "snippet") {
    return (
      <div key={catName}>
        <div className="my-3 text-2xl font-bold capitalize text-gray-900 dark:text-gray-100 ">
          {catName}
        </div>

        <div>
          {structuredCategories.map((category) => {
            return (
              <div key={Object.keys(category)[0]} className="text-lg capitalize">
                {Object.keys(category)[0]}
              </div>
            )
          })}
        </div>
      </div>
    )
  } else {
    return <div key={catName}></div>
  }
}

export default ParentCategory
