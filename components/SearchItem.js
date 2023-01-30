import React from "react"

export default function SearchItem({ hit, components }) {
  var catString = ""
  if (hit.category.toLowerCase() === "snippet") {
    var catString = "snippet"
  }
  return (
    <a id="searchResultCandidate" className="" href={`/blog/${hit.objectID}`}>
      <div className="flex ">
        <div className="grow">
          <components.Highlight hit={hit} attribute="title" />
        </div>
        <div className="my-auto mr-2 flex-none pt-1 text-xs font-normal uppercase text-gray-700">
          {catString}
        </div>
      </div>
    </a>
  )
}
