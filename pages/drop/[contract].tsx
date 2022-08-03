import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { NFTDrop } from '../../modules/NFTDrop'

const Collection: FC = () => {
  const { query } = useRouter()
  const { contract } = query

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <main className="max-w-screen-2xl w-full">
        <NFTDrop contract={contract as string} />
      </main>

      <footer className=""></footer>
    </div>
  )
}

export default Collection
