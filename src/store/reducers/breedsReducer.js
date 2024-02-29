import { createSlice } from "@reduxjs/toolkit";

export const breedsSlice = createSlice({
  name: "arrBreeds",
  initialState: {
    value: [],
  },
  reducers: {
    addArray: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addArray } = breedsSlice.actions;
export const selectBreedsArray = (state) => state.arrBreeds.value;
export default breedsSlice.reducer;
