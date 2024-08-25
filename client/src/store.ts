import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import deliveryReducer from "./slice/deliverySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    deliver: deliveryReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
