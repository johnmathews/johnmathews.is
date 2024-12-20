import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const ChildCategory = ({ parentName, category }) => {
  /*
   * category is an object with a single key - the category name. the value is
   * an array of all the posts with that category
   */

  const onlyKey = Object.keys(category)[0]
  const numPosts = category[onlyKey].length
  const cleanString = onlyKey.replace('-', ' ')

  return (
    <div key={onlyKey} className="flex">
      <Link
        href={`/categories/${kebabCase(parentName)}/${kebabCase(onlyKey)}`}
        className="text-lg capitalize"
      >
        {cleanString}({numPosts})
      </Link>
    </div>
  )
}

export default ChildCategory
