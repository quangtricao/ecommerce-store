type categoryType = {
  creationAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
};

export type ProductType = {
  category: categoryType[];
  creationAt: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  updatedAt: string;
};
