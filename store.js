import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import cartSlice from "./redux/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});
