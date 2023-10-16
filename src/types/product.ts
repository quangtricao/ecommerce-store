export type ProductCategory = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: ProductCategory;
};

export type CreateProduct = {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
};

export type UpdateProduct = {
  id: number;
  updateProduct: CreateProduct;
};

export interface FilterProductPagination {
  title?: string;
  min?: string;
  max?: string;
  category?: string;
  offset?: number;
  limit?: number;
}
