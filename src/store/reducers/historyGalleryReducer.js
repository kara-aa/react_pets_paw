import { createSlice } from "@reduxjs/toolkit";

export const historyGallerySlice = createSlice({
  name: "historyGallery",
  initialState: {
    value: [],
  },
  reducers: {
    addHistory: (state, action) => {
      state.value = [...state.value].concat(action.payload);
    },
    clearHistory: (state) => {
      state.value = [];
    }
  },
});

export const { addHistory, clearHistory } = historyGallerySlice.actions;
export const selectHistoryGallery = (state) => state.historyGallery.value;
export default historyGallerySlice.reducer;
