import axios, { AxiosError } from "axios";
import { FilterObject, ProductObject, EditProduct, CreateProduct } from "../types/Products";

export const fetchAllByFilter = async (obj: FilterObject): Promise<ProductObject[] | string> => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${obj.title ? obj.title : ""}&price_min=${
        obj.min ? obj.min : ""
      }&price_max=${obj.max ? obj.max : ""}&categoryId=${obj.id ? obj.id : ""}`
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

export const updateProduct = async (
  id: number,
  newProd: EditProduct
): Promise<ProductObject | string> => {
  try {
    const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, newProd);
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

export const createProduct = async (obj: CreateProduct): Promise<ProductObject[] | string> => {
  try {
    console.log(obj);

    const response = await axios.post("https://api.escuelajs.co/api/v1/products/", obj);
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
