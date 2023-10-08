import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductObject, FilterObject } from "../../types/Products";

/*
https://api.escuelajs.co/api/v1/products?offset=0&limit=10

/products?offset=0&limit=10     Return the first 10 products.
/products?offset=10&limit=10	  Return products from 10 to 20
/products?offset=20&limit=10	  Return products from 20 to 30

/products?offset=0&limit=20	    Return the first 20 products.
/products?offset=20&limit=20	  Return products from 20 to 40
/products?offset=40&limit=20	  Return products from 40 to 60


https://api.escuelajs.co/api/v1/products?title=G&offset=10&limit=10
*/

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
  reducers: {
    replace(state, action) {
      return {
        ...state,
        products: action.payload,
      };
    },
  },
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

export const { replace } = productsSlice.actions;
export default productsSlice.reducer;
