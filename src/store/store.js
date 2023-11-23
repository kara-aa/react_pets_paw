import { configureStore } from "@reduxjs/toolkit";
import pageReducer from './reducers/pageReducer';
import breedsReducer from "./reducers/breedsReducer";
import breedInfoReducer from "./reducers/breedInfoReducer";

export default configureStore({
  reducer: {
    page: pageReducer,
    breeds: breedsReducer,
    breedInfo: breedInfoReducer,
  },
});
