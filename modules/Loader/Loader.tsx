import Image from 'next/image'
import React, { FC } from 'react'

export enum Size {
  s,
  m,
  l,
}

interface LoaderProps {
  size?: Size
}

export const Loader: FC<LoaderProps> = ({ size = Size.m }) => {
  const SIZE_MAP = {
    [Size.s]: 15,
    [Size.m]: 30,
    [Size.l]: 45,
  }
  return <Image src="/assets/images/loader.svg" height={SIZE_MAP[size]} width={SIZE_MAP[size]} />
}
