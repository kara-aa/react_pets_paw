import { configureStore } from "@reduxjs/toolkit";
import pageReducer from './reducers/pageReducer';
import breedsReducer from "./reducers/breedsReducer";
import breedInfoReducer from "./reducers/breedInfoReducer";
import votesReducer from "./reducers/votesReducer";
import favesReducer from "./reducers/favesReducer";
import searchReducer from "./reducers/searchReducer";

export default configureStore({
  reducer: {
    page: pageReducer,
    arrBreeds: breedsReducer,
    breedInfo: breedInfoReducer,
    votes: votesReducer,
    faves: favesReducer,
    search: searchReducer,
  },
});
