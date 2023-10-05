import { createStore } from "../../../redux/store";

import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../../redux/slices/cartsReducer";

import { mockProducts } from "../../mockProducts";
import { ProductObject } from "../../../types/Products";

let storeForTest = createStore();
const productsDataForTest: ProductObject[] = mockProducts;

beforeEach(() => {
  storeForTest = createStore();
});

describe("cartReducer actions", () => {
  test("Add a new product", () => {
    storeForTest.dispatch(addToCart(productsDataForTest[2]));
    storeForTest.dispatch(addToCart(productsDataForTest[0]));

    expect(storeForTest.getState().cartsReducer[0].productInCart).toMatchObject({
      ...productsDataForTest[2],
    });
    expect(storeForTest.getState().cartsReducer[1].productInCart).toMatchObject({
      ...productsDataForTest[0],
    });
    expect(storeForTest.getState().cartsReducer.length).toBe(2);
  });

  test("Add an existing product should instead increase the product's quantity", () => {
    storeForTest.dispatch(addToCart(productsDataForTest[2]));
    storeForTest.dispatch(addToCart(productsDataForTest[2]));

    expect(storeForTest.getState().cartsReducer[0].productInCart).toMatchObject({
      ...productsDataForTest[2],
    });
    expect(storeForTest.getState().cartsReducer[0].number).toBe(2);
    expect(storeForTest.getState().cartsReducer.length).toBe(1);
  });

  test("Remove an existing product", () => {
    storeForTest.dispatch(addToCart(productsDataForTest[0]));
    storeForTest.dispatch(addToCart(productsDataForTest[1]));
    storeForTest.dispatch(addToCart(productsDataForTest[2]));
    storeForTest.dispatch(removeFromCart(productsDataForTest[1].id));

    expect(storeForTest.getState().cartsReducer.length).toBe(2);
    expect(storeForTest.getState().cartsReducer[1].productInCart).toMatchObject({
      ...productsDataForTest[2],
    });
  });

  test("Remove a non-exist product", () => {
    storeForTest.dispatch(addToCart(productsDataForTest[0]));
    storeForTest.dispatch(addToCart(productsDataForTest[1]));
    storeForTest.dispatch(removeFromCart(productsDataForTest[2].id));

    expect(storeForTest.getState().cartsReducer.length).toBe(2);
  });

  test("Increase number of product", () => {
    storeForTest.dispatch(addToCart(productsDataForTest[0]));
    storeForTest.dispatch(increaseQuantity(productsDataForTest[0].id));

    expect(storeForTest.getState().cartsReducer[0].number).toBe(2);
  });

  test("Decrease number of product", () => {
    storeForTest.dispatch(addToCart(productsDataForTest[0]));
    storeForTest.dispatch(increaseQuantity(productsDataForTest[0].id));
    storeForTest.dispatch(increaseQuantity(productsDataForTest[0].id));
    storeForTest.dispatch(increaseQuantity(productsDataForTest[0].id));
    storeForTest.dispatch(decreaseQuantity(productsDataForTest[0].id));

    expect(storeForTest.getState().cartsReducer[0].number).toBe(3);
  });
});
