import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = state.items.find(
        (item) => item.uniqueItemId === action.payload.uniqueItemId
      );
      if (newItem) {
        newItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      //refresh total price
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);

      //refresh total amount
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum;
      }, 0);
    },
    removeItem(state, action) {
      const oldItem = state.items.find(
        (item) => item.uniqueItemId === action.payload
      );
      console.log(oldItem.count);
      if (oldItem.count > 1) {
        oldItem.count--;
      } else {
        state.items = state.items.filter(
          (item) => item.uniqueItemId !== oldItem.uniqueItemId
        );
      }

      //refresh total price
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
      //refresh total amount
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum;
      }, 0);
    },
    clearItem(state, action) {
      state.items = state.items.filter(
        (item) => item.uniqueItemId !== action.payload
      );

      //refresh total price
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
      //refresh total amount
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const selectCartItemById = (id) => (state) =>
  state.cart.items.filter((item) => item.id === id);

export const { addItem, removeItem, clearItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
