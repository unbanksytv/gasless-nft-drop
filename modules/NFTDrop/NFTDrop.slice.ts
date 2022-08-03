import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'
import { add, lensPath, map, path, pathOr, set } from 'ramda'
import { RootState } from '../../common/redux/store'

import { NFTDropWithNFTS, NFTMetadataOwner } from '../../common/types'

// First, create the thunk
export const fetchNFTsFromNFTDrop = createAsyncThunk<
  NFTMetadataOwner[],
  { getAllNFTsFromNFTDrop: (contract: string) => any; contract: string },
  { rejectValue: string }
>('nftDrop/nfts/fetch', ({ getAllNFTsFromNFTDrop, contract }, { rejectWithValue }) =>
  getAllNFTsFromNFTDrop(contract)
    .then(map((x: NFTMetadataOwner) => set(lensPath(['metadata', 'id'] as never), x.metadata.id.toString())(x)))
    .catch((error: Error) => rejectWithValue(error.message)),
)

export const fetchNFTDropMetadata = createAsyncThunk<
  any,
  { getNFTDrop: (contract: string) => any; contract: string },
  { rejectValue: string }
>('nftDrop/metadata/fetch', ({ getNFTDrop, contract }, { rejectWithValue }) =>
  getNFTDrop(contract)
    .metadata.get()
    .then((x: any) => x)
    .catch((error: Error) => rejectWithValue(error.message)),
)

export const fetchNFTDropClaimedSupply = createAsyncThunk<
  string,
  { getNFTDrop: (contract: string) => any; contract: string },
  { rejectValue: string }
>('nftDrop/claimedSupply/fetch', ({ getNFTDrop, contract }, { rejectWithValue }) =>
  getNFTDrop(contract)
    .totalClaimedSupply()
    .then((x: BigNumber) => x.toString())
    .catch((error: Error) => rejectWithValue(error.message)),
)

export const fetchNFTDropUnclaimedSupply = createAsyncThunk<
  string,
  { getNFTDrop: (contract: string) => any; contract: string },
  { rejectValue: string }
>('nftDrop/unclaimedSupply/fetch', ({ getNFTDrop, contract }, { rejectWithValue }) =>
  getNFTDrop(contract)
    .totalUnclaimedSupply()
    .then((x: BigNumber) => x.toString())
    .catch((error: Error) => rejectWithValue(error.message)),
)

export const fetchNFTDropOwnedTokenIds = createAsyncThunk<
  string,
  { getNFTDrop: (contract: string) => any; contract: string; wallet: string },
  { rejectValue: string }
>('nftDrop/ownedTokenIds/fetch', ({ getNFTDrop, contract, wallet }, { rejectWithValue }) =>
  getNFTDrop(contract)
    .getOwnedTokenIds(wallet)
    .then(map((x: BigNumber) => x.toString()))
    .catch((error: Error) => rejectWithValue(error.message)),
)

interface NFTDropState {
  entities: NFTDropWithNFTS
  status: {
    nfts: 'idle' | 'loading' | 'succeeded' | 'failed'
    metadata: 'idle' | 'loading' | 'succeeded' | 'failed'
    claimedSupply: 'idle' | 'loading' | 'succeeded' | 'failed'
    unclaimedSupply: 'idle' | 'loading' | 'succeeded' | 'failed'
    ownedTokenIds: 'idle' | 'loading' | 'succeeded' | 'failed'
  }
  error: {
    nfts: string | null | undefined
    metadata: string | null | undefined
    claimedSupply: string | null | undefined
    unclaimedSupply: string | null | undefined
    ownedTokenIds: string | null | undefined
  }
}

const initialState = {
  entities: {},
  status: {
    nfts: 'idle',
    metadata: 'idle',
    claimedSupply: 'idle',
    unclaimedSupply: 'idle',
    ownedTokenIds: 'idle',
  },
  error: {
    nfts: null,
    metadata: null,
    claimedSupply: null,
    unclaimedSupply: null,
    ownedTokenIds: null,
  },
} as NFTDropState

