import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./slices/productsReducer";
import categoriesReducer from "./slices/categoriesReducer";

const store = configureStore({
  reducer: {
    productsReducer,
    categoriesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {products: ProductsState }
export type AppDispatch = typeof store.dispatch;

export default store;
