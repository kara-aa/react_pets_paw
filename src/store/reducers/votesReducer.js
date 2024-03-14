import { createSlice } from "@reduxjs/toolkit";

export const votesSlice = createSlice({
  name: "votes",
  initialState: {
    value: [],
    votesUp: [],
    votesDown: [],
  },
  reducers: {
    addVotes: (state, action) => {
      state.value = action.payload;
    },
    addVotesUp: (state) => {
      state.votesUp = state.value.filter((vote) => (vote.value === 1));
    },
    addVotesDown: (state) => {
      state.votesDown = state.value.filter((vote) => (vote.value === -1));
    },
  },
});

export const { addVotes, addVotesUp, addVotesDown } = votesSlice.actions;
export const selectVotes = (state) => state.votes.value;
export const selectVotesUp = (state) => state.votes.votesUp;
export const selectVotesDown = (state) => state.votes.votesDown;
export default votesSlice.reducer;
