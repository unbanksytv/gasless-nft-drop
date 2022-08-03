import { useSDK } from '@thirdweb-dev/react'
import { ContractType } from '@thirdweb-dev/sdk'
import { filter, propEq } from 'ramda'

export const useWeb3 = () => {
  const sdk = useSDK()

  const getBalance = (contract?: string) => sdk.wallet.balance(contract)

  const getNFTFromCollection = ({ contract, tokenId }: { contract: string; tokenId: number }) =>
    sdk.getNFTCollection(contract).get(tokenId)

  const getListing = ({ contract, listingId }: { contract: string; listingId: number }) =>
    sdk.getMarketplace(contract).getListing(listingId)

  const getEditionDrop = ({ contract }: { contract: string }) => sdk.getEditionDrop(contract)

  const getNFTFromEditionDrop = ({ contract, tokenId }: { contract: string; tokenId: number }) =>
    sdk.getEditionDrop(contract).get(tokenId)

  const getNFTDrop = (contract: string) => sdk.getNFTDrop(contract)

  const getNFTFromNFTDrop = (contract: string) => (tokenId: number) => sdk.getNFTDrop(contract).get(tokenId)

  const getAllNFTsFromNFTDrop = (contract: string) => sdk.getNFTDrop(contract).getAll()

  const getAllContractsByContractType = (wallet: string) => (contractType: ContractType) =>
    sdk.getContractList(wallet).then(filter(propEq('contractType', contractType)))

  return {
    getBalance,
    getNFTFromCollection,
    getListing,
    getEditionDrop,
    getNFTFromEditionDrop,
    getNFTDrop,
    getNFTFromNFTDrop,
    getAllNFTsFromNFTDrop,
    getAllContractsByContractType,
  }
}
