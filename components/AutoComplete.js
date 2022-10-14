import { autocomplete } from "@algolia/autocomplete-js"
import React, { createElement, Fragment, useEffect, useRef } from "react"
import { render } from "react-dom"

import SearchItem from "@/components/SearchItem"
import algoliasearch from "algoliasearch"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
const appId = "56G1FXZV4K"
const apiKey = "c9a76549bd2473401cb96c00b503698e"
const searchClient = algoliasearch(appId, apiKey)

// import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches"

// https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/getting-started/
export default function Autocomplete(props) {
  const containerRef = useRef(null)

  // const plugins = React.useMemo(() => {
  //   const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  //     key: "id",
  //     limit: 3,
  //     transformSource({ source }) {
  //       return {
  //         ...source,
  //         onSelect({ item }) {
  //           setSearchState((searchState) => ({
  //             ...searchState,
  //             query: item.label,
  //           }))
  //         },
  //       }
  //     },
  //   })

  //   return [recentSearchesPlugin]
  // }, [])

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }
    // https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/
    const search = autocomplete({
      container: containerRef.current,
      openOnFocus: true,
      placeholder: "Search",
      detachedMediaQuery: "",
      // plugins: plugins,
      routing: true,
      // initialState: {},
      // initialUiState: {
      //   indexName: {
      //     query: "",
      //     page: 5,
      //   },
      // },

      searchFunction: function (helper) {
        if (helper.state.query.length === 0) {
          console.log("smoooookejhk ")
          return // do not trigger search
        }
        console.log("smoooookejhk ")
        helper.search() // trigger search
      },
      // keyboard nav: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation/
      // classNames: { item: "border border-gray-200 hover:bg-gray-200 bg-gray-100 my-3", list: "" },
      renderer: { createElement, Fragment, render },
      getSources() {
        return [
          {
            sourceId: "id",
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                classNames: {},
                queries: [
                  {
                    indexName: "blogArticles",
                    query,
                    params: {
                      hitsPerPage: 9,
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
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div className="mx-auto w-32" ref={containerRef} />
}
