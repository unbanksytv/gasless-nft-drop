import { map } from 'ramda'
import React, { FC, useEffect } from 'react'
import { useAddress } from '@thirdweb-dev/react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import useWeb3 from '../../common/useWeb3'
import {
  fetchNFTDropClaimedSupply,
  fetchNFTDropMetadata,
  fetchNFTDropOwnedTokenIds,
  fetchNFTDropUnclaimedSupply,
  fetchNFTsFromNFTDrop,
  selectClaimedSupply,
  selectClaimedSupplyLoadingState,
  selectMetadata,
  selectMetadataLoadingState,
  selectNfts,
  selectNftsLoadingState,
  selectOwnedTokenIdsLoadingState,
  selectOwnedTokensAmount,
  selectTotalSupply,
  selectUnclaimedSupply,
  selectUnclaimedSupplyLoadingState,
} from './NFTDrop.slice'
import { ContractMetadata, NFTMetadataOwner } from '../../common/types'
import { Loader } from '../Loader'

interface NFTDropProps {
  contract: string
}

export const NFTDrop: FC<NFTDropProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const { getAllNFTsFromNFTDrop, getNFTDrop } = useWeb3()
  const address = useAddress()

  const nfts = useAppSelector(selectNfts) as NFTMetadataOwner[]
  const nftsLoadingState = useAppSelector(selectNftsLoadingState)

  const dropMetadata = useAppSelector(selectMetadata) as ContractMetadata
  const dropMetadataLoadingState = useAppSelector(selectMetadataLoadingState)

  const claimedSupply = useAppSelector(selectClaimedSupply) as number
  const claimedSupplyLoadingState = useAppSelector(selectClaimedSupplyLoadingState)

  const unclaimedSupply = useAppSelector(selectUnclaimedSupply) as number
  const unclaimedSupplyLoadingState = useAppSelector(selectUnclaimedSupplyLoadingState)

  const totalSupply = useAppSelector(selectTotalSupply)

  const ownedTokenAmount = useAppSelector(selectOwnedTokensAmount) as number
  const ownedTokenIdsLoadingState = useAppSelector(selectOwnedTokenIdsLoadingState)

  useEffect(() => {
    dispatch(fetchNFTsFromNFTDrop({ getAllNFTsFromNFTDrop, contract }))
    dispatch(fetchNFTDropMetadata({ getNFTDrop, contract }))
    dispatch(fetchNFTDropClaimedSupply({ getNFTDrop, contract }))
    dispatch(fetchNFTDropUnclaimedSupply({ getNFTDrop, contract }))
  }, [contract])

  useEffect(() => {
    if (contract && address) {
      dispatch(fetchNFTDropOwnedTokenIds({ getNFTDrop, contract, wallet: address }))
    }
  }, [contract, address])

  const nftsDisplay = () => map(({ metadata }) => <div>{metadata.description}</div>)(nfts)

  const dropMetadataDisplay = () => (
    <>
      <div className='flex flex-row w-full'>
        <div className="w-1/2 p-16 h-screen justify-center flex flex-col">
          <h2 className="text-5xl leading-none font-bold mb-4 tracking-tight">{dropMetadata.name}</h2>
          <p className="mb-4">{dropMetadata.description}</p>
          <div className="flex border-y border-y-gray-700 py-8 mt-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className='text-xs uppercase tracking-widest'>Total Supply:</h4>
                <span className='font-bold text-2xl tracking-tight'>
                  {totalSupply}
                </span>
              </div>
              <div>
                <h4 className='text-xs uppercase tracking-widest'>Claimed:</h4>
                <span className='font-bold text-2xl tracking-tight'>
                  {match(claimedSupplyLoadingState)
                    .with('loading', () => <Loader />)
                    .with('succeeded', () => claimedSupply)
                    .otherwise(() => (
                      <></>
                    ))}
                </span>
              </div>
              <div>
                <h4 className='text-xs uppercase tracking-widest'>Unclaimed:</h4>
                <span className='font-bold text-2xl tracking-tight'>
                  {match(unclaimedSupplyLoadingState)
                    .with('loading', () => <Loader />)
                    .with('succeeded', () => unclaimedSupply)
                    .otherwise(() => (
                      <></>
                    ))}
                </span>
              </div>
              <div>
                <h4 className='text-xs uppercase tracking-widest'>Owned:</h4>
                <span className='font-bold text-2xl tracking-tight'>
                  {match(ownedTokenIdsLoadingState)
                    .with('loading', () => <Loader />)
                    .with('succeeded', () => ownedTokenAmount)
                    .with('idle', () => 'Not connected')
                    .otherwise(() => (
                      <></>
                    ))}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-1/2 h-screen bg-center bg-cover"
          style={{ backgroundImage: `url(${dropMetadata.image})` }}
        ></div>
      </div>
    </>
  )

  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        {match(dropMetadataLoadingState)
          .with('loading', () => <Loader />)
          .with('succeeded', dropMetadataDisplay)
          .otherwise(() => (
            <></>
          ))}
      </div>
      <div>
        {match(nftsLoadingState)
          .with('loading', () => <Loader />)
          .with('succeeded', nftsDisplay)
          .otherwise(() => (
            <></>
          ))}
      </div>
    </div>
  )
}
