import NextImage from 'next/image'
import React from 'react'

type ImageProps = React.ComponentProps<typeof NextImage>

function Image({ ...rest }: ImageProps) {
  return <NextImage {...rest} />
}

export default Image
