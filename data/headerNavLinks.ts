interface HeaderNavItem {
  href: string
  title: string
}

const headerNavLinks: HeaderNavItem[] = [
  { href: '/posts', title: 'Blog' },
  { href: '/collections', title: 'Collections' },
  { href: '/photographs', title: 'Photographs' },
  { href: '/snippets', title: 'Snippets' },
  { href: '/metrics', title: 'Metrics' },
  { href: '/about', title: 'About' },
]

export default headerNavLinks
