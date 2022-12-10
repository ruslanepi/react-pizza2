import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
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

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    },
    removeItem(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload)
      if (existingItem.count > 0) {
        existingItem.count = existingItem.count - 1
      } else {
        state.existingItem = []
      }
    },
    clearItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    },
    clearCart(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, clearItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
