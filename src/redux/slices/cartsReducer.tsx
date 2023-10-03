import { createSlice } from "@reduxjs/toolkit";

import { ProductObject } from "../../types/Products";

const initialState: {
  productInCart: ProductObject;
  number: number;
}[] = [];

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push({ productInCart: action.payload, number: 0 });
    },
    removeFromCart(state, action) {
      return state.filter((item) => !(item.productInCart.id === action.payload));
    },
    increaseQuantity(state, action) {
      return state.map((item) => {
        if (item.productInCart.id === action.payload) {
          item.number += 1;
        }
        return item;
      });
    },
    decreaseQuantity(state, action) {
      const newState = state.map((item) => {
        if (item.productInCart.id === action.payload) {
          item.number -= 1;
        }
        return item;
      });

      return newState.filter((item) => item.number > 0);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartsSlice.actions;
export default cartsSlice.reducer;
