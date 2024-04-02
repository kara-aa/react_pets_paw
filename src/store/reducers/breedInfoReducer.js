import { createSlice } from "@reduxjs/toolkit";

export const breedInfoSlice = createSlice({
  name: "breedInfo",
  initialState: {
    value: {},
  },
  reducers: {
    addInfoBreed: (state, action) => {
      state.value = Object.assign({}, action.payload);
    },
  },
});

export const { addInfoBreed } = breedInfoSlice.actions;
export const selectBreedInfo = (state) => state.breedInfo.value;
export default breedInfoSlice.reducer;
