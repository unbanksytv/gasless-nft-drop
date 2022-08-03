import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ContractDefinition, ContractType } from '../../common/types'
import { RootState } from '../../common/redux/store'
import { filter, map, pick, pipe, pluck, propEq } from 'ramda'

export const fetchFeaturedDrops = createAsyncThunk<
  PromiseLike<PromiseSettledResult<{ status: string; value: any }> | PromiseRejectedResult>,
  {
    getAllContractsByContractType: (wallet: string) => (contractType: ContractType) => Promise<ContractDefinition[]>
    wallet: string
    contractType: ContractType
  },
  { rejectValue: string }
>('featuredDrops/fetch', ({ getAllContractsByContractType, wallet, contractType }, { rejectWithValue }) =>
  getAllContractsByContractType(wallet)(contractType)
    .then((response: ContractDefinition[]) =>
      Promise.allSettled(
        map((contract: ContractDefinition) =>
          contract?.metadata().then(metadata => ({
            metadata: pick(['name', 'description', 'image'])(metadata),
            address: contract?.address,
          })),
        )(response),
      ),
    )
    // @ts-ignore
    .then(pipe(filter(propEq('status', 'fulfilled')), pluck('value')))
    .catch((error: Error) => rejectWithValue(error.message)),
)

interface FeaturedDropsState {
  entities: any[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
} as FeaturedDropsState

// Then, handle actions in your reducers:
export const featuredDropsSlice = createSlice({
  name: 'featuredDrops',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFeaturedDrops.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchFeaturedDrops.fulfilled, (state, action) => {
        const { payload } = action
        state.status = 'succeeded'
        // @ts-ignore
        state.entities = payload
      })
      .addCase(fetchFeaturedDrops.rejected, (state, action) => {
        const { payload } = action
        state.status = 'failed'
        if (payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { reducer } = featuredDropsSlice

// Other code such as selectors can use the imported `RootState` type
export const selectFeaturedDrops = (state: RootState) => state.featuredDrops.entities
export const selectLoadingState = (state: RootState) => state.featuredDrops.status
