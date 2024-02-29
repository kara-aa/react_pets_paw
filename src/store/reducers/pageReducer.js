import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    value: 'main',
  },
  reducers: {
    changePage: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { changePage } = pageSlice.actions;
export const selectPage = (state) => state.page.value;
export default pageSlice.reducer;