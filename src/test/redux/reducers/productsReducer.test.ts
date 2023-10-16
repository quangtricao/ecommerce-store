import { server } from "../../servers/productsServer";
import { createStore } from "../../../redux/store";
import { getAllProductPagination } from "../../../redux/reducers/productsReducer";
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
    test("filter by title", async () => {
      const response = await storeForTest
        .dispatch(
          getAllProductPagination({
            title: "1",
            min: "",
            max: "",
            category: "",
          })
        )
        .unwrap();

      expect(response).toMatchObject(mockProducts[0]);
    });
  });
});
