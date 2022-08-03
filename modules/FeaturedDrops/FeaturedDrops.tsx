import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { match } from 'ts-pattern'
import { map } from 'ramda'

import { useAppDispatch } from '../../common/redux/store'
import { ContractType } from '../../common/types'
import useWeb3 from '../../common/useWeb3'
import { Loader, Size } from '../Loader'
import { fetchFeaturedDrops, selectFeaturedDrops, selectLoadingState } from './featuredDrops.slice'
import { NFTDropSummary } from '../NFTDrop'

interface FeaturedDropsProps {
  wallet: string
  contractType: ContractType
}

export const FeaturedDrops: FC<FeaturedDropsProps> = ({ wallet, contractType }) => {
  const dispatch = useAppDispatch()
  const NFTDrops = useSelector(selectFeaturedDrops)
  const loadingState = useSelector(selectLoadingState)
  const { getAllContractsByContractType } = useWeb3()

  useEffect(() => {
    dispatch(fetchFeaturedDrops({ getAllContractsByContractType, wallet, contractType }))
  }, [])

  const loader = <Loader size={Size.s} />
  const component = (
    <ul className="w-full">
      {map(({ address, metadata }) => (
        <li key={address} className="h-screen flex w-full items-center justify-center group">
          <NFTDropSummary address={address} metadata={metadata} />
        </li>
      ))(NFTDrops)}
    </ul>
  )

  return match(loadingState)
    .with('loading', () => loader)
    .with('succeeded', () => component)
    .otherwise(() => <></>)
}
