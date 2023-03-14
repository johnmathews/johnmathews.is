export interface CollectionItem {
  title: string
  description?: string
  imgSrc: string
  href: string
  keyboardShortcut?: string
}

export interface PageData {
  [key: string]: CollectionItem[]
}
