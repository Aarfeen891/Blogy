import { configureStore } from "@reduxjs/toolkit";
import login from "./reducer/login&Reg";
import blogs from "./reducer/blogsReducer";

export const store = configureStore({
  reducer: {
    custom: login,
    blog: blogs,
  },
});
