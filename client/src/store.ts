import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slice/orderSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: { order: orderReducer, auth: authReducer },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
