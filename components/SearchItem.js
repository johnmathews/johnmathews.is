import React, { createElement } from "react"

export default function SearchItem({ hit, components }) {
  return (
    <a href={`/blog/${hit.objectID}`}>
      <div className="flex">
        <div className="flex-1">
          <components.Highlight hit={hit} attribute="title" />
        </div>
        <div className="flex-1">{hit.category}</div>
      </div>
    </a>
  )
}
