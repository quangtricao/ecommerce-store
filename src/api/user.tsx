import axios, { AxiosError } from "axios";
import { UserLoginObject, TokenObject } from "../types/User";

const STORAGE_KEY = "loggedInUser";

export const login = async (obj: UserLoginObject): Promise<TokenObject | string> => {
  try {
    const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", obj);
    window.localStorage.setItem(STORAGE_KEY, response.data.access_token);
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

export const getLoginUserInfo = async (token: string | null) => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
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

export const getTokenFromLocalStorage = (): string | null => {
  const token = window.localStorage.getItem(STORAGE_KEY);
  return token ? token : null;
};
