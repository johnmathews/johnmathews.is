import Image from "./Image"
import Link from "./Link"

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
    <div
      className={`${
        imgSrc && "h-full"
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
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
      <Link href={href} aria-label={`Link to ${title}`}>
        <div className="px-6 pt-3">
          <h2 className="text-2xl font-bold leading-8 tracking-tight">{title}</h2>
          <p className="prose mt-3 mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </Link>
    </div>
  </div>
)

export default Card
