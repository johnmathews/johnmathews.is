import Link from "next/link"

const Category = ({ text }) => {
  const categoryString = text.replace(".", "/").toLowerCase()
  const childCat = text.split(".").pop()
  return (
    <Link href={`/categories/${categoryString}`}>
      <a className="">{childCat}</a>
    </Link>
  )
}

export default Category
