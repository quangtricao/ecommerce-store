import { rest } from "msw";
import { setupServer } from "msw/node";

import { mockProducts } from "../mockProducts";

export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/products/", async (request, response, context) => {
    const title = request.url.searchParams.get("title");

    if (title) {
      const filteredProducts = mockProducts.filter((product) => product.title.includes(title));
      return response(context.json(filteredProducts[0]));
    }

    return response(context.json(mockProducts));
  }),
];

export const server = setupServer(...handlers);
