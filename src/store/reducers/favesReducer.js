import { createSlice } from "@reduxjs/toolkit";

export const favesSlice = createSlice({
  name: "faves",
  initialState: {
    value: [],
  },
  reducers: {
    addFaves: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addFaves } = favesSlice.actions;
export const selectFaves = (state) => state.faves.value;
export default favesSlice.reducer;
