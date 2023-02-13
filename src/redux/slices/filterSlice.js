import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  activeCategoryId: 0,
  activeSortType: {
    name: "популярности",
    sortBy: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategoryId(state, action) {
      state.activeCategoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setActiveSortType(state, action) {
      state.activeSortType = action.payload;
    },
    setFilters(state, action) {
      state.activeSortType.sortBy = action.payload.sortType;
      state.activeCategoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilterData = (state) => state.filter;

export const {
  setActiveCategoryId,
  setActiveSortType,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
