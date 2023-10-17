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
  });
});
