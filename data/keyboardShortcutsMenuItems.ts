interface Item {
  item: string
  description: string
}

interface KeyboardShortcuts {
  [key: string]: Item[]
}

const menuItems: KeyboardShortcuts = {
  Actions: [
    { item: '?, esc', description: 'Toggle keyboard shortcuts' },
    { item: 'cmd+k', description: 'Search' },
    { item: 'tt', description: 'Toggle dark mode' },
    { item: 'tab', description: 'Toggle keyboard hints' },
    { item: 'va', description: 'Show all blog posts' },
    { item: 'vt', description: 'Show technical blog posts only' },
    { item: 'vn', description: 'Show non-technical blog posts only' },
    { item: 'gg', description: 'Go to top of page' },
    { item: 'G', description: 'Go to bottom of page' },
    { item: 'bb', description: 'browser back' },
    { item: 'bf', description: 'browser forward' },
    { item: 'j', description: 'move screen down' },
    { item: 'k', description: 'move screen up' },
    { item: 'ctrl+j', description: 'select previous blog post' },
    { item: 'ctrl+k', description: 'select next blog post' },
    { item: 'np', description: 'go to next blog post' },
    { item: 'pp', description: 'go to previous blog post' },
  ],
  Pages: [
    { item: 'ca', description: 'Categories' },
    { item: 'cb', description: 'Bible notes' },
    { item: 'ce', description: 'Engineering' },
    { item: 'cf', description: 'Finance' },
    { item: 'ck', description: 'Books' },
    { item: 'cl', description: 'Longform' },
    { item: 'cm', description: 'Micro-SaaS' },
    { item: 'cn', description: 'Math' },
    { item: 'cp', description: 'Sport' },
    { item: 'cs', description: 'Monthly summaries' },
    { item: 'ct', description: 'Meta' },
    { item: 'ga', description: 'About' },
    { item: 'go', description: 'Collections' },
    { item: 'gc', description: 'Chat' },
    { item: 'ge', description: 'Experience' },
    { item: 'gi', description: 'Blog index' },
    { item: 'gp', description: 'Projects' },
    { item: 'gl', description: 'Landing' },
    { item: 'gm', description: 'Metrics' },
    { item: 'gf', description: 'Photographs' },
    { item: 'gs', description: 'Snippets' },
  ],
}

export default menuItems
