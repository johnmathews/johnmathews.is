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
            const onlyKey = Object.keys(category)[0]
            const numPosts = category[onlyKey].length
            console.log("--- debug numPosts: ", numPosts)
            console.log("--- debug onlyKey: ", onlyKey)
            console.log("--- debug category: ", category)
            return (
              <div key={onlyKey} className="flex">
                <div className="text-lg capitalize">{onlyKey}</div>
                <div className="ml-1 text-lg capitalize">({numPosts})</div>
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
