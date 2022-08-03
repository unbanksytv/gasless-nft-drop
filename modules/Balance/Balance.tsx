import { equals, lt } from 'ramda'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { match } from 'ts-pattern'

import { useAppDispatch } from '../../common/redux/store'
import useWeb3 from '../../common/useWeb3'
import { formatAmount } from '../../common/utils/utils'
import { Loader, Size } from '../Loader'
import { fetchBalance, selectBalance, selectLoadingState } from './balance.slice'

interface BalanceProps {
  contract?: string | null
}

export const Balance: FC<BalanceProps> = ({ contract = null }) => {
  const dispatch = useAppDispatch()
  const balance = useSelector(selectBalance)
  const loadingState = useSelector(selectLoadingState)
  const { getBalance } = useWeb3()
  const [counter, setCounter] = useState<number>(0)

  // very ugly workaround to rerender until the wallet info is correctly registered in the context
  useEffect(() => {
    lt(counter, 5) &&
      setTimeout(() => {
        setCounter(counter + 1)
      }, 0)
    equals(counter, 5) && equals(loadingState, 'idle') && dispatch(fetchBalance({ getBalance, contract }))
  }, [counter])

  const loader = <Loader size={Size.s} />
  const component = <span>&nbsp;&#926; {formatAmount(parseFloat(balance))}</span>

  return match(loadingState)
    .with('loading', () => loader)
    .with('succeeded', () => component)
    .otherwise(() => <></>)
}
