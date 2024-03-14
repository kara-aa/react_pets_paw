import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchRequest",
  initialState: {
    value: "",
  },
  reducers: {
    changeSearchRequest: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeSearchRequest } = searchSlice.actions;
export const selectSearchRequest = (state) => state.search.value;
export default searchSlice.reducer;
