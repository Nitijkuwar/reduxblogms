import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import blogSlice from "./blogSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    blog: blogSlice,
    search: searchReducer,
  },
});

export default store;
