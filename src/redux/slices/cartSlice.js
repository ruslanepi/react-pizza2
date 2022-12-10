import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      //refresh total price
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)

      //refresh total amount
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
    removeItem(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload)
      console.log(existingItem.count)
      if (existingItem.count > 1) {
        existingItem.count--
      } else {
        state.items = state.items.filter((item) => item.id !== existingItem.id)
      }

      //refresh total price
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
      //refresh total amount
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
    clearItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)

      //refresh total price
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
      //refresh total amount
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
    clearCart(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    },
  },
})

export const { addItem, removeItem, clearItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
