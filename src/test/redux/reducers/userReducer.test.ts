import { server } from "../../servers/userServer";
import { createStore } from "../../../redux/store";
import { login, register, getLoginUserInfo } from "../../../redux/reducers/userReducer";

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

describe("userReducer asynchronous actions", () => {
  describe("login", () => {
    test("Success with valid credential", async () => {
      const response = await storeForTest
        .dispatch(
          login({
            email: "john@mail.com",
            password: "changeme",
          })
        )
        .unwrap();

      expect(response).toMatchObject({
        access_token: "abc",
        refresh_token: "xyz",
      });
    });
    test("401 Unauthorized with invalid email or password", async () => {
      const response = await storeForTest
        .dispatch(
          login({
            email: "john@mail.com",
            password: "abc",
          })
        )
        .unwrap();

      expect(response).toBe("Request failed with status code 401");
    });
  });
  describe("signup", () => {
    test("Success with valid user object", async () => {
      const response = await storeForTest
        .dispatch(
          register({
            name: "Tri",
            email: "abc@gmail.com",
            password: "caoquangtri",
            avatar: "abc.com",
          })
        )
        .unwrap();
      expect(response).toMatchObject({
        email: "abc@gmail.com",
        password: "caoquangtri",
        name: "Tri",
        avatar: "abc.com",
        role: "customer",
        id: 10,
        creationAt: "2023-10-07T14:19:22.000Z",
        updatedAt: "2023-10-07T14:19:22.000Z",
      });
    });
    test("400 Bad request with invalid user object", async () => {
      const response = await storeForTest
        .dispatch(
          register({
            name: "Tri",
            email: "",
            password: "",
            avatar: "",
          })
        )
        .unwrap();
      expect(response).toBe("Request failed with status code 400");
    });
  });
  describe("getLoginUserInfo", () => {
    test("Success retrieve user info with valid token", async () => {
      const response = await storeForTest.dispatch(getLoginUserInfo("validtoken")).unwrap();

      expect(response).toMatchObject({
        id: 1,
        email: "john@mail.com",
        password: "changeme",
        name: "Jhon",
        role: "customer",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      });
    });

    test("401 Unauthorized with invalid token", async () => {
      const response = await storeForTest.dispatch(getLoginUserInfo("invalidtoken")).unwrap();

      expect(response).toBe("Request failed with status code 401");
    });
  });
});
