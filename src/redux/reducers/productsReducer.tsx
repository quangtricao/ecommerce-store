import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductObject, FilterObject } from "../../types/Products";

export const getAllProduct = createAsyncThunk(
  "products/getAllProducts",
  async (obj: FilterObject | undefined): Promise<ProductObject[] | string> => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?title=${obj?.title ? obj?.title : ""}&price=${
          obj?.price ? obj?.price : ""
        }&price_min=${obj?.min ? obj?.min : ""}&price_max=${obj?.max ? obj?.max : ""}&categoryId=${
          obj?.id ? obj?.id : ""
        }`
      );
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        // Native error
        return error.message;
      }
      // Axios error
      return error.message;
    }
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
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      if (!(typeof action.payload === "string")) {
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
      }
    });
    builder.addCase(getAllProduct.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    });
    builder.addCase(getAllProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export default productsSlice.reducer;
