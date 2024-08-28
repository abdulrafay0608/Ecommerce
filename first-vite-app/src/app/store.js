import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/createSlice";

export const store = configureStore({
  reducer: itemsReducer,
});
