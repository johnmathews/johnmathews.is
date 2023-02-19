import React from "react"

export default function SearchItem({ hit, components }) {
  var catString = ""

  // category could be an array of categories (some posts have category as an array in their frontmatter),
  // but a snippet will never have multiple categories, so this if statement will never not label a snippet correctly
  if (typeof hit.category == "string") {
    if (hit.category.toLowerCase() === "snippet") {
      var catString = "snippet"
    }
  }
  var options = { year: "numeric", month: "long" }

  var _date = Date.parse(hit.date)
  var date = new Intl.DateTimeFormat("en", options).format(_date)
  console.log("--- debug date: ", date)
  return (
    <a id="searchResultCandidate" className="my-2 mx-1" href={`/blog/${hit.objectID}`}>
      <div className="flex ">
        <div className="grow align-middle text-xl">
          <components.Highlight hit={hit} attribute="title" />
        </div>
        <div className="my-auto mr-5 flex-none pt-1 text-sm font-normal uppercase italic text-gray-700">
          {catString}
        </div>
        <div className="my-auto mr-2 flex-none pt-1 text-lg font-bold text-gray-700">{date}</div>
      </div>
    </a>
  )
}
