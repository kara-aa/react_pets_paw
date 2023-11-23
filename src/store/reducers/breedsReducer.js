import { createSlice } from "@reduxjs/toolkit";

export const breedsSlice = createSlice({
  name: "arrBreeds",
  initialState: {
    value: [],
  },
  reducers: {
    addArray: (state, action) => {
      state.value = state.value.concat(action.payload.slice());
    },
  },
});

export const { addArray } = breedsSlice.actions;
export const selectBreedsArray = (state) => state.arrBreeds.value;
export default breedsSlice.reducer;
