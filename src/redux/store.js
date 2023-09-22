import { configureStore } from "@reduxjs/toolkit";
import { mealApi } from "./services/mealApi";
import mealSlice from "./features/mealSlice";

export const store = configureStore({
  reducer: {
    mealSlice: mealSlice,
    [mealApi.reducerPath]: mealApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealApi.middleware),
});
