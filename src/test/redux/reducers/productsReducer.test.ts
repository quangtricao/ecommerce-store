import { server } from "../../servers/productsServer";
import { createStore } from "../../../redux/store";
import {
  getAllProductPagination,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../../../redux/reducers/productsReducer";
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
          })
        )
        .unwrap();

      expect(response[0]).toMatchObject(mockProducts[0]);
    });

    test("if no filter provided, return all data", async () => {
      const response = await storeForTest.dispatch(getAllProductPagination({})).unwrap();

      expect(response.length).toBe(3);
    });
  });

  test("Create product", async () => {
    const newProduct = {
      title: "New product",
      price: 900,
      description: "New product",
      images: ["abc.com", "bcd.com"],
      categoryId: 3,
    };
    const response = await storeForTest.dispatch(createProduct(newProduct)).unwrap();

    expect(mockProducts.length).toBe(4);
    expect(response).toMatchObject({
      category: {
        creationAt: "Time 4",
        id: 3,
        image: "Link for category 3",
        name: "Category 1",
        updatedAt: "Time 4",
      },
      creationAt: "Time 4",
      description: "Product 4 description",
      id: 4,
      images: ["abc.com", "bcd.com"],
      price: 900,
      title: "New product",
      updatedAt: "Time 4",
    });
  });

  test("Update product", async () => {
    const productToBeUpdated = {
      id: 2,
      updateProduct: {
        description: "Product 2 description",
        images: ["Link 1"],
        price: 500,
        title: "Product 2",
        categoryId: 2,
      },
    };
    const response = await storeForTest.dispatch(updateProduct(productToBeUpdated)).unwrap();

    expect(response).toMatchObject({
      creationAt: "Time 2",
      updatedAt: "Time 2",
      description: "Product 2 description",
      images: ["Link 1"],
      price: 500,
      title: "Product 2",
      category: {
        creationAt: "Time 2",
        id: 2,
        image: "Link for category 5",
        name: "Category 5",
        updatedAt: "Time 2",
      },
    });
  });

  test("Delete product", async () => {
    await storeForTest.dispatch(deleteProduct(3));

    expect(mockProducts.length).toBe(3);
  });
});
