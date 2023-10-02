import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProduct } from "../../api/products";
import { ProductObject, FilterObject } from "../../types/Products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (obj?: FilterObject) => {
    const response = await getProduct(obj?.title, obj?.price, obj?.min, obj?.max, obj?.id);
    return response;
  }
);

const initialState: {
  products: ProductObject[];
  error?: string | null;
  loading: boolean;
} = {
  products: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (!(typeof action.payload === "string")) {
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
      }
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export default productsSlice.reducer;
