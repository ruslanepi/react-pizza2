import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (currentUrl) => {
  const { data } = await axios.get(currentUrl)
  return data
})

const initialState = {
  items: [],
  status: 'loading',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading'
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
