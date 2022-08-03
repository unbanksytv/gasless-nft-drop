import { BigNumber } from '@ethersproject/bignumber'
import { ContractType, NFTMetadataOwner, ContractPrimarySale } from '@thirdweb-dev/sdk'

export interface Token {
  symbol: string
  name: string
  value: BigNumber
  decimals: number
  displayValue: string
}

export interface ContractMetadata {
  name: string
  description: string
  image: string
}

export interface NFTDropWithNFTS {
  metadata: ContractMetadata
  primarySales: ContractPrimarySale<any>
  nfts: NFTMetadataOwner[]
  claimedSupply: string
  unclaimedSupply: string
  ownedTokenIds: string[]
}

export interface ContractDefinition {
  address: string
  contractType: ContractType
  metadata: () => Promise<any>
}

export type { ContractType, NFTMetadataOwner } from '@thirdweb-dev/sdk'
