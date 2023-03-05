import Image from "./Image"

import { AppContext } from "@/components/ContextProvider"
import { useContext } from "react"
import Link from "./Link"

const Card = ({ title, description, imgSrc, href, keyboardShortcut, index }) => {
  const [state, _] = useContext(AppContext)
  return (
    <div className="p-4 ">
      <div
        className={` ${
          state.keyboardMode && state.listPosition == index
            ? "viewable border-2 border-blue-500 dark:border-blue-500 "
            : " border-2 border-gray-200  dark:border-gray-700"
        } 
          min-h-full overflow-hidden rounded-md border-opacity-60 `}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          ))}
        <Link
          href={href}
          aria-label={`Link to ${title}`}
          className={`${state.keyboardMode && state.listPosition == index ? "selected" : null}`}
        >
          <div className="min-h-32 px-6 pt-3 pb-3">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold leading-8 tracking-tight">{title}</h2>
              <div
                className={`mt-1 rounded-lg border px-2 ${state.keyboardHints ? null : "hidden"}`}
              >
                {keyboardShortcut}
              </div>
            </div>
            {description && (
              <p className="prose mt-3 mb-1 max-w-none text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Card
