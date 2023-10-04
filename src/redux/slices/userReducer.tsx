import { createSlice } from "@reduxjs/toolkit";
import { AuthorizedUserObject } from "../../types/User";

const initialState: {
  authorizedUser: AuthorizedUserObject | null;
  loading: boolean;
} = {
  authorizedUser: null,
  loading: false,
};

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
