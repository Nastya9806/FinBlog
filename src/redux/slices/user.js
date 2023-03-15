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
  },
})

export default userSlice.reducer
export const { setUser, setErrors, logOut } = userSlice.actions
