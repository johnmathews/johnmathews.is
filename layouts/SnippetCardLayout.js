import Link from "@/components/Link"
import SectionContainer from "@/components/SectionContainer"
import Image from "@/components/Image"
import siteMetadata from "@/data/siteMetadata"

export default function PostLayout({ children }) {
  return (
    <SectionContainer>
      <article className="snippetCard">
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div id="content" className="prose max-w-none pt-10 pb-8 dark:prose-dark">
              {children}
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
