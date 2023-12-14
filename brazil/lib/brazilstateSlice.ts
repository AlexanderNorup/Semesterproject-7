import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Slice
export const brazilstateSlice = createSlice({
  name: "brazilstate",
  initialState: {
    value: "AC",
  },
  reducers: {
    setBrazilstateState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBrazilstateState } = brazilstateSlice.actions;

export const selectBrazilstateState = (state: AppState) =>
  state.brazilstate.value;

export default brazilstateSlice.reducer;
