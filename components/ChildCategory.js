import Link from "next/link"
import kebabCase from "@/lib/utils/kebabCase"

const ChildCategory = ({ parentName, category }) => {
  const onlyKey = Object.keys(category)[0]
  const numPosts = category[onlyKey].length

  return (
    <div key={onlyKey} className="flex">
      <Link href={`/categories/${kebabCase(parentName)}/${kebabCase(onlyKey)}`}>
        <a className="text-lg capitalize">{onlyKey}</a>
      </Link>

      <div className="ml-1 text-lg capitalize">({numPosts})</div>
    </div>
  )
}

export default ChildCategory
