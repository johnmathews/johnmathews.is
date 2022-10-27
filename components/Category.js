import Link from "next/link"
import kebabCase from "@/lib/utils/kebabCase"

const Category = ({ text }) => {
  const categoryString = text.replace("/", " > ")
  return (
    <Link href={`/category/${kebabCase(text)}`}>
      <a className="">{categoryString.split(">")[categoryString.split(">").length - 1]}</a>
    </Link>
  )
}

export default Category
