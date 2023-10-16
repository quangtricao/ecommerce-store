import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductCategory } from "../../types/product";

export const getCategory = createAsyncThunk<ProductCategory[], void, { rejectValue: string }>(
  "categories/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        // Native error
        return rejectWithValue(error.message);
      }
      // Axios error
      return rejectWithValue(error.message);
    }
  }
);

type CategoryState = {
  categories: ProductCategory[];
  error: string;
  loading: boolean;
};

const initialState: CategoryState = {
  categories: [],
  error: "",
  loading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.error = action.payload;
      }
    });
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
  },
});

export default categoriesSlice.reducer;
