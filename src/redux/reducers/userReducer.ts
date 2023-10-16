import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { JWTToken, LoginCredential, AuthorizedUser, RegisterUser } from "../../types/user";

export const login = createAsyncThunk<JWTToken, LoginCredential, { rejectValue: string }>(
  "user/login",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", obj);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        // Native error
        return rejectWithValue(error.message);
      }
      // Axios error
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk<AuthorizedUser, RegisterUser, { rejectValue: string }>(
  "user/register",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/users/", obj);
      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        // Native error
        return rejectWithValue(error.message);
      }
      // Axios error
      return rejectWithValue(error.message);
    }
  }
);

export const getLoginUserInfo = createAsyncThunk<AuthorizedUser, string, { rejectValue: string }>(
  "user/getLoginUserInfo",
  async (token, { rejectWithValue }) => {
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
        return rejectWithValue(error.message);
      }
      // Axios error
      return rejectWithValue(error.message);
    }
  }
);

type UserReducerState = {
  authorizedUser: AuthorizedUser | null;
  loading: boolean;
};

const initialState: UserReducerState = {
  authorizedUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      state.authorizedUser = action.payload;
    },
    removeUser(state) {
      state.authorizedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {});
    builder.addCase(login.rejected, (state, action) => {});
    builder.addCase(login.pending, (state, action) => {});
    builder.addCase(register.fulfilled, (state, action) => {});
    builder.addCase(register.rejected, (state, action) => {});
    builder.addCase(register.pending, (state, action) => {});
    builder.addCase(getLoginUserInfo.fulfilled, (state, action) => {});
    builder.addCase(getLoginUserInfo.rejected, (state, action) => {});
    builder.addCase(getLoginUserInfo.pending, (state, action) => {});
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
