import { IconExternalLink } from '@tabler/icons-react'
import { FC } from 'react'

export const Navbar: FC = () => {
  return (
    <div className="flex h-[60px] items-center justify-between border-b border-gray-300 px-8 py-2">
      <div className="flex items-center text-2xl font-bold">
        <a className="hover:opacity-50" href="https://johnmathews.is">
          John Mathews GPT
        </a>
      </div>
      <div>
        <a
          className="flex items-center hover:opacity-50"
          href="https://johnmathews.is"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hidden sm:flex">johnmathews.is</div>

          <IconExternalLink className="ml-1" size={20} />
        </a>
      </div>
    </div>
  )
}

export default Navbar
