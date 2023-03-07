import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="my-5">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}
