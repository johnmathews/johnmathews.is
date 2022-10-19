import React from "react"

export default function SearchItem({ hit, components }) {
  var catString = ""
  if (hit.category === "snippet") {
    var catString = "snippet"
  }
  return (
    <a className="" href={`/blog/${hit.objectID}`}>
      <div className="flex ">
        <div className="grow">
          <components.Highlight hit={hit} attribute="title" />
        </div>
        <div className="flex-none font-normal text-gray-200">{catString}</div>
      </div>
    </a>
  )
}
