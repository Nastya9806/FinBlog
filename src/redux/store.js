import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from "./articles";
import userSlice from "./user";
import statusSlice from './status'
import tagsSlice from './tags'

const rootReducer = combineReducers({
  articles: articlesSlice,
  user: userSlice,
  status: statusSlice,
  tags: tagsSlice,
})

const store = configureStore({
  reducer: rootReducer
})

export default store 