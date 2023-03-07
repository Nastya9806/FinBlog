import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from "./articles";
import user from "./user";

const rootReducer = combineReducers({
  articles: articlesSlice,
//   status: user,
})

const store = configureStore({
  reducer: rootReducer
})

export default store 