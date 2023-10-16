import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  Product,
  CreateProduct,
  UpdateProduct,
  FilterProductPagination,
} from "../../types/product";

export const getAllProductLength = createAsyncThunk<
  number,
  FilterProductPagination,
  { rejectValue: string }
>("products/getAllProductLength", async (obj, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${obj.title ? obj.title : ""}&price_min=${
        obj.min ? obj.min : ""
      }&price_max=${obj.max ? obj.max : ""}&categoryId=${obj.category ? obj.category : ""}`
    );
    return response.data.length;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      // Native error
      return rejectWithValue(error.message);
    }
    // Axios error
    return rejectWithValue(error.message);
  }
});

export const getAllProductPagination = createAsyncThunk<
  Product[],
  FilterProductPagination,
  { rejectValue: string }
>("products/getAllProductPagination", async (obj, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${obj.title ? obj.title : ""}&price_min=${
        obj.min ? obj.min : ""
      }&price_max=${obj.max ? obj.max : ""}&categoryId=${obj.category ? obj.category : ""}&offset=${
        obj.offset && obj.limit ? (obj.offset - 1) * obj.limit : ""
      }&limit=${obj.limit ? obj.limit : ""}`
    );
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
});

export const getSingleProduct = createAsyncThunk<Product, string, { rejectValue: string }>(
  "products/getSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
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

export const updateProduct = createAsyncThunk<Product, UpdateProduct, { rejectValue: string }>(
  "products/updateProduct",
  async ({ id, updateProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        updateProduct
      );
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

export const createProduct = createAsyncThunk<Product[], CreateProduct, { rejectValue: string }>(
  "products/createProduct",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/products/", obj);
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

export const deleteProduct = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
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

type ProductState = {
  products: Product[];
  error: string;
  loading: boolean;
};

const initialState: ProductState = {
  products: [],
  error: "",
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortPriceAscending(state) {
      state.products.sort((a, b) => a.price - b.price);
    },
    sortPriceDescending(state) {
      state.products.sort((a, b) => b.price - a.price);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductPagination.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProductPagination.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.error = action.payload;
      }
    });
    builder.addCase(getAllProductPagination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllProductLength.fulfilled, (state, action) => {});
    builder.addCase(getAllProductLength.rejected, (state, action) => {});
    builder.addCase(getAllProductLength.pending, (state, action) => {});
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.error = action.payload;
      }
    });
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {});
    builder.addCase(createProduct.rejected, (state, action) => {});
    builder.addCase(createProduct.pending, (state, action) => {});
    builder.addCase(deleteProduct.fulfilled, (state, action) => {});
    builder.addCase(deleteProduct.rejected, (state, action) => {});
    builder.addCase(deleteProduct.pending, (state, action) => {});
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {});
    builder.addCase(getSingleProduct.rejected, (state, action) => {});
    builder.addCase(getSingleProduct.pending, (state, action) => {});
  },
});

export const { sortPriceAscending, sortPriceDescending } = productsSlice.actions;
export default productsSlice.reducer;
