import axios from "axios";
import { ProductType } from "../types/Products";

/*
const baseURL = "https://api.escuelajs.co/api/v1/products";

type getAllType = () => Promise<ProductType>;

export const getAll: getAllType = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export const getAll = async (): Promise<ProductType> => {
  const response = await axios.get(baseURL);
  return response.data;
};
*/

export const getAll = async (
  title?: string,
  price?: string,
  min?: string,
  max?: string,
  id?: string
): Promise<ProductType> => {
  const response = await axios.get(
    `https://api.escuelajs.co/api/v1/products/?title=${title ? title : ""}&price=${
      price ? price : ""
    }&price_min=${min ? min : ""}&price_max=${max ? max : ""}&categoryId=${id ? id : ""}`
  );
  return response.data;
};
