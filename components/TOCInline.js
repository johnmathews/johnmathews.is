/**
 * @typedef TocHeading
 * @prop {string} value
 * @prop {number} depth
 * @prop {string} url
 */

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {{
 *  toc: TocHeading[],
 *  indentDepth?: number,
 *  fromHeading?: number,
 *  toHeading?: number,
 *  asDisclosure?: boolean,
 *  exclude?: string|string[]
 * }} props
 *
 */
const TOCInline = ({ toc, asDisclosure = true }) => {
  const filteredToc = toc

  const tocList = (
    <ul className="pl-0">
      {filteredToc.map((heading) => (
        <li
          key={heading.value}
          className={`toc-ml-${Math.max(heading.depth - 1, 1) * 4 - 4} my-1 list-none`}
        >
          <a href={heading.url}>
            {">"} {heading.value}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {asDisclosure ? (
        <details className="mb-10" open>
          <summary className="pt-2 pb-2 text-2xl font-bold">Contents:</summary>
          <div className="">{tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  )
}

export default TOCInline
