import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryObject } from "../../types/Products";

export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async (): Promise<CategoryObject[] | string> => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
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
  categories: CategoryObject[];
  error?: string | null;
  loading: boolean;
} = {
  categories: [],
  loading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      if (!(typeof action.payload === "string")) {
        return {
          ...state,
          loading: false,
          categories: action.payload,
        };
      }
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    });
    builder.addCase(getCategory.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export default categoriesSlice.reducer;
