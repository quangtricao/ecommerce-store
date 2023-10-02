import axios, { AxiosError } from "axios";
import { CategoryObject, ProductObject } from "../types/Products";

export const getProduct = async (
  title?: string,
  price?: string,
  min?: string,
  max?: string,
  id?: string
): Promise<ProductObject[] | string> => {
  try {
    console.log(min, max);

    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${title ? title : ""}&price=${
        price ? price : ""
      }&price_min=${min ? min : ""}&price_max=${max ? max : ""}&categoryId=${id ? id : ""}`
    );
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      // Native error
      return error.message;
    }
    // Axios error
    return error.message;
  }
};

export const getCategory = async (): Promise<CategoryObject[] | string> => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      // Native error
      return error.message;
    }
    // Axios error
    return error.message;
  }
};
