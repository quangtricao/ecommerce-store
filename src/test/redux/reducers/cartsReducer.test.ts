import { createStore } from "../../../redux/store";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../../redux/reducers/cartsReducer";
import { mockProducts } from "../../mockProducts";

let storeForTest = createStore();

beforeEach(() => {
  storeForTest = createStore();
});

describe("cartReducer actions", () => {
  test("Add a new product", () => {
    storeForTest.dispatch(addToCart(mockProducts[2]));
    storeForTest.dispatch(addToCart(mockProducts[0]));

    expect(storeForTest.getState().cartsReducer[0].productInCart).toMatchObject({
      ...mockProducts[2],
    });
    expect(storeForTest.getState().cartsReducer[1].productInCart).toMatchObject({
      ...mockProducts[0],
    });
    expect(storeForTest.getState().cartsReducer.length).toBe(2);
  });

  test("Add an existing product should instead increase the product's quantity", () => {
    storeForTest.dispatch(addToCart(mockProducts[2]));
    storeForTest.dispatch(addToCart(mockProducts[2]));

    expect(storeForTest.getState().cartsReducer[0].productInCart).toMatchObject({
      ...mockProducts[2],
    });
    expect(storeForTest.getState().cartsReducer[0].number).toBe(2);
    expect(storeForTest.getState().cartsReducer.length).toBe(1);
  });

  test("Remove an existing product", () => {
    storeForTest.dispatch(addToCart(mockProducts[0]));
    storeForTest.dispatch(addToCart(mockProducts[1]));
    storeForTest.dispatch(addToCart(mockProducts[2]));
    storeForTest.dispatch(removeFromCart(mockProducts[1].id));

    expect(storeForTest.getState().cartsReducer.length).toBe(2);
    expect(storeForTest.getState().cartsReducer[1].productInCart).toMatchObject({
      ...mockProducts[2],
    });
  });

  test("Remove a non-exist product", () => {
    storeForTest.dispatch(addToCart(mockProducts[0]));
    storeForTest.dispatch(addToCart(mockProducts[1]));
    storeForTest.dispatch(removeFromCart(mockProducts[2].id));

    expect(storeForTest.getState().cartsReducer.length).toBe(2);
  });

  test("Increase number of product", () => {
    storeForTest.dispatch(addToCart(mockProducts[0]));
    storeForTest.dispatch(increaseQuantity(mockProducts[0].id));

    expect(storeForTest.getState().cartsReducer[0].number).toBe(2);
  });

  test("Decrease number of product", () => {
    storeForTest.dispatch(addToCart(mockProducts[0]));
    storeForTest.dispatch(increaseQuantity(mockProducts[0].id));
    storeForTest.dispatch(increaseQuantity(mockProducts[0].id));
    storeForTest.dispatch(increaseQuantity(mockProducts[0].id));
    storeForTest.dispatch(decreaseQuantity(mockProducts[0].id));

    expect(storeForTest.getState().cartsReducer[0].number).toBe(3);
  });
});
