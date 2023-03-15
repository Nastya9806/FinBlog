import { createSlice } from '@reduxjs/toolkit'

const defaultUnregistered = {
  image: '',
  bio: '',
  token: '',
  username: '',
  email: '',
  password: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : defaultUnregistered,
    errors: null,
    done: false,
    home: false,
    location: 'articles-list',
  },
  reducers: {
    logOut(state) {
      state.user = defaultUnregistered
      localStorage.removeItem('user')
    },
    setUser(state, action) {
      const { user } = action.payload
      state.user = { ...state.user, ...user }
    },
    setErrors(state, action) {
      state.errors = action.payload
    },
    setDone(state, action){
      state.done = action.payload
    },
  },
})

export default userSlice.reducer
export const { setUser, setErrors, logOut, setDone } = userSlice.actions
