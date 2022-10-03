import Link from "next/link"
import kebabCase from "@/lib/utils/kebabCase"

const Category = ({ text }) => {
  const categoryString = text.replace("/", " > ")
  return (
    <Link href={`/category/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {categoryString}
      </a>
    </Link>
  )
}

export default Category
