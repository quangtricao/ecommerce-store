import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductObject } from "../../types/Products";

const initialState: {
  productInCart: ProductObject;
  number: number;
}[] = [];

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductObject>) {
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

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartsSlice.actions;
export default cartsSlice.reducer;
