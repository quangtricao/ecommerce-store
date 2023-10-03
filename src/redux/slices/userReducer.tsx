import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  userInLocalStorage?: string;
  error?: string | null;
  loading: boolean;
} = {
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
