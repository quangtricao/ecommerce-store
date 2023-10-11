export type ProductObject = {
  category: {
    creationAt: string;
    id: number;
    image: string;
    name: string;
    updatedAt: string;
  };
  creationAt: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  updatedAt: string;
};

export type ProductInCart = {
  productInCart: ProductObject;
  number: number;
};

export type FilterObject = {
  title?: string;
  min?: string;
  max?: string;
  id?: string;
};

export type FilterPagination = {
  title?: string;
  min?: string;
  max?: string;
  id?: string;
  offset: number;
};

export type EditProduct = {
  title: string;
  price: number;
  description: string;
};

export type CreateProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export type CategoryObject = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};
