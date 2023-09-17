import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { FC } from 'react'

const ChatFooter: FC = () => {
  return (
    <div className="flex h-[50px] items-center justify-center border-t border-gray-300 px-8 py-2 sm:justify-between">
      <div className="hidden sm:flex"></div>

      <div className="hidden text-sm italic sm:flex">
        Based on the work by
        <a
          className="mx-1 hover:opacity-50"
          href="https://twitter.com/mckaywrigley"
          target="_blank"
          rel="noreferrer"
        >
          Mckay Wrigley.
        </a>
      </div>

      <div className="flex space-x-4"></div>
    </div>
  )
}

export default ChatFooter
