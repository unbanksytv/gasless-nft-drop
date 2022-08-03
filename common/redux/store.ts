import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { balanceReducer } from '../../modules/Balance'
import { featuredAuctionReducer } from '../../modules/Auction/Featured'
import { featuredDropsReducer } from '../../modules/FeaturedDrops'
import { nftDropReducer } from '../../modules/NFTDrop'

const store = configureStore({
  reducer: combineReducers({
    balance: balanceReducer,
    featuredAuction: featuredAuctionReducer,
    featuredDrops: featuredDropsReducer,
    nftDrop: nftDropReducer,
  }),
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store }
