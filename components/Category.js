import Link from 'next/link'

const Category = ({ text }) => {
  const categoryString = text.replace('.', '/').toLowerCase()
  const childCat = text.split('.').pop()
  return (
    <Link href={`/categories/${categoryString}`} className="capitalize leading-tight">
      {childCat.toLowerCase()}
    </Link>
  )
}

export default Category
