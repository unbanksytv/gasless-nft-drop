import Link from 'next/link'
import React, { FC } from 'react'

interface NFTDropSummaryProps {
  address: string
  metadata: {
    description: string
    image: string
    name: string
  }
}

export const NFTDropSummary: FC<NFTDropSummaryProps> = ({ address, metadata: { name, description, image } }) => {
  return (
    <Link href={`drop/${address}`}>
      <a className="flex flex-row relative group-odd:flex-row-reverse w-screen h-screen items-center">
        <div className="w-1/2 h-screen bg-center bg-cover" style={{ backgroundImage: `url(${image})` }}></div>
        <div className="w-1/2 p-16">
          <h2 className="text-5xl leading-none font-bold mb-4 tracking-tight">{name}</h2>
          <p className="mb-4">{description}</p>
          Visit Collection &rarr;
        </div>
      </a>
    </Link>
  )
}
