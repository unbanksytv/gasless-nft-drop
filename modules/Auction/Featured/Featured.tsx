import Image from 'next/image'
import { equals, pathOr, prop, propOr } from 'ramda'
import React, { FC, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import useWeb3 from '../../../common/useWeb3'
import { getRemainingTime } from '../../../common/utils'
import { Loader } from '../../Loader'
import { fetchFeaturedAuction, selectFeaturedAuction, selectLoadingState } from './featured.slice'

interface FeaturedAuctionProps {
  contract: string
  listingId: string
}

export const FeaturedAuction: FC<FeaturedAuctionProps> = ({ contract, listingId }) => {
  const dispatch = useAppDispatch()
  const featuredAuction = useAppSelector(selectFeaturedAuction)
  const loadingState = useAppSelector(selectLoadingState)
  const [remainingTime, setRemainingTime] = useState<string>('')
  const { getListing } = useWeb3()

  useEffect(() => {
    equals(loadingState, 'idle') && dispatch(fetchFeaturedAuction({ getListing, contract, listingId }))
  }, [loadingState])

  useEffect(() => {
    const interval = setInterval(() => {
      const startDate = new Date(parseInt(propOr('0', 'startTimeInEpochSeconds')(featuredAuction)) * 1000)
      const endDate = new Date(parseInt(propOr('0', 'endTimeInEpochSeconds')(featuredAuction)) * 1000)
      const newRemainingTime = getRemainingTime(startDate, endDate)
      setRemainingTime(newRemainingTime)
    }, 1000)

    return () => clearInterval(interval)
  })

  const loader = <Loader />
  const component = (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center max-w-4xl grid-cols-1 mx-auto lg:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <div className="max-w-lg mx-auto text-center lg:text-left lg:max-w-none lg:mx-0">
              <h2 className="text-sm font-bold tracking-wide uppercase text-rose-500">Today's Featured Drop</h2>
              <p className="mt-4 text-5xl font-bold text-gray-900 md:text-6xl">
                {pathOr('', ['asset', 'name'])(featuredAuction)}
              </p>
              <p className="mt-6 text-lg font-medium text-gray-600">
                {pathOr('', ['asset', 'description'])(featuredAuction)}
              </p>
            </div>

            <div className="flex items-start max-w-xs mx-auto mt-12 lg:mt-28 lg:max-w-none lg:mx-0 gap-x-16">
              <div>
                <p className="text-base font-medium text-gray-500">Reserve Price</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  Ξ {pathOr('', ['reservePriceCurrencyValuePerToken', 'displayValue'])(featuredAuction)}
                </p>
              </div>

              <div>
                <p className="text-base font-medium text-gray-500">Edition</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{`${prop('tokenId')(featuredAuction)}/${prop(
                  'quantity',
                )(featuredAuction)}`}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="max-w-xs mx-auto overflow-hidden bg-white border border-gray-100 rounded-lg shadow-xl shadow-gray-500/10">
              <div className="p-4">
                <span className="block w-full px-4 py-1.5 text-sm font-medium text-center text-white rounded-md bg-rose-500">
                  {remainingTime}
                </span>

                <div className="mt-4 overflow-hidden  aspect-w-1 aspect-h-1 ">
                  <Image
                    className="rounded-lg"
                    src={pathOr('', ['asset', 'image'])(featuredAuction)}
                    width={320}
                    height={190}
                  />
                </div>

                <div className="flex items-center justify-between mt-4 space-x-6">
                  <p className="flex-1 text-base font-bold text-gray-900">
                    {pathOr('', ['asset', 'name'])(featuredAuction)}
                  </p>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-gray-500">Current Bid</p>
                    <p className="mt-0.5 text-lg font-bold text-rose-500">2.301 ETH</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 space-x-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-xs font-bold tracking-widest text-gray-900 uppercase transition-all duration-200 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                  >
                    See All Bid
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all duration-200 bg-gray-900 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  return match(loadingState)
    .with('loading', () => loader)
    .with('succeeded', () => component)
    .otherwise(() => <></>)
}
