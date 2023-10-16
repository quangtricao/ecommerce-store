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

export interface FilterProduct {
  title?: string;
  min?: string;
  max?: string;
  id?: string;
}

export interface FilterProductPagination extends FilterProduct {
  offset: number;
}
