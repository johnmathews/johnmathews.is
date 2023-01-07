import { MDXLayoutRenderer } from "@/components/MDXComponents"
import { getFileBySlug } from "@/lib/mdx"

const DEFAULT_LAYOUT = "ExperienceLayout"

export async function getStaticProps() {
  const authorDetails = await getFileBySlug("authors", ["experience"])
  return { props: { authorDetails } }
}

export default function Experience({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
