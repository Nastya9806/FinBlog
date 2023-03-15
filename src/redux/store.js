import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from './slices/articles'
import userSlice from "./slices/user";

const rootReducer = combineReducers({
  articles: articlesSlice,
  user: userSlice,
})

const store = configureStore({
  reducer: rootReducer
})

export default store 