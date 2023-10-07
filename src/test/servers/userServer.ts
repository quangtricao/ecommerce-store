import { rest } from "msw";
import { setupServer } from "msw/node";

import { MockUser } from "../mockUsers";

export const handlers = [
  // Handle POST requests made to the URL
  // Login
  rest.post("https://api.escuelajs.co/api/v1/auth/login", async (request, response, context) => {
    const requestBody = await request.json();
    const foundEmail = MockUser.find((user) => user.email === requestBody.email);

    if (foundEmail) {
      if (foundEmail.password === requestBody.password) {
        return response(
          context.status(200),
          context.json({
            access_token: "abc",
            refresh_token: "xyz",
          })
        );
      }
    }

    return response(context.status(401));
  }),

  // Handle POST requests made to the URL
  // Register
  rest.post("https://api.escuelajs.co/api/v1/users/", async (request, response, context) => {
    const requestBody = await request.json();

    for (const key in requestBody) {
      if (!requestBody[key]) {
        return response(context.status(400));
      }
    }

    return response(
      context.status(200),
      context.json({
        email: requestBody.email,
        password: requestBody.password,
        name: requestBody.name,
        avatar: requestBody.avatar,
        role: "customer",
        id: 10,
        creationAt: "2023-10-07T14:19:22.000Z",
        updatedAt: "2023-10-07T14:19:22.000Z",
      })
    );
  }),

  // Handle GET requests made to the URL
  // Retrieve user info
  rest.get("https://api.escuelajs.co/api/v1/auth/profile", async (request, response, context) => {
    const header = request.headers.get("Authorization");
    if (header === "bearer validtoken") {
      return response(
        context.status(200),
        context.json({
          id: 1,
          email: "john@mail.com",
          password: "changeme",
          name: "Jhon",
          role: "customer",
          avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        })
      );
    }

    return response(context.status(401));
  }),
];

export const server = setupServer(...handlers);
