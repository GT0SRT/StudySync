import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./userDetailsSlice";
import { reducer as todoReducer } from './reducer';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;