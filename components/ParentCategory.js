import ChildCategory from "@/components/ChildCategory"

const ParentCategory = ({ catName, structuredCategories }) => {
  var niceCategory = ""
  // this is because the `capitalize` className doesnt work with hyphens
  if (catName == "non-technical") {
    niceCategory = "Non-Technical"
  } else {
    niceCategory = catName
  }

  return (
    <div key={catName}>
      <div className="my-3 text-2xl font-bold capitalize text-gray-900 dark:text-gray-100 ">
        {niceCategory}
      </div>

      <div>
        {structuredCategories.map((category) => {
          return (
            <ChildCategory
              key={Object.keys(category)[0]}
              parentName={catName}
              category={category}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ParentCategory
