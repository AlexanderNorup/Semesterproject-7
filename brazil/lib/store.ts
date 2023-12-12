import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { brazilstateSlice } from "./brazilstateSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {},
    devTools: true,
  });
};

export const store = configureStore({
  reducer: {
    [brazilstateSlice.name]: brazilstateSlice.reducer,
  },
  devTools: true,
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
