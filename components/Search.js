import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks-web'

import { RefinementList } from './RefinementList'

const searchClient = algoliasearch('56G1FXZV4K', 'c9a76549bd2473401cb96c00b503698e')

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="blogArticles">
      <RefinementList attribute="title" />
    </InstantSearch>
  )
}
