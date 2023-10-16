import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../types/product";

export type CartState = {
  productInCart: Product;
  number: number;
};

const initialState: CartState[] = [];

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const foundProduct = state.findIndex((item) => item.productInCart.id === action.payload.id);
      if (foundProduct !== -1) {
        state[foundProduct].number += 1;
      } else {
        state.push({ productInCart: action.payload, number: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      return state.filter((item) => !(item.productInCart.id === action.payload));
    },
    updateCart(state, action: PayloadAction<Product>) {
      const newState = state.map((item) =>
        item.productInCart.id === action.payload.id
          ? { ...item, productInCart: action.payload }
          : item
      );
      return newState;
    },
    clearCart() {
      return [];
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      state.map((item) =>
        item.productInCart.id === action.payload ? { ...item, number: (item.number += 1) } : item
      );
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      state.map((item) => {
        if (item.productInCart.id === action.payload) {
          item.number -= 1;
        }
        return item;
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateCart,
  clearCart,
} = cartsSlice.actions;
export default cartsSlice.reducer;
