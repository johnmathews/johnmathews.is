import { autocomplete } from "@algolia/autocomplete-js"
import { getAlgoliaFacets } from "@algolia/autocomplete-preset-algolia"
import React, { createElement, Fragment, useEffect, useRef } from "react"
import { render } from "react-dom"

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
      debug: true,
      plugins: plugins,
      routing: true,

      // classNames: { item: "border border-gray-200 hover:bg-gray-200 bg-gray-100 my-3", list: "" },
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
                // classNames: {},
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
          window.location.assign(itemUrl)
        },
        navigateNewTab({ itemUrl }) {
          const windowReference = window.open(itemUrl, "_blank", "noopener")

          if (windowReference) {
            windowReference.focus()
          }
        },
        navigateNewWindow({ itemUrl }) {
          window.open(itemUrl, "_blank", "noopener")
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
