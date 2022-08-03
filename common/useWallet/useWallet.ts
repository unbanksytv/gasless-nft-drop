import { useAddress, useDisconnect, useMetamask, useSDK } from '@thirdweb-dev/react'

export const useWallet = () => {
  const address = useAddress()
  const connect = useMetamask()
  const disconnect = useDisconnect()

  return { address, connect, disconnect }
}
