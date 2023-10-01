export type ProductType = {
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

export type FilterObjectType = {
  title: string;
  price: string;
  min: string;
  max: string;
  id: string;
};