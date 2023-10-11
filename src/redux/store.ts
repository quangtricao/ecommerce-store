import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import cartsReducer from "./reducers/cartsReducer";
import userReducer from "./reducers/userReducer";
import { ProductInCart } from "../types/Products";

const preLoadedCartReducer: ProductInCart[] = JSON.parse(
  localStorage.getItem("productInCartLocalStorage") || "[]"
);

export const createStore = () => {
  return configureStore({
    reducer: {
      productsReducer,
      categoriesReducer,
      cartsReducer,
      userReducer,
    },
    preloadedState: {
      cartsReducer: preLoadedCartReducer,
    },
  });
};
const store = createStore();

const updateLocalStorage = () => {
  const updatedCart = store.getState().cartsReducer;
  localStorage.setItem("productInCartLocalStorage", JSON.stringify(updatedCart));
};

store.subscribe(updateLocalStorage);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {products: ProductsState }
export type AppDispatch = typeof store.dispatch;

export default store;
