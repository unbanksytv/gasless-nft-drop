import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface DropProps {
  name: string
  symbol: string
  description?: string
  image?: string
  external_link?: string
  seller_fee_basis_points?: number
  fee_recipient?: string
  contract: string
  id: string
}

export const Drop: FC<DropProps> = ({ name, description, image, contract }) => {
  return (
    <div>
      <h2>{name}</h2>
      <Image src={image} />
      <p>{description}</p>
      <Link href={`/drop/${contract}`} />
    </div>
  )
}
