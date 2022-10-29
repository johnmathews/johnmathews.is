import Link from "next/link"
import kebabCase from "@/lib/utils/kebabCase"

const ChildCategory = ({ parentName, category }) => {
  /*
   * category is an object with a single key - the category name. the value is
   * an array of all the posts with that category
   */

  const onlyKey = Object.keys(category)[0]
  const numPosts = category[onlyKey].length

  return (
    <div key={onlyKey} className="flex">
      <Link href={`/categories/${kebabCase(parentName)}/${kebabCase(onlyKey)}`}>
        <a className="text-lg capitalize">
          {onlyKey} ({numPosts})
        </a>
      </Link>
    </div>
  )
}

export default ChildCategory
