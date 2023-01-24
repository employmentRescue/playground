import { configureStore } from "@reduxjs/toolkit";
import { catSlice } from "./slice/catSlice";

const store = configureStore({
  reducer: {
    cat: catSlice.reducer
  }
})

export default store;