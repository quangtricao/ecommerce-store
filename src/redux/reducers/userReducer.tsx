import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  LoginObject,
  AuthorizedUserObject,
  CreateUserObject,
  SuccessUserCreate,
} from "../../types/User";
import { TokenObject } from "../../types/Token";

const initialState: {
  authorizedUser: AuthorizedUserObject | null;
  loading: boolean;
} = {
  authorizedUser: null,
  loading: false,
};

export const login = createAsyncThunk(
  "user/login",
  async (obj: LoginObject): Promise<TokenObject | string> => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", obj);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return error.message;
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (obj: CreateUserObject): Promise<SuccessUserCreate | string> => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/users/", obj);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      return error.message;
    }
  }
);

export const getLoginUserInfo = createAsyncThunk(
  "user/getLoginUserInfo",
  async (token: string): Promise<AuthorizedUserObject | string> => {
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
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      return {
        loading: false,
        authorizedUser: action.payload,
      };
    },
    removeUser(state, action) {
      return {
        loading: false,
        authorizedUser: null,
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
