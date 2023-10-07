import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import cartsReducer from "./reducers/cartsReducer";
import userReducer from "./reducers/userReducer";

export const createStore = () => {
  return configureStore({
    reducer: {
      productsReducer,
      categoriesReducer,
      cartsReducer,
      userReducer,
    },
  });
};
const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {products: ProductsState }
export type AppDispatch = typeof store.dispatch;

export default store;
