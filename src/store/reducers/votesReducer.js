import { createSlice } from "@reduxjs/toolkit";

export const votesSlice = createSlice({
  name: "votes",
  initialState: {
    value: [],
  },
  reducers: {
    addVotes: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addVotes } = votesSlice.actions;
export const selectVotes = (state) => state.votes.value;
export default votesSlice.reducer;
