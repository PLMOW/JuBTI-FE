import { configureStore } from '@reduxjs/toolkit'
import crud from '../modules/crud'
import login from '../modules/login'

const store = configureStore({
  reducer: {
    crud,
    login,
  },
})

export default store
