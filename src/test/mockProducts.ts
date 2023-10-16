import { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    category: {
      creationAt: "Time 1",
      id: 1,
      image: "Link for category 1",
      name: "Category 1",
      updatedAt: "Time 1",
    },
    creationAt: "Time 1",
    description: "Product 1 description",
    id: 1,
    images: ["Link 1", "Link 2", "Link 3"],
    price: 200,
    title: "Product 1",
    updatedAt: "Time 1",
  },
  {
    category: {
      creationAt: "Time 2",
      id: 5,
      image: "Link for category 5",
      name: "Category 5",
      updatedAt: "Time 2",
    },
    creationAt: "Time 2",
    description: "Product 2 description",
    id: 2,
    images: ["Link 1"],
    price: 500,
    title: "Product 2",
    updatedAt: "Time 2",
  },
  {
    category: {
      creationAt: "Time 3",
      id: 2,
      image: "Link for category 2",
      name: "Category 2",
      updatedAt: "Time 3",
    },
    creationAt: "Time 3",
    description: "Product 3 description",
    id: 3,
    images: ["Link 1", "Link 2"],
    price: 900,
    title: "Product 3",
    updatedAt: "Time 3",
  },
];
