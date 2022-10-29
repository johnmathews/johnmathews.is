import Link from "next/link"
import kebabCase from "@/lib/utils/kebabCase"

const ChildCategory = ({ text }) => {
  const categoryString = text.replace("/", " > ")
  return (
    <Link href={`/category/${kebabCase(text)}`}>
      <a className="">{categoryString}</a>
    </Link>
  )
}

export default ChildCategory
