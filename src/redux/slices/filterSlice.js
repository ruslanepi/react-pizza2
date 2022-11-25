import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategoryId: 0,
  activeSortType: {
    name: 'популярности',
    sortBy: 'rating',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategoryId(state, action) {
      state.activeCategoryId = action.payload
    },
    setActiveSortType(state, action) {
      state.activeSortType = action.payload
    },
    setFilters(state, action) {
      state.activeSortType.sortBy = action.payload.sortType
      state.activeCategoryId = Number(action.payload.categoryId)
    },
  },
})

export const { setActiveCategoryId, setActiveSortType, setFilters } = filterSlice.actions
export default filterSlice.reducer