// Then, handle actions in your reducers:
export const nftDropSlice = createSlice({
  name: 'nftDrop',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNFTsFromNFTDrop.pending, (state, action) => {
        state.status.nfts = 'loading'
      })
      .addCase(fetchNFTsFromNFTDrop.fulfilled, (state, action) => {
        const { payload } = action
        state.status.nfts = 'succeeded'
        // @ts-ignore
        state.entities.nfts = payload
        state.error.nfts = null
      })
      .addCase(fetchNFTsFromNFTDrop.rejected, (state, action) => {
        const { payload } = action
        state.status.nfts = 'failed'
        if (payload) {
          state.error.nfts = action.payload
        } else {
          state.error.nfts = action.error.message
        }
      })
      .addCase(fetchNFTDropMetadata.pending, (state, action) => {
        state.status.metadata = 'loading'
      })
      .addCase(fetchNFTDropMetadata.fulfilled, (state, action) => {
        const { payload } = action
        state.status.metadata = 'succeeded'
        // @ts-ignore
        state.entities.metadata = payload
        state.error.metadata = null
      })
      .addCase(fetchNFTDropMetadata.rejected, (state, action) => {
        const { payload } = action
        state.status.metadata = 'failed'
        if (payload) {
          state.error.metadata = action.payload
        } else {
          state.error.metadata = action.error.message
        }
      })
      .addCase(fetchNFTDropClaimedSupply.pending, (state, action) => {
        state.status.claimedSupply = 'loading'
      })
      .addCase(fetchNFTDropClaimedSupply.fulfilled, (state, action) => {
        const { payload } = action
        state.status.claimedSupply = 'succeeded'
        // @ts-ignore
        state.entities.claimedSupply = payload
        state.error.claimedSupply = null
      })
      .addCase(fetchNFTDropClaimedSupply.rejected, (state, action) => {
        const { payload } = action
        state.status.claimedSupply = 'failed'
        if (payload) {
          state.error.claimedSupply = action.payload
        } else {
          state.error.claimedSupply = action.error.message
        }
      })
      .addCase(fetchNFTDropUnclaimedSupply.pending, (state, action) => {
        state.status.unclaimedSupply = 'loading'
      })
      .addCase(fetchNFTDropUnclaimedSupply.fulfilled, (state, action) => {
        const { payload } = action
        state.status.unclaimedSupply = 'succeeded'
        // @ts-ignore
        state.entities.unclaimedSupply = payload
        state.error.unclaimedSupply = null
      })
      .addCase(fetchNFTDropUnclaimedSupply.rejected, (state, action) => {
        const { payload } = action
        state.status.unclaimedSupply = 'failed'
        if (payload) {
          state.error.unclaimedSupply = action.payload
        } else {
          state.error.unclaimedSupply = action.error.message
        }
      })
      .addCase(fetchNFTDropOwnedTokenIds.pending, (state, action) => {
        state.status.ownedTokenIds = 'loading'
      })
      .addCase(fetchNFTDropOwnedTokenIds.fulfilled, (state, action) => {
        const { payload } = action
        state.status.ownedTokenIds = 'succeeded'
        // @ts-ignore
        state.entities.ownedTokenIds = payload
        state.error.ownedTokenIds = null
      })
      .addCase(fetchNFTDropOwnedTokenIds.rejected, (state, action) => {
        const { payload } = action
        state.status.ownedTokenIds = 'failed'
        if (payload) {
          state.error.ownedTokenIds = action.payload
        } else {
          state.error.ownedTokenIds = action.error.message
        }
      })
  },
})

export const { reducer } = nftDropSlice

// Other code such as selectors can use the imported `RootState` type
export const selectNfts = path(['nftDrop', 'entities', 'nfts'])
export const selectNftsLoadingState = path(['nftDrop', 'status', 'nfts'])

export const selectMetadata = path(['nftDrop', 'entities', 'metadata'])
export const selectMetadataLoadingState = path(['nftDrop', 'status', 'metadata'])

export const selectClaimedSupply = path(['nftDrop', 'entities', 'claimedSupply'])
export const selectClaimedSupplyLoadingState = path(['nftDrop', 'status', 'claimedSupply'])

export const selectUnclaimedSupply = path(['nftDrop', 'entities', 'unclaimedSupply'])
export const selectUnclaimedSupplyLoadingState = path(['nftDrop', 'status', 'unclaimedSupply'])

export const selectTotalSupply = (state: RootState) =>
  add(
    pathOr(0, ['nftDrop', 'entities', 'claimedSupply'])(state),
    pathOr(0, ['nftDrop', 'entities', 'unclaimedSupply'])(state),
  )

export const selectOwnedTokenIds = path(['nftDrop', 'entities', 'ownedTokenIds'])
export const selectOwnedTokenIdsLoadingState = path(['nftDrop', 'status', 'ownedTokenIds'])
export const selectOwnedTokensAmount = pathOr(0, ['nftDrop', 'entities', 'ownedTokenIds', 'length'])
