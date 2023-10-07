import { server } from "../../servers/productsServer";
import { createStore } from "../../../redux/store";
import { getAllProduct } from "../../../redux/reducers/productsReducer";
import { mockProducts } from "../../mockProducts";

let storeForTest = createStore();
beforeEach(() => {
  storeForTest = createStore();
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe("productsReducer asynchronous actions", () => {
  describe("fetch products", () => {
    test("no filter should return all", async () => {
      const response = await storeForTest.dispatch(getAllProduct()).unwrap();

      expect(response.length).toBe(mockProducts.length);
    });

    test("filter by title", async () => {
      const response = await storeForTest
        .dispatch(
          getAllProduct({
            title: "1",
            price: "",
            min: "",
            max: "",
            id: "",
          })
        )
        .unwrap();

      expect(response).toMatchObject(mockProducts[0]);
    });
  });
});
