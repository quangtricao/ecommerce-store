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

export type FilterObject = {
  title: string;
  price: string;
  min: string;
  max: string;
  id: string;
};

export type CategoryObject = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};
