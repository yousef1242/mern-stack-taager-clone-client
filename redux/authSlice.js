import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: Cookies.get("setUserInfoAfterLogin")
      ? JSON.parse(Cookies.get("setUserInfoAfterLogin"))
      : null,
  },
  reducers: {
    setAuth:(state, action) => {
        state.auth = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
