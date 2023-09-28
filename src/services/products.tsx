import axios from "axios";
import { ProductType } from "../types/Products";

const baseURL = "https://api.escuelajs.co/api/v1/products";

/*
type getAllType = () => Promise<ProductType>;

export const getAll: getAllType = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};
*/

export const getAll = async (): Promise<ProductType> => {
  const response = await axios.get(baseURL);
  return response.data;
};
