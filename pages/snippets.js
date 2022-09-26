import { SnippetSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import SnippetLayout from "@/layouts/SnippetLayout"
import generateRss from "@/lib/generate-rss"
import { getAllSnippets } from "@/lib/mdx"
import { getFileBySlug } from "@/lib/mdx"
import fs from "fs"
import path from "path"

const root = process.cwd()

export async function getStaticProps() {
  const snippetFrontmatter = await getAllSnippets("blog").then((token) => {
    return token
  })

  const snippetCode = snippetFrontmatter.map((snip) => getFileBySlug("blog", snip.slug))
  const snippetContent = await Promise.all(snippetCode) //.then((snippetCode) => { return snippetCode })

  if (snippetFrontmatter.length > 0) {
    const rss = generateRss(snippetFrontmatter, `snippets/feed.xml`)
    const rssPath = path.join(root, "public", "snippets")
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, "feed.xml"), rss)
  }

  return { props: { snippetContent, snippetFrontmatter } }
}

export default function Snippets(props) {
  const title = "Snippets Page Title"
  return (
    <>
      <SnippetSEO
        title={`Snippets - ${siteMetadata.author}`}
        description={`Snippets - ${siteMetadata.author}`}
      />
      <SnippetLayout
        content={props.snippetContent}
        frontmatter={props.snippetFrontmatter}
        title={title}
      />
    </>
  )
}
