import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryObject } from "../../types/Products";
import { getCategory } from "../../api/products";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await getCategory();
  return response;
});

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
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      if (!(typeof action.payload === "string")) {
        return {
          ...state,
          loading: false,
          categories: action.payload,
        };
      }
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    });
    builder.addCase(fetchCategories.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export default categoriesSlice.reducer;
