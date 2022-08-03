import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'

import { FeaturedAuction } from '../modules/Auction/Featured'
import { FeaturedDrops } from '../modules/FeaturedDrops'

const Home: FC = () => {
  const featuredMarketplaceContract = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
  const featuredListingId = process.env.NEXT_PUBLIC_FEATURED_LISTING_ID
  const walletAddress = process.env.NEXT_PUBLIC_WALLET_ADDRESS

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <header className="h-screen flex justify-center items-center flex-col">
        <div className="flex flex-row">
          <div className="border-r pr-16">
            <h1 className="text-[6rem] font-bold tracking-tighter leading-none">Live the life</h1>
            <div className="flex justify-end translate-x-4 -mt-6">
              <h2 className="text-2xl bg-black text-white inline-block leading-none p-2">The Future of Photography</h2>
            </div>
          </div>
          <div className="pl-16 flex justify-center items-center">
            <Image src="/assets/logos/ltl-logo-white-small.png" width="80px" height="80px" />
          </div>
        </div>
      </header>
      <main className="max-w-screen-2xl w-full">
        <FeaturedAuction contract={featuredMarketplaceContract} listingId={featuredListingId} />
        <FeaturedDrops wallet={walletAddress} contractType="nft-drop" />
      </main>

      <footer className=""></footer>
    </div>
  )
}

export default Home
