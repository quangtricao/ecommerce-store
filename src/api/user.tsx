import axios, { AxiosError } from "axios";
import { LoginObject, AuthorizedUserObject, CreateUserObject, SuccessUserCreate } from "../types/User";
import { TokenObject } from "../types/Token";

export const login = async (obj: LoginObject): Promise<TokenObject | string> => {
  try {
    const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", obj);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    return error.message;
  }
};

export const signup = async (obj: CreateUserObject): Promise<SuccessUserCreate | string> => {
  try {
    const response = await axios.post("https://api.escuelajs.co/api/v1/users/", obj);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    return error.message;
  }
};

export const getLoginUserInfo = async (token: string): Promise<AuthorizedUserObject | string> => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    return error.message;
  }
};
