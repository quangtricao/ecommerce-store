import { rest } from "msw";
import { setupServer } from "msw/node";

import { mockProducts } from "../mockProducts";

export const handlers = [
  // Fetch product by title
  rest.get("https://api.escuelajs.co/api/v1/products/", async (request, response, context) => {
    const title = request.url.searchParams.get("title");

    if (title) {
      const filteredProducts = mockProducts.filter((product) => product.title.includes(title));
      return response(context.json(filteredProducts));
    }

    return response(context.json(mockProducts));
  }),

  // Create a new product
  rest.post("https://api.escuelajs.co/api/v1/products/", async (request, response, context) => {
    const requestBody = await request.json();

    if (requestBody) {
      const newProduct = {
        category: {
          creationAt: `Time ${mockProducts.length + 1}`,
          id: requestBody.categoryId,
          image: `Link for category ${requestBody.categoryId}`,
          name: "Category 1",
          updatedAt: `Time ${mockProducts.length + 1}`,
        },
        creationAt: `Time ${mockProducts.length + 1}`,
        description: "Product 4 description",
        id: mockProducts.length + 1,
        images: requestBody.images,
        price: requestBody.price,
        title: requestBody.title,
        updatedAt: `Time ${mockProducts.length + 1}`,
      };

      mockProducts.push(newProduct);
      return response(context.status(200), context.json(newProduct));
    }

    return response(context.status(400));
  }),

  // Update products
  rest.put("https://api.escuelajs.co/api/v1/products/:id", async (request, response, context) => {
    const id = request.params.id;
    const requestBody = await request.json();

    const foundProduct = mockProducts.filter((product) => product.id === Number(id));

    if (foundProduct.length === 1) {
      return response(
        context.status(200),
        context.json({
          ...foundProduct[0],
          description: requestBody.description,
          images: requestBody.images,
          prices: requestBody.price,
          title: requestBody.title,
          category: {
            ...foundProduct[0].category,
            id: requestBody.categoryId,
          },
        })
      );
    }

    return response(context.status(400));
  }),

  // Delete products
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (request, response, context) => {
      const id = request.params.id;
      const deleteProduct = mockProducts.findIndex((product) => product.id === Number(id));

      if (deleteProduct) {
        mockProducts.splice(deleteProduct, 1);
        return response(context.status(202));
      } else {
        return response(context.status(404));
      }
    }
  ),
];

export const server = setupServer(...handlers);
