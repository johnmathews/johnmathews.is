import { autocomplete } from "@algolia/autocomplete-js"
import { getAlgoliaFacets } from "@algolia/autocomplete-preset-algolia"
import React, { createElement, Fragment, useEffect, useRef } from "react"
import { render } from "react-dom"
import { useRouter } from "next/router"

import SearchItem from "@/components/SearchItem"
import algoliasearch from "algoliasearch"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
const appId = "56G1FXZV4K"
const apiKey = "c9a76549bd2473401cb96c00b503698e"
const searchClient = algoliasearch(appId, apiKey)

import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches"

// https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/getting-started/
export default function Autocomplete(props) {
  const containerRef = useRef(null)
  const router = useRouter()

  const plugins = React.useMemo(() => {
    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
      key: "id",
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setSearchState((searchState) => ({
              // eslint-disable-line no-use-before-define
              ...searchState,
              query: item.label,
            }))
          },
        }
      },
    })

    return [recentSearchesPlugin]
  }, [])

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }
    const search = autocomplete({
      container: containerRef.current,
      openOnFocus: true,
      placeholder: "Search",
      detachedMediaQuery: "",
      defaultActiveItemId: 0,
      // debug: true,
      plugins: plugins,
      routing: true,

      // this is the search results only
      // check the tailwind.css for other overrides for the serach box
      // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-classnames
      classNames: {
        item: "text-lg font-semibold border-4 border-blue-400 bg-red-400 py-3 px-1 my-2 ", // each item in the search results
        // detachedSearchButtonIcon: "hidden"
        // list: "",
        // panel: "bg-green-500",
        // root: "bg-gray-900", // this is the box you click on, maybe
      },
      renderer: { createElement, Fragment, render },

      getSources() {
        return [
          {
            sourceId: "id",
            getItemUrl({ item }) {
              return item.url
            },
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "blogArticles",
                    query,
                    params: {
                      hitsPerPage: 9,
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

      // Default Navigator API implementation
      // keyboard nav: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation/
      navigator: {
        navigate({ itemUrl }) {
          const url = new URL(itemUrl)
          router.push(url.pathname)
        },
      },

      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div className="mx-auto w-32" ref={containerRef} />
}
