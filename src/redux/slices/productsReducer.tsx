import { createSlice } from "@reduxjs/toolkit";

import { getAll } from "../../services/products";
import { ProductType } from "../../types/Products";

const initialState: {
  products: ProductType[];
  error?: string | null;
  loading: boolean;
} = {
  products: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    initialize(state, action) {
      return { ...state, products: action.payload };
    },
  },
});

export const initializeProducts = () => {
  return async (dispatch: (arg0: { payload: any; type: "blog/initialize" }) => void) => {
    try {
      const response = await getAll();
      dispatch(initialize(response));
    } catch (error) {
      console.log(error);
    }
  };
};

// console.log(productsSlice);

export const { initialize } = productsSlice.actions;
export default productsSlice.reducer;
