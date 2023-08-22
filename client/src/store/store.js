import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import themeSlice from './themeSlice'
import socketSlice from './socketSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
    socket:socketSlice
  },
})