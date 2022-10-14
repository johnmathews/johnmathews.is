import { autocomplete } from "@algolia/autocomplete-js"
import React, { createElement, Fragment, useEffect, useRef } from "react"
import { render } from "react-dom"

import SearchItem from "@/components/SearchItem"
import algoliasearch from "algoliasearch"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
const appId = "56G1FXZV4K"
const apiKey = "c9a76549bd2473401cb96c00b503698e"
const searchClient = algoliasearch(appId, apiKey)

export default function Autocomplete(props) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: containerRef.current,
      openOnFocus: true,
      placeholder: "Search",
      getSources({ query }) {
        return [
          {
            sourceId: "id",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                classNames: {},
                queries: [
                  {
                    indexName: "blogArticles",
                    query,
                    params: {
                      hitsPerPage: 5,
                      attributesToSnippet: ["name:10", "description:35"],
                      snippetEllipsisText: "…",
                    },
                  },
                ],
              })
            },
            templates: {
              item({ item, components }) {
                return <SearchItem hit={item} components={components} />
              },
            },
          },
        ]
      },

      // initialState: {query: new URL(window.location).searchParams.get('search')},

      // keyboard nav: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation/
      detachedMediaQuery: "",
      classNames: { item: "border border-gray-200 hover:bg-gray-200 bg-gray-100 my-3", list: "" },
      renderer: { createElement, Fragment, render },
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div className="mx-auto w-32" ref={containerRef} />
}
