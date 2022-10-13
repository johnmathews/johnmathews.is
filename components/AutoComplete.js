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
      classNames: { item: "border border-gray-200 hover:bg-gray-200 bg-gray-100 my-3", list: "" },
      renderer: { createElement, Fragment, render },
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div className="mx-auto w-24 pt-2" ref={containerRef} />
}
