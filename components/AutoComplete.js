import { autocomplete } from "@algolia/autocomplete-js"
import React, { createElement, Fragment, useEffect, useRef } from "react"
import { render } from "react-dom"

export default function Autocomplete(props) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: containerRef.current,
      detachedMediaQuery: "",
      classNames: { item: "bg-red-400", list: "bg-gray-700" },
      renderer: { createElement, Fragment, render },
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div ref={containerRef} />
}
