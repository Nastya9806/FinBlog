import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from './articles'
import userSlice from "./user";
import statusSlice from './status'

const rootReducer = combineReducers({
  articles: articlesSlice,
  user: userSlice,
  status: statusSlice,

})

const store = configureStore({
  reducer: rootReducer
})

export default store 