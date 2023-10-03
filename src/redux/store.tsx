import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./slices/productsReducer";
import categoriesReducer from "./slices/categoriesReducer";
import cartsReducer from "./slices/cartsReducer";

const store = configureStore({
  reducer: {
    productsReducer,
    categoriesReducer,
    cartsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {products: ProductsState }
export type AppDispatch = typeof store.dispatch;

export default store;
