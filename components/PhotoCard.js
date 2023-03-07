import { AppContext } from '@/components/ContextProvider'
import { useContext } from 'react'

import Image from './Image'
import Link from './Link'

const PhotoCard = ({ title, imgSrc, href, index }) => {
  const [state, _] = useContext(AppContext)
  return (
    <div className="md p-4 md:w-1/2 " style={{ maxWidth: '544px' }}>
      <div
        className={` ${
          state.keyboardMode && state.listPosition == index
            ? 'viewable border-blue-500 dark:border-blue-500 '
            : ' border-gray-200  dark:border-gray-700'
        }
      overflow-hidden rounded-md border-4 border-opacity-60 bg-slate-200  dark:bg-slate-700
     `}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={406}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={406}
            />
          ))}
        <div className="bg-slate-200 pb-2 pl-3 dark:bg-slate-700">
          <h2 className="text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link
                href={href}
                aria-label={`Link to ${title}`}
                className={`${
                  state.keyboardMode && state.listPosition == index ? 'selected' : null
                }`}
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
